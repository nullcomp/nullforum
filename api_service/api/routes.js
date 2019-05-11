const toxicity = require('@tensorflow-models/toxicity');
const fs = require('fs');

module.exports = app => {
    
    app.post('/api/publish', (req,res) => {

        console.log(req.body);
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
};