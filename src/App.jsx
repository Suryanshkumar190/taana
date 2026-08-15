import { useEffect, useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import ProductGrid from "./components/ProductGrid";
import ArtisanStory from "./components/ArtisanStory";
import HowItWorks from "./components/HowItWorks";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import ProductModal from "./components/ProductModal";
import ChatWidget from "./components/ChatWidget";
import "./App.css";

const STORAGE_KEY = "taana-cart-v1";
const WISHLIST_KEY = "taana-wishlist-v1";

export default function App() {
  const [activeCluster, setActiveCluster] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [openProduct, setOpenProduct] = useState(null);
  const [chatPrefill, setChatPrefill] = useState(null);
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch {
      /* storage unavailable, ignore */
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
    } catch {
      /* storage unavailable, ignore */
    }
  }, [wishlist]);

  function addToCart(product) {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { id: product.id, name: product.name, price: product.price, qty: 1 }];
    });
    setCartOpen(true);
  }

  function updateQty(id, qty) {
    if (qty < 1) return removeFromCart(id);
    setCart((prev) => prev.map((i) => (i.id === id ? { ...i, qty } : i)));
  }

  function removeFromCart(id) {
    setCart((prev) => prev.filter((i) => i.id !== id));
  }

  function toggleWishlist(id) {
    setWishlist((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  }

  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  function askAIAbout(question) {
    setOpenProduct(null);
    setChatPrefill(question);
  }

  return (
    <>
      <Header cartCount={cartCount} onCartClick={() => setCartOpen(true)} />
      <main>
        <Hero />
        <Categories activeCluster={activeCluster} onSelect={setActiveCluster} />
        <ProductGrid
          activeCluster={activeCluster}
          onAdd={addToCart}
          onOpen={setOpenProduct}
          wishlist={wishlist}
          onToggleWishlist={toggleWishlist}
        />
        <ArtisanStory />
        <HowItWorks />
      </main>
      <Footer />
      <CartDrawer
        open={cartOpen}
        items={cart}
        onClose={() => setCartOpen(false)}
        onRemove={removeFromCart}
        onQty={updateQty}
      />
      <ProductModal
        product={openProduct}
        onClose={() => setOpenProduct(null)}
        onAdd={(p) => { addToCart(p); setOpenProduct(null); }}
        onAskAI={askAIAbout}
      />
      <ChatWidget prefill={chatPrefill} onPrefillConsumed={() => setChatPrefill(null)} />
    </>
  );
}
