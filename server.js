const express = require('express');
const exphb = require ('express-handlebars');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.static(__dirname + '/public'));

app.engine('handlebars', exphb({
    defaultLayout: 'main'
}))
app.set('view engine', 'handlebars');

app.listen(PORT, () => {
    console.log('app listening on http://localhost:' + PORT)
});