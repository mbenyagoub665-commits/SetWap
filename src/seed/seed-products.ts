import { createAdminClient } from "../lib/supabase/admin";

export const SAMPLE_PRODUCTS = [
  {
    name: "Sérum Éclat Botanique à la Rose de Damas",
    description: "Un élixir précieux infusé d'extraits de roses de Damas et d'acide hyaluronique pour un teint lumineux, repulpé et profondément hydraté.",
    price: 4800,
    stock: 25,
    category: "Soins du Visage",
    image_url: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Huile Sèche Nourrissante Corps & Cheveux",
    description: "Une formule somptueuse à l'huile d'argan bio et de figue de barbarie. Nourrit intensément sans effet gras, laissant un voile satiné et envoûtant.",
    price: 3900,
    stock: 40,
    category: "Soins du Corps",
    image_url: "https://images.unsplash.com/photo-1608248597359-f5383a8b419c?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Rouge à Lèvres Mat Velours — Oud Rose",
    description: "Une teinte iconique inspirée des nuances chaleureuses du désert algérien. Fini velours longue tenue, ultra-confortable et non asséchant.",
    price: 2600,
    stock: 60,
    category: "Maquillage",
    image_url: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Masque Capulaire Réparateur Kératine & Miel",
    description: "Soin profond d'exception pour cheveux secs et abîmés. Répare la fibre capillaire, redonne brillance et souplesse dès la première application.",
    price: 3500,
    stock: 30,
    category: "Cheveux",
    image_url: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Eau de Parfum 'Nuit à Alger'",
    description: "Notes envoûtantes de fleur d'oranger, de jasmin nocturne et de vanille ambrée. Une signature olfactive sophistiquée et mémorable.",
    price: 7500,
    stock: 15,
    category: "Parfums",
    image_url: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Crème Hydratante Visage Veloutée",
    description: "Texture fondante enrichie en céramides et extraits d'aloe vera. Restcharge la barrière cutanée et protège des agressions quotidiennes.",
    price: 4200,
    stock: 50,
    category: "Soins du Visage",
    image_url: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Palette Yeux & Teint 'Aura Dorée'",
    description: "Six fards aux harmonies chaudes et enlumineurs soyeux pour sculpter le visage et sublimer le regard en toute occasion.",
    price: 5200,
    stock: 20,
    category: "Maquillage",
    image_url: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Gommage Corporel Sucre & Huile d'Argan",
    description: "Exfoliant délicieux qui élimine les impuretés en douceur et stimule le renouvellement cellulaire pour une peau incroyablement douce.",
    price: 3100,
    stock: 35,
    category: "Soins du Corps",
    image_url: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80",
  },
];

export async function seedProducts() {
  try {
    const supabase = createAdminClient();
    console.log("Seeding luxury beauty products...");

    for (const product of SAMPLE_PRODUCTS) {
      const { error } = await supabase.from("products").insert(product);
      if (error) {
        console.error(`Error inserting ${product.name}:`, error.message);
      } else {
        console.log(`✓ Inserted: ${product.name}`);
      }
    }
    console.log("Seeding completed successfully!");
  } catch (err: any) {
    console.error("Seeding failed:", err.message);
  }
}
