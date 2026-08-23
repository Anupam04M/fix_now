// 1. Personal Information
export const personalInfoInputs = [
  { name: "fullName", label: "Full Name", type: "text" },
  { name: "email", label: "Email Address", type: "email" },
  { name: "phone", label: "Phone Number", type: "tel" },
  { name: "altPhone", label: "Alternative Phone Number", type: "tel" },
];

// 2. Address Information
export const addressInfoInputs = [
  { name: "houseBuildingNo", label: "House / Flat / Building No.", type: "text" },
  { name: "streetLocality", label: "Street / Area / Locality", type: "text" },
  { name: "city", label: "City / Town", type: "text" },
  { name: "pinCode", label: "PIN Code", type: "text" },
  { name: "landmark", label: "Landmark (Optional)", type: "text" },
];

// 3. Additional Information
export const additionalInfoInputs = [
  { name: "dob", label: "Date Of Birth", type: "text" },
];

// 4. Dropdown Options (For State, Language, and Gender selects)
export const selectOptions = {
  state: [
    { value: "West Bengal", label: "West Bengal" },
    { value: "Maharashtra", label: "Maharashtra" },
    { value: "Delhi", label: "Delhi" },
  ],
  language: [
    { value: "English", label: "English" },
    { value: "Bengali", label: "Bengali" },
    { value: "Hindi", label: "Hindi" },
  ],
  gender: [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
  ]
};