// pages/client.js
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Client() {
  const [products, setProducts] = useState([]);
  const [orderDetails, setOrderDetails] = useState({
    name: '',
    price: 0,
  });

  const handleChange = (e) => {
    setOrderDetails({
      ...orderDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/products', orderDetails);
      console.log('Order submitted:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className='bg-gray-200 flex-column gap-2'>
      <h1
      className='text-lg text-center py-4 text-blue-500'
      >Client Page</h1>
      <form 
      onSubmit={handleSubmit}
      className='flex-column gap-2'
      >
        <input
        className='border-2 rounded-md'
          type="text"
          name="name"
          placeholder="Product Name"
          onChange={handleChange}
        />
        <input
        className='border-2 rounded-md'
          type="number"
          name="price"
          placeholder="price"
          onChange={handleChange}
        />
        <button type="submit"
        className='border-2 rounded-md bg-blue-500 text-white'
        >Order</button>
      </form>
      <div className='bg-blue-500'>
      <h2 
      className=' text-white '
      >
        Available Products:
      </h2>
      <ul
      className=' text-white'
      >
        {products.map((product) => (
          <li key={product._id}>
            {product.name} - {product.price}
          </li>
        ))}
      </ul>
      </div>
      
    </div>
  );
}

