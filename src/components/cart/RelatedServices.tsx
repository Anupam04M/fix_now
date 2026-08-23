"use client";

// src/components/cart/RelatedServices.tsx
// ================================================================
// "PEOPLE ALSO PREFER"  ->  recommendations section
// ----------------------------------------------------------------
// Pixel-matched to FIX_Now_HTML/FIX_Now/cart.html:
//   - Card already IN the cart  -> shows a qty stepper (- qty +)
//     (exactly like HTML card #1: Foam Jet Cleaning with stepper)
//   - Card NOT in cart          -> shows a blue "+ Add" button
//     (exactly like HTML cards #2..#4)
//
// HOW IT BECOMES FULLY DYNAMIC (beginner notes):
//   STEP 1 - The mock list below is a stand-in for an API call:
//            GET {{base_url}}/services?suggest=for_cart
//            Create fetchRelatedServicesFn() inside
//            src/api/api-function/cart.function.ts and call it in
//            useEffect (or better, with React Query's useQuery).
//
//   STEP 2 - Each suggestion should carry real fields from the
//            API response: { id, name, base_price, rating }.
//            Map them into SuggestedService objects.
//
//   STEP 3 - Adding works through useCartStore().addItem which
//            persists to localStorage. When the backend cart API
//            exists (POST /customer/cart/items), also fire that
//            request inside addItem's onSuccess callback.
//
//   NOTE: quantity changes here go through updateQuantity(), so the
//   main cart table above stays in sync automatically.
// ================================================================

import { useEffect, useState } from "react";
import { Minus, Plus, Star, Loader2 } from "lucide-react";

import { fetchRelatedServicesFn } from "@/api/api-function/cart.function";
import { useCartStore } from "@/store/useCartStore";
import { SuggestedService } from "@/types/interface/cart.interface";
import { formatINR } from "@/utils/format";

/* STATIC MOCK DATA - mirrors the four cards in the HTML file.
   Replace with the API call described in STEP 1 above.
   Fields intentionally match what GET /services would return so
   the swap later is just renaming. */
const FALLBACK_SUGGESTIONS: SuggestedService[] = [
  {
    id: "fallback-1",
    name: "Foam Jet Cleaning",
    price: 450,
    rating: 4.75,
    reviewCount: 4106,
    category: "Cleaning",
  },
  {
    id: "fallback-2",
    name: "Microwave Repair",
    price: 1299,
    rating: 4.5,
    reviewCount: 1299,
    category: "Repairing",
  },
  {
    id: "fallback-3",
    name: "Sofa Deep Cleaning",
    price: 1199,
    rating: 4.6,
    reviewCount: 1099,
    category: "Cleaning",
  },
  {
    id: "fallback-4",
    name: "Geyser Installation",
    price: 1740,
    rating: 4.4,
    reviewCount: 869,
    category: "Installation",
  },
];

const RelatedServices = () => {
  const { addItem, updateQuantity, items } = useCartStore();

  /* Local state so the section renders instantly; swap for a
     useQuery hook when the API lands (STEP 1). */
  const [suggestions, setSuggestions] =
    useState<SuggestedService[]>(FALLBACK_SUGGESTIONS);
  const [isLoading] = useState(false);

  // Fetch suggestions on mount - currently resolves from mock data.
  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        const res = await fetchRelatedServicesFn();
        if (isMounted && res.success && res.data && res.data.length > 0) {
          setSuggestions(res.data);
        }
      } catch (error) {
        console.error("Failed to load related services:", error);
      }
    };

    load();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-[18px]">
      <div className="font-sans font-semibold text-[13.5px] mb-3 text-gray-800">
        People Also Prefer
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-6 text-color4">
          <Loader2 className="w-6 h-6 animate-spin" />
        </div>
      ) : (
        /* Horizontal scroll strip on mobile, 4-col grid on larger screens
           (same classes as the HTML container). */
        <div className="grid grid-flow-col sm:grid-flow-row sm:grid-cols-4 auto-cols-[160px] sm:auto-cols-auto gap-3 overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
          {suggestions.map((service) => {
            /* If this suggestion is already in the cart we show its live
               quantity stepper instead of the Add button - exactly how
               the HTML behaves for card #1. */
            const cartItem = items.find((i) => i.id === service.id);

            return (
              <div
                key={service.id}
                className="border border-gray-200 rounded-[10px] p-2.5 flex flex-col gap-1.5"
              >
                {/* Name */}
                <div className="font-sans font-semibold text-[9px] lg:text-[14px]">
                  {service.name}
                </div>

                {/* Rating row: orange star + score + review count */}
                <div className="text-[10px] text-orange-500 flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current" />
                  {service.rating}
                  <span className="text-gray-500">
                    ({service.reviewCount.toLocaleString("en-IN")} Reviews)
                  </span>
                </div>

                {/* Price + Add/Stepper row */}
                <div className="flex items-center justify-between mt-0.5">
                  <div className="font-sans font-bold text-[11.5px]">
                    {formatINR(service.price)}
                  </div>

                  {cartItem ? (
                    /* ---- ALREADY IN CART: qty stepper (HTML card 1 look) ---- */
                    <div className="flex items-center gap-2 bg-color-14 border border-color4/30 rounded-full px-2 py-1">
                      <button
                        aria-label="Decrease quantity"
                        onClick={() =>
                          updateQuantity(service.id, cartItem.quantity - 1)
                        }
                        className="rounded-full bg-color4 text-white font-bold text-xs flex items-center justify-center leading-none px-2 py-1 hover:bg-color5 transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-sans font-semibold text-[12px] min-w-[10px] text-center">
                        {cartItem.quantity}
                      </span>
                      <button
                        aria-label="Increase quantity"
                        onClick={() =>
                          updateQuantity(service.id, cartItem.quantity + 1)
                        }
                        className="rounded-full bg-color4 text-white font-bold text-xs flex items-center justify-center leading-none px-2 py-1 hover:bg-color5 transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    /* ---- NOT IN CART: "+ Add" pill (HTML cards 2-4 look) ---- */
                    <button
                      onClick={() =>
                        addItem({
                          id: service.id,
                          name: service.name,
                          category: service.category || "Service",
                          price: service.price,
                          quantity: 1,
                        })
                      }
                      className="bg-color4 hover:bg-color5 text-white font-sans font-semibold text-[11px] px-3 py-1.5 rounded-2xl transition-colors flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" /> Add
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RelatedServices;
