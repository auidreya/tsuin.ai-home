'use client'

export function StickyCtaButton() {
  return (
    <a
      href="/waitlist"
      className="fixed z-40 cursor-pointer"
      style={{ bottom: 24, right: 16 }}
      aria-label="Join beta waitlist"
    >
      <div className="relative" style={{ width: 180, height: 40 }}>
        <img
          src="/assets/CTA-button-homepage.png"
          alt=""
          className="absolute inset-0 w-full h-full"
          style={{ objectFit: 'fill' }}
        />
        <span className="absolute inset-0 flex items-center justify-center font-display font-bold text-[14px] text-[#1a1b26] whitespace-nowrap select-none tracking-wide">
          JOIN BETA WAITLIST
        </span>
      </div>
    </a>
  )
}
