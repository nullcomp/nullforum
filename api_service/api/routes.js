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

            let allPosts = JSON.parse(data.res.body)
                .map(post => post.topics)
                .reduce((arr, el) => arr.concat(el), [])
                .filter(post => post);

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
    
    app.post('/api/topics/publish', (req,res) => {

        console.log('qewwewdsasa');

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
                'id': '002261b0415c4f9d',
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
            console.log(predictions);
        };
        
        
        bdApi.post('/posts/add', data, (err, requisition, response, ret) => {
            console.log(err);
            console.log(ret);
        });
        predict();
        res.json(predictions);
    });
};