// src/api/api-function/auth.function.ts
import { supabase } from "@/lib/supabsae.config"; // Adjust path if necessary
import { LoginPayload, SignupPayload } from "@/types/interface/auth.interface";
import { setCookie } from "cookies-next";

export const signupFns = async (payload: SignupPayload) => {
  try {
    // 1. Create the user in Supabase Auth (This handles the secure password)
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: payload.email,
      password: payload.password,
    });

    if (authError) throw authError;
    if (!authData.user) throw new Error("Auth user not created");

    const userId = authData.user.id;
    let imageURL: string | null = null;

    // 2. Handle Profile Picture Upload (if provided)
    if (payload.profilePic) {
      // Use crypto.randomUUID() to prevent file name collisions
      const filename = `${crypto.randomUUID()}-${payload.profilePic.name}`;

      const { error: imageUploadError } = await supabase.storage
        .from("profilePic-image")
        .upload(filename, payload.profilePic);

      if (imageUploadError) throw imageUploadError;

      // Retrieve the public URL for the uploaded image
      const { data: image } = supabase.storage
        .from("profilePic-image")
        .getPublicUrl(filename);

      imageURL = image.publicUrl;
    }

    // 3. Create the custom User Profile in the public `users` table
    const { data: registration, error: failedRegistration } = await supabase
      .from("users")
      .insert({
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        password: payload.password,
        role: payload.role || "buyer", // Ensure role is passed, fallback to buyer
        profilePic: imageURL,
        auth_user_id: userId,
        // CRITICAL: Do NOT insert the password here. Supabase manages it securely.
      })
      .select() // .select() ensures the newly created row is returned in `data`
      .single();

    if (failedRegistration) throw failedRegistration;

    return {
      success: true,
      message: "Signup Successfully",
      data: registration,
    };
  } catch (error: any) {
    console.error("Signup Error:", error);
    return {
      success: false,
      message: error.message || "Signup Failed",
    };
  }
};

export const loginFns = async (payload: LoginPayload) => {
  try {
    // 1. Authenticate with Supabase
    const { data: authData, error: authError } =
      await supabase.auth.signInWithPassword({
        email: payload.email,
        password: payload.password,
      });

    if (authError) throw authError;
    if (!authData.user || !authData.session)
      throw new Error("Login Failed: No session found");

    // 2. Fetch the custom user profile details
    const { data: profile, error: profileFailed } = await supabase
      .from("users")
      .select("*")
      .eq("auth_user_id", authData.user.id)
      .single();

    if (profileFailed) throw profileFailed;

    // 3. Set Next.js Client-Side Cookies (Valid for 7 days)
    const SEVEN_DAYS_IN_SECONDS = 60 * 60 * 24 * 7;

    setCookie("token", authData.session.access_token, {
      maxAge: SEVEN_DAYS_IN_SECONDS,
    });
    setCookie("role", profile.role, {
      maxAge: SEVEN_DAYS_IN_SECONDS,
    });
    setCookie("user", JSON.stringify(profile), {
      maxAge: SEVEN_DAYS_IN_SECONDS,
    });

    return {
      success: true,
      message: "Login Successfully",
      data: profile,
    };
  } catch (error: any) {
    console.error("Login Error:", error);
    return {
      success: false,
      message: error.message || "Login Failed",
    };
  }
};
