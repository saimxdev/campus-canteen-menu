import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function ItemCard({ item, isFavorite, toggleFavorite }) {
  const { addToCart } = useCart();

  return (
    <div className="item-card">
      <img src={item.image} alt={item.name} />

      <div className="item-info">
        <h3>{item.name}</h3>
        <p>{item.category}</p>
        <h4>Rs. {item.price}</h4>

        <button onClick={toggleFavorite}>
          {isFavorite ? "❤️ Favourite" : "🤍 Favourite"}
        </button>

        <Link to={`/item/${item.id}`} className="details-link">
          View Details
        </Link>

        <button onClick={() => addToCart(item)}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ItemCard;