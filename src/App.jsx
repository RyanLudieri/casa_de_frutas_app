import { useEffect, useState, useCallback } from 'react';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import { getAllProducts, createProduct, updateProduct, deleteProduct, searchProducts } from './services/api';

const App = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  // Estados para filtros
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [minPriceFilter, setMinPriceFilter] = useState('');
  const [maxPriceFilter, setMaxPriceFilter] = useState('');

  // Função de busca memoizada com useCallback
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

  // useEffect que chama fetchProducts sempre que fetchProducts (ou filtros) mudam
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

  // Atualiza filtros e já dispara nova busca via useEffect (que depende dos filtros)
  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleTypeFilterChange = (e) => {
    setTypeFilter(e.target.value);
  };
  const handleMinPriceChange = (e) => {
    setMinPriceFilter(e.target.value);
  };
  const handleMaxPriceChange = (e) => {
    setMaxPriceFilter(e.target.value);
  };

  return (
    <div>
      <h1>🍍 Casa de Frutas do Tiaozinho</h1>

      {/* Filtros */}
      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Buscar produto por nome..."
          value={searchTerm}
          onChange={handleSearchTermChange}
          style={{ marginRight: '0.5rem', padding: '0.5rem', width: '200px' }}
        />
        <select value={typeFilter} onChange={handleTypeFilterChange} style={{ marginRight: '0.5rem', padding: '0.5rem' }}>
          <option value="">Todos os tipos</option>
          <option value="FRUTA">FRUTA</option>
          <option value="VERDURA">VERDURA</option>
          <option value="LEGUME">LEGUME</option>
        </select>
        <input
          type="number"
          placeholder="Preço mínimo"
          value={minPriceFilter}
          onChange={handleMinPriceChange}
          style={{ marginRight: '0.5rem', padding: '0.5rem', width: '120px' }}
        />
        <input
          type="number"
          placeholder="Preço máximo"
          value={maxPriceFilter}
          onChange={handleMaxPriceChange}
          style={{ marginRight: '0.5rem', padding: '0.5rem', width: '120px' }}
        />
      </div>

      <ProductForm onSubmit={handleSubmit} editingProduct={editingProduct} />
      <ProductList products={products} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default App;
