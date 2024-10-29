import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Product } from "@/types/api";
import { useCart } from "@/hooks/useCart";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [showVariants, setShowVariants] = useState(false);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const { addToCart, removeFromCart, getQuantity } = useCart();
  
  const quantity = getQuantity(product.id);

  const handleAdd = () => {
    if (product.variants && !showVariants) {
      setShowVariants(true);
      return;
    }
    addToCart({ productId: product.id, quantity: 1, variants: selectedVariants });
    setShowVariants(false);
    setSelectedVariants({});
  };

  return (
    <>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <div className="aspect-video relative overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        <CardHeader>
          <CardTitle>{product.name}</CardTitle>
          <CardDescription>{product.description}</CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-between items-center">
          <span className="font-bold">${product.price.toFixed(2)}</span>
          <div className="flex items-center gap-2">
            {quantity > 0 && (
              <>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => removeFromCart(product.id)}
                >
                  -
                </Button>
                <span>{quantity}</span>
              </>
            )}
            <Button size="icon" onClick={handleAdd}>+</Button>
          </div>
        </CardFooter>
      </Card>

      <Dialog open={showVariants} onOpenChange={setShowVariants}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Customize your {product.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {product.variants?.map(variant => (
              <div key={variant.id} className="space-y-2">
                <h3 className="font-medium">{variant.name}</h3>
                <div className="flex flex-wrap gap-2">
                  {variant.options.map(option => (
                    <Button
                      key={option}
                      variant={selectedVariants[variant.id] === option ? "default" : "outline"}
                      onClick={() => setSelectedVariants(prev => ({
                        ...prev,
                        [variant.id]: option
                      }))}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
            <Button className="w-full" onClick={handleAdd}>
              Add to Cart
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductCard;