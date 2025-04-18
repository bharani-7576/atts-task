import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ProductList() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();  // Used to navigate to the ProductForm for editing

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:5000/api/products', {
          headers: { 'Authorization': token }
        });
        setProducts(response.data);
      } catch (err) {
        console.error('Error fetching products', err);
      }
    };

    fetchProducts();
  }, []);

  // Navigate to ProductForm for editing
  const handleEdit = (productId) => {
    navigate(`/product-form/${productId}`);
  };

  // Handle deleting a product
  const handleDelete = async (productId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5000/api/products/${productId}`, {
        headers: { 'Authorization': token }
      });
      alert('Product deleted!');
      setProducts(products.filter(product => product._id !== productId));  // Update the UI
    } catch (err) {
      console.error('Error deleting product', err);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Product List</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.stock}</td>
              <td>{product.category}</td>
              <td>
                <button className="btn btn-warning" onClick={() => handleEdit(product._id)}>Edit</button>
                <button className="btn btn-danger ml-2" onClick={() => handleDelete(product._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;
