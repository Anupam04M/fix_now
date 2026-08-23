// src/store/useCategoryWizard.ts
import { create } from "zustand";

export interface SubcategoryItem {
  id: number | string;
  name: string;
  description?: string;
  category_id?: number | string;
  [key: string]: any;
}

interface ImageState {
  file: File | null;
  preview: string | null;
}

interface CategoryWizardStore {
  // Step 1: Created Category ID & Banner
  createdCategoryId: number | null;
  categoryBanner: ImageState;
  setCreatedCategoryId: (id: number | null) => void;
  setCategoryBanner: (file: File | null, preview?: string | null) => void;

  // Step 2: Subcategories List & Banner
  activeSubcategories: SubcategoryItem[];
  subcategoryBanner: ImageState;
  setActiveSubcategories: (subcategories: SubcategoryItem[]) => void;
  addSubcategory: (subcategory: SubcategoryItem) => void;
  removeSubcategory: (id: number | string) => void;
  setSubcategoryBanner: (file: File | null, preview?: string | null) => void;

  // Global Actions
  resetWizard: () => void;
}

const initialImageState: ImageState = {
  file: null,
  preview: null,
};

export const useCategoryWizard = create<CategoryWizardStore>((set) => ({
  // Initial States
  createdCategoryId: null,
  categoryBanner: initialImageState,
  activeSubcategories: [],
  subcategoryBanner: initialImageState,

  // Step 1 Actions
  setCreatedCategoryId: (id) => set({ createdCategoryId: id }),
  setCategoryBanner: (file, preview = null) =>
    set({
      categoryBanner: {
        file,
        preview: preview || (file ? URL.createObjectURL(file) : null),
      },
    }),

  // Step 2 Actions
  setActiveSubcategories: (subcategories) =>
    set({ activeSubcategories: subcategories }),

  addSubcategory: (subcategory) =>
    set((state) => ({
      activeSubcategories: [...state.activeSubcategories, subcategory],
    })),

  removeSubcategory: (id) =>
    set((state) => ({
      activeSubcategories: state.activeSubcategories.filter(
        (sub) => sub.id !== id,
      ),
    })),

  setSubcategoryBanner: (file, preview = null) =>
    set({
      subcategoryBanner: {
        file,
        preview: preview || (file ? URL.createObjectURL(file) : null),
      },
    }),

  // Clear everything when complete or canceled
  resetWizard: () =>
    set({
      createdCategoryId: null,
      categoryBanner: initialImageState,
      activeSubcategories: [],
      subcategoryBanner: initialImageState,
    }),
}));
