import "./styles.css";
import ProductCategory from "../ProductCategory";
import type { ProductDTO } from "../../models/product";

type Props = {
  product: ProductDTO;
};

export default function ProductDetailsCard({ product }: Props) {
  return (
    <div className="dsc-card mb20">
      <div className="dsc-product-details-top dsc-line-bottom">
        <img src={product.imgUrl} alt={product.name} />
      </div>
      <div className="dsc-product-details-bottom">
        <h3>{product.price.toFixed()}</h3>
        <h4>{product.name}</h4>
        <p>{product.description}</p>
        <div className="dsc-category-container">
          {
          product.categories.map((item) => (
            <ProductCategory key={item.id} name={item.name} />
          ))
          }
        </div>
      </div>
    </div>
  );
}
