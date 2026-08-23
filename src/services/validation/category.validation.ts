import * as yup from "yup";

export const categorySchema = yup.object().shape({
  name: yup.string().required("Category name is required"),
  slug: yup.string().optional(),
  description: yup.string().optional(),
  meta_title: yup.string().optional(),
  meta_description: yup.string().optional(),
  show_in_home: yup.boolean().default(true),
  is_active: yup.boolean().default(true),
  is_featured: yup.boolean().default(false),
});

export const subcategorySchema = yup.object().shape({
  name: yup.string().required("Subcategory name is required"),
  description: yup.string().optional(),
});

export const serviceSchema = yup.object().shape({
  subcategory_id: yup.string().required("Please select a subcategory"),
  name: yup.string().required("Service name is required"),
  description: yup.string().optional(),
  is_active: yup.boolean().default(true),
});