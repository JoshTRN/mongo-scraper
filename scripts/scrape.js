const axios = require('axios');
const cheerio = require('cheerio');


const scrape = function (cb) {
    axios.get('https://www.nytimes.com/')
        .then(res => {

            let articleArray = [];

            let $ = cheerio.load(res.data);

            $(".theme-summary").each((i, elem) => {

                let dbObj = {}

                let headline = $(this).children(".story-heading").text().trim()

                let summary = $(this).children('.summary').text().trim();

                if (summary !== '' && headline !== '') {

                    dbObj.headline = headline
                    dbObj.summary = summary

                    articleArray.push(dbObj)
                }
                cb(articleArray)
            })
        })
}

module.exports = scrape;