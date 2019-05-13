const toxicity = require('@tensorflow-models/toxicity');
const restify = require('restify-clients');
const fs = require('fs');

const bdApi = restify.createJsonClient({
    url: 'http://localhost:8080'
});

module.exports = app => {
    
    app.post('/api/topics/publish', (req,res) => {

        console.log(req.body);

        let publishDate = new Date(req.body.publishDate);

        req.body.publishDate = {
            day: publishDate.getDate(),
            month: publishDate.getMonth()+1,
            year: publishDate.getFullYear()
        };

        bdApi.post('/posts/add', req.body, (err,req,res,ret) => {
            console.log(err);
            console.log(ret);
        });

        res.send('PA');
        return;

        const samples = [
            {
                'id': '002261b0415c4f9d',
                'text': req.body.content
            }
        ];

        let model;

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

            const predictions = await classify(samples.map(d => d.text));
            console.log(predictions);
            res.json(predictions);
        };

        predict();
    });

    app.get('/api/topics/mytrend', (req,res) => {
        bdApi.get('/users', (err, data) => {

            let allPosts = JSON.parse(data.res.body)
                .map(post => post.topics)
                .reduce((arr, el) => arr.concat(el), [])
                .filter(post => post);

            res.json(allPosts);
        });
    });
};