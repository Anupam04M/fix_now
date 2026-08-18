"use client";

import { memo, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// I added 'options' here. Make sure to update your actual DynamicInputProps type file!
interface ExtendedDynamicInputProps {
  label: string;
  name: string;
  type?: string;
  register: any;
  error?: string;
  isTextarea?: boolean;
  rows?: number;
  disabled?: boolean;
  options?: string[]; // Added this to accept our dropdown arrays
}

const DynamicInput = ({
  label,
  name,
  type = "text",
  register,
  error,
  isTextarea = false,
  rows = 4,
  disabled = false,
  options = [], // Default to empty array
}: ExtendedDynamicInputProps) => {
  // Swap this with your actual DynamicInputProps once updated
  const [showPassword, setShowPassword] = useState(false);

  const inputType =
    type === "password" ? (showPassword ? "text" : "password") : type;

  return (
    <div className="space-y-2 mb-3">
      <Label htmlFor={name}>{label}</Label>

      {/* 1. Handle Select Dropdowns */}
      {type === "select" ? (
        <select
          id={name}
          {...register(name)}
          disabled={disabled}
          // Mimicking standard shadcn/ui input classes for consistency
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <option value="" disabled hidden>
            Select {label}
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : /* 2. Handle Textareas */
      isTextarea ? (
        <Textarea
          id={name}
          rows={rows}
          {...register(name)}
          className="transition-all focus:ring-2 focus:ring-purple-500"
          disabled={disabled}
        />
      ) : (
        /* 3. Handle Standard Inputs (Text, Number, Password, Date) */
        <div className="relative">
          <Input
            id={name}
            type={inputType}
            {...register(name)}
            className={`transition-all focus:ring-2 focus:ring-purple-500 ${
              type === "password" ? "pr-10" : ""
            }`}
            disabled={disabled}
          />

          {type === "password" && (
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}
        </div>
      )}

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default memo(DynamicInput);
