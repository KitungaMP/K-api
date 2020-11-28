const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.DB_PATH, {useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false}, () => {
    console.log('GaNote mongoDB connected successfuly');
});
mongoose.Promise = global.Promise;