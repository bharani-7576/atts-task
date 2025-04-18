import { useState } from 'react';

function ProductForm() {
  const [formData, setFormData] = useState({
    name: '', price: '', stock: '', description: '',
    category: '', manufacturingDate: '', image: null
  });

  const [productList, setProductList] = useState([]);  // Store the product list temporarily
  const [editingIndex, setEditingIndex] = useState(null);  // Keep track of the product being edited

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) setFormData({ ...formData, image: files[0] });
    else setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // If editing an existing product, update the product in the list
    if (editingIndex !== null) {
      const updatedList = [...productList];
      updatedList[editingIndex] = formData;
      setProductList(updatedList);
      setEditingIndex(null);
    } else {
      // Add a new product to the list
      setProductList([...productList, formData]);
    }

    // Clear form data after submitting
    setFormData({
      name: '', price: '', stock: '', description: '',
      category: '', manufacturingDate: '', image: null
    });
  };

  const handleDelete = (index) => {
    const updatedList = productList.filter((_, i) => i !== index);
    setProductList(updatedList);
  };

  const handleEdit = (index) => {
    const productToEdit = productList[index];
    setFormData(productToEdit);
    setEditingIndex(index);  // Mark this product as being edited
  };

  return (
    <div className="container mt-5">
      <h2>{editingIndex !== null ? 'Edit Product' : 'Add Product'}</h2>
      <form onSubmit={handleSubmit}>
        {['name', 'price', 'stock', 'description', 'category', 'manufacturingDate'].map(field => (
          <div className="mb-3" key={field}>
            <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            <input
              type={field === 'manufacturingDate' ? 'date' : 'text'}
              className="form-control"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <div className="mb-3">
          <label>Image</label>
          <input
            type="file"
            className="form-control"
            name="image"
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {editingIndex !== null ? 'Update' : 'Add'}
        </button>
      </form>

      <h3 className="mt-5">Product List</h3>
      {productList.length > 0 && (
        <table className="table mt-3">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Category</th>
              <th>Manufacturing Date</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {productList.map((product, index) => (
              <tr key={index}>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.stock}</td>
                <td>{product.category}</td>
                <td>{product.manufacturingDate}</td>
                <td>
                  {product.image ? (
                    <img src={URL.createObjectURL(product.image)} alt="Product" style={{ width: '50px', height: '50px' }} />
                  ) : 'No image'}
                </td>
                <td>
                  <button className="btn btn-warning" onClick={() => handleEdit(index)}>Edit</button>
                  <button className="btn btn-danger ml-2" onClick={() => handleDelete(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ProductForm;
