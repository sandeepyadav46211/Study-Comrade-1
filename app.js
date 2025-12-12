const { useState, createContext, useContext } = React;

/* ---------------- GLOBAL CONTEXT ------------------ */
const AppContext = createContext();

function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  
  const products = [
    { id: 1, name: "Mobile", price: 12000 },
    { id: 2, name: "Laptop", price: 45000 },
    { id: 3, name: "Earphones", price: 999 },
  ];

  const login = (name) => setUser(name);
  const logout = () => setUser(null);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((p) => p.id !== id));
  };

  return (
    <AppContext.Provider value={{ user, login, logout, products, cart, addToCart, removeFromCart }}>
      {children}
    </AppContext.Provider>
  );
}

const useApp = () => useContext(AppContext);

/* ---------------- LOGIN PAGE ------------------ */
function LoginPage() {
  const { login } = useApp();
  const [name, setName] = useState("");

  return (
    <div className="container">
      <h2>Login / Register</h2>
      <input 
        type="text" 
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br/><br/>
      <button onClick={() => login(name)}>Continue</button>
    </div>
  );
}

/* ---------------- PRODUCT LIST ------------------ */
function ProductPage() {
  const { products, addToCart } = useApp();

  return (
    <div className="container">
      <h2>Products</h2>
      <div className="products">
        {products.map((p) => (
          <div className="product-card" key={p.id}>
            <h3>{p.name}</h3>
            <p>₹ {p.price}</p>
            <button onClick={() => addToCart(p)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- CART PAGE ------------------ */
function CartPage() {
  const { cart, removeFromCart } = useApp();

  return (
    <div className="container">
      <h2>Your Cart</h2>
      <div className="cart">
        {cart.length === 0 ? (
          <p>No items in cart</p>
        ) : (
          cart.map((c) => (
            <div key={c.id}>
              <p>{c.name} — ₹{c.price}</p>
              <button onClick={() => removeFromCart(c.id)}>
                Remove
              </button>
              <hr />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

/* ---------------- MAIN APP ------------------ */
function App() {
  const { user, cart } = useApp();
  const [page, setPage] = useState("products");

  if (!user) return <LoginPage />;

  return (
    <>
      <nav>
        Flipkart Clone | Hello {user}  
        <span style={{ float: "right" }}>Cart: {cart.length}</span>
      </nav>

      <div style={{ margin: "20px" }}>
        <button onClick={() => setPage("products")}>Products</button>
        <button onClick={() => setPage("cart")}>Cart</button>
      </div>

      {page === "products" && <ProductPage />}
      {page === "cart" && <CartPage />}
    </>
  );
}

/* ---------------- RENDER ------------------ */
ReactDOM.createRoot(document.getElementById("root")).render(
  <AppProvider>
    <App />
  </AppProvider>
);