"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import loginIllus from "@/assets/images/Main Illustration Container.png";
import googleIcon from "@/assets/images/Vector.png";
import DynamicInput from "../components/common/DyanmicInput";
import { loginInputFields } from "@/services/json/login.input";
import { loginSchema } from "@/services/validation/login.validation";
import { useAuthStore } from "@/store/useAuthStore";
import { LoginPayload } from "@/types/interface/auth.interface";

interface LoginFormProps {
  onClose: () => void;
  onSwitchToSignup: () => void;
}

export default function LoginForm({
  onClose,
  onSwitchToSignup,
}: LoginFormProps) {
  const router = useRouter();
  const { loginUser, isLoading, isError } = useAuthStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginPayload>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: LoginPayload) => {
    try {
      const res = await loginUser(data);
      console.log("Response ", res);

      // Based on your useAuthStore, res.user is set upon success
      if (res.success && res.data) {
        toast.success(res.message || "Login successful!");
        reset();

        // Route based on role
        if (res.data.role === "admin") {
          router.push("/admin/dashboard");
        } else {
          router.push("/");
        }

        onClose(); // Close the modal
      } else {
        toast.error(res.message || "Login failed");
      }
    } catch (error) {
      const err = error as { message: string };
      console.log("error in login form ", err.message);
      toast.error(err.message || "Something went wrong");
    }
  };

  const btnClass =
    "relative overflow-hidden rounded-[20px] z-10 transition-colors duration-300 before:absolute before:inset-0 before:-z-10 before:w-full before:h-full before:bg-color-15 before:-translate-x-full before:transition-transform before:duration-500 hover:before:translate-x-0 hover:text-white disabled:opacity-70 disabled:cursor-not-allowed";

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/30 backdrop-blur-sm py-[20px] lg:py-[36px] flex items-center justify-center">
      <div className="max-w-[1350px] mx-auto px-[15px] flex items-center justify-center min-h-full w-full">
        <section className="flex flex-col lg:flex-row lg:flex-nowrap w-full max-w-[1320px] bg-color2 rounded-[20px] overflow-hidden shadow-[0px_4px_52.7px_0px_#FFFFFF]">
          <div className="relative z-0 w-full lg:w-1/2 shrink-0 min-h-[260px] sm:min-h-[380px] bg-[linear-gradient(180deg,_#DDF0FC_13%,_#2772CC_86%)] overflow-hidden rounded-none lg:rounded-tr-[70px] lg:rounded-br-[70px] flex items-center justify-center p-6 lg:p-0">
            <span className="absolute top-[36px] left-[42px] w-[128px] h-[32px] rounded-full bg-white/20"></span>
            <span className="absolute top-[58px] right-[92px] w-[192px] h-[40px] rounded-full bg-white/20"></span>
            <figure className="w-[220px] sm:w-[320px] md:w-[420px] lg:w-[560px] max-w-full">
              <img
                src={loginIllus.src}
                alt="Login Illustration"
                className="block w-full h-auto object-contain"
              />
            </figure>
          </div>

          <div className="w-full lg:w-1/2 shrink-0 min-w-0 bg-color2 pt-[30px] pb-[35px] px-[20px] sm:px-[35px] md:px-[50px] lg:px-[70px] lg:py-[40px]">
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="text-[24px] font-semibold text-color10 hover:text-gray-600 transition-colors duration-300"
              >
                &times;
              </button>
            </div>
            <div className="mt-[5px]">
              <h2 className="text-[32px] font-semibold leading-none text-color10 font-[family-name:var(--outfit-r)]">
                Welcome Back
              </h2>
              <p className="mt-[12px] text-[16px] text-color1">
                Login to continue your account.
              </p>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-[24px] lg:mt-[30px]"
            >
              <div className="space-y-[20px]">
                {loginInputFields.map((field) => (
                  <div key={field.name}>
                    <DynamicInput
                      name={field.name}
                      label={field.label}
                      type={field.type}
                      register={register}
                      error={errors[field.name as keyof LoginPayload]?.message}
                    />
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between mt-[24px]">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-[20px] h-[20px] accent-color4"
                  />
                  <span className="ml-[10px] text-[15px] text-color1">
                    Remember Me
                  </span>
                </label>
                <Link
                  href="#"
                  className="text-[15px] font-medium text-color4 hover:text-color-15 transition-all duration-300"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Display Backend Error if API fails */}
              {isError && (
                <div className="text-red-500 text-sm mt-3 text-center font-medium">
                  {isError}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className={`${btnClass} w-full h-[60px] mt-[20px] bg-color4 flex items-center justify-center text-[18px] font-semibold text-white`}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">Logging in...</span>
                ) : (
                  <>
                    Login
                    <svg
                      className="ml-[16px] transition-transform duration-500 group-hover:translate-x-1"
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M5 12H19M13 6L19 12L13 18"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </>
                )}
              </button>

              <div className="flex items-center my-[16px]">
                <div className="w-full h-[1px] bg-[#9CA3AF]"></div>
                <span className="mx-[20px] text-[16px] font-medium text-[#9CA3AF]">
                  OR
                </span>
                <div className="w-full h-[1px] bg-[#9CA3AF]"></div>
              </div>

              <div className="flex flex-col sm:flex-row justify-between mt-[16px]">
                <button
                  type="button"
                  className="group w-full sm:w-[48%] mb-[10px] sm:mb-0 h-[56px] rounded-[20px] border-2 border-color4 flex items-center justify-center hover:bg-color-15 hover:border-color-15 transition-all duration-500"
                >
                  <span className="text-[14px] font-semibold text-color4 group-hover:text-color2 capitalize">
                    Continue with Google
                  </span>
                  <img
                    src={googleIcon.src}
                    alt="google"
                    className="object-contain ms-[12px] w-5 h-5"
                  />
                </button>
                <button
                  type="button"
                  className="group w-full sm:w-[48%] h-[56px] rounded-[20px] border-2 border-color4 flex items-center justify-center hover:bg-color-15 hover:border-color-15 transition-all duration-500"
                >
                  <span className="text-[14px] font-semibold text-color4 group-hover:text-color2">
                    Continue with
                  </span>
                  <i className="fa-brands fa-apple text-[24px] ms-[12px] text-color4 group-hover:text-white transition-colors"></i>
                </button>
              </div>

              <p className="mt-[20px] sm:mt-[24px] text-center text-[14px] sm:text-[16px] font-medium text-color1">
                Don't Have An Account?{" "}
                <button
                  type="button"
                  onClick={onSwitchToSignup}
                  className="font-semibold text-color4 hover:text-color-15 transition-colors duration-300"
                >
                  Sign Up
                </button>
              </p>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
