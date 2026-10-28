import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParams,
} from "react-router-dom";

import { CartProvider, useCart } from "./context/CartContext";
import MenuList from "./components/MenuList";
import Cart from "./components/Cart";
import "./App.css";

function Header() {
  const { cartCount } = useCart();

  return (
    <header className="header">
      <Link to="/" className="logo">
        🍔 Campus Canteen
      </Link>

      <nav>
        <Link to="/">Menu</Link>
        <Link to="/cart">🛒 Cart ({cartCount})</Link>
      </nav>
    </header>
  );
}

function MenuPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    async function loadMenu() {
      try {
        const response = await fetch("/menu.json");

        if (!response.ok) {
          throw new Error("Could not load menu.");
        }

        const data = await response.json();
        setItems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadMenu();
  }, []);

  function toggleFavorite(id) {
    setFavorites((prev) =>
      prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id]
    );
  }

  const categories = [
    "All",
    ...new Set(items.map((item) => item.category)),
  ];

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || item.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <main className="page">
      <section className="hero">
        <h1>Today's Campus Menu 🍕</h1>
        <p>Fresh food, affordable prices!</p>
      </section>

      <div className="filters">
        <input
          type="text"
          placeholder="Search food..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {loading && <p>Loading menu...</p>}

      {error && <p className="error">Error: {error}</p>}

      {!loading && !error && (
        <MenuList
          items={filteredItems}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
        />
      )}
    </main>
  );
}

function ItemDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadItem() {
      try {
        const response = await fetch("/menu.json");

        if (!response.ok) {
          throw new Error("Could not load item details.");
        }

        const data = await response.json();
        const selectedItem = data.find(
          (food) => food.id === Number(id)
        );

        if (!selectedItem) {
          throw new Error("Item not found.");
        }

        setItem(selectedItem);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadItem();
  }, [id]);

  if (loading) {
    return <main className="page">Loading item...</main>;
  }

  if (error) {
    return <main className="page error">{error}</main>;
  }

  return (
    <main className="page details-page">
      <img src={item.image} alt={item.name} />

      <div>
        <h1>{item.name}</h1>
        <p>Category: {item.category}</p>
        <p>{item.description}</p>
        <h2>Rs. {item.price}</h2>

        <button onClick={() => addToCart(item)}>
          Add to Cart 🛒
        </button>

        <p>
          <Link to="/">← Back to Menu</Link>
        </p>
      </div>
    </main>
  );
}

function AppContent() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<MenuPage />} />
        <Route path="/item/:id" element={<ItemDetails />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>

      <footer className="footer">
        Campus Canteen Menu | Student Project
      </footer>
    </>
  );
}

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;