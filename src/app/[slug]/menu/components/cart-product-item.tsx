import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { useContext } from "react";

import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/helpers/format-currency";

import { CartContext, CartProduct } from "../contexts/cart";

interface CartItemProps {
    product: CartProduct;
}
const CartProductItem = ({product}: CartItemProps) => {
    const {decreaseProductQuantity, increaseProductQuantity, removeProduct} = useContext(CartContext)
    return ( 
        <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
            <div className="relative h-20 w-20 bg-gray-100 rounded-xl ">
                <Image src={product.imageUrl} alt={product.name} fill />
            </div>
            <div className="space-y-1">
                <p className="text-xs max-w-[90%] truncate text-ellipsis">{product.name}</p>
                <p className="text-sm font-semibold">{formatCurrency(product.price)}</p>
                <div className="flex items-center gap-1 text-center">
                    <Button
                        size="icon"
                        variant="outline"
                        className="h-7 w-7 rounded-lg"
                        onClick={() => decreaseProductQuantity(product.id)}
        
                    >
                    <ChevronLeftIcon />
                    </Button>
                        <p className="w-5 text-xs">{product.quantity}</p>
                    <Button
                        size="icon"
                        variant="destructive"
                        className="h-7 w-7 rounded-lg"
                        onClick={() => increaseProductQuantity(product.id)}
                    >
                        <ChevronRightIcon />
                    </Button>
                </div>
            </div>
            </div>
            <Button
                size="icon"
                variant="outline"
                className="h-7 w-7 rounded-lg" 
                onClick={() => removeProduct(product.id)}
            >
                <TrashIcon />
            </Button>
        </div>
     );
}

 
export default CartProductItem;
