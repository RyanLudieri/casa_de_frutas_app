import { useEffect, useState, useCallback } from 'react';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import { getAllProducts, createProduct, updateProduct, deleteProduct, searchProducts } from './services/api';

import styles from './App.module.css';
import { FiFilter } from 'react-icons/fi';

import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import NavBar from './components/NavBar';

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

      <BrowserRouter>
        <NavBar/>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
        </Routes>
      </BrowserRouter>

      <h2 className={styles.sectionTitle}>Cadastrar Produtos</h2>
      <ProductForm onSubmit={handleSubmit} editingProduct={editingProduct} />

      <h2 className={styles.sectionTitle}>Produtos Cadastrados</h2>

      <div className={styles.filterContainer}>
        <h3 className={styles.filterTitle}><FiFilter /> Filtros</h3>
        <div className={styles.filters}>
          <select
            value={typeFilter}
            onChange={e => setTypeFilter(e.target.value)}
            className={styles.filterInput}
          >
            <option value="">Todos os tipos</option>
            <option value="FRUTA">Fruta</option>
            <option value="VERDURA">Verdura</option>
            <option value="LEGUME">Legume</option>
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
      </div>

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
