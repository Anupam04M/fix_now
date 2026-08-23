"use client";

// src/components/cart/CartStepper.tsx
// ================================================================
// 3-STEP CHECKOUT STEPPER:  Cart -> Checkout -> Confirm
// ----------------------------------------------------------------
// Pixel-matched to BOTH FIX_Now_HTML mockups:
//
//   cart.html     (activeStep=0, highlightNext):
//     Cart     = ACTIVE   -> cart icon, blue circle, blue label,
//                           connector AFTER it is BLUE
//     Checkout = REACHED  -> pin icon, blue circle, GRAY label
//     Confirm  = UPCOMING -> circle-check icon, gray outline
//
//   checkout.html (activeStep=1):
//     Cart     = DONE     -> checkmark icon, blue circle, blue
//                           label, connector after it is BLUE
//     Checkout = ACTIVE   -> pin icon, blue circle, blue label,
//                           connector after it is GRAY
//     Confirm  = UPCOMING -> circle-check icon, gray outline
//
// HOW IT BECOMES DYNAMIC (beginner notes):
//   Each page just passes its position:
//     /cart      -> <CartStepper activeStep={0} highlightNext />
//     /checkout  -> <CartStepper activeStep={1} />
//     /confirm   -> <CartStepper activeStep={2} />
// ================================================================

/* Per-step icons (same artwork as the HTML files) */
const STEP_ICONS: Record<number, React.ReactNode> = {
  0: (
    // Shopping-cart icon
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  ),
  1: (
    // Map-pin icon
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  2: (
    // Circle-check icon (used for the upcoming Confirm step)
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 12l2 2 4-4" />
      <circle cx="12" cy="12" r="9" />
    </svg>
  ),
};

/* Small plain checkmark drawn INSIDE a completed step's circle */
const DoneCheck = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const STEPS = [
  { label: "Cart" },
  { label: "Checkout" },
  { label: "Confirm" },
] as const;

interface CartStepperProps {
  activeStep?: number; // 0 = Cart, 1 = Checkout, 2 = Confirm
  /* cart.html colors the NEXT step's circle blue too (with a gray
     label). Pass `highlightNext` on the cart page only. */
  highlightNext?: boolean;
}

const CartStepper = ({ activeStep = 0, highlightNext = false }: CartStepperProps) => {
  return (
    <div className="flex items-center justify-center max-w-[380px] mx-auto mb-10">
      {STEPS.map((step, index) => {
        const isDone = index < activeStep;
        const isActive = index === activeStep;
        // "Reached" = blue circle but not necessarily the current step
        const isReached =
          isActive || isDone || (highlightNext && index === activeStep + 1);
        const isLast = index === STEPS.length - 1;

        /* ---- Circle styling ---- */
        const circleClass = isDone
          ? "border-color4 bg-color4 text-white"
          : isReached
            ? "border-color4 bg-color4 text-white"
            : "border-color11 bg-white text-color1";

        /* ---- What sits inside the circle ---- */
        const inner = isDone ? (
          <DoneCheck /> // completed steps show a plain checkmark
        ) : (
          STEP_ICONS[index]
        );

        /* ---- Label styling ---- */
        const labelClass = isDone || isActive
          ? "text-color4 font-semibold"
          : "text-gray-500";

        /* ---- Connector line AFTER this step ----
           Blue when this step is DONE (matches checkout.html),
           blue when ACTIVE on the cart page, gray otherwise. */
        const lineClass = isDone
          ? "after:bg-color4"
          : isActive
            ? highlightNext
              ? "after:bg-blue-600" // cart.html draws the first line blue
              : "after:bg-color11"
            : "after:bg-color11";

        return (
          <div
            key={step.label}
            className={`flex flex-col items-center gap-1.5 relative flex-1 ${
              !isLast
                ? `after:content-[''] after:absolute after:top-[14px] after:left-[55%] after:w-[90%] after:h-[2px] after:z-[1] ${lineClass}`
                : ""
            }`}
          >
            {/* Step Circle */}
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center z-[2] border-2 ${circleClass}`}
            >
              {inner}
            </div>

            {/* Step Label */}
            <div className={`font-albert text-[12px] lg:text-[16px] ${labelClass}`}>
              {step.label}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CartStepper;
