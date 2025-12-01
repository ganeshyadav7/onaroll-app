import { useState } from "react";

// ---- CONFIG / IMAGES ----
const HERO_IMAGE =
  "https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=1600&q=80"; // big breakfast
const CATEGORY_IMAGES = {
  breakfast:
    "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?auto=format&fit=crop&w=1200&q=80",
  indo:
    "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80",
  burgers:
    "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=80",
};

const TAX_RATE = 0.2; // 20% VAT – change if needed

// Your brother's WhatsApp number (country code, no +, no spaces)
// Example: UK mobile 07xxxxxxxxx -> "447xxxxxxxxx"
const WHATSAPP_NUMBER = "447123456789"; // TODO: put real number here

// ---- MENU DATA ----
const menuData = [
  {
    key: "breakfast",
    category: "All Day Main Breakfast",
    items: [
      {
        id: "small-breakfast",
        name: "Small Breakfast",
        price: 7.99,
        description:
          "1 bacon, 1 sausage, 1 egg, hash brown, beans, tomato, mushrooms and toast or fried bread.",
      },
      {
        id: "large-breakfast",
        name: "Large Breakfast",
        price: 10.99,
        description:
          "2 bacon, 2 sausages, 2 eggs, 2 hash browns, beans, tomato, mushrooms and 2 toast or fried bread.",
      },
      {
        id: "supreme-breakfast",
        name: "Supreme On A Roll Breakfast",
        price: 12.99,
        description:
          "3 bacon, 3 sausages, 3 eggs, 3 hash browns, beans, tomato, mushrooms and 3 toast or fried bread.",
      },
    ],
  },
  {
    key: "indo",
    category: "Indo Mexican Breakfast",
    items: [
      {
        id: "acapulco-meat",
        name: "Acapulco Breakfast Burrito (Meat)",
        price: 10.99,
        description:
          "Eggs, hash brown, bacon, chorizo, cheese and avocado in a tortilla with salsa and sour cream.",
      },
      {
        id: "acapulco-veggie",
        name: "Acapulco Breakfast Burrito (Veggie)",
        price: 10.99,
        description:
          "Eggs, hash brown, cheese and avocado in a tortilla with salsa and sour cream.",
      },
    ],
  },
  {
    key: "burgers",
    category: "Burgers & Grill",
    items: [
      {
        id: "argentinian-burger",
        name: "On A Roll Classic Argentinian Burger",
        price: 9.99,
        description:
          "8 oz beef burger with bacon, cheese, onion rings, burger relish and mayo.",
      },
      {
        id: "fried-chicken-burger",
        name: "Fried Chicken Burger",
        price: 8.99,
        description:
          "Crispy chicken with lettuce, tomato, cheese and tangy mayo.",
      },
    ],
  },
];

function App() {
  const [cart, setCart] = useState([]); // [{id, name, price, quantity}]

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === item.id);
      if (existing) {
        return prev.map((p) =>
          p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const changeQuantity = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(1, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    if (cart.length === 0) return;

    const lines = cart.map((item) => {
      const lineTotal = (item.price * item.quantity).toFixed(2);
      return `${item.quantity} x ${item.name} - £${lineTotal}`;
    });

    const message = [
      "New order from On A Roll app:",
      ...lines,
      "",
      `Subtotal: £${subtotal.toFixed(2)}`,
      `Tax: £${tax.toFixed(2)}`,
      `Total: £${total.toFixed(2)}`,
    ].join("\n");

    const encoded = encodeURIComponent(message);

    // Open WhatsApp chat with the order text
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`,
      "_blank"
    );
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg,#111 0%,#222 40%,#111 100%)",
        color: "#f5f5f5",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* NAVBAR */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "12px 24px",
          backgroundColor: "rgba(0,0,0,0.9)",
          position: "sticky",
          top: 0,
          zIndex: 20,
          backdropFilter: "blur(6px)",
        }}
      >
        <div style={{ fontWeight: "bold", letterSpacing: "0.08em" }}>
          ON A ROLL
        </div>
        <div style={{ display: "flex", gap: "18px" }}>
          <a href="#home" style={navLinkStyle}>
            Home
          </a>
          <a href="#menu" style={navLinkStyle}>
            Menu
          </a>
          <a href="#about" style={navLinkStyle}>
            About
          </a>
          <a href="#contact" style={navLinkStyle}>
            Contact
          </a>
          <a href="#cart" style={{ ...navLinkStyle, fontWeight: "bold" }}>
            Cart ({cartCount})
          </a>
        </div>
      </nav>

      {/* HERO */}
      <header
        id="home"
        style={{
          padding: "90px 16px 70px",
          textAlign: "center",
          backgroundImage: `linear-gradient(rgba(0,0,0,0.55),rgba(0,0,0,0.9)), url(${HERO_IMAGE})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1
          style={{
            fontSize: "2.6rem",
            marginBottom: "8px",
          }}
        >
          On A Roll Bristol
        </h1>
        <p style={{ fontSize: "1.1rem", opacity: 0.95 }}>
          Indo-Mexican flavours, all-day breakfasts & juicy burgers.
        </p>

        <a
          href="#menu"
          style={{
            marginTop: "20px",
            display: "inline-block",
            padding: "12px 22px",
            borderRadius: "999px",
            background: "#ff7f11",
            color: "#111",
            textDecoration: "none",
            fontWeight: 600,
            boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
          }}
        >
          Start Order
        </a>
      </header>

      <main
        style={{
          padding: "20px 16px 40px",
          maxWidth: "960px",
          margin: "0 auto",
        }}
      >
        {/* WELCOME */}
        <section style={{ marginBottom: "24px" }}>
          <h2>Welcome</h2>
          <p style={{ opacity: 0.9 }}>
            Choose your favourites from the colourful menu below and add them to
            your cart. This is a demo ordering flow – later we can connect it to
            a real payment or WhatsApp ordering system.
          </p>
        </section>

        {/* MENU */}
        <section id="menu" style={{ marginTop: "24px" }}>
          <h2>Menu</h2>

          {menuData.map((category) => {
            const banner = CATEGORY_IMAGES[category.key];
            return (
              <div
                key={category.category}
                style={{
                  marginTop: "24px",
                  backgroundColor: "rgba(0,0,0,0.4)",
                  borderRadius: "18px",
                  padding: "14px 14px 6px",
                }}
              >
                {banner && (
                  <img
                    src={banner}
                    alt={category.category}
                    style={{
                      width: "100%",
                      borderRadius: "14px",
                      maxHeight: "190px",
                      objectFit: "cover",
                      marginBottom: "10px",
                    }}
                  />
                )}

                <h3 style={{ marginLeft: "4px" }}>{category.category}</h3>

                {category.items.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      background: "#fff",
                      color: "#111",
                      borderRadius: "12px",
                      padding: "12px",
                      marginBottom: "10px",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontWeight: 600,
                          fontSize: "1.05rem",
                          marginBottom: "2px",
                        }}
                      >
                        {item.name}
                      </div>
                      <p
                        style={{
                          margin: 0,
                          fontSize: "0.85rem",
                          opacity: 0.8,
                        }}
                      >
                        {item.description}
                      </p>
                      <div
                        style={{
                          marginTop: "4px",
                          fontWeight: 700,
                          color: "#ff7f11",
                        }}
                      >
                        £{item.price.toFixed(2)}
                      </div>
                    </div>

                    <button
                      onClick={() => addToCart(item)}
                      style={addButtonStyle}
                    >
                      Add
                    </button>
                  </div>
                ))}
              </div>
            );
          })}
        </section>

        {/* ABOUT */}
        <section id="about" style={{ marginTop: "36px" }}>
          <h2>About Us</h2>
          <p style={{ opacity: 0.9 }}>
            On A Roll is a family-run cafe in Southmead, Bristol – serving
            classic English breakfasts, vibrant Indo-Mexican dishes and loaded
            burgers. All food is cooked fresh to order.
          </p>
        </section>

        {/* CONTACT */}
        <section id="contact" style={{ marginTop: "32px" }}>
          <h2>Find Us & Contact</h2>
          <p>Address: 3 Arnside Rd, Southmead, Bristol BS10 6AT</p>
          <p>Phone: (add your brother&apos;s number here)</p>
          <a
            href="https://maps.google.com/?q=On%20A%20Roll%20Bristol"
            target="_blank"
            rel="noreferrer"
            style={{
              display: "inline-block",
              marginTop: "8px",
              textDecoration: "underline",
              color: "#ffb347",
            }}
          >
            Open in Google Maps
          </a>
        </section>

        {/* CART */}
        <section
          id="cart"
          style={{ marginTop: "40px", marginBottom: "40px" }}
        >
          <h2>Your Cart</h2>

          {cart.length === 0 ? (
            <p style={{ opacity: 0.9 }}>
              Your cart is empty. Tap <strong>Add</strong> on menu items to
              start your order.
            </p>
          ) : (
            <>
              {cart.map((item) => (
                <div
                  key={item.id}
                  style={{
                    background: "rgba(0,0,0,0.55)",
                    borderRadius: "12px",
                    padding: "10px 12px",
                    marginBottom: "10px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <div>
                    <strong>{item.name}</strong>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "0.85rem",
                        opacity: 0.85,
                      }}
                    >
                      £{item.price.toFixed(2)} each
                    </p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <button
                      onClick={() => changeQuantity(item.id, -1)}
                      style={circleButtonStyle}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => changeQuantity(item.id, 1)}
                      style={circleButtonStyle}
                    >
                      +
                    </button>
                    <span
                      style={{
                        width: "80px",
                        textAlign: "right",
                        fontWeight: 600,
                      }}
                    >
                      £{(item.price * item.quantity).toFixed(2)}
                    </span>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      style={{
                        marginLeft: "4px",
                        border: "none",
                        background: "transparent",
                        color: "#ff4d4f",
                        cursor: "pointer",
                        fontSize: "0.85rem",
                      }}
                    >
                      remove
                    </button>
                  </div>
                </div>
              ))}

              <div style={{ marginTop: "16px" }}>
                <p>Subtotal: £{subtotal.toFixed(2)}</p>
                <p>Tax (20%): £{tax.toFixed(2)}</p>
                <h3>Total: £{total.toFixed(2)}</h3>
              </div>

              <div style={{ marginTop: "12px", display: "flex", gap: "10px" }}>
                <button style={primaryCheckoutButton} onClick={handleCheckout}>
                  Checkout via WhatsApp
                </button>
                <button style={secondaryButton} onClick={clearCart}>
                  Clear Cart
                </button>
              </div>
            </>
          )}
        </section>
      </main>
    </div>
  );
}

// ---- SMALL STYLE OBJECTS ----

const navLinkStyle = {
  color: "#f5f5f5",
  textDecoration: "none",
  fontSize: "0.95rem",
  opacity: 0.9,
};

const addButtonStyle = {
  padding: "8px 14px",
  borderRadius: "999px",
  background: "#ff7f11",
  border: "none",
  cursor: "pointer",
  color: "#111",
  fontWeight: 600,
};

const circleButtonStyle = {
  width: "28px",
  height: "28px",
  borderRadius: "50%",
  border: "none",
  cursor: "pointer",
  background: "#ff7f11",
  color: "#111",
  fontWeight: "bold",
};

const primaryCheckoutButton = {
  padding: "10px 18px",
  borderRadius: "999px",
  border: "none",
  cursor: "pointer",
  background: "#30c77b",
  color: "#111",
  fontWeight: 600,
};

const secondaryButton = {
  padding: "10px 18px",
  borderRadius: "999px",
  border: "1px solid #555",
  cursor: "pointer",
  background: "transparent",
  color: "#f5f5f5",
  fontWeight: 500,
};

export default App;
