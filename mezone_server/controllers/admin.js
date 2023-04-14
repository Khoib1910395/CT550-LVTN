
exports.addProduct = async (req, res) => {
    try {
        const { name, description, images, quantity, quality, price, category } = req.body;
        let product = new Product({
            name,
            description,
            images,
            quantity,
            quality,
            price,
            category,
        });
        product = await product.save();
        res.json(product);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}