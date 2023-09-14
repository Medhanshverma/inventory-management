// pages/api/orders.js
import Product from '../../models/Product';
import dbConnect from '../../utils/dbConnect';

dbConnect();

export default async (req, res) => {
  if (req.method === 'PATCH') {
    try {
      const { id, isApproved } = req.body;
      const product = await Product.findByIdAndUpdate(id, { isApproved }, { new: true });
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};
