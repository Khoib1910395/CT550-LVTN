//import from package
const express = require('express');
const mongoose = require('mongoose');
const adminRouter = require('./routes/admin');
mongoose.set('strictQuery', true);
const cors = require('cors');

//import from other file
const authRouter = require('./routes/auth');
const productRouter = require('./routes/product');
const userRouter = require('./routes/user');

//init
const PORT = 3030;
const app = express();
const db = process.env.MONGODB_URI || `mongodb+srv://khoib1910395:b1910395@mezone.4f2yj.mongodb.net/?retryWrites=true&w=majority`

//middleware
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }));  
app.use(express.json());
app.use(authRouter);
app.use(adminRouter);
app.use(productRouter);
app.use(userRouter);
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());


//connection
mongoose.connect(db).then(() => {
    console.log('Connection Successful')
}).catch(e => {
    console.log(e);
})

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Connected at port: ${PORT}`);  //localhost:3000
})

