// src/pages/Register.jsx
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { createProduct, updateProduct } from '../services/api';
import ProductForm from '../components/ProductForm';
import styles from './Register.module.css';

const Register = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const editingProduct = location.state?.editingProduct;

  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (product) => {
    if (product.id) {
      await updateProduct(product.id, product);
      setSuccessMessage('Produto atualizado com sucesso!');
    } else {
      await createProduct(product);
      setSuccessMessage('Produto cadastrado com sucesso!');
    }

    setTimeout(() => {
      setSuccessMessage('');
      navigate('/');
    }, 1500);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.sectionTitle}>Cadastrar Produtos</h2>

      {successMessage && (
        <div className={styles.successMessage}>{successMessage}</div>
      )}

      <ProductForm onSubmit={handleSubmit} editingProduct={editingProduct} />
    </div>
  );
};

export default Register;
