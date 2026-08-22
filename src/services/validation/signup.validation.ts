import * as yup from "yup";

export const signupSchema = yup.object().shape({
  firstName: yup.string().required("First Name is required."),
  lastName: yup.string().required("Last Name is required."),
  phone: yup.string().required("Phone number is required."),
  email: yup
    .string()
    .email("Please enter a valid email format.")
    .required("Email is required."),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters long.")
    .required("Password is required."),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match.")
    .required("Please confirm your password."),
  terms: yup.boolean().oneOf([true], "You must agree to the terms and conditions."),
});

// Delete your old manual interface and replace it with this:
export type SignupPayload = yup.InferType<typeof signupSchema>;