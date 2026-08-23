"use client";

// src/app/(customerpanel)/contact/page.tsx
// ================================================================
// CONTACT US PAGE  (route: /contact)
// ----------------------------------------------------------------
// Pixel-matched 1:1 to FIX_Now_HTML/FIX_Now/contact-us.html:
//   - Banner photo + bottom white fade (.contact-banner::after)
//   - Left/right amber & blue decorative blur orbs (::before/::after)
//   - Blue Phone card + yellow Email card
//   - Google Maps embed (same coordinates as the HTML)
//   - Contact form with Name / Email / Subject / Message
//
// CURRENT STATE = STATIC/FUNCTIONAL-LOCAL:
//   The form validates in the browser and shows a success note.
//   Nothing is sent anywhere yet.
//
// HOW TO MAKE THIS PAGE FULLY DYNAMIC (beginner guide)
// ============================================================
//   STEP 1 - FORM SUBMISSION -> backend API
//     The FixNow backend doesn't expose a public contact endpoint
//     yet, so ask your Laravel teammate for one, e.g.:
//         POST {{base_url}}/support/contact
//         Body: { name, email, subject, message }
//     Then create an API function following project convention:
//
//       // src/api/api-function/contact.function.ts
//       export const submitContactFn = async (payload: {
//         name: string; email: string; subject?: string; message: string;
//       }) => {
//         try {
//           const res = await axios.post(`${BASE_URL}/support/contact`, payload);
//           return { success: true, message: res.data.message };
//         } catch {
//           return { success: false, message: "Could not send message" };
//         }
//       };
//
//   STEP 2 - HOOK IT UP IN handleSubmit BELOW:
//
//       const [isSending, setIsSending] = useState(false);
//       const handleSubmit = async (e) => {
//         e.preventDefault();
//         setIsSending(true);
//         const res = await submitContactFn(formData);
//         setIsSending(false);
//         if (res.success) { setSubmitted(true); reset fields... }
//         else toast.error(res.message);      // sonner toast
//       };
//
//     Disable the button while isSending to stop double submits.
//
//   STEP 3 - VALIDATION UPGRADE:
//     Browser `required` works today. For nicer UX use the project's
//     existing yup schemas like src/services/validation/login.validation.ts,
//     or react-hook-form exactly like SignupForm does.
//
//   STEP 4 - PHONE / EMAIL CARDS FROM SETTINGS:
//     Hardcoded "+91 98765 43210" / "info@fixnow.com" can come from a
//     site-settings endpoint (admin-editable per the project scope):
//         GET {{base_url}}/settings  ->  { support_phone, support_email }
//     Fetch once and render into the two cards below.
//
//   STEP 5 - MAP EMBED:
//     The iframe URL is hardcoded (same as HTML). To make admin-
//     editable, store lat/lng in settings and build:
//         `https://maps.google.com/maps?q=${lat},${lng}&output=embed`
// ============================================================

import { useState } from "react";
import bannerImg from "@/assets/images/contact-us/contact-us-banner-img.jpeg";

const ContactUs = () => {
  /* ---------------- FORM STATE ---------------- */
  // One object holds all four inputs; each field updates by name.
  // Dynamic later: send this whole object to the API (STEP 2 above).
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // Flips to true after a successful "send" so we can show feedback.
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (submitted) setSubmitted(false); // hide old success note when editing
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    /* STATIC behaviour: just show the success note locally.
       Dynamic version lives in STEP 1-2 of the guide above:
       await submitContactFn(formData) then toast success/error. */
    setSubmitted(true);
  };

  return (
    <main>
      {/* ================= contact banner starts ================= */}
      {/* .contact-banner = full-bleed photo + bottom white fade */}
      <section className="relative flex items-center overflow-hidden min-h-[360px] sm:min-h-[450px] md:min-h-[520px] lg:min-h-[644px]">
        {/* Banner photo (same visual as the HTML background image) */}
        <img
          src={bannerImg.src}
          alt="Contact Us Banner"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Bottom fade to white - copy of .contact-banner::after */}
        <div className="absolute inset-x-0 bottom-0 h-[180px] bg-[linear-gradient(to_bottom,rgba(255,255,255,0)_0%,rgba(255,255,255,.20)_25%,rgba(255,255,255,.50)_50%,rgba(255,255,255,.80)_75%,#ffffff_100%)] z-[1] pointer-events-none"></div>

        <div className="relative z-[2] max-w-[1350px] px-[15px] mx-auto text-center">
          <h1 className="text-white text-[36px] sm:text-[42px] md:text-[48px] lg:text-[56px] font-bold font-outfit leading-[1.2]">
            Contact Us
          </h1>
          {/* Amber subtitle (color-16), same as HTML heading-3 */}
          <h2 className="text-color-16 font-outfit text-[22px] sm:text-[26px] md:text-[30px] lg:text-[32px] mt-[8px] sm:mt-[10px] leading-[1.2]">
            We Are Here To Help!
          </h2>
        </div>
      </section>
      {/* ================= contact banner ends ================= */}

      {/* ================= contact area starts ================= */}
      <section className="contact-area relative overflow-hidden bg-white py-[60px] md:py-[80px] lg:py-[100px]">
        {/* LEFT blur orb - copy of .contact-area::before */}
        <div className="absolute left-[-220px] top-[60%] -translate-y-1/2 w-[650px] h-[650px] rounded-full bg-[radial-gradient(circle,rgba(245,158,11,.18)_0%,rgba(245,158,11,.10)_30%,rgba(245,158,11,.05)_55%,transparent_75%)] blur-[65px] pointer-events-none"></div>
        {/* RIGHT blur orb - copy of .contact-area::after */}
        <div className="absolute right-[-220px] top-[42%] -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(69,165,236,.22)_0%,rgba(69,165,236,.12)_28%,rgba(69,165,236,.06)_52%,transparent_75%)] blur-[65px] pointer-events-none"></div>

        <div className="max-w-[1350px] px-[15px] mx-auto relative z-[2]">
          <div className="flex flex-col lg:flex-row">
            {/* ---------- LEFT COLUMN : info + map ---------- */}
            <div className="w-full lg:w-1/2 mb-[50px] lg:mb-0 lg:pr-[26px]">
              {/* Sub Heading - amber (color-15) like the HTML */}
              <span className="inline-block mb-[16px] text-color-15 text-[16px] md:text-[18px] lg:text-[20px] font-medium font-outfit">
                Get In Touch
              </span>

              {/* Heading - navy */}
              <h2 className="max-w-[590px] mb-[36px] font-semibold text-color10 font-outfit text-[26px] sm:text-[30px] lg:text-[32px] leading-[1.2]">
                Have a question or need assistance? We&apos;re here to help.
              </h2>

              {/* Paragraph */}
              <p className="max-w-[590px] mb-[46px] text-color6 text-[16px] leading-[28px]">
                We&apos;re happy to answer your questions and guide you
                through our services. Expect a prompt response from our
                support team.
              </p>

              {/* ===== Contact Cards ===== */}
              <div className="flex flex-col sm:flex-row mb-[72px]">
                {/* PHONE - blue card.
                    Static text below; dynamic source = GET /settings
                    (guide STEP 4). href uses tel: so mobile dials it. */}
                <div className="w-full sm:w-[48%] bg-color4 rounded-[20px] p-[16px] sm:p-[20px] flex items-center mb-[20px] sm:mb-0 sm:mr-[4%]">
                  {/* Icon circle - light blue (color12) */}
                  <div className="w-[44px] h-[44px] rounded-full bg-color12 flex justify-center items-center shrink-0">
                    {/* Phone SVG (identical path to the HTML) */}
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M9.50246 4.25722C9.19873 3.4979 8.46332 3 7.64551 3H4.89474C3.8483 3 3 3.8481 3 4.89453C3 13.7892 10.2108 21 19.1055 21C20.1519 21 21 20.1516 21 19.1052L21.0005 16.354C21.0005 15.5361 20.5027 14.8009 19.7434 14.4971L17.1069 13.4429C16.4249 13.1701 15.6483 13.2929 15.0839 13.7632L14.4035 14.3307C13.6089 14.9929 12.4396 14.9402 11.7082 14.2088L9.79222 12.2911C9.06079 11.5596 9.00673 10.3913 9.66895 9.59668L10.2363 8.9163C10.7066 8.35195 10.8305 7.57516 10.5577 6.89309L9.50246 4.25722Z"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>

                  <div className="ml-[16px]">
                    <h4 className="text-white font-outfit text-[20px] font-medium mb-[10px] leading-[1.2]">
                      Phone
                    </h4>
                    <a
                      href="tel:+919876543210"
                      className="text-[16px] font-semibold text-white transition-colors duration-700 hover:text-color10"
                    >
                      +91 98765 43210
                    </a>
                  </div>
                </div>

                {/* EMAIL - yellow card (color-15). Same dynamic note. */}
                <div className="w-full sm:w-[48%] bg-color-15 rounded-[20px] p-[16px] sm:p-[20px] flex items-center">
                  {/* Icon circle - light yellow */}
                  <div className="w-[44px] h-[44px] rounded-full bg-[#FCD34D] flex justify-center items-center shrink-0">
                    {/* Envelope SVG (identical path to the HTML) */}
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M4 6L10.1076 10.6123L10.1097 10.614C10.7878 11.1113 11.1271 11.3601 11.4988 11.4562C11.8272 11.5412 12.1725 11.5412 12.501 11.4562C12.8729 11.36 13.2132 11.1105 13.8926 10.6123C13.8926 10.6123 17.8101 7.60594 20 6M3 15.8002V8.2002C3 7.08009 3 6.51962 3.21799 6.0918C3.40973 5.71547 3.71547 5.40973 4.0918 5.21799C4.51962 5 5.08009 5 6.2002 5H17.8002C18.9203 5 19.4796 5 19.9074 5.21799C20.2837 5.40973 20.5905 5.71547 20.7822 6.0918C21 6.5192 21 7.07899 21 8.19691V15.8036C21 16.9215 21 17.4805 20.7822 17.9079C20.5905 18.2842 20.2837 18.5905 19.9074 18.7822C19.48 19 18.921 19 17.8031 19H6.19691C5.07899 19 4.5192 19 4.0918 18.7822C3.71547 18.5905 3.40973 18.2842 3.21799 17.9079C3 17.4801 3 16.9203 3 15.8002Z"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>

                  <div className="ml-[16px]">
                    <h4 className="text-white font-outfit text-[20px] font-medium mb-[10px] leading-[1.2]">
                      Email
                    </h4>
                    <a
                      href="mailto:info@fixnow.com"
                      className="text-[16px] font-semibold text-white transition-colors duration-700 hover:text-color10"
                    >
                      info@fixnow.com
                    </a>
                  </div>
                </div>
              </div>

              {/* ===== Google Map =====
                   Exact embed URL copied from the HTML.
                   Dynamic later: build URL from settings lat/lng (STEP 5).
                   NOTE: next.config.ts may need the domain whitelisted if
                   you switch to the Next.js <Image>-style map approach. */}
              <div className="rounded-[20px] overflow-hidden shadow-[0_18px_45px_rgba(0,0,0,.05)]">
                <iframe
                  className="w-full h-[220px] sm:h-[260px] lg:h-[343px]"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.6010795292464!2d88.35877807475667!3d22.556611633557186!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0277023e8c0195%3A0x8649e48a66b8ace6!2sAngel%20Nursing%20Home%20Aaga%20mehdy%20street!5e0!3m2!1sen!2sin!4v1784222435621!5m2!1sen!2sin"
                  width="600"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  title="FixNow Location"
                ></iframe>
              </div>
            </div>
            {/* ---------- left ends ---------- */}

            {/* ---------- RIGHT COLUMN : contact form ---------- */}
            <div className="w-full lg:w-1/2">
              <div className="bg-white rounded-[20px] shadow-[0_10px_35px_rgba(0,0,0,.08)] p-[20px] md:p-[22px] lg:p-[24px] relative z-[2]">
                {/* Heading - navy */}
                <h3 className="font-semibold mb-[16px] text-color5 font-outfit text-[26px] sm:text-[30px] lg:text-[32px] leading-[1.2]">
                  Send Us A Message
                </h3>

                {/* Paragraph - gray */}
                <p className="text-[14px] lg:text-[16px] text-color1 mb-[36px] max-w-[580px]">
                  Have a question or need assistance? Fill out the form
                  below, and our team will get back to you as soon as possible.
                </p>

                {/* Form - all four fields bound to formData state.
                    Dynamic later: swap handleSubmit for the API call
                    (guide STEPS 1-3). */}
                <form onSubmit={handleSubmit}>
                  {/* Name */}
                  <div className="mb-[16px]">
                    <label
                      htmlFor="name"
                      className="block text-[14px] lg:text-[16px] font-semibold text-black mb-[10px]"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Enter Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full h-[50px] md:h-[55px] lg:h-[57px] rounded-[20px] border border-color1 p-[20px] outline-none focus:border-color1 transition-all duration-300 placeholder:text-color1 text-black"
                    />
                  </div>

                  {/* Email */}
                  <div className="mb-[16px]">
                    <label
                      htmlFor="email"
                      className="block text-[14px] lg:text-[16px] font-semibold text-black mb-[10px]"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Enter Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full h-[50px] md:h-[55px] lg:h-[57px] rounded-[20px] border border-color1 p-[20px] outline-none focus:border-color1 transition-all duration-300 placeholder:text-color1 text-black"
                    />
                  </div>

                  {/* Subject */}
                  <div className="mb-[16px]">
                    <label
                      htmlFor="subject"
                      className="block text-[14px] lg:text-[16px] font-semibold text-black mb-[10px]"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      placeholder="What Can We Help You With"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full h-[50px] md:h-[55px] lg:h-[57px] rounded-[20px] border border-color1 p-[20px] outline-none focus:border-color1 transition-all duration-300 placeholder:text-color1 text-black"
                    />
                  </div>

                  {/* Message */}
                  <div className="mb-[16px]">
                    <label
                      htmlFor="message"
                      className="block text-[14px] lg:text-[16px] font-semibold text-black mb-[10px]"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      placeholder="Tell Us About Your Enquiry"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full h-[150px] md:h-[170px] lg:h-[200px] rounded-[20px] border border-color1 p-[20px] resize-none outline-none focus:border-color1 transition-all duration-300 placeholder:text-color1 text-black"
                    ></textarea>
                  </div>

                  {/* Button - blue with shine sweep on hover (matches HTML) */}
                  <div className="flex justify-center lg:justify-end">
                    <button
                      type="submit"
                      className="relative overflow-hidden bg-color4 z-10 py-[16px] px-[36px] rounded-[20px] text-[16px] font-semibold text-white border-0 transition-all duration-500 hover:bg-color-15 hover:-translate-y-[3px] after:absolute after:top-0 after:left-[-120%] after:w-[50%] after:h-full after:bg-white/40 after:skew-x-[-25deg] after:transition-all after:duration-700 hover:after:left-[150%]"
                    >
                      Send Now
                    </button>
                  </div>
                </form>

                {/* Local success note - appears only after submitting.
                    This is NOT part of the HTML mockup; it gives the
                    static form visible feedback until the API exists. */}
                {submitted && (
                  <div className="mt-[24px] rounded-[20px] bg-green-50 border border-green-200 p-[18px] flex items-start gap-[12px]">
                    <span className="text-[18px]">&#10004;</span>
                    <p className="text-[14px] text-[#1a4a2c] font-medium leading-relaxed">
                      Thanks {formData.name || "for reaching out"}! Your message
                      has been received and our support team will get back to
                      you shortly.
                    </p>
                  </div>
                )}
              </div>
            </div>
            {/* ---------- form ends ---------- */}
          </div>
        </div>
      </section>
      {/* ================= contact area ends ================= */}
    </main>
  );
};

export default ContactUs;
