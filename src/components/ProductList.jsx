
const ProductList = ({ products, onEdit, onDelete }) => (
  <div>
    <h2>Produtos Cadastrados</h2>
    <ul>
      {products.map(product => (
        <li key={product.id}>
          <strong>{product.name}</strong> - R$ {product.price?.toFixed(2)} - Tipo: {product.type}
          <button onClick={() => onEdit(product)}>Editar</button>
          <button onClick={() => onDelete(product.id)}>Deletar</button>
        </li>
      ))}
    </ul>
  </div>
);

export default ProductList;
