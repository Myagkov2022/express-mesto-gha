const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const path = require('path');
const router = require('./routes/index')

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
    req.user = {
        _id: '64a9520cb53e8c70f8430f01' // вставьте сюда _id созданного в предыдущем пункте пользователя
    };

    next();
});

app.use(router)
 mongoose.connect('mongodb://localhost:27017/mestodb', {
    // useNewUrlParser: true,
    // //useCreateIndex: true,
      //useFindAndModify: false,
})

app.listen(PORT, () => {
    console.log(`Server is listening ${PORT} port`);

});