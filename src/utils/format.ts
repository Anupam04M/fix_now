// src/utils/format.ts
// ================================================================
// FORMAT HELPERS
// ================================================================

// Format a number as Indian Rupees, e.g. 1049 -> "₹1,049".
export const formatINR = (amount: number): string => {
  return `₹${amount.toLocaleString("en-IN", {
    maximumFractionDigits: 2,
  })}`;
};