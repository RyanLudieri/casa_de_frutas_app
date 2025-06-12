// src/pages/Home.jsx
import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductList from '../components/ProductList';
import { getAllProducts, deleteProduct, searchProducts } from '../services/api';
import styles from './Home.module.css';
import { FiFilter } from 'react-icons/fi';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [minPriceFilter, setMinPriceFilter] = useState('');
  const [maxPriceFilter, setMaxPriceFilter] = useState('');
  const navigate = useNavigate(); // ✅ Adicionado

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

  const handleDelete = async (id) => {
    await deleteProduct(id);
    fetchProducts();
  };

  const handleEdit = (product) => {
    navigate('/register', { state: { editingProduct: product } }); // ✅ Editar redireciona
  };

  return (
    <div className={styles.container}>
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

export default Home;
