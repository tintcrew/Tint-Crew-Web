import type { Metadata } from "next";
import { SITE_CONFIG } from "@/constants/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${SITE_CONFIG.name}. Learn how we collect, use, and protect your personal information.`,
};

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-20">
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-black tracking-tight">
            Privacy Policy
          </h1>
          <p className="mt-4 text-sm text-foreground-muted">
            Last updated: April 2026
          </p>

          <div className="mt-12 prose prose-invert prose-sm max-w-none space-y-8">
            <div>
              <h2 className="text-xl font-bold mb-3">
                Information We Collect
              </h2>
              <p className="text-foreground-secondary text-sm leading-relaxed">
                When you use our website, request a quote, or book an
                appointment, we may collect your name, email address, phone
                number, vehicle information, and appointment preferences. We
                collect this information to provide our services and communicate
                with you about your appointment.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-3">
                How We Use Your Information
              </h2>
              <p className="text-foreground-secondary text-sm leading-relaxed">
                We use your information to: provide quotes, schedule
                appointments, send confirmation and reminder messages, process
                payments, and improve our services. We do not sell your personal
                information to third parties.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-3">Contact Us</h2>
              <p className="text-foreground-secondary text-sm leading-relaxed">
                If you have questions about this privacy policy, contact us at{" "}
                {SITE_CONFIG.email} or call {SITE_CONFIG.phone}.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
