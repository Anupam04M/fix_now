import * as yup from "yup";

export const providerRegistrationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  dob: yup.string().required("Date of birth is required"),
  phone: yup.string().required("Phone is required"),
  password: yup.string().min(6, "Must be at least 6 characters").required("Password is required"),
  confirmPassword: yup.string()
    .oneOf([yup.ref("password"), undefined, ""], "Passwords must match")
    .required("Confirm your password"),
  experience: yup.string().required("Experience is required"),
  primary_skill: yup.string().required("Primary skill is required"),
  bio: yup.string().required("Bio is required"),
  categories: yup.array().of(yup.string()).min(1, "Select at least one category"),
  base_location: yup.string().required("Base location is required"),
  service_radius: yup.number().default(20),
  account_holder: yup.string().required("Account holder required"),
  bank_name: yup.string().required("Bank name required"),
  ifsc_code: yup.string().required("IFSC code required"),
  account_number: yup.string().required("Account number required"),
});