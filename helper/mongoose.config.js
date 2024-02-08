
const mongoose = require('mongoose')

mongoose.connect(process?.env?.MONGOOSE_URL, {
    dbName: process?.env?.MONGOOSE_DB_NAME,
    user: process?.env?.MONGOOSE_USERNAME,
    pass: process?.env?.MONGOOSE_PASSWORD
}).then(res => {
    console.log(`mongoose is connected 📦 !!!`);
}).catch(err => {
    console.log(`mongoose error ${err}`);
})