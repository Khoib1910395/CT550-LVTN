const express = require('express');
const mongoose = require('mongoose');

mongoose.set('strictQuery', true);
const cors = require('cors');
const socketio = require('./socket');
const { createServer } = require('http');
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./documentation/swaggerSetup');

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const adminRouter = require('./routes/admin');
const authRouter = require('./routes/auth');
const productRouter = require('./routes/product');
const userRouter = require('./routes/user');
const adRouter = require('./routes/ad');
const bidRouter = require('./routes/bid');
const roomRouter = require('./routes/room');

const PORT = 3030;
const app = express();
const db = process.env.MONGODB_URI || `mongodb+srv://khoib1910395:b1910395@mezone.4f2yj.mongodb.net/?retryWrites=true&w=majority`

const server = createServer(app);
const io = socketio.init(server);
const adIo = socketio.initAdIo(server, '/socket/adpage');

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

app.use(express.json());
app.use(authRouter);
app.use(adminRouter);
app.use(productRouter);
app.use(userRouter);
app.use(adRouter);
app.use(bidRouter);
app.use(roomRouter);
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

io.on('connection', (socket) => {
    // console.log('Socket IO client connected');
    socket.on('disconnect', (reason) => {
        // console.log('Socket IO client disconnected');
    });
    socket.on('leaveHome', () => {
        socket.disconnect();
    });
});

adIo.on('connect', (socket) => {
    socket.on('joinAd', ({ ad }) => {
        socket.join(ad.toString());
        console.log(`User joined room ${ad}`);
    });
    socket.on('leaveAd', ({ ad }) => {
        socket.leave(ad.toString());
        console.log(`Left room ${ad}`);
    });
    socket.on('disconnect', () => {
        console.log('User has disconnect from ad');
    });
});

mongoose.connect(db).then(() => {
    console.log('Connection to Database Successful')
}).catch(e => {
    console.log(e);
})

server.listen(PORT, "0.0.0.0", () => {
    console.log(`Connected at port: ${PORT}`);  
})
