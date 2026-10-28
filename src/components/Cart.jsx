import { useCart } from "../context/CartContext";

function Cart() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    cartTotal,
  } = useCart();

  if (cart.length === 0) {
    return (
      <div className="page">
        <h2>Your Cart 🛒</h2>
        <p>Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="page">
      <h2>Your Cart 🛒</h2>

      {cart.map((item) => (
        <div className="cart-item" key={item.id}>
          <div>
            <h3>{item.name}</h3>
            <p>Rs. {item.price} each</p>
            <p>
              Subtotal: Rs. {item.price * item.quantity}
            </p>
          </div>

          <div className="quantity-controls">
            <button
              onClick={() =>
                updateQuantity(item.id, item.quantity - 1)
              }
              disabled={item.quantity === 1}
            >
              -
            </button>

            <span>{item.quantity}</span>

            <button
              onClick={() =>
                updateQuantity(item.id, item.quantity + 1)
              }
            >
              +
            </button>
          </div>

          <button onClick={() => removeFromCart(item.id)}>
            Remove
          </button>
        </div>
      ))}

      <h2>Total: Rs. {cartTotal}</h2>
    </div>
  );
}

export default Cart;