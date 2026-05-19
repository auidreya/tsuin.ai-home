export function VideoSection() {
  return (
    // ly-04 (48px) vertical — layout scale between major sections
    // sp-05 (16px) horizontal — matches page gutter
    <section className="bg-[#1a1b26] px-sp-05 py-ly-04">
      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
        <iframe
          className="absolute inset-0 w-full h-full"
          src="https://www.youtube.com/embed/jgbCqBYvmx4"
          title="Tsuin.AI — Cognitive AI Twin"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </section>
  )
}
