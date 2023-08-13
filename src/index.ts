import express from 'express'
import http from 'http'
import corpo from 'body-parser'
import cookies from 'cookie-parser'
import compressao from 'compression'
import cors from 'cors'
import mongoose from 'mongoose'
import router from './router'

const app = express()

/* USES */
app.use(cors({
    credentials: true
}))
app.use(compressao())
app.use(cookies())
app.use(corpo.json())

const server = http.createServer(app)

const porta = 8080

server.listen(porta, () => {
    console.log(`http://localhost:${porta}/`)
})

const connectionStringMongo = "mongodb+srv://guilherme:wfwzhzdOG66WSbj9@cluster0.pz8muqt.mongodb.net/?retryWrites=true&w=majority"

mongoose.Promise = Promise
mongoose.connect(connectionStringMongo)
mongoose.connection.on("error", (erro) => {
    console.log("Erro na conexão com o MongoDB - " + erro)
})

 app.use("/", router())