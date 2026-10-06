import { getProductById } from "@/lib/actions/products";
import { notFound } from "next/navigation";
import { ProductDetailView } from "@/components/products/ProductDetailView";

export const revalidate = 60;

interface ProductDetailPageProps {
  params: { id: string };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const product = await getProductById(params.id);

  if (!product) {
    notFound();
  }

  return <ProductDetailView product={product} />;
}
