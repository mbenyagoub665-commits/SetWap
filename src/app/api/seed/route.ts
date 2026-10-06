import { NextResponse } from "next/server";
import { seedProducts } from "@/seed/seed-products";

export async function GET() {
  try {
    await seedProducts();
    return NextResponse.json({ success: true, message: "Produits de démonstration insérés avec succès !" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
