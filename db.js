const mongoose = require('mongoose');

const mongoDB = 'mongodb://127.0.0.1/coches'

// console.log(process.env.NODE_ENV)
// if(process.env.NODE_ENV == 'produccion'){
//     console.log(process.env.MONGO_PROD)
// }else{
//     console.log(process.env.MONGO_DEV)
// }

// let mongoDB = ''
// if(process.env.NODE_ENV === 'produccion'){ 
//     console.log(process.env.MONGO_PROD) 
//     mongoDB = process.env.MONGO_PROD 
//     console.log('Produccion') 
// }else{ 
//     console.log(process.env.MONGO_DEV) 
//     mongoDB = process.env.MONGO_DEV 
//     console.log('Desarrollo') 
// }

mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true})

const db = mongoose.connection
db.on('error', console.error.bind("NO hay conexión db"))
db.once('open', () => {
    console.log("Conectado a db");
})