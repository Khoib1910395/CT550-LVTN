const express = require("express");
const productRouter = express.Router();
const auth = require("../middlewares/auth");
const { Product } = require("../models/product");

productRouter.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

productRouter.get("/api/categoryProducts/", async (req, res) => {
  try {
    const products = await Product.find(    
        { 
            category: req.query.category 
        }
    );
    res.json(products);
  } catch (e) {
    res.status(500).json(
        { 
            error: e.message 
        }
    );
  }
});

// create a get request to search products and get them
// /api/products/search/i
productRouter.get("/api/products/search/:name", async (req, res) => {
  try {
    const products = await Product.find({
      name: { 
        $regex: req.params.name, 
        $options: "i" 
      },
    });
    res.json(products);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

productRouter.get("/api/products/usedproducts", async (req, res) => {
  try {
    const products = await Product.find({ quality: { $lt: 100 } });
    res.json(products);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

productRouter.get('/api/products/:id', async(req,res) => {
  const product = await Product.findById(req.params.id);

  if(product){
      res.send(product);
  }
  else{
      res.status(404).send({message: "Product not found."});
  }
})

// create a post request route to rate the product.
productRouter.post("/api/rate-product", auth, async (req, res) => {
  try {
    const { id, rating } = req.body;
    let product = await Product.findById(id);

    for (let i = 0; i < product.ratings.length; i++) {
      if (product.ratings[i].userId == req.user) {
        product.ratings.splice(i, 1);
        break;
      }
    }

    const ratingSchema = {
      userId: req.user,
      rating,
    };

    product.ratings.push(ratingSchema);
    product = await product.save();
    res.json(product);
    
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
    
productRouter.get("/api/deal-of-day", async (req, res) => {
  try {
    let products = await Product.find({});

    products = products.sort((a, b) => {
      let aSum = 0;
      let bSum = 0;

      for (let i = 0; i < a.ratings.length; i++) {
        aSum += a.ratings[i].rating;
      }

      for (let i = 0; i < b.ratings.length; i++) {
        bSum += b.ratings[i].rating;
      }
      return aSum < bSum ? 1 : -1;
    });

    res.json(products[0]);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// create a put request to update the product
productRouter.put("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description, category } = req.body;

    let product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;
    product.category = category || product.category;

    product = await product.save();

    res.json(product);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// create a put request to update the product
productRouter.put("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description, category } = req.body;

    let product = await Product.findByIdAndUpdate(
      id,
      { name, price, description, category },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = productRouter;
