const express = require('express');
const { mongoose } = require('mongoose');
const port = 5000;
const app = express();
const authR = require('./router/authenticationR')
const pgrouter = require('./router/PGrouter')
const cors = require('cors');

mongoose.connect('mongodb://127.0.0.1:27017/VooshAssignment', {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}).then(() => console.log("Connected to MongoDB")).catch(console.error);

app.use(express.json());

app.use('/',authR)
app.use(cors());
app.use('/order/',pgrouter)

app.listen(port,(err)=>{
    if(err){
        console.log(err);
    }
    console.log(`server is running on ${port}`)
})
