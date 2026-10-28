import ItemCard from "./ItemCard";

function MenuList({ items, favorites, toggleFavorite }) {
  if (items.length === 0) {
    return <p>No menu items found.</p>;
  }

  return (
    <div className="menu-grid">
      {items.map((item) => (
        <ItemCard
          key={item.id}
          item={item}
          isFavorite={favorites.includes(item.id)}
          toggleFavorite={() => toggleFavorite(item.id)}
        />
      ))}
    </div>
  );
}

export default MenuList;