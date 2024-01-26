
const express = require('express')
const app = express()
const ngrok = require('@ngrok/ngrok')
const port = 3500
let URL = ''
require('dotenv').config()

app.get('/', (req, res) => {
  res.send('ngrok api 🤖 !!')
})

getUrl = async()=>{
    try {
        // Get your endpoint online
        await ngrok.connect({ addr: 3000, authtoken: process.env.AUTH_TOKEN })
        .then(listener =>{
            console.log(`Ingress established at: ${listener.url()}`)
            URL = listener.url()
        });

    } catch (error) {
        console.log('error al conectar ngrok', error)
    }
}

app.get('/start', async(req, res) => {
    try {
        await getUrl()
        res.send(`🤖 url api ngrok: ${URL}` )
    } catch (error) {
        res.send(`🤖 hubo un error al crear la url !!! ` )
    }
})
  
app.get('/get-url', (req, res) => {
    res.send(`${URL}`)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

