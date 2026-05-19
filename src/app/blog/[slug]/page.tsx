import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { Navbar } from '@/components/nav/Navbar'
import { Footer } from '@/components/sections/Footer'
import { getAllPosts, getPost } from '@/lib/posts'

// ─── MDX component overrides ──────────────────────────────────────────────────

const components = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="font-display font-bold text-[28px] text-[#cbd1e6] mb-4 mt-10 leading-snug" {...props} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="font-mono font-bold text-[22px] text-[#cbd1e6] mb-3 mt-8 leading-snug" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="font-mono font-bold text-[18px] text-[#cbd1e6] mb-2 mt-6" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="font-mono text-[16px] text-[#797ea6] leading-[1.85] mb-5" {...props} />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="text-[#cbd1e6] font-bold" {...props} />
  ),
  em: (props: React.HTMLAttributes<HTMLElement>) => (
    <em className="text-[#7aa2f7] not-italic" {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLElement>) => (
    <blockquote
      className="border-l-2 border-[#7aa2f7]/50 pl-5 my-6 font-mono text-[16px] text-[#cbd1e6] leading-[1.7]"
      {...props}
    />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code
      className="font-mono text-[14px] bg-[#797ea6]/10 text-[#7aa2f7] px-1.5 py-0.5"
      {...props}
    />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className="font-mono text-[13px] bg-[#797ea6]/10 text-[#cbd1e6] p-5 my-6 overflow-x-auto leading-relaxed"
      {...props}
    />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className="font-mono text-[16px] text-[#797ea6] leading-[1.85] mb-5 list-disc list-inside space-y-1"
      {...props}
    />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      className="font-mono text-[16px] text-[#797ea6] leading-[1.85] mb-5 list-decimal list-inside space-y-1"
      {...props}
    />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="font-mono text-[16px] text-[#797ea6]" {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a className="text-[#7aa2f7] hover:text-[#cbd1e6] transition-colors underline" {...props} />
  ),
  hr: () => <hr className="border-[#797ea6]/25 my-8" />,
}

// ─── Static params ─────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }))
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug)
  if (!post) notFound()

  return (
    <main className="min-h-screen bg-[#1a1b26] text-[#cbd1e6]">
      <Navbar />

      <div className="px-[24px] pt-[100px] pb-[80px] max-w-[700px]">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-block font-mono text-[12px] uppercase tracking-widest text-[#797ea6] hover:text-[#cbd1e6] transition-colors mb-8"
        >
          ← Blog
        </Link>

        {/* Category */}
        <p className="font-mono text-[12px] uppercase tracking-widest text-[#7aa2f7] mb-4">
          {post.category}
        </p>

        {/* Title */}
        <h1 className="font-display font-bold text-[32px] leading-[1.2] text-[#cbd1e6] mb-4">
          {post.title}
        </h1>

        {/* Subtitle */}
        {post.subtitle && (
          <p className="font-mono text-[17px] text-[#797ea6] leading-relaxed mb-8">
            {post.subtitle}
          </p>
        )}

        {/* Meta */}
        <div className="flex items-center gap-2 font-mono text-[13px] text-[#797ea6] mb-12 pb-6 border-b border-[#797ea6]/25">
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

        {/* Body */}
        <MDXRemote source={post.content} components={components} />
      </div>

      <Footer />
    </main>
  )
}
