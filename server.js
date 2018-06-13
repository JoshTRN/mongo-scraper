const express = require('express');
const exphb = require ('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const PORT = process.env.PORT || 3000;

const app = express();

require('./controllers/routes.js')(app);

app.use(express.static(__dirname + '/public'));

app.engine('handlebars', exphb({
    defaultLayout: 'main'
}))
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }));

const db = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines"

mongoose.connect(db, function(err){
    if (err) throw err;
    else {
        console.log('mongoose connected');
    }
})

app.listen(PORT, () => {
    console.log('app listening on http://localhost:' + PORT)
});