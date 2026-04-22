import { useState, useEffect, useRef } from "react";

// ── INITIAL PRODUCTS DATA ──────────────────────────────────────────────────
const INITIAL_PRODUCTS = [
  {
    id: 1,
    name: "Grătar Carbon Pro 600",
    category: "Grătare",
    price: 1490,
    oldPrice: 1890,
    description: "Grătar cu cărbune profesional, suprafață 60×40cm, corp din oțel inox 2mm. Ideal pentru familii mari și petreceri. Grila dublă cu reglare pe 3 niveluri.",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop",
    badge: "Top vânzări",
    stock: 12,
  },
  {
    id: 2,
    name: "BBQ Smoker Premium",
    category: "Grătare",
    price: 3200,
    oldPrice: null,
    description: "Fumigator-grătar combinat, volum 120L, termometru integrat, sertar pentru cenușă. Perfectă fumigare la rece sau la cald. Gătit lent pentru carne fragedă.",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop",
    badge: "Premium",
    stock: 5,
  },
  {
    id: 3,
    name: "Grătar Portabil Camping",
    category: "Grătare",
    price: 320,
    oldPrice: 420,
    description: "Compact și ușor (1.8kg), se pliază în geantă. Oțel inox rezistent, perfect pentru ieșiri la natură, camping, picnic. Grilă 30×22cm.",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop",
    badge: "Promo",
    stock: 30,
  },
  {
    id: 4,
    name: "Grătar Electric Terrasă",
    category: "Grătare",
    price: 890,
    oldPrice: null,
    description: "2000W, grilă antiaderentă ceramică, tavă pentru grăsime, termostat reglabil. Fără fum, perfect pentru balcon sau terasă bloc.",
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop",
    badge: null,
    stock: 8,
  },
  {
    id: 5,
    name: "Set Ustensile Inox (12 piese)",
    category: "Accesorii",
    price: 280,
    oldPrice: 350,
    description: "Set complet: cleștar 45cm, spatulă, perie curățare, furculiță, 4 bețe frigarui, mănuși termorezistente, suport și geantă transport.",
    image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&h=300&fit=crop",
    badge: "Ofertă",
    stock: 25,
  },
  {
    id: 6,
    name: "Cărbune Premium Oak 10kg",
    category: "Combustibil",
    price: 120,
    oldPrice: null,
    description: "Cărbune din lemn de stejar, bucăți mari 3-6cm, aprindere rapidă, ardere lungă 3-4h, fum minim. Ambalaj sigilat impermeabil.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    badge: null,
    stock: 100,
  },
  {
    id: 7,
    name: "Rotiserie Electrică 6rpm",
    category: "Accesorii",
    price: 450,
    oldPrice: 580,
    description: "Motor 10W silențios, tija inox Ø12mm, L=85cm, se adaptează la orice grătar cu lățime 60-100cm. Include furcuțe și contragreutăți.",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
    badge: "Nou",
    stock: 14,
  },
  {
    id: 8,
    name: "Copertină Protecție Grătar",
    category: "Accesorii",
    price: 95,
    oldPrice: null,
    description: "Husă Oxford 600D impermeabilă, elastică la bază, rezistentă UV. Mărimi: M (80×60cm), L (100×70cm), XL (120×80cm). Negru cu cusături portocalii.",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop",
    badge: null,
    stock: 40,
  },
];

const CATEGORIES = ["Toate", "Grătare", "Accesorii", "Combustibil"];

// ── ICONS ──────────────────────────────────────────────────────────────────
const Icons = {
  Cart: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
      <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
    </svg>
  ),
  Flame: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10C22 6.5 17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8 0-1.9.7-3.7 1.8-5.1C6.5 8.5 7 10.2 7 12c0 2.8 2.2 5 5 5s5-2.2 5-5c0-1.6-.8-3.1-2-4 .1.3.1.7.1 1 0 2.2-1.8 4-4 4s-4-1.8-4-4c0-1.1.4-2.1 1.1-2.8C9.5 5.9 10.7 5.5 12 5.5c.7 0 1.3.1 1.9.3C16.4 6.7 18 9.2 18 12c0 3.3-2.7 6-6 6z"/>
    </svg>
  ),
  Plus: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18">
      <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  ),
  Minus: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18">
      <line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  ),
  Trash: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
      <polyline points="3,6 5,6 21,6"/><path d="M19,6v14a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6m3,0V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2v2"/>
    </svg>
  ),
  Close: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="20" height="20">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ),
  Admin: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z"/>
    </svg>
  ),
  Check: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="22" height="22">
      <polyline points="20,6 9,17 4,12"/>
    </svg>
  ),
  Edit: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
  ),
  Delete: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
      <polyline points="3,6 5,6 21,6"/><path d="M19,6v14a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6m3,0V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2v2"/>
      <line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/>
    </svg>
  ),
  Tag: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/>
    </svg>
  ),
  Truck: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
      <rect x="1" y="3" width="15" height="13"/><polygon points="16,8 20,8 23,11 23,16 16,16 16,8"/>
      <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
    </svg>
  ),
  Store: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/>
    </svg>
  ),
  Card: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/>
    </svg>
  ),
};

// ── STYLES ─────────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&display=swap');
  
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  
  :root {
    --char: #1a1208;
    --ash: #2d2416;
    --ember: #c8440a;
    --glow: #f07030;
    --gold: #d4a017;
    --smoke: #6b5c4a;
    --cream: #f5ede0;
    --bone: #fdf8f0;
    --steel: #8a9199;
    --r: 6px;
  }
  
  html { scroll-behavior: smooth; }
  body { font-family: 'DM Sans', sans-serif; background: var(--bone); color: var(--char); }
  
  /* HEADER */
  .header {
    background: var(--char);
    position: sticky; top: 0; z-index: 100;
    border-bottom: 3px solid var(--ember);
  }
  .header-inner {
    max-width: 1200px; margin: 0 auto;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 24px; height: 64px;
  }
  .logo {
    display: flex; align-items: center; gap: 10px;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 28px; color: var(--cream); letter-spacing: 2px;
    cursor: pointer; text-decoration: none;
  }
  .logo-fire { color: var(--glow); }
  .header-actions { display: flex; align-items: center; gap: 12px; }
  
  .btn {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 9px 18px; border-radius: var(--r);
    font-family: 'DM Sans', sans-serif; font-weight: 600; font-size: 14px;
    cursor: pointer; border: none; transition: all .2s; text-decoration: none;
  }
  .btn-ember { background: var(--ember); color: #fff; }
  .btn-ember:hover { background: var(--glow); transform: translateY(-1px); }
  .btn-ghost { background: transparent; color: var(--cream); border: 1.5px solid #ffffff30; }
  .btn-ghost:hover { border-color: var(--glow); color: var(--glow); }
  .btn-gold { background: var(--gold); color: var(--char); }
  .btn-gold:hover { background: #e8b52a; transform: translateY(-1px); }
  .btn-outline { background: transparent; color: var(--char); border: 1.5px solid var(--char); }
  .btn-outline:hover { background: var(--char); color: var(--cream); }
  .btn-sm { padding: 6px 12px; font-size: 13px; }
  .btn-lg { padding: 13px 28px; font-size: 16px; }
  
  .cart-btn {
    position: relative; background: var(--ash);
    color: var(--cream); border: 1.5px solid #ffffff20;
    padding: 9px 16px; border-radius: var(--r);
    display: flex; align-items: center; gap: 8px;
    cursor: pointer; font-size: 14px; font-weight: 500;
    transition: all .2s;
  }
  .cart-btn:hover { border-color: var(--glow); color: var(--glow); }
  .cart-badge {
    position: absolute; top: -6px; right: -6px;
    background: var(--ember); color: #fff;
    width: 20px; height: 20px; border-radius: 50%;
    font-size: 11px; font-weight: 700;
    display: flex; align-items: center; justify-content: center;
  }
  
  /* HERO */
  .hero {
    background: linear-gradient(135deg, var(--char) 0%, var(--ash) 50%, #3a2a15 100%);
    padding: 80px 24px; text-align: center; position: relative; overflow: hidden;
  }
  .hero::before {
    content: '';
    position: absolute; inset: 0;
    background: radial-gradient(ellipse at 50% 100%, #c8440a30 0%, transparent 70%);
  }
  .hero-eyebrow {
    font-size: 13px; font-weight: 600; letter-spacing: 4px; text-transform: uppercase;
    color: var(--glow); margin-bottom: 16px;
  }
  .hero h1 {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(52px, 8vw, 96px); line-height: .95;
    color: var(--cream); letter-spacing: 3px;
  }
  .hero h1 span { color: var(--glow); }
  .hero p {
    color: #b8a898; font-size: 18px; max-width: 520px;
    margin: 20px auto 36px; line-height: 1.6;
  }
  .hero-cta { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
  
  /* FILTER BAR */
  .filter-bar {
    background: var(--cream); border-bottom: 1px solid #e0d4c0;
    position: sticky; top: 64px; z-index: 90;
  }
  .filter-inner {
    max-width: 1200px; margin: 0 auto;
    display: flex; align-items: center; gap: 8px;
    padding: 12px 24px; overflow-x: auto;
  }
  .filter-btn {
    padding: 7px 18px; border-radius: 100px;
    border: 1.5px solid #d0c4b0; background: transparent;
    font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500;
    color: var(--smoke); cursor: pointer; white-space: nowrap; transition: all .15s;
  }
  .filter-btn.active {
    background: var(--ember); border-color: var(--ember); color: #fff;
  }
  .filter-btn:hover:not(.active) { border-color: var(--ember); color: var(--ember); }
  
  /* PRODUCTS GRID */
  .section { max-width: 1200px; margin: 0 auto; padding: 40px 24px; }
  .section-title {
    font-family: 'Bebas Neue', sans-serif; font-size: 36px;
    color: var(--char); letter-spacing: 2px; margin-bottom: 28px;
  }
  .products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 24px;
  }
  
  /* PRODUCT CARD */
  .product-card {
    background: #fff; border-radius: 12px;
    overflow: hidden; box-shadow: 0 2px 12px #0000000a;
    transition: all .25s; cursor: pointer; border: 1px solid #ede4d8;
    display: flex; flex-direction: column;
  }
  .product-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px #0000001a; }
  .card-img-wrap { position: relative; overflow: hidden; height: 200px; }
  .card-img-wrap img { width: 100%; height: 100%; object-fit: cover; transition: transform .4s; }
  .product-card:hover .card-img-wrap img { transform: scale(1.05); }
  .card-badge {
    position: absolute; top: 12px; left: 12px;
    background: var(--ember); color: #fff;
    font-size: 11px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase;
    padding: 4px 10px; border-radius: 100px;
  }
  .card-badge.gold { background: var(--gold); color: var(--char); }
  .card-body { padding: 18px; flex: 1; display: flex; flex-direction: column; }
  .card-cat {
    font-size: 11px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase;
    color: var(--smoke); margin-bottom: 6px; display: flex; align-items: center; gap: 4px;
  }
  .card-name { font-size: 17px; font-weight: 600; color: var(--char); margin-bottom: 8px; line-height: 1.3; }
  .card-desc { font-size: 13.5px; color: var(--smoke); line-height: 1.55; flex: 1; margin-bottom: 14px; }
  .card-footer { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
  .price-group { display: flex; align-items: baseline; gap: 8px; }
  .price-now { font-size: 22px; font-weight: 700; color: var(--ember); }
  .price-old { font-size: 14px; color: var(--steel); text-decoration: line-through; }
  .add-btn {
    background: var(--char); color: var(--cream);
    border: none; border-radius: 8px;
    padding: 9px 14px; cursor: pointer;
    display: flex; align-items: center; gap: 6px;
    font-size: 13px; font-weight: 600; transition: all .2s;
    white-space: nowrap;
  }
  .add-btn:hover { background: var(--ember); }
  .stock-low { font-size: 11px; color: #e07030; font-weight: 600; margin-top: 4px; }
  
  /* CART PANEL */
  .overlay {
    position: fixed; inset: 0; background: #00000060;
    z-index: 200; display: flex; align-items: stretch; justify-content: flex-end;
    animation: fadeIn .2s;
  }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  .cart-panel {
    background: var(--bone); width: min(420px, 100vw);
    display: flex; flex-direction: column;
    animation: slideIn .25s cubic-bezier(.4,0,.2,1);
  }
  @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
  .panel-header {
    padding: 20px 24px; border-bottom: 2px solid #ede4d8;
    display: flex; align-items: center; justify-content: space-between;
    background: var(--char);
  }
  .panel-title {
    font-family: 'Bebas Neue', sans-serif; font-size: 24px;
    color: var(--cream); letter-spacing: 2px;
    display: flex; align-items: center; gap: 10px;
  }
  .close-btn {
    background: transparent; border: none; color: var(--cream);
    cursor: pointer; padding: 4px; display: flex; opacity: .7;
  }
  .close-btn:hover { opacity: 1; }
  .cart-items { flex: 1; overflow-y: auto; padding: 16px; }
  .cart-empty {
    text-align: center; padding: 60px 20px;
    color: var(--smoke);
  }
  .cart-empty-icon { font-size: 56px; margin-bottom: 12px; }
  .cart-item {
    display: flex; gap: 14px; padding: 14px;
    background: #fff; border-radius: 10px; margin-bottom: 10px;
    border: 1px solid #ede4d8;
  }
  .cart-item-img { width: 72px; height: 72px; object-fit: cover; border-radius: 8px; flex-shrink: 0; }
  .cart-item-info { flex: 1; }
  .cart-item-name { font-size: 14px; font-weight: 600; margin-bottom: 4px; }
  .cart-item-price { font-size: 15px; font-weight: 700; color: var(--ember); }
  .qty-controls {
    display: flex; align-items: center; gap: 8px; margin-top: 8px;
  }
  .qty-btn {
    width: 26px; height: 26px; border-radius: 6px;
    border: 1.5px solid #ddd; background: #fff;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; color: var(--char); transition: all .15s;
  }
  .qty-btn:hover { border-color: var(--ember); color: var(--ember); }
  .qty-num { font-size: 14px; font-weight: 600; min-width: 20px; text-align: center; }
  .remove-btn {
    background: transparent; border: none; color: #ccc;
    cursor: pointer; padding: 4px; display: flex; transition: color .15s;
  }
  .remove-btn:hover { color: #e05050; }
  .cart-footer { padding: 20px; border-top: 2px solid #ede4d8; }
  .cart-total {
    display: flex; justify-content: space-between; align-items: center;
    font-size: 18px; font-weight: 700; margin-bottom: 16px;
  }
  .total-amount { color: var(--ember); font-size: 24px; }
  
  /* ORDER FORM */
  .order-form { padding: 8px 0; }
  .form-section-title {
    font-family: 'Bebas Neue', sans-serif; font-size: 18px;
    letter-spacing: 1px; margin-bottom: 12px; color: var(--char);
  }
  .form-group { margin-bottom: 12px; }
  .form-group label { font-size: 12px; font-weight: 600; letter-spacing: .5px; color: var(--smoke); display: block; margin-bottom: 5px; }
  .form-group input, .form-group textarea, .form-group select {
    width: 100%; padding: 9px 13px;
    border: 1.5px solid #ddd; border-radius: var(--r);
    font-family: 'DM Sans', sans-serif; font-size: 14px; color: var(--char);
    background: #fff; transition: border-color .15s;
    outline: none;
  }
  .form-group input:focus, .form-group textarea:focus, .form-group select:focus {
    border-color: var(--ember);
  }
  .form-group textarea { resize: vertical; min-height: 60px; }
  
  .delivery-options { display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px; }
  .delivery-opt {
    display: flex; align-items: flex-start; gap: 12px;
    padding: 12px; border-radius: 8px; border: 2px solid #e0d4c0;
    cursor: pointer; transition: all .15s;
  }
  .delivery-opt.selected { border-color: var(--ember); background: #fff4ee; }
  .delivery-opt input[type=radio] { margin-top: 2px; accent-color: var(--ember); }
  .delivery-opt-info { flex: 1; }
  .delivery-opt-title { font-size: 14px; font-weight: 600; }
  .delivery-opt-desc { font-size: 12px; color: var(--smoke); margin-top: 2px; }
  .delivery-opt-price { font-size: 13px; font-weight: 700; color: var(--ember); }
  
  /* SUCCESS */
  .success-screen {
    display: flex; flex-direction: column; align-items: center;
    justify-content: center; text-align: center;
    padding: 48px 24px; flex: 1;
  }
  .success-icon {
    width: 72px; height: 72px; background: #d4edda; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    color: #2e7d32; margin-bottom: 20px;
  }
  .success-screen h2 { font-family: 'Bebas Neue', sans-serif; font-size: 32px; letter-spacing: 2px; }
  .success-screen p { color: var(--smoke); margin-top: 8px; line-height: 1.6; }
  
  /* ADMIN PANEL */
  .admin-overlay {
    position: fixed; inset: 0; background: var(--bone);
    z-index: 300; display: flex; flex-direction: column;
    animation: fadeIn .2s;
  }
  .admin-header {
    background: var(--char); padding: 16px 28px;
    display: flex; align-items: center; justify-content: space-between;
    border-bottom: 3px solid var(--ember);
  }
  .admin-title {
    font-family: 'Bebas Neue', sans-serif; font-size: 26px;
    color: var(--cream); letter-spacing: 2px;
    display: flex; align-items: center; gap: 10px;
  }
  .admin-body { flex: 1; overflow-y: auto; padding: 28px; max-width: 1000px; margin: 0 auto; width: 100%; }
  .admin-toolbar {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 24px; flex-wrap: wrap; gap: 12px;
  }
  .admin-products-list { display: flex; flex-direction: column; gap: 12px; }
  .admin-product-row {
    background: #fff; border-radius: 10px; border: 1px solid #ede4d8;
    display: flex; align-items: center; gap: 16px; padding: 14px;
    transition: box-shadow .2s;
  }
  .admin-product-row:hover { box-shadow: 0 4px 16px #0000000e; }
  .admin-row-img { width: 64px; height: 64px; object-fit: cover; border-radius: 8px; flex-shrink: 0; }
  .admin-row-info { flex: 1; }
  .admin-row-name { font-size: 15px; font-weight: 600; }
  .admin-row-meta { font-size: 13px; color: var(--smoke); margin-top: 2px; }
  .admin-row-price { font-size: 17px; font-weight: 700; color: var(--ember); }
  .admin-row-actions { display: flex; gap: 8px; }
  .icon-btn {
    width: 34px; height: 34px; border-radius: 7px; border: 1.5px solid #ddd;
    background: #fff; display: flex; align-items: center; justify-content: center;
    cursor: pointer; color: var(--smoke); transition: all .15s;
  }
  .icon-btn:hover { border-color: var(--ember); color: var(--ember); }
  .icon-btn.danger:hover { border-color: #e05050; color: #e05050; }
  
  /* PRODUCT FORM MODAL */
  .modal-overlay {
    position: fixed; inset: 0; background: #00000060;
    z-index: 400; display: flex; align-items: center; justify-content: center;
    padding: 20px; animation: fadeIn .2s;
  }
  .modal {
    background: var(--bone); border-radius: 14px;
    width: min(600px, 100%); max-height: 90vh;
    overflow-y: auto; animation: popIn .2s;
  }
  @keyframes popIn { from { transform: scale(.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
  .modal-header {
    padding: 20px 24px; border-bottom: 2px solid #ede4d8;
    display: flex; align-items: center; justify-content: space-between;
    background: var(--char); border-radius: 14px 14px 0 0;
  }
  .modal-title { font-family: 'Bebas Neue', sans-serif; font-size: 22px; color: var(--cream); letter-spacing: 2px; }
  .modal-body { padding: 24px; }
  .modal-footer { padding: 16px 24px; border-top: 1px solid #ede4d8; display: flex; justify-content: flex-end; gap: 10px; }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  
  /* PROMO BANNER */
  .promo-banner {
    background: linear-gradient(90deg, var(--ash) 0%, var(--char) 100%);
    padding: 20px 24px;
    border-top: 3px solid var(--ember);
  }
  .promo-inner {
    max-width: 1200px; margin: 0 auto;
    display: flex; align-items: center; justify-content: space-between;
    gap: 16px; flex-wrap: wrap;
  }
  .promo-items { display: flex; gap: 32px; flex-wrap: wrap; }
  .promo-item { display: flex; align-items: center; gap: 10px; color: var(--cream); font-size: 14px; }
  .promo-icon { color: var(--glow); font-size: 22px; }
  
  /* FOOTER */
  .footer {
    background: var(--char); color: #8a7a6a;
    padding: 32px 24px; text-align: center;
    font-size: 14px; border-top: 3px solid var(--ember);
  }
  .footer strong { color: var(--cream); }
  
  /* TOAST */
  .toast {
    position: fixed; bottom: 24px; right: 24px;
    background: var(--char); color: var(--cream);
    padding: 12px 20px; border-radius: 10px;
    font-size: 14px; font-weight: 500;
    display: flex; align-items: center; gap: 10px;
    box-shadow: 0 8px 24px #0000003a;
    z-index: 500; animation: toastIn .3s;
    border-left: 4px solid var(--glow);
  }
  @keyframes toastIn { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
  
  /* Scrollbar */
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #d0c4b0; border-radius: 3px; }
  
  @media (max-width: 600px) {
    .hero h1 { font-size: 48px; }
    .form-row { grid-template-columns: 1fr; }
    .promo-items { gap: 16px; }
    .admin-row-img { width: 48px; height: 48px; }
  }
`;

// ── MAIN APP ────────────────────────────────────────────────────────────────
export default function App() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [category, setCategory] = useState("Toate");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [orderStep, setOrderStep] = useState("cart"); // cart | form | success
  const [toast, setToast] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  // ── Order form state
  const [delivery, setDelivery] = useState("delivery");
  const [form, setForm] = useState({ name: "", phone: "", address: "", note: "" });

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2800);
  };

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
    showToast(`✓ ${product.name} adăugat în coș`);
  };

  const updateQty = (id, delta) => {
    setCart(prev =>
      prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i)
    );
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id));

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartSubtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const deliveryFee = delivery === "delivery" ? (cartSubtotal >= 2000 ? 0 : 80) : 0;
  const cartTotal = cartSubtotal + deliveryFee;

  const filtered = category === "Toate" ? products : products.filter(p => p.category === category);

  const handleOrder = () => {
    if (!form.name || !form.phone) { showToast("⚠ Completați numele și telefonul"); return; }
    if (delivery === "delivery" && !form.address) { showToast("⚠ Introduceți adresa de livrare"); return; }
    setOrderStep("success");
    setCart([]);
  };

  // ── ADMIN ──
  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    showToast("Produs șters");
  };

  const openAdd = () => { setEditProduct(null); setModalOpen(true); };
  const openEdit = (p) => { setEditProduct(p); setModalOpen(true); };

  const saveProduct = (data) => {
    if (editProduct) {
      setProducts(prev => prev.map(p => p.id === editProduct.id ? { ...p, ...data } : p));
      showToast("Produs actualizat");
    } else {
      const newId = Math.max(...products.map(p => p.id)) + 1;
      setProducts(prev => [...prev, { ...data, id: newId, badge: data.badge || null }]);
      showToast("Produs adăugat");
    }
    setModalOpen(false);
  };

  return (
    <>
      <style>{css}</style>

      {/* HEADER */}
      <header className="header">
        <div className="header-inner">
          <div className="logo" onClick={() => setAdminOpen(false)}>
            <Icons.Flame />
            FLACĂRA<span className="logo-fire">GRĂ</span>TAR
          </div>
          <div className="header-actions">
            <button className="btn btn-ghost btn-sm" onClick={() => setAdminOpen(true)}>
              <Icons.Admin /> Admin
            </button>
            <button className="cart-btn" onClick={() => { setCartOpen(true); setOrderStep("cart"); }}>
              <Icons.Cart />
              Coș
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="hero">
        <div className="hero-eyebrow">🔥 Sezon de grătare 2025</div>
        <h1>ARDE<br /><span>PASIUNEA</span><br />LA GRĂTAR</h1>
        <p>Grătare profesionale, accesorii premium și consumabile — totul pentru experiența perfectă în aer liber.</p>
        <div className="hero-cta">
          <button className="btn btn-ember btn-lg" onClick={() => document.getElementById('products').scrollIntoView()}>
            🛒 Cumpără acum
          </button>
          <button className="btn btn-ghost btn-lg">📞 Sună-ne</button>
        </div>
      </section>

      {/* PROMO BANNER */}
      <div className="promo-banner">
        <div className="promo-inner">
          <div className="promo-items">
            <div className="promo-item"><span className="promo-icon">🚚</span> Livrare gratuită la comenzi peste 2000 lei</div>
            <div className="promo-item"><span className="promo-icon">⭐</span> Garanție 2 ani pe toate grătarele</div>
            <div className="promo-item"><span className="promo-icon">🔧</span> Serviciu de instalare la domiciliu</div>
          </div>
        </div>
      </div>

      {/* FILTER */}
      <div className="filter-bar">
        <div className="filter-inner">
          {CATEGORIES.map(c => (
            <button
              key={c}
              className={`filter-btn${category === c ? " active" : ""}`}
              onClick={() => setCategory(c)}
            >{c}</button>
          ))}
        </div>
      </div>

      {/* PRODUCTS */}
      <div className="section" id="products">
        <div className="section-title">
          {category === "Toate" ? "Toate produsele" : category} ({filtered.length})
        </div>
        <div className="products-grid">
          {filtered.map(p => (
            <div className="product-card" key={p.id}>
              <div className="card-img-wrap">
                <img src={p.image} alt={p.name} />
                {p.badge && (
                  <span className={`card-badge${p.badge === "Premium" ? " gold" : ""}`}>{p.badge}</span>
                )}
              </div>
              <div className="card-body">
                <div className="card-cat"><Icons.Tag /> {p.category}</div>
                <div className="card-name">{p.name}</div>
                <div className="card-desc">{p.description}</div>
                {p.stock <= 5 && <div className="stock-low">⚡ Doar {p.stock} bucăți rămase!</div>}
                <div className="card-footer">
                  <div>
                    <div className="price-group">
                      <span className="price-now">{p.price.toLocaleString()} lei</span>
                      {p.oldPrice && <span className="price-old">{p.oldPrice.toLocaleString()}</span>}
                    </div>
                  </div>
                  <button className="add-btn" onClick={() => addToCart(p)}>
                    <Icons.Plus /> Adaugă
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <p>© 2025 <strong>FlacăraGrătar</strong> — Cel mai bun grătar, cea mai bună companie 🔥</p>
        <p style={{ marginTop: 6 }}>Chișinău, Republica Moldova | Tel: <strong>+373 60 000 000</strong></p>
      </footer>

      {/* CART PANEL */}
      {cartOpen && (
        <div className="overlay" onClick={(e) => { if (e.target === e.currentTarget) setCartOpen(false); }}>
          <div className="cart-panel">
            <div className="panel-header">
              <div className="panel-title"><Icons.Cart /> Coșul meu {cartCount > 0 && `(${cartCount})`}</div>
              <button className="close-btn" onClick={() => setCartOpen(false)}><Icons.Close /></button>
            </div>

            {orderStep === "success" ? (
              <div className="success-screen">
                <div className="success-icon"><Icons.Check /></div>
                <h2>COMANDĂ PLASATĂ!</h2>
                <p>Vă mulțumim! Un operator vă va contacta în curând pentru confirmare.</p>
                <button className="btn btn-ember" style={{ marginTop: 24 }} onClick={() => { setCartOpen(false); setOrderStep("cart"); }}>
                  Continuă cumpărăturile
                </button>
              </div>
            ) : orderStep === "form" ? (
              <>
                <div className="cart-items">
                  <div className="order-form">
                    <div className="form-section-title">📦 Metoda de primire</div>
                    <div className="delivery-options">
                      {[
                        { v: "delivery", icon: <Icons.Truck />, title: "Livrare la domiciliu", desc: "1–3 zile lucrătoare, Chișinău și împrejurimi", price: cartSubtotal >= 2000 ? "GRATUIT" : "+80 lei" },
                        { v: "pickup", icon: <Icons.Store />, title: "Ridicare din magazin", desc: "Bd. Moscovei 44, Chișinău. Lun–Sâm 9–18", price: "Gratuit" },
                        { v: "express", icon: "🚀", title: "Livrare express (azi)", desc: "Livrare în 3-4 ore, Chișinău centru", price: "+150 lei" },
                      ].map(opt => (
                        <label key={opt.v} className={`delivery-opt${delivery === opt.v ? " selected" : ""}`}>
                          <input type="radio" name="delivery" value={opt.v} checked={delivery === opt.v} onChange={() => setDelivery(opt.v)} />
                          <div className="delivery-opt-info">
                            <div className="delivery-opt-title">{opt.icon} {opt.title}</div>
                            <div className="delivery-opt-desc">{opt.desc}</div>
                          </div>
                          <div className="delivery-opt-price">{opt.price}</div>
                        </label>
                      ))}
                    </div>

                    <div className="form-section-title">👤 Date de contact</div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Numele *</label>
                        <input placeholder="Ion Popescu" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                      </div>
                      <div className="form-group">
                        <label>Telefon *</label>
                        <input placeholder="+373 60 000 000" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                      </div>
                    </div>
                    {delivery === "delivery" && (
                      <div className="form-group">
                        <label>Adresa de livrare *</label>
                        <input placeholder="Str. Exemple 12, ap.3" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} />
                      </div>
                    )}
                    <div className="form-group">
                      <label>Notă pentru operator</label>
                      <textarea placeholder="Orice detalii suplimentare..." value={form.note} onChange={e => setForm({ ...form, note: e.target.value })} />
                    </div>

                    <div className="form-section-title">💳 Metoda de plată</div>
                    <div className="delivery-options">
                      {[
                        { v: "cash", icon: "💵", title: "Numerar la livrare / ridicare", desc: "Plata în momentul primirii comenzii" },
                        { v: "card", icon: "💳", title: "Card bancar la livrare", desc: "Terminal POS disponibil" },
                        { v: "transfer", icon: "📱", title: "Transfer bancar / QR", desc: "IBAN sau plată via aplicație bancară" },
                      ].map(opt => (
                        <label key={opt.v} className="delivery-opt" style={{ cursor: "default" }}>
                          <input type="radio" name="payment" defaultChecked={opt.v === "cash"} />
                          <div className="delivery-opt-info">
                            <div className="delivery-opt-title">{opt.icon} {opt.title}</div>
                            <div className="delivery-opt-desc">{opt.desc}</div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="cart-footer">
                  <div className="cart-total">
                    <span>Produse: {cartSubtotal.toLocaleString()} lei</span>
                    {deliveryFee > 0 && <span style={{ fontSize: 14, color: "var(--smoke)" }}>+ livrare {deliveryFee} lei</span>}
                  </div>
                  <div className="cart-total" style={{ fontSize: 22 }}>
                    <span>TOTAL</span>
                    <span className="total-amount">{cartTotal.toLocaleString()} lei</span>
                  </div>
                  <button className="btn btn-ember btn-lg" style={{ width: "100%" }} onClick={handleOrder}>
                    ✅ Plasează comanda
                  </button>
                  <button className="btn btn-outline btn-sm" style={{ width: "100%", marginTop: 8 }} onClick={() => setOrderStep("cart")}>
                    ← Înapoi la coș
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="cart-items">
                  {cart.length === 0 ? (
                    <div className="cart-empty">
                      <div className="cart-empty-icon">🛒</div>
                      <p>Coșul este gol.<br />Adaugă produse pentru a comanda!</p>
                    </div>
                  ) : cart.map(item => (
                    <div className="cart-item" key={item.id}>
                      <img className="cart-item-img" src={item.image} alt={item.name} />
                      <div className="cart-item-info">
                        <div className="cart-item-name">{item.name}</div>
                        <div className="cart-item-price">{(item.price * item.qty).toLocaleString()} lei</div>
                        <div className="qty-controls">
                          <button className="qty-btn" onClick={() => updateQty(item.id, -1)}><Icons.Minus /></button>
                          <span className="qty-num">{item.qty}</span>
                          <button className="qty-btn" onClick={() => updateQty(item.id, 1)}><Icons.Plus /></button>
                        </div>
                      </div>
                      <button className="remove-btn" onClick={() => removeFromCart(item.id)}><Icons.Trash /></button>
                    </div>
                  ))}
                </div>
                {cart.length > 0 && (
                  <div className="cart-footer">
                    <div className="cart-total">
                      <span>Total produse</span>
                      <span className="total-amount">{cartSubtotal.toLocaleString()} lei</span>
                    </div>
                    {cartSubtotal < 2000 && (
                      <p style={{ fontSize: 12, color: "var(--smoke)", marginBottom: 12 }}>
                        🚚 Mai adaugă {(2000 - cartSubtotal).toLocaleString()} lei pentru livrare gratuită!
                      </p>
                    )}
                    <button className="btn btn-ember btn-lg" style={{ width: "100%" }} onClick={() => setOrderStep("form")}>
                      Continuă comanda →
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* ADMIN PANEL */}
      {adminOpen && (
        <div className="admin-overlay">
          <div className="admin-header">
            <div className="admin-title"><Icons.Admin /> Panou de administrare</div>
            <button className="close-btn" onClick={() => setAdminOpen(false)}><Icons.Close /></button>
          </div>
          <div className="admin-body">
            <div className="admin-toolbar">
              <div>
                <div style={{ fontFamily: "'Bebas Neue'", fontSize: 28, letterSpacing: 2 }}>Gestionare produse</div>
                <div style={{ fontSize: 14, color: "var(--smoke)" }}>{products.length} produse active</div>
              </div>
              <button className="btn btn-ember" onClick={openAdd}><Icons.Plus /> Adaugă produs</button>
            </div>
            <div className="admin-products-list">
              {products.map(p => (
                <div className="admin-product-row" key={p.id}>
                  <img className="admin-row-img" src={p.image} alt={p.name} />
                  <div className="admin-row-info">
                    <div className="admin-row-name">{p.name}</div>
                    <div className="admin-row-meta">{p.category} · Stoc: {p.stock} buc. {p.badge && `· ${p.badge}`}</div>
                  </div>
                  <div className="admin-row-price">{p.price.toLocaleString()} lei</div>
                  <div className="admin-row-actions">
                    <button className="icon-btn" onClick={() => openEdit(p)} title="Editează"><Icons.Edit /></button>
                    <button className="icon-btn danger" onClick={() => deleteProduct(p.id)} title="Șterge"><Icons.Delete /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* PRODUCT MODAL */}
      {modalOpen && (
        <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) setModalOpen(false); }}>
          <div className="modal">
            <div className="modal-header">
              <div className="modal-title">{editProduct ? "Editează produs" : "Produs nou"}</div>
              <button className="close-btn" onClick={() => setModalOpen(false)}><Icons.Close /></button>
            </div>
            <ProductForm
              initial={editProduct}
              onSave={saveProduct}
              onCancel={() => setModalOpen(false)}
            />
          </div>
        </div>
      )}

      {/* TOAST */}
      {toast && <div className="toast">🔥 {toast}</div>}
    </>
  );
}

// ── PRODUCT FORM ────────────────────────────────────────────────────────────
function ProductForm({ initial, onSave, onCancel }) {
  const [data, setData] = useState({
    name: initial?.name || "",
    category: initial?.category || "Grătare",
    price: initial?.price || "",
    oldPrice: initial?.oldPrice || "",
    description: initial?.description || "",
    image: initial?.image || "",
    badge: initial?.badge || "",
    stock: initial?.stock || "",
  });

  const set = (k, v) => setData(prev => ({ ...prev, [k]: v }));

  const submit = () => {
    if (!data.name || !data.price) { alert("Completați cel puțin denumirea și prețul"); return; }
    onSave({
      ...data,
      price: Number(data.price),
      oldPrice: data.oldPrice ? Number(data.oldPrice) : null,
      stock: Number(data.stock) || 0,
      badge: data.badge || null,
    });
  };

  return (
    <>
      <div className="modal-body">
        <div className="form-row">
          <div className="form-group" style={{ gridColumn: "span 2" }}>
            <label>Denumire produs *</label>
            <input value={data.name} onChange={e => set("name", e.target.value)} placeholder="ex: Grătar Carbon XL" />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Categorie</label>
            <select value={data.category} onChange={e => set("category", e.target.value)}>
              <option>Grătare</option>
              <option>Accesorii</option>
              <option>Combustibil</option>
            </select>
          </div>
          <div className="form-group">
            <label>Badge / Etichetă</label>
            <input value={data.badge} onChange={e => set("badge", e.target.value)} placeholder="ex: Nou, Promo, Top vânzări" />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Preț (lei) *</label>
            <input type="number" value={data.price} onChange={e => set("price", e.target.value)} placeholder="1490" />
          </div>
          <div className="form-group">
            <label>Preț vechi (opțional)</label>
            <input type="number" value={data.oldPrice} onChange={e => set("oldPrice", e.target.value)} placeholder="1890" />
          </div>
        </div>
        <div className="form-group">
          <label>Stoc (bucăți)</label>
          <input type="number" value={data.stock} onChange={e => set("stock", e.target.value)} placeholder="10" />
        </div>
        <div className="form-group">
          <label>URL imagine</label>
          <input value={data.image} onChange={e => set("image", e.target.value)} placeholder="https://..." />
        </div>
        <div className="form-group">
          <label>Descriere</label>
          <textarea rows={4} value={data.description} onChange={e => set("description", e.target.value)} placeholder="Descrieți produsul..." />
        </div>
      </div>
      <div className="modal-footer">
        <button className="btn btn-outline" onClick={onCancel}>Anulează</button>
        <button className="btn btn-ember" onClick={submit}><Icons.Check /> Salvează</button>
      </div>
    </>
  );
}

