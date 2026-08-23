export const personalInputs = [
  { name: "name", label: "Full Legal Name", type: "text" },
  { name: "email", label: "Professional Email", type: "email" },
  { name: "dob", label: "Date Of Birth", type: "date" },
  { name: "phone", label: "Phone Number", type: "text" },
  {
    name: "password",
    label: "Enter Your Password",
    type: "password",
  },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    type: "password",
  },
];

export const expertiseInputs = [
  {
    name: "experience",
    label: "Years Of Experience",
    type: "select",
    options: [
      "1 Year",
      "2 Years",
      "3 Years",
      "4 Years",
      "5 Years",
      "6 Years",
      "7 Years",
      "8 Years",
      "9 Years",
      "10+ Years",
    ],
  },
  {
    name: "primary_skill",
    label: "Primary Skill Set",
    type: "text",
    placeholder: "e.g. Residential Plumbing",
  },
];

export const bankInputs = [
  { name: "account_holder", label: "Account Holder Name", type: "text" },
  { name: "bank_name", label: "Bank Name", type: "text" },
  { name: "ifsc_code", label: "IFSC Code", type: "text" },
  { name: "account_number", label: "Account Number", type: "text" },
];
