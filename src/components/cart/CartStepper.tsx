"use client";

// src/components/cart/CartStepper.tsx
// ================================================================
// 3-STEP CHECKOUT STEPPER:  Cart -> Checkout -> Confirm
// ================================================================

const STEPS = [
  { label: "Cart" },
  { label: "Checkout" },
  { label: "Confirm" },
] as const;

interface CartStepperProps {
  activeStep?: number; // 0 = Cart, 1 = Checkout, 2 = Confirm
}

const CartStepper = ({ activeStep = 0 }: CartStepperProps) => {
  return (
    <div className="flex items-center justify-center max-w-[380px] mx-auto mb-8">
      {STEPS.map((step, index) => {
        const isActive = index === activeStep;
        const isPast = index < activeStep;
        const isLast = index === STEPS.length - 1;
        const done = isActive || isPast;

        return (
          <div
            key={step.label}
            className={`flex flex-col items-center gap-1.5 relative flex-1 ${
              !isLast
                ? `after:content-[''] after:absolute after:top-[14px] after:left-[55%] after:w-[90%] after:h-[2px] after:z-[1] ${
                    isPast ? "after:bg-color4" : "after:bg-gray-200"
                  }`
                : ""
            }`}
          >
            {/* Step Circle */}
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center font-sans font-semibold text-xs z-[2] border-2 ${
                done
                  ? "border-color4 bg-color4 text-white"
                  : "border-gray-200 bg-white text-gray-500"
              }`}
            >
              {done ? (
                // Checkmark for active / completed steps
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                <span>{index + 1}</span>
              )}
            </div>

            {/* Step Label */}
            <div
              className={`font-sans text-[12px] lg:text-[16px] font-semibold ${
                done ? "text-color4" : "text-gray-500"
              }`}
            >
              {step.label}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CartStepper;