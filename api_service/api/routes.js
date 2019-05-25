const toxicity = require('@tensorflow-models/toxicity');
const jwt = require('jsonwebtoken');
const restify = require('restify-clients');

const bdApi = restify.createJsonClient({
    url: 'http://localhost:8080'
});

module.exports = app => {

    app.post('/api/user/login', (req, res) => {
        bdApi.post('/user/authentication', req.body, (err, requisition, response, ret) => {
            if (ret == 401){
                res.sendStatus(401);
            } else {
                let token = jwt.sign(
                    { user: ret }, 
                    'opacoisaboanutella',
                    { expiresIn:84600 }
                );
                res.json({'x-access-token': token});
            }
        });
    });

    app.post('/api/users/signup', (req, res) => {

        req.body.id = Math.floor(Math.random() * 42000);

        bdApi.post('/users/add', req.body, (err,req,response,ret) => {
            console.log(err);
            console.log(ret);
            res.sendStatus(200);
        });
    });

    app.get('/api/topics/feed', (req, res) => {
        bdApi.get('/users', (err, data) => {
            let usersMap = {};
            
            JSON.parse(data.res.body)
                .map(user => ({
                    id: user.id,
                    name: user.username   
                }))
                .forEach(user => usersMap[user.id] = user.name);
                
            let allPosts = JSON.parse(data.res.body)
                .map(post => post.topics)
                .reduce((arr, el) => arr.concat(el), [])
                .filter(post => post);
            allPosts
                .forEach(post => 
                    post['authorUsername'] = usersMap[post.authorId]);

            res.json(allPosts);
        });
    });

    app.use('/*', (req,res,next) => {

        let token = req.headers['x-access-token'];
        if(!token) {
            res.sendStatus(401);
        } else {
            jwt.verify(token, 'opacoisaboanutella', (err,decoded) => {
                if(err) res.sendStatus(401);
                req.user = decoded;
                next();
            });
        }
    });

    app.use('/api/loggeduserinfo', (req,res) => 
        res.json(req.user))
    
    app.post('/api/topics/publish', (req,res) => {

        let user = req.user.user;

        let data = req.body;

        let publishDate = new Date();

        data.publishDate = {
            day: publishDate.getDate(),
            month: publishDate.getMonth()+1,
            year: publishDate.getFullYear()
        };

        data.id = Math.floor(Math.random() * 42000);
        data.authorId = user.id;

        const samples = [
            {
                'id': 'title',
                'text': data.title
            },
            {
                'id': 'content',
                'text': data.content
            }
        ];

        let model, predictions;

        const classify = async (inputs) => {
            const results = await model.classify(inputs);
            return inputs.map((d, i) => {
                const obj = { 'text': d };
                results.forEach((classification) => {
                    obj[classification.label] = classification.results[i].match;
                });
                return obj;
            });
        };

        const predict = async () => {
            model = await toxicity.load();
            labels = model.model.outputNodes.map(d => d.split('/')[0]);

            predictions = await classify(samples.map(d => d.text));
            console.log('Dentro do predict');
            console.log(predictions);
            console.log('Tipo da predicao dentro do predict');
            console.log(typeof(predictions));
            return predictions;
        };
        let promise = predict();
        promise
            .then(predictions => {
                console.log('ja tenho as predicoes');
                let hasToxicity = (
                    predictions &&
                    predictions
                        .some(prediction => 
                            Object.values(prediction)
                                .some(item => item == true)));
                if (hasToxicity) {
                    let messages = {
                        title: [],
                        content: []
                    };

                    let titleKeys = Object.keys(predictions[0]); 
                    let contentKeys = Object.keys(predictions[1]); 

                    if (titleKeys.some(item => item)) {
                        titleKeys
                            .forEach((item,index) => {
                                if (predictions[0][item] == true)
                                    messages.title.push(`Your title contains ${item.replace('_', ' ')}`);
                            });
                    }
                    if (contentKeys.some(item => item)){
                        contentKeys
                            .forEach((item, index) => {
                                if (predictions[1][item] == true)
                                    messages.content.push(`Your content contains ${item.replace('_', ' ')}`);
                            });
                    }
                    res.json(messages);
                } else {
                    bdApi.post('/posts/add', data, () => {
                        console.log('salvei no banco e vou mandar as requisition');
                        res.sendStatus(200);
                    });
                }
            });
    });
};