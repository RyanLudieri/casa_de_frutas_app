import styles from './ProductList.module.css';

const ProductList = ({ products, onEdit, onDelete }) => (
  <div>
    <ul className={styles.list}>
      {products.map(product => (
        <li key={product.id} className={styles.listItem}>
          <div className={styles.productInfo}>
            <strong className={styles.productName}>{product.name}</strong>
            <strong className={styles.productPrice}>
              R$ {product.price?.toFixed(2)} 
            </strong>
            <span className={styles.productType}>{product.type}</span>
          </div>
          <div className={styles.actions}>
            <button className={styles.btnEdit} onClick={() => onEdit(product)}>Editar</button>
            <button className={styles.btnDelete} onClick={() => onDelete(product.id)}>Deletar</button>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export default ProductList;
