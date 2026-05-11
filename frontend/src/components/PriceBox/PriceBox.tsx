import "./PriceBox.css";

type PriceBoxProps = {
  price: number;
  oldPrice?: number;
};

export default function PriceBox({ price, oldPrice }: PriceBoxProps) {
  const hasDiscount = Number(oldPrice) > Number(price);

  return (
    <div className="price-box">
      <strong className="price-current">
        {price.toLocaleString("ro-RO")}€
      </strong>

      {hasDiscount && oldPrice && (
        <span className="price-old">{oldPrice.toLocaleString("ro-RO")}€</span>
      )}
    </div>
  );
}
