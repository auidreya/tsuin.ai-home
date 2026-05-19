import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Navbar } from '@/components/nav/Navbar'
import { Footer } from '@/components/sections/Footer'
import { getAllPosts, type PostMeta } from '@/lib/posts'

// ─── Card components ───────────────────────────────────────────────────────────

function CategoryTag({ label }: { label: string }) {
  return (
    <span className="font-mono text-[12px] uppercase tracking-wider font-bold text-[#7aa2f7]">
      {label}
    </span>
  )
}

function HeroCard({ post }: { post: PostMeta }) {
  return (
    <Link href={`/blog/${post.slug}`} className="block h-full">
      <article className="border border-[#797ea6]/30 bg-[#1a1b26] overflow-hidden cursor-pointer group h-full flex flex-col hover:border-[#7aa2f7]/50 transition-colors duration-300">
        <div className="overflow-hidden h-56 shrink-0">
          <div
            className={`w-full h-full bg-gradient-to-br ${post.color} transition-transform duration-500 group-hover:scale-105`}
          />
        </div>
        <div className="p-5 flex flex-col flex-1">
          <CategoryTag label={post.category} />
          <h2 className="mt-2 font-display font-bold text-[26px] text-[#cbd1e6] leading-snug mb-3 group-hover:text-[#7aa2f7] transition-colors">
            {post.title}
          </h2>
          {post.subtitle && (
            <p className="font-mono text-[16px] text-[#797ea6] leading-relaxed line-clamp-3 flex-1">
              {post.subtitle}
            </p>
          )}
          <div className="flex items-center gap-2 mt-5 font-mono text-[13px] text-[#797ea6]">
            <div className="w-5 h-5 flex items-center justify-center text-[10px] font-bold text-[#7aa2f7] border border-[#7aa2f7]/40 shrink-0">
              T
            </div>
            <span>{post.author}</span>
            <span className="text-[#797ea6]/40">·</span>
            <span>{post.date}</span>
            {post.readTime && (
              <>
                <span className="text-[#797ea6]/40">·</span>
                <span>{post.readTime}</span>
              </>
            )}
          </div>
        </div>
      </article>
    </Link>
  )
}

function SideCard({ post }: { post: PostMeta }) {
  return (
    <Link href={`/blog/${post.slug}`} className="block">
      <article className="border border-[#797ea6]/30 bg-[#1a1b26] overflow-hidden cursor-pointer group hover:border-[#7aa2f7]/50 transition-colors duration-300 flex flex-col">
        <div className="overflow-hidden h-28 shrink-0">
          <div
            className={`w-full h-full bg-gradient-to-br ${post.color} transition-transform duration-500 group-hover:scale-105`}
          />
        </div>
        <div className="p-4 flex flex-col flex-1">
          <CategoryTag label={post.category} />
          <h2 className="mt-1.5 font-mono font-bold text-[16px] text-[#cbd1e6] leading-snug line-clamp-2 group-hover:text-[#7aa2f7] transition-colors flex-1">
            {post.title}
          </h2>
          <p className="font-mono text-[13px] text-[#797ea6] mt-3">
            {post.date}{post.readTime ? ` · ${post.readTime}` : ''}
          </p>
        </div>
      </article>
    </Link>
  )
}

function RecentCard({ post }: { post: PostMeta }) {
  return (
    <Link href={`/blog/${post.slug}`} className="block">
      <article className="flex gap-3 cursor-pointer group py-3 border-b border-[#797ea6]/20 last:border-0">
        <div className="overflow-hidden w-14 h-14 shrink-0">
          <div
            className={`w-full h-full bg-gradient-to-br ${post.color} transition-transform duration-500 group-hover:scale-110`}
          />
        </div>
        <div className="flex flex-col justify-center min-w-0">
          <CategoryTag label={post.category} />
          <h3 className="mt-0.5 font-mono font-bold text-[14px] text-[#cbd1e6] leading-snug line-clamp-2 group-hover:text-[#7aa2f7] transition-colors">
            {post.title}
          </h3>
          <p className="font-mono text-[12px] text-[#797ea6] mt-1">{post.date}</p>
        </div>
      </article>
    </Link>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BlogPage() {
  const allPosts = getAllPosts()
  const featured = allPosts.find((p) => p.featured) ?? allPosts[0]
  const remaining = allPosts.filter((p) => p.slug !== featured?.slug)
  const sidebar = remaining.slice(0, 2)
  const recent = remaining.slice(2)

  return (
    <main className="min-h-screen bg-[#1a1b26] text-[#cbd1e6]">
      <Navbar />

      <div className="px-[16px] pt-[80px] pb-[48px]">
        {/* Page heading */}
        <p className="font-mono text-[13px] uppercase tracking-[0.25em] text-[#797ea6] mb-6">
          // BLOG
        </p>

        {/* Mobile: single column stack. Desktop: editorial 4-col grid */}
        <div className="flex flex-col gap-5 lg:grid lg:grid-cols-4">

          {/* Left sidebar — 2 medium cards */}
          <div className="lg:col-span-1 lg:order-1 flex flex-col gap-5">
            {sidebar.map((post) => (
              <SideCard key={post.slug} post={post} />
            ))}
          </div>

          {/* Featured hero */}
          {featured && (
            <div className="lg:col-span-2 lg:order-2">
              <HeroCard post={featured} />
            </div>
          )}

          {/* Right sidebar — recent writings */}
          <div className="lg:col-span-1 lg:order-3">
            <div className="border border-[#797ea6]/30 p-5 h-full">
              <div className="flex items-center justify-between mb-1">
                <p className="font-mono text-[13px] uppercase tracking-widest text-[#797ea6]">
                  Recent Writings
                </p>
                <button className="flex items-center gap-1 font-mono text-[13px] text-[#7aa2f7] hover:text-[#cbd1e6] transition-colors">
                  View all <ArrowRight size={13} />
                </button>
              </div>
              <div className="mt-2">
                {recent.map((post) => (
                  <RecentCard key={post.slug} post={post} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
