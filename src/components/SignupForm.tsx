"use client";

import React from "react";
import Link from "next/link";
import { useForm, type Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import signupIllus from "@/assets/images/Create Account Illustration.png";
import googleIcon from "@/assets/images/Vector.png";
import DynamicInput from "../components/common/DyanmicInput";
import { signupInputFields } from "@/services/json/signup.input";
import { signupSchema } from "@/services/validation/signup.validation";
import { useAuthStore } from "@/store/useAuthStore";
import { SignupPayload } from "@/types/interface/auth.interface";

interface SignupFormProps {
  onClose: () => void;
  onSwitchToLogin: () => void;
}

export default function SignupForm({
  onClose,
  onSwitchToLogin,
}: SignupFormProps) {
  const router = useRouter();
  const { signupUser, isLoading, isError } = useAuthStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignupPayload>({
    resolver: yupResolver(signupSchema) as Resolver<SignupPayload>,
  });
  const onSubmit = async (data: SignupPayload) => {
    try {
      const res = await signupUser(data, "customer");
      console.log("Response ", res);

      if (res.success) {
        toast.success(res.message || "Account created successfully!");
        reset();
        onSwitchToLogin(); // Switches to login view after successful registration
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      const err = error as { message: string };
      console.log("error in signup form ", err.message);
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
            <span className="absolute top-[20px] left-[20px] sm:top-[30px] sm:left-[30px] lg:top-[36px] lg:left-[42px] w-[90px] h-[24px] sm:w-[110px] sm:h-[28px] lg:w-[128px] lg:h-[32px] rounded-full bg-white/20 pointer-events-none"></span>
            <span className="absolute top-[40px] right-[20px] sm:top-[50px] sm:right-[50px] lg:top-[58px] lg:right-[92px] w-[130px] h-[30px] sm:w-[160px] sm:h-[35px] lg:w-[192px] lg:h-[40px] rounded-full bg-white/20 pointer-events-none"></span>
            <figure className="w-[220px] sm:w-[320px] md:w-[420px] lg:w-[560px] max-w-full">
              <img
                src={signupIllus.src}
                alt="Create Account"
                className="block w-full h-auto object-contain"
              />
            </figure>
          </div>

          <div className="w-full lg:w-1/2 shrink-0 min-w-0 bg-color2 pt-[30px] pb-[35px] px-[20px] sm:px-[35px] md:px-[50px] lg:px-[70px] lg:py-[40px]">
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="text-[16px] font-semibold text-color4 hover:text-color-15 transition-colors duration-300"
              >
                Skip
              </button>
            </div>
            <div className="mt-[5px]">
              <h2 className="text-[28px] sm:text-[32px] lg:text-[32px] leading-none font-semibold text-color10 font-[family-name:var(--outfit-r)]">
                Create An Account
              </h2>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-[24px] lg:mt-[30px]"
            >
              <div className="flex flex-wrap justify-between gap-y-[16px]">
                {signupInputFields.map((field) => (
                  <div key={field.name} className={field.wrapperClass}>
                    <DynamicInput
                      name={field.name}
                      label={field.label}
                      type={field.type}
                      register={register}
                      error={
                        errors[field.name as keyof SignupPayload]
                          ?.message as string
                      }
                    />
                  </div>
                ))}
              </div>

              <div className="flex items-start mt-[16px]">
                <input
                  id="terms"
                  type="checkbox"
                  {...register("terms")}
                  className="w-[22px] h-[22px] mt-[2px] rounded-[6px] accent-[#F4F1EC] flex-shrink-0"
                />
                <label
                  htmlFor="terms"
                  className="ml-[5.5px] text-[14px] sm:text-[16px] leading-6 text-color1"
                >
                  I Agree To The{" "}
                  <Link
                    href="#"
                    className="font-semibold text-color10 hover:text-color-15 transition-colors duration-300"
                  >
                    Terms & Conditions
                  </Link>
                </label>
              </div>
              {/* Display Yup validation error for terms if applicable */}
              {errors.terms && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors.terms.message || "You must agree to the terms."}
                </span>
              )}

              {/* Display Backend Error if API fails */}
              {isError && (
                <div className="text-red-500 text-sm mt-3 text-center font-medium">
                  {isError}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className={`${btnClass} group w-full h-[60px] mt-[16px] bg-color4 flex items-center justify-center text-[15px] sm:text-[16px] font-semibold text-color2`}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    Creating Account...
                    {/* Optional: You can import Loader2 from lucide-react here just like your sample */}
                  </span>
                ) : (
                  <>
                    Create Account
                    <svg
                      className="ml-[16px] transition-transform duration-500 ease-in-out group-hover:translate-x-1"
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
                <span className="mx-[14px] sm:mx-[20px] text-[14px] sm:text-[16px] font-medium text-[#9CA3AF]">
                  OR
                </span>
                <div className="w-full h-[1px] bg-[#9CA3AF]"></div>
              </div>

              <div className="flex flex-col sm:flex-row justify-between mt-[16px]">
                <button
                  type="button"
                  className="group relative overflow-hidden z-10 w-full sm:w-[48%] mb-[10px] sm:mb-0 h-[56px] rounded-[20px] border-2 border-color4 flex items-center justify-center transition-all duration-500 hover:bg-color-15 hover:border-color-15 hover:-translate-y-[3px] after:absolute after:top-0 after:left-[-120%] after:w-[50%] after:h-full after:bg-white/40 after:skew-x-[-25deg] after:transition-all after:duration-700 hover:after:left-[150%]"
                >
                  <span className="mr-[12px] lg:mr-[16px] text-[14px] sm:text-[15px] lg:text-[16px] font-semibold text-color4 transition-colors duration-500 group-hover:text-color2">
                    Continue With
                  </span>
                  <svg
                    className="text-color4 group-hover:text-color2"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.9892 0.000179964C12.0366 0.000280848 12.0841 0.000381732 12.1331 0.000485674C12.815 0.00281232 13.4816 0.0175196 14.1518 0.155241C14.1983 0.164292 14.2448 0.173343 14.2927 0.182669C16.9684 0.713372 19.0749 2.07541 20.9605 3.99372C20.8962 4.13864 20.8225 4.23746 20.7108 4.34921C20.6785 4.38176 20.6462 4.41431 20.6129 4.44786C20.5775 4.48308 20.5421 4.5183 20.5056 4.55458C20.4683 4.59205 20.4309 4.62951 20.3925 4.66812C20.2691 4.79194 20.1453 4.91543 20.0216 5.03892C19.9359 5.12469 19.8503 5.21048 19.7648 5.29629C19.5625 5.49905 19.3599 5.7016 19.1573 5.90404C18.9266 6.13457 18.6962 6.36537 18.4658 6.59618C17.9919 7.0709 17.5176 7.54528 17.0432 8.01945C16.8508 7.93136 16.7265 7.79982 16.5826 7.64788C15.6833 6.72534 14.5724 6.0941 13.3124 5.81934C13.2441 5.80441 13.2441 5.80441 13.1743 5.78917C11.5705 5.48262 9.89012 5.83051 8.53293 6.73526C8.3126 6.88666 8.10442 7.04787 7.90282 7.22366C7.83781 7.27797 7.83781 7.27797 7.77148 7.33338C6.63257 8.32307 5.94644 9.7607 5.75764 11.2494C5.71524 12.0705 5.71865 12.8883 5.94418 13.6835C5.95266 13.7148 5.96114 13.746 5.96988 13.7781C6.21091 14.6458 6.67316 15.4336 7.24994 16.1177C7.28204 16.1563 7.31414 16.1948 7.34722 16.2345C8.40228 17.4599 9.96612 18.1562 11.556 18.3052C13.286 18.4279 14.95 17.8084 16.2504 16.6794C16.8223 16.1641 17.2062 15.5641 17.6028 14.9006C15.7561 14.9006 13.9093 14.9006 12.0066 14.9006C12.0066 13.0315 12.0066 11.1623 12.0066 9.23652C15.854 9.23652 19.7013 9.23652 23.6652 9.23652C24.0261 10.8061 24.1292 12.5627 23.8051 14.1517C23.7961 14.1983 23.7871 14.245 23.7778 14.293C23.3992 16.2164 22.5892 17.9528 21.3802 19.4881C21.3423 19.5367 21.3044 19.5852 21.2654 19.6353C20.6744 20.3642 19.9954 21.0451 19.235 21.5946C19.1815 21.6344 19.1281 21.6744 19.0747 21.7143C18.6927 21.9974 18.2958 22.2495 17.8826 22.484C17.8496 22.5028 17.8166 22.5216 17.7826 22.541C16.7317 23.1349 15.6002 23.5306 14.4229 23.783C14.3798 23.7923 14.3366 23.8016 14.2922 23.8112C13.5364 23.9653 12.7934 23.9995 12.0241 23.9965C11.9529 23.9964 11.9529 23.9964 11.8802 23.9962C11.1984 23.9939 10.5315 23.9796 9.86147 23.8415C9.81425 23.8322 9.76702 23.8229 9.71837 23.8133C7.80204 23.4286 6.07959 22.6122 4.54514 21.4073C4.52 21.3877 4.49486 21.3681 4.46895 21.3479C3.71139 20.7502 3.00951 20.039 2.4466 19.254C2.40687 19.2003 2.3671 19.1467 2.32728 19.0931C2.04526 18.7097 1.79414 18.3113 1.56054 17.8965C1.54179 17.8634 1.52303 17.8303 1.50371 17.7962C0.51149 16.0272 0.046034 14.0404 0.053669 12.0188C0.0537695 11.9711 0.05387 11.9233 0.0539735 11.874C0.0562894 11.1887 0.0703715 10.5185 0.208145 9.84506C0.217411 9.79767 0.226676 9.75027 0.236222 9.70143C0.685976 7.44382 1.73919 5.37184 3.33265 3.71286C3.36364 3.68048 3.39463 3.64809 3.42656 3.61473C3.86651 3.15745 4.31019 2.72675 4.82495 2.35535C4.85035 2.33687 4.87575 2.31839 4.90192 2.29935C6.34365 1.25645 7.94637 0.549693 9.68659 0.190349C9.72066 0.18327 9.75473 0.176191 9.78983 0.168897C10.5217 0.0270435 11.2456 -0.00266194 11.9892 0.000179964Z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  className="group relative overflow-hidden z-10 w-full sm:w-[48%] h-[56px] rounded-[20px] border-2 border-color4 flex items-center justify-center transition-all duration-500 hover:bg-color-15 hover:border-color-15 hover:-translate-y-[3px] after:absolute after:top-0 after:left-[-120%] after:w-[50%] after:h-full after:bg-white/40 after:skew-x-[-25deg] after:transition-all after:duration-700 hover:after:left-[150%]"
                >
                  <span className="mr-[12px] lg:mr-[16px] text-[14px] sm:text-[15px] lg:text-[16px] font-semibold text-color4 transition-colors duration-500 group-hover:text-color2">
                    Continue With
                  </span>
                  <i className="fa-brands fa-apple text-[20px] text-color4 group-hover:text-white transition-colors"></i>
                </button>
              </div>
              <p className="mt-[20px] sm:mt-[24px] text-center text-[14px] sm:text-[16px] font-medium text-color1">
                Already Have An Account?{" "}
                <button
                  type="button"
                  onClick={onSwitchToLogin}
                  className="font-semibold text-color4 hover:text-color-15 transition-colors duration-300"
                >
                  Sign In
                </button>
              </p>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
