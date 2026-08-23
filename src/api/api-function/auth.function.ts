import api from "./axios.instance";
import { LoginPayload, SignupPayload } from "@/types/interface/auth.interface";
import { setCookie } from "cookies-next";

export const signupFns = async (
  payload: SignupPayload,
  endpointRole: "customer" | "provider",
) => {
  try {
    // Map the UI payload to match the exact API requirements
    const apiPayload = {
      name: `${payload.firstName} ${payload.lastName}`.trim(),
      email: payload.email,
      phone: payload.phone,
      password: payload.password,
      password_confirmation: payload.confirmPassword,
      device_name: "web-client", // Required by the API for tracking
    };

    // The endpoint changes dynamically based on whether it's a customer or provider
    const endpoint = `/auth/register/${endpointRole}`;

    const { data } = await api.post(endpoint, apiPayload);

    return {
      success: true,
      message: data.message || "Registration successful! Please login.",
      data: data.data,
    };
  } catch (error: any) {
    console.error("Signup Error:", error);
    return {
      success: false,
      // Attempt to extract the backend's specific error message if it exists
      message:
        error.response?.data?.message || error.message || "Signup Failed",
    };
  }
};

export const loginFns = async (payload: LoginPayload) => {
  try {
    const apiPayload = {
      email: payload.email,
      password: payload.password,
      device_name: "web-client", // Required by the API for login
    };

    const { data } = await api.post("/auth/login", apiPayload);

    // Based on the FixNow API docs, the response nests user and token inside 'data'
    const userProfile = data.data.user;
    const token = data.data.token;

    // Set Next.js Client-Side Cookies (Valid for 7 days)
    const SEVEN_DAYS_IN_SECONDS = 60 * 60 * 24 * 7;
    setCookie("token", token, { maxAge: SEVEN_DAYS_IN_SECONDS });
    setCookie("role", userProfile.role, { maxAge: SEVEN_DAYS_IN_SECONDS });
    setCookie("user", JSON.stringify(userProfile), {
      maxAge: SEVEN_DAYS_IN_SECONDS,
    });

    return {
      success: true,
      message: data.message || "Login Successful",
      data: userProfile,
    };
  } catch (error: any) {
    console.error("Login Error:", error);
    return {
      success: false,
      message: error.response?.data?.message || error.message || "Login Failed",
    };
  }
};

export const logoutFns = async () => {
  try {
    // Call the backend logout endpoint to securely invalidate the token[cite: 1]
    await api.post("/auth/logout");
    return { success: true };
  } catch (error) {
    console.error("Logout API Error:", error);
    // If the server request fails (e.g., token already expired), we still return false
    // so Zustand knows to wipe the local cookies anyway.
    return { success: false };
  }
};
export const registerProviderFn = async (payload: FormData) => {
  // We do NOT use try/catch here so that React Query's `onError` in the hook
  // can automatically catch the error and display the correct toast message!
  const { data } = await api.post("/auth/register/provider", payload);
  return data;
};
