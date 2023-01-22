const express = require('express')
const app = express()
var cors = require('cors')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
const cohere = require('cohere-ai')
require('dotenv').config();
cohere.init(process.env.COHERE_KEY);

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())


app.post('/summarize/text', async (req, res)=>{
    try{
    let resp = await cohere.generate({
        prompt: req.body.input,
        max_tokens: 100
    });
        res.status(200).json(resp)
    }catch(err){
        res.status(500).json(err)
    }
})

app.listen(process.env.PORT || 5000, () => {
    console.log(`ollie listening at http://localhost:${process.env.PORT || 5000}`)
})