const express=require('express');
var cors = require('cors');
const path = require('path')
const app = express()





//Middlewares
app.use(express.json())
app.use(cors())
//const __dirname=path.resolve()
app.use("/uploads",express.static(path.join(__dirname , "/uploads")))
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join ('/Client/build')))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '/Client/build/index.html'))
    })
} 

const mongoose=require('mongoose');
require('dotenv').config({path:'./.env'});

//routes

app.use('/user',require('./routes/user'));
app.use('/category',require('./routes/category'));
app.use('/img',require('./routes/upload'));
app.use('/product',require('./routes/product'));
app.use('/orders',require('./routes/order'));
app.get('/config/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
  });



// mongoose connect
const PORT=process.env.PORT || 5000;
const mongo_uri=process.env.MONGO_URL

mongoose
.connect(mongo_uri,{useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex: true,
    useFindAndModify: false},err =>{
        if(err) throw err;
        console.log('Connected to MongoDB')
    })
    

app.listen(PORT ,(err) =>(err ? console.log(err): console.log(`server is running on port ${PORT}`)))



