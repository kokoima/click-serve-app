import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Carousel } from "@/components/ui/carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getEstablishment, getProducts } from "@/services/api";
import ProductCard from "@/components/ProductCard";
import CartButton from "@/components/CartButton";
import OrdersButton from "@/components/OrdersButton";
import { useState } from "react";

const Index = () => {
  const { establishmentId = "", zoneId = "" } = useParams();
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const { data: establishment } = useQuery({
    queryKey: ["establishment", establishmentId],
    queryFn: () => getEstablishment(establishmentId),
  });

  const { data: products } = useQuery({
    queryKey: ["products", establishmentId],
    queryFn: () => getProducts(establishmentId),
  });

  const categories = products ? [...new Set(products.map(p => p.category))] : [];

  if (!establishment || !products) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-secondary/5">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b">
        <div className="flex justify-between items-center p-4">
          <h1 className="text-xl font-bold text-primary">{establishment.name}</h1>
          <div className="flex gap-2">
            <OrdersButton />
            <CartButton />
          </div>
        </div>
      </header>

      <main className="pt-16">
        <Carousel className="w-full h-64">
          {establishment.images.map((image, index) => (
            <div key={index} className="w-full h-full">
              <img 
                src={image} 
                alt={`${establishment.name} ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </Carousel>

        <Tabs defaultValue={categories[0]} className="w-full mt-4">
          <TabsList className="w-full flex overflow-x-auto">
            {categories.map(category => (
              <TabsTrigger 
                key={category} 
                value={category}
                className="flex-shrink-0"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map(category => (
            <TabsContent key={category} value={category} className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products
                  .filter(product => product.category === category)
                  .map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </main>
    </div>
  );
};

export default Index;