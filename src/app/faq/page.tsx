import type { Metadata } from "next";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

export const metadata: Metadata = {
  title: "FAQ — Frequently Asked Questions",
  description:
    "Common questions about window tinting at Tint Crew. Learn about tint laws in California, film types, warranties, pricing, and what to expect during installation.",
};

const FAQS = [
  {
    q: "What are the California window tint laws?",
    a: "In California, the front windshield can only have tint on the top 4 inches (AS-1 line). Front side windows must allow more than 70% of light in. Rear side windows and the back window can be any darkness. We'll help you choose a legal shade.",
  },
  {
    q: "How long does automotive tinting take?",
    a: "Most vehicles take 1.5-2 hours for a full tint job (all side windows + back glass). Adding a windshield heat blocker or sunroof adds about 30 minutes. You can wait or drop off your car.",
  },
  {
    q: "What's the difference between Llumar CTX and IRX?",
    a: "Both are nano-ceramic films that block 99% UV. The CTX offers 70% infrared rejection, while the IRX uses advanced IR-targeting ceramics for 97% infrared rejection. IRX provides noticeably better cooling — ideal for SoCal's heat. IRX costs about 25% more than CTX.",
  },
  {
    q: "Do you tint Tesla vehicles?",
    a: "Yes! We specialize in Tesla tinting. All our films are metal-free and won't interfere with Autopilot, cameras, sensors, key cards, or phone keys. We tint Model 3, Y, S, X, and Cybertruck — including the glass roof.",
  },
  {
    q: "How long does the tint need to cure?",
    a: "Keep your windows rolled up for 3-5 days after installation. During curing, you may notice small water pockets or a slightly hazy appearance — this is normal and will clear up completely.",
  },
  {
    q: "Do you offer a warranty?",
    a: "Yes. All automotive films come with the manufacturer's lifetime limited warranty against cracking, peeling, bubbling, and adhesive failure. Residential films carry 10-year to lifetime warranties. Commercial installations get 7-15 year coverage.",
  },
  {
    q: "Can window film help with home energy costs?",
    a: "Absolutely. Residential window film can reduce cooling costs by up to 30% by blocking solar heat gain. Vista Low-E film also helps retain warmth in winter, providing year-round energy savings.",
  },
  {
    q: "Will window tint interfere with my car's electronics?",
    a: "No. All our automotive films (Llumar CTX, IRX, and Rayno products) are 100% metal-free. They won't interfere with cell phones, GPS, Bluetooth, satellite radio, toll transponders, or garage door openers.",
  },
  {
    q: "How do I get a price quote?",
    a: "Use our online quote tool at /quote — select your vehicle year, make, and model to see instant pricing for all four film options. You can also call us at (714) 521-5633 or email tintcrew@gmail.com.",
  },
  {
    q: "Do you offer residential and commercial tinting?",
    a: "Yes. We carry the full Vista and Llumar architectural lines — solar control, decorative, safety & security, Low-E, and dual-reflective films for both homes and businesses.",
  },
];

export default function FaqPage() {
  return (
    <div className="pt-20">
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <span className="text-sm font-medium text-accent uppercase tracking-wider">
              Help Center
            </span>
            <h1 className="mt-4 text-4xl sm:text-5xl font-black tracking-tight">
              Frequently Asked{" "}
              <span className="text-accent">Questions</span>
            </h1>
            <p className="mt-6 text-foreground-secondary">
              Everything you need to know about window tinting at Tint Crew.
            </p>
          </AnimatedSection>

          <div className="mt-16 space-y-6">
            {FAQS.map((faq, i) => (
              <AnimatedSection key={i} delay={i * 0.05}>
                <div className="rounded-xl border border-border bg-card p-6">
                  <h3 className="text-base font-bold">{faq.q}</h3>
                  <p className="mt-3 text-sm text-foreground-secondary leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
