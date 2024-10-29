import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ClipboardList } from "lucide-react";

const OrdersButton = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <ClipboardList className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Your Orders</SheetTitle>
        </SheetHeader>
        {/* Orders content will be implemented in the next iteration */}
      </SheetContent>
    </Sheet>
  );
};

export default OrdersButton;