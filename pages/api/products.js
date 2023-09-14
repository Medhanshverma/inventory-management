// pages/api/products.js
import Product from '../../models/Product';
import dbConnect from '../../utils/dbConnect';

dbConnect();

export default async (req, res) => {
  if (req.method === 'GET') {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'POST') {
    try {
      const { name, description, price, vendor } = req.body;
      const product = new Product({
        name,
        description,
        price,
        vendor,
        isApproved: false,
      });
      await product.save();
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};
