// pages/vendor.js
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Vendor() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch orders from the API when the component mounts
    const fetchOrders = async () => {
      try {
        const response = await axios.get('/api/products');
        setOrders(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchOrders();
  }, []);

  const handleApproval = async (id, isApproved) => {
    try {
      await axios.patch('/api/orders', { id, isApproved });
      // Update the UI to reflect the change
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === id ? { ...order, isApproved } : order
        )
      );
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div bg-gray-200 flex-column gap-2>
      <h1 className='text-lg text-center py-4 text-blue-500'>Vendor Page</h1>
      <table class="min-w-full text-center text-sm font-light">
        <thead class="border-b font-medium dark:border-neutral-500">
          <tr>
            <th>Product Name</th>
            <th>Amount</th>
            <th>Is Approved</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order.name}</td>
              <td>{order.price}</td>
              <td>{order.isApproved ? 'Approved' : 'Not Approved'}</td>
              <td>
                <button
                  className='bg-green-500 text-white px-2 py-1 rounded-md '
                  onClick={() => handleApproval(order._id, true)}
                  disabled={order.isApproved}
                >
                  Approve
                </button>
                <button
                  className='bg-red-500 text-white px-2 py-1 rounded-md'
                  onClick={() => handleApproval(order._id, false)}
                  disabled={!order.isApproved}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
