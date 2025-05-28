import { useState, useEffect } from 'react';

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
    <form onSubmit={handleSubmit}>
      <input name="name" value={product.name} onChange={handleChange} placeholder="Nome do produto" required />
      <input name="price" value={product.price} onChange={handleChange} placeholder="Preço" type="number" step="0.01" required />
      <select name="type" value={product.type} onChange={handleChange}>
        <option value="FRUTA">FRUTA</option>
        <option value="VERDURA">VERDURA</option>
        <option value="LEGUME">LEGUME</option>
      </select>
      <button type="submit">{product.id ? 'Atualizar' : 'Adicionar'}</button>
    </form>
  );
};

export default ProductForm;
