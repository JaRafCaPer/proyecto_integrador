import express from 'express'
import handlebars from 'express-handlebars'
import { Server } from 'socket.io'
import mongoose from 'mongoose'
import productRouter from './routes/product.router.js'
import cartRouter from './routes/cart.router.js'
import viewsRouter from './routes/views.router.js'
import __dirname from './utils.js'
import MessageModel from "../src/DAO/mongoManager/models/message.model.js"

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')


app.use('/', viewsRouter)
app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)

const runServer = () => {
    const httpServer = app.listen(8080, () => console.log('Listening...'))
    const io = new Server(httpServer)

    io.on("connection", (socket) => {
        console.log("Nuevo cliente conectado");

        socket.on("new-message", async (data) => {
            try {
                const { user, message } = data;
                const newMessage = { user, message };
                await MessageModel.create(newMessage);
            } catch (error) {
                console.error("Error al guardar el mensaje:", error);
            }

            io.emit("message-received", data);
        });

        socket.on("disconnect", () => {
            console.log("Cliente desconectado");
        });
    });
}

console.log('Connecting...')
mongoose.connect('mongodb+srv://caballeroperezjavier:prueba2023@ecommerce.0mdas1z.mongodb.net/', {
    dbName: 'ecommerce'
})
    .then(() => {
        console.log('DB connected!!')
        runServer()
    })
    .catch(e => console.log(`Can't connect to DB`))




