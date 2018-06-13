const date = require('../scripts/date');
const scrape = require('../scripts/scrape')

const Headline = require ('../models/Article');

module.exports = {
    fetch: (cb) => {
        scrape(data => {
            let articles = data;

            for (var i=0; i = articles.length; i++) {
                articles[i].date = makeDate();
                articles[i].saved = false;
            }
            Headline.collection.insertMany(articles, function(err, docs) {
                cb(err, docs);
            })
        })

    },
    delete: (query, cb) => {
        Headline.remove(query,cb)
    },
    get: (query, cb) => {
        Headline.find(query)
        .sort({
            _id: -1
        })
        .exec((err, doc) => {
            cb(doc);
        })
    },
    update: (query, cb) => {
        Headline.update({_id: query._id}, {
           $set: query 
        }, {}, cb)
    }    
}