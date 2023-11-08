const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017', {dbName: 'E-commerse'})
.then(() => {
    console.log('MongoDb connected successfully')
}).catch((err) => {
    console.log(err)
})


