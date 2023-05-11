const express = require("express");
const userRouter = express.Router();
const auth = require("../middlewares/auth");
const Order = require("../models/order");
const { Product } = require("../models/product");
const User = require("../models/user");
const Request = require("../models/Request")
const userController = require('../controllers/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

userRouter.post("/api/add-to-cart", auth, async (req, res) => {
  try {
    const { id } = req.body;
    const product = await Product.findById(id);
    let user = await User.findById(req.user);

    if (user.cart.length == 0) {
      user.cart.push({ product, quantity: 1 });
    } else {
      let isProductFound = false;
      for (let i = 0; i < user.cart.length; i++) {
        if (user.cart[i].product._id.equals(product._id)) {
          isProductFound = true;
        }
      }
      if (isProductFound) {
        let product_1 = user.cart.find((product_2) =>
          product_2.product._id.equals(product._id)
        );
        product_1.quantity += 1;
      } else {
        user.cart.push({ product, quantity: 1 });
      }
    }
    user = await user.save();
    res.json(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

userRouter.delete("/api/remove-from-cart/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    let user = await User.findById(req.user);

    for (let i = 0; i < user.cart.length; i++) {
      if (user.cart[i].product._id.equals(product._id)) {
        if (user.cart[i].quantity == 1) {
          user.cart.splice(i, 1);
        } else {
          user.cart[i].quantity--;
        }
      }
    }
    user = await user.save();
    res.json(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

userRouter.delete("/api/delete-from-cart/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    let user = await User.findById(req.user);

    user.cart = user.cart.filter((item) => !item.product._id.equals(product._id));

    user = await user.save();
    res.json(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});


// save user address
userRouter.post("/api/save-user-address", auth, async (req, res) => {
  try {
    const { address } = req.body;
    let user = await User.findById(req.user);
    user.address = address;
    user = await user.save();
    res.json(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// order product
userRouter.post("/api/order", auth, async (req, res) => {
  try {
    const { cart, totalPrice, address } = req.body;
    let products = [];

    for (let i = 0; i < cart.length; i++) {
      let product = await Product.findById(cart[i].product._id);
      if (product.quantity >= cart[i].quantity) {
        product.quantity -= cart[i].quantity;
        products.push({ product, quantity: cart[i].quantity });
        await product.save();
      } else {
        return res
          .status(400)
          .json({ msg: `${product.name} is out of stock!` });
      }
    }

    let user = await User.findById(req.user);
    userName = user.name
    user.cart = [];
    user = await user.save();

    let order = new Order({
      products,
      totalPrice,
      address,
      userId: req.user,
      userName, 
      orderedAt: new Date().getTime(),
    });
    order = await order.save();
    res.json(order);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

userRouter.get("/api/orders/me", auth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user });
    res.json(orders);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

userRouter.get("/api/orders/:id", async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findOne({ _id: orderId });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

userRouter.get('/api/users/:id', async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    res.send(user);
  }
  else {
    res.status(404).send({
      message: 'User not found'
    })
  }
});

userRouter.put('/api/profile', auth, async (req, res) => {

  const generateToken = (user) => {
    return jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET || 'passwordKey',
      {
        expiresIn: '30d',
      }
    );
  };

  try {
    const user = await User.findById(req.user);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      };
      phone = user.phone;
      address = user.address;
      type = user.type;
      cart = user.cart;
      purchasedProducts = user.purchasedProducts;
      postedAds = user.postedAds;
      bids = user.bids;
      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        address: updatedUser.address,
        type: updatedUser.type,
        cart: updatedUser.cart,
        purchasedProducts: updatedUser.purchasedProducts,
        postedAds: updatedUser.postedAds,
        bids: updatedUser.bids,
        token: generateToken(updatedUser),
      });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

userRouter.post('/api/requests', auth, async (req, res) => {
  const { user, order, information } = req.body;

  // Kiểm tra các trường bắt buộc
  if (!user || !order ) {
    return res.status(400).json({ message: 'Please enter all required information' });
  }

  // Kiểm tra xem orderId có tồn tại trong cơ sở dữ liệu không
  try {
    const foundOrder = await Order.findById(order);
    if (!foundOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error finding order' });
  }

  // Tạo yêu cầu hoàn hàng mới
  try {
    const request = new Request({
      user,
      order,
      information,
    });

    await request.save();
    res.status(201).json({ message: 'Create request success' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error creating request' });
  }
});

userRouter.get('/api/requests', auth, async (req, res) => {
  try {
    const requests = await Request.find();
    res.status(200).json(requests);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error getting requests' });
  }
});



// @route   GET /user/purchased
// @desc    Get products purchased by user
// @access  protected
userRouter.get('/products/purchased', auth, userController.purchasedProducts);

// @route   GET /user/posted
// @desc    Get product ads posted by user
// @access  protected
userRouter.get('/products/posted', auth, userController.postedProducts);

module.exports = userRouter;
