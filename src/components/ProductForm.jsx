import { useState, useEffect } from 'react';
import styles from './ProductForm.module.css';

const ProductForm = ({ onSubmit, editingProduct }) => {
  const [product, setProduct] = useState({ name: '', price: '', type: 'FRUTA' });

  useEffect(() => {
    if (editingProduct) {
      const validTypes = ['FRUTA', 'VERDURA', 'LEGUME'];
      const safeType = validTypes.includes(editingProduct.type) ? editingProduct.type : 'FRUTA';
      setProduct({
        ...editingProduct,
        type: safeType,
      });
    }
  }, [editingProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(product);
    setProduct({ name: '', price: '', type: 'FRUTA' });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        name="name"
        value={product.name}
        onChange={handleChange}
        placeholder="Nome do produto"
        required
        className={styles.inputText}
      />
      <input
        name="price"
        value={product.price}
        onChange={handleChange}
        placeholder="Preço"
        type="number"
        required
        className={styles.inputText}
      />
      <select
        name="type"
        value={product.type}
        onChange={handleChange}
        className={styles.inputText}
      >
        <option value="FRUTA">Fruta</option>
        <option value="VERDURA">Verdura</option>
        <option value="LEGUME">Legume</option>
      </select>
      <button type="submit" className={styles.btnPrimary}>
        {product.id ? 'Atualizar' : 'Adicionar'}
      </button>
    </form>
  );
};

export default ProductForm;
