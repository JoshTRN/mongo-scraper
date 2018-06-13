const moment = require('moment')

const makeDate = () => {
    let date = new Date();
    
    date = moment(date).format('MM-DD-YYYY');
    console.log(date)
}

module.exports = makeDate;