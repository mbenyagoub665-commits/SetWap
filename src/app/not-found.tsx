import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Sparkles, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 font-sans">
      <div className="w-16 h-16 rounded-full bg-pink-accent/20 flex items-center justify-center mb-6 text-pink-accent">
        <Sparkles className="w-8 h-8" />
      </div>
      <span className="text-xs uppercase tracking-[0.3em] text-teal-sarcelle font-semibold">
        404 · Page Introuvable
      </span>
      <h1 className="text-4xl md:text-5xl font-serif font-light text-charcoal mt-2 mb-4">
        Cette page s'est évanouie
      </h1>
      <p className="text-sm text-charcoal/70 max-w-md mb-8">
        Le trésor de beauté que vous recherchez n'existe pas ou a été déplacé dans notre collection.
      </p>
      <Link href="/">
        <Button variant="teal" size="lg" className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          <span>Retour à l'accueil</span>
        </Button>
      </Link>
    </div>
  );
}
