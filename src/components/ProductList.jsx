import styles from './ProductList.module.css';

const ProductList = ({ products, onEdit, onDelete }) => (
  <div>
    <ul className={styles.list}>
      {products.map(product => (
        <li key={product.id} className={styles.listItem}>
          <div className={styles.productInfo}>
            <strong>{product.name}</strong>
            <span className={styles.productDetails}>
              {' Preço: '}R$ {product.price?.toFixed(2)} {product.type}
            </span>
          </div>
          <div>
            <button className={styles.btnEdit} onClick={() => onEdit(product)}>Editar</button>
            <button className={styles.btnDelete} onClick={() => onDelete(product.id)}>Deletar</button>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export default ProductList;
