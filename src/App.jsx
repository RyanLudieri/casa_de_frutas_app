import { useEffect, useState, useCallback } from 'react';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import { getAllProducts, createProduct, updateProduct, deleteProduct, searchProducts } from './services/api';

// Import CSS módulo se quiser estilizar filtros e container
import styles from './App.module.css';  // Vou sugerir o CSS abaixo para este módulo

const App = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [minPriceFilter, setMinPriceFilter] = useState('');
  const [maxPriceFilter, setMaxPriceFilter] = useState('');

  const fetchProducts = useCallback(async () => {
    if (searchTerm || typeFilter || minPriceFilter || maxPriceFilter) {
      const res = await searchProducts({ 
        name: searchTerm, 
        type: typeFilter, 
        minPrice: minPriceFilter, 
        maxPrice: maxPriceFilter 
      });
      setProducts(res.data);
    } else {
      const res = await getAllProducts();
      setProducts(res.data);
    }
  }, [searchTerm, typeFilter, minPriceFilter, maxPriceFilter]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleSubmit = async (product) => {
    if (product.id) {
      await updateProduct(product.id, product);
    } else {
      await createProduct(product);
    }
    setEditingProduct(null);
    fetchProducts();
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
    fetchProducts();
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🍍 Casa de Frutas do Tiaozinho</h1>

      <h2 className={styles.sectionTitle}>Adicionar produtos</h2>
      <ProductForm onSubmit={handleSubmit} editingProduct={editingProduct} />

      <h2 className={styles.sectionTitle}>Produtos Cadastrados</h2>

      <div className={styles.filters}>
        <h3>Filtros</h3>
        <select
          value={typeFilter}
          onChange={e => setTypeFilter(e.target.value)}
          className={styles.filterInput}
        >
          <option value="">Todos os tipos</option>
          <option value="FRUTA">FRUTA</option>
          <option value="VERDURA">VERDURA</option>
          <option value="LEGUME">LEGUME</option>
        </select>
        <input
          type="number"
          placeholder="Preço mínimo"
          value={minPriceFilter}
          onChange={e => setMinPriceFilter(e.target.value)}
          className={styles.filterInput}
        />
        <input
          type="number"
          placeholder="Preço máximo"
          value={maxPriceFilter}
          onChange={e => setMaxPriceFilter(e.target.value)}
          className={styles.filterInput}
        />
      </div>

      <h2>Busca de Produtos</h2>
      <input
          type="text"
          placeholder="Buscar produto por nome..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className={styles.nameSearch}
        />

      <ProductList products={products} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default App;
