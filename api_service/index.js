const app = require('./config/custom-express.js');
const PORT = process.env.PORT || 3521;

app.listen(PORT, () => {
    console.log(`Running at the port ${PORT}`);
});