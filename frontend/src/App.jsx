import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductForm from '../src/components/ProductForm';
import ProductList from './components/ProductList';
import Login from './components/Login';  // Assuming you have the login page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/product-form" element={<ProductForm />} />
        <Route path="/product-form/:id" element={<ProductForm />} /> {/* For editing a product */}
        <Route path="/product-list" element={<ProductList />} />
      </Routes>
    </Router>
  );
}

export default App;
