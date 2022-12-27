//import from package
const express = require('express');
const mongoose = require('mongoose');
const adminRouter = require('./routes/admin');

//import from other file
const authRouter = require('./routes/auth');
const productRouter = require('./routes/product');
const userRouter = require('./routes/user');

//init
const PORT = 3000;
const app = express();
const db = process.env.MONGODB_URI || `mongodb+srv://khoib1910395:b1910395@mezone.4f2yj.mongodb.net/?retryWrites=true&w=majority`

//middleware
app.use(express.json());
app.use(authRouter);
app.use(adminRouter);
app.use(productRouter);
app.use(userRouter);



//connection
mongoose.connect(db).then(() => {
    console.log('Connection Successful')
}).catch(e => {
    console.log(e);
})

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Connected at port: ${PORT}`);  //localhost:3000
})
