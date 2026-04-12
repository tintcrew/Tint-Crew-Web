import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

export const metadata: Metadata = {
  title: "Blog — Window Tinting Tips & News",
  description:
    "Window tinting tips, California tint laws, heat reduction guides, and more from Tint Crew in Buena Park, CA.",
};

const BLOG_POSTS = [
  {
    slug: "california-window-tint-laws",
    title: "California Window Tint Laws: How to Stay Street Legal",
    excerpt:
      "Everything you need to know about California's window tinting regulations — what's legal, what's not, and how to avoid fines.",
    date: "2026-03-15",
    category: "Legal",
  },
  {
    slug: "how-window-tinting-improves-heat-reduction",
    title: "How Window Tinting Improves Heat Reduction",
    excerpt:
      "Learn how different types of window film technology — dyed, carbon, and ceramic — block heat and keep your car cool in SoCal summers.",
    date: "2026-02-20",
    category: "Education",
  },
  {
    slug: "llumar-ctx-vs-irx-which-is-right-for-you",
    title: "Llumar CTX vs IRX: Which Ceramic Tint Is Right for You?",
    excerpt:
      "A detailed comparison of Llumar's two ceramic window films — performance, price, and which one makes sense for your vehicle.",
    date: "2026-01-10",
    category: "Products",
  },
];

export default function BlogPage() {
  return (
    <div className="pt-20">
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <span className="text-sm font-medium text-accent uppercase tracking-wider">
              Resources
            </span>
            <h1 className="mt-4 text-4xl sm:text-5xl font-black tracking-tight">
              Tint Crew <span className="text-accent">Blog</span>
            </h1>
            <p className="mt-6 text-foreground-secondary">
              Tips, guides, and news about window tinting from our team of
              experts.
            </p>
          </AnimatedSection>

          <div className="mt-16 space-y-6">
            {BLOG_POSTS.map((post, i) => (
              <AnimatedSection key={post.slug} delay={i * 0.1}>
                <Link href={`/blog/${post.slug}`} className="group block">
                  <article className="rounded-xl border border-border bg-card p-6 transition-all hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-medium text-accent bg-accent/10 px-2 py-1 rounded">
                        {post.category}
                      </span>
                      <span className="text-xs text-foreground-muted">
                        {new Date(post.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold group-hover:text-accent transition-colors">
                      {post.title}
                    </h2>
                    <p className="mt-2 text-sm text-foreground-secondary">
                      {post.excerpt}
                    </p>
                    <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-accent group-hover:gap-2 transition-all">
                      Read More <ArrowRight className="h-4 w-4" />
                    </div>
                  </article>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
