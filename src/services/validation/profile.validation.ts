import * as yup from "yup";

export const completeAccountSchema = yup.object().shape({
  // Personal Info
  fullName: yup.string().required("Full name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().required("Phone number is required"),
  altPhone: yup.string().optional(),

  // Address Info
  houseBuildingNo: yup.string().required("House/Flat/Building No. is required"),
  streetLocality: yup.string().required("Street/Area/Locality is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  pinCode: yup.string().required("PIN Code is required"),
  landmark: yup.string().optional(),

  // Additional Info
  dob: yup.string().required("dob is required"),
  language: yup.string().optional(),
  gender: yup.string().required("Gender is required"),
  
  // Preferences
  smsNotif: yup.boolean().optional(),
  whatsappNotif: yup.boolean().optional(),
  emailNotif: yup.boolean().optional(),
});

export type CompleteAccountPayload = yup.InferType<typeof completeAccountSchema>;