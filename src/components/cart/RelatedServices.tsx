"use client";

// src/components/cart/RelatedServices.tsx
// ================================================================
// "PEOPLE ALSO PREFER"  ->  recommendations that can be added to cart
// ----------------------------------------------------------------
// Data comes from fetchRelatedServicesFn (currently mock, will read
// from GET /services/suggestions once the backend is live).
// ================================================================

import { useEffect, useState } from "react";
import { Star, Plus, Loader2 } from "lucide-react";

import { fetchRelatedServicesFn } from "@/api/api-function/cart.function";
import { useCartStore } from "@/store/useCartStore";
import { SuggestedService } from "@/types/interface/cart.interface";
import { formatINR } from "@/utils/format";

// Local fallback so the section never appears empty while loading
const FALLBACK_SUGGESTIONS: SuggestedService[] = [
  {
    id: "fallback-1",
    name: "Foam Jet Cleaning",
    price: 450,
    rating: 4.75,
    reviewCount: 4106,
    category: "Cleaning",
  },
];

const RelatedServices = () => {
  const { addItem, items } = useCartStore();

  const [suggestions, setSuggestions] =
    useState<SuggestedService[]>(FALLBACK_SUGGESTIONS);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        const res = await fetchRelatedServicesFn();
        if (isMounted && res.success && res.data) {
          setSuggestions(res.data);
        }
      } catch (error) {
        console.error("Failed to load related services:", error);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    load();
    return () => {
      isMounted = false;
    };
  }, []);

  // A suggestion is "in cart" if it was added from this section
  const isInCart = (id: string) => items.some((i) => i.id === id);

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
        <div className="grid grid-flow-col sm:grid-flow-row sm:grid-cols-4 auto-cols-[160px] sm:auto-cols-auto gap-3 overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
          {suggestions.map((service) => {
            const alreadyAdded = isInCart(service.id);

            return (
              <div
                key={service.id}
                className="border border-gray-200 rounded-[10px] p-2.5 flex flex-col gap-1.5"
              >
                <div className="font-sans font-semibold text-[9px] lg:text-[14px]">
                  {service.name}
                </div>

                {/* Rating */}
                <div className="text-[10px] text-orange-500 flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current" />
                  {service.rating}
                  <span className="text-gray-500">
                    ({service.reviewCount.toLocaleString("en-IN")} Reviews)
                  </span>
                </div>

                <div className="flex items-center justify-between mt-0.5">
                  <div className="font-sans font-bold text-[11.5px]">
                    {formatINR(service.price)}
                  </div>

                  {alreadyAdded ? (
                    <span className="text-[11px] font-semibold text-green-600">
                      Added ✓
                    </span>
                  ) : (
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
                      className="flex items-center gap-1 bg-color4 hover:bg-color5 text-white font-sans font-semibold text-[11px] px-3 py-1.5 rounded-2xl transition-colors"
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