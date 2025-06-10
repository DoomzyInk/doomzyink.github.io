// Products Data for Doomzy Ink
const products = [
  {
    id: 1,
    title: "DOOMED HEART TEE",
    price: 39.99,
    comparePrice: 49.99,
    image: "https://via.placeholder.com/600x800/1a1a1a/8a2be2?text=DOOMED+HEART+TEE",
    category: "T-Shirts",
    description: "Classic fit t-shirt with distressed print. 100% cotton.",
    tags: ["bestseller", "new"]
  },
  {
    id: 2,
    title: "CURSED HOODIE",
    price: 79.99,
    comparePrice: 89.99,
    image: "https://via.placeholder.com/600x800/1a1a1a/8a2be2?text=CURSED+HOODIE",
    category: "Hoodies",
    description: "Oversized fit hoodie with embroidered details. 80% cotton, 20% polyester.",
    tags: ["bestseller"]
  },
  {
    id: 3,
    title: "DANGER ZONE HAT",
    price: 34.99,
    image: "https://via.placeholder.com/600x800/1a1a1a/8a2be2?text=DANGER+ZONE+HAT",
    category: "Accessories",
    description: "Structured dad hat with adjustable strap.",
    tags: ["new"]
  },
  {
    id: 4,
    title: "CHAOS CREW NECK",
    price: 44.99,
    image: "https://via.placeholder.com/600x800/1a1a1a/8a2be2?text=CHAOS+CREW+NECK",
    category: "Sweatshirts",
    description: "Heavyweight crewneck with screen print. 80% cotton, 20% polyester.",
    tags: []
  },
  {
    id: 5,
    title: "DOOMED HEART TEE (WHITE)",
    price: 39.99,
    image: "https://via.placeholder.com/600x800/1a1a1a/8a2be2?text=DOOMED+HEART+TEE+WHITE",
    category: "T-Shirts",
    description: "Classic fit t-shirt with distressed print. 100% cotton.",
    tags: []
  },
  {
    id: 6,
    title: "CURSED SOCKS (PAIR)",
    price: 19.99,
    image: "https://via.placeholder.com/600x800/1a1a1a/8a2be2?text=CURSED+SOCKS",
    category: "Accessories",
    description: "Ankle socks with custom print. One size fits most.",
    tags: ["new"]
  },
  {
    id: 7,
    title: "DOOMED TO BE ICONIC TEE",
    price: 42.99,
    comparePrice: 49.99,
    image: "https://via.placeholder.com/600x800/1a1a1a/8a2be2?text=DOOMED+TO+BE+ICONIC",
    category: "T-Shirts",
    description: "Limited edition graphic tee. 100% organic cotton.",
    tags: ["bestseller"]
  },
  {
    id: 8,
    title: "CHAOS PANTS",
    price: 89.99,
    image: "https://via.placeholder.com/600x800/1a1a1a/8a2be2?text=CHAOS+PANTS",
    category: "Bottoms",
    description: "Cargo pants with multiple pockets. 65% cotton, 35% polyester.",
    tags: ["new"]
  }
];

// Export for ES modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { products };
}
