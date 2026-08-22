"use client";

// src/components/cart/CartItemRow.tsx
// ================================================================
// SINGLE CART LINE:  service name + quantity stepper + price
// ================================================================

import { Minus, Plus, Trash2 } from "lucide-react";

import { useCartStore } from "@/store/useCartStore";
import { CartItem } from "@/types/interface/cart.interface";
import { formatINR } from "@/utils/format";

interface CartItemRowProps {
  item: CartItem;
}

const CartItemRow = ({ item }: CartItemRowProps) => {
  const { updateQuantity, removeItem } = useCartStore();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-[1fr_auto_auto] gap-x-3.5 gap-y-2.5 items-center py-3 border-b border-gray-200 last:border-b-0">
      {/* Service name + sub-category */}
      <div className="col-span-1">
        <div className="flex items-center gap-2">
          <div className="font-sans font-semibold text-[12px] lg:text-[16px] text-gray-800">
            {item.name}
          </div>
          <button
            onClick={() => removeItem(item.id)}
            aria-label={`Remove ${item.name} from cart`}
            className="text-gray-300 hover:text-red-500 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="text-[11.5px] text-gray-500 mt-0.5">
          {item.category}
        </div>
      </div>

      {/* Quantity stepper */}
      <div className="row-start-2 sm:row-auto justify-self-start flex items-center gap-2 bg-color-14 border border-color4/30 rounded-full px-2 py-1">
        <button
          aria-label="Decrease quantity"
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
          className="rounded-full bg-color4 text-white font-bold text-xs flex items-center justify-center leading-none px-2 py-1 hover:bg-color5 transition-colors"
        >
          <Minus className="w-3 h-3" />
        </button>
        <span className="font-sans font-semibold text-[12.5px] min-w-[12px] text-center">
          {item.quantity}
        </span>
        <button
          aria-label="Increase quantity"
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          className="rounded-full bg-color4 text-white font-bold text-xs flex items-center justify-center leading-none px-2 py-1 hover:bg-color5 transition-colors"
        >
          <Plus className="w-3 h-3" />
        </button>
      </div>

      {/* Line price */}
      <div className="justify-self-end font-sans font-bold text-[13px] whitespace-nowrap">
        {formatINR(item.price * item.quantity)}
      </div>
    </div>
  );
};

export default CartItemRow;