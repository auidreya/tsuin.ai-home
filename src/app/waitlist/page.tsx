'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

// ─── Questions ────────────────────────────────────────────────────────────────

type QuestionType = 'text' | 'email' | 'single' | 'multi' | 'longtext' | 'address'
type Group = 'you' | 'work' | 'pain' | 'tools' | 'value' | 'commit' | 'merch'

interface Question {
  id: string
  group: Group
  type: QuestionType
  title: string
  description?: string
  placeholder?: string
  options?: string[]
  required: boolean
}

const QUESTIONS: Question[] = [
  { id: 'first_name', group: 'you', type: 'text',
    title: "First, what's your first name?",
    placeholder: 'First name', required: true },
  { id: 'last_name', group: 'you', type: 'text',
    title: 'And your last name?',
    placeholder: 'Last name', required: true },
  { id: 'email', group: 'you', type: 'email',
    title: 'Where can we reach you?',
    description: "Your AI Twin is built around you. We'll only email about the beta.",
    placeholder: 'name@domain.com', required: true },
  { id: 'role', group: 'work', type: 'single',
    title: 'What best describes you?',
    options: ['Software engineer / IC', 'Tech lead / engineering manager', 'Founder / CTO',
      'Researcher / scientist', 'Product or design', 'Student / learning', 'Something else'],
    required: true },
  { id: 'years', group: 'work', type: 'single',
    title: 'How many years of software development experience do you have?',
    options: ['0 — 2 years', '3 — 5 years', '6 — 10 years', '10+ years'],
    required: true },
  { id: 'codebase', group: 'work', type: 'single',
    title: 'What type of codebase do you mostly work on?',
    options: ['Frontend / UI', 'Backend / API', 'Full-stack product', 'Infrastructure / DevOps',
      'ML / data / research', 'Mobile / embedded', 'Mixed — I touch everything'],
    required: true },
  { id: 'blockers', group: 'pain', type: 'single',
    title: 'What slows you down most when maintaining or debugging code?',
    options: ['Understanding code I (or someone else) wrote months ago',
      'Onboarding to unfamiliar parts of the codebase', 'Context-switching between projects',
      'Missing or outdated documentation', 'Reproducing or tracing intermittent bugs',
      'AI tools hallucinating or losing the thread'],
    required: true },
  { id: 'context_loss', group: 'pain', type: 'single',
    title: 'How often do you lose or forget important engineering context?',
    description: 'The why behind a decision, an edge case you handled, an old discussion.',
    options: ['Every day', 'A few times a week', 'Occasionally — once or twice a month',
      'Rarely — I keep good notes'],
    required: true },
  { id: 'tools', group: 'tools', type: 'multi',
    title: 'What AI coding tools do you currently use?',
    description: 'Pick all that apply.',
    options: ['Cursor', 'Claude Code', 'GitHub Copilot', 'Windsurf / Codeium',
      'Cody / Sourcegraph', 'ChatGPT / Claude / Gemini (chat)', 'Replit / Lovable / v0', 'None yet'],
    required: false },
  { id: 'tool_gaps', group: 'tools', type: 'longtext',
    title: 'What do current AI coding tools fail to remember about your work?',
    description: 'Anything specific — decisions, conventions, architecture, your own preferences.',
    placeholder: 'They keep forgetting that we already tried X and ruled it out for Y reason…',
    required: false },
  { id: 'use_case', group: 'value', type: 'single',
    title: 'Which Tsuin.ai use case is most valuable to you?',
    options: ['Onboarding to a new codebase faster', 'Persistent memory across sessions & tools',
      'Preserving the why behind architectural decisions',
      'Personal AI mentor that knows how I think',
      'A Twin that represents me when I\'m not in the loop'],
    required: true },
  { id: 'feedback', group: 'commit', type: 'single',
    title: 'Would you be willing to test and give feedback during the beta?',
    description: 'Honest, sharp, occasionally brutal feedback is the whole point.',
    options: ['Yes — sign me up', 'Yes, but lightly', 'Maybe later'],
    required: true },
  { id: 'interview', group: 'commit', type: 'single',
    title: 'Would you join a 20 — 30 minute interview or our private Discord?',
    description: 'All who say yes are invited to the Technical Advisory Board.',
    options: ['Yes to both', 'Just the interview', 'Just the Discord', 'Not right now'],
    required: true },
  { id: 'address', group: 'merch', type: 'address',
    title: 'Where should we ship your advisor merch?',
    description: 'Limited-edition Tsuin.ai drop — printed only for advisors who complete the call. Skip any field if you\'d rather not say.',
    required: false },
]

const GROUP_LABELS: Record<Group, string> = {
  you: 'ABOUT YOU', work: 'YOUR WORK', pain: 'THE PAIN',
  tools: 'YOUR STACK', value: 'THE VALUE', commit: 'COMMITMENT', merch: 'THE MERCH',
}

const TOTAL = QUESTIONS.length
const letter = (i: number) => String.fromCharCode(65 + i)

// ─── Types ─────────────────────────────────────────────────────────────────────

interface AddressValue {
  name?: string; street?: string; city?: string
  region?: string; postal?: string; country?: string; size?: string | null
}

type AnswerValue = string | string[] | AddressValue | undefined

interface Answers { [key: string]: AnswerValue }

// ─── Slide variants ───────────────────────────────────────────────────────────

const slideVariants = {
  enter: (dir: number) => ({ opacity: 0, y: dir > 0 ? 40 : -40 }),
  center: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as number[] } },
  exit: (dir: number) => ({ opacity: 0, y: dir > 0 ? -40 : 40,
    transition: { duration: 0.25, ease: [0.4, 0, 1, 1] as number[] } }),
}

// ─── Sub-components ────────────────────────────────────────────────────────────

function ProgressBar({ step, total }: { step: number; total: number }) {
  const pct = step === 0 ? 0 : step > total ? 100 : (step / total) * 100
  return (
    <div className="h-[2px] w-full bg-[#797ea6]/15">
      <motion.div
        className="h-full"
        style={{ background: 'linear-gradient(90deg, #7aa2f7 0%, #4ecdc4 100%)' }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      />
    </div>
  )
}

function TextInput({ value, onChange, placeholder, type = 'text', onEnter }: {
  value: string; onChange: (v: string) => void
  placeholder?: string; type?: string; onEnter: () => void
}) {
  const ref = useRef<HTMLInputElement>(null)
  useEffect(() => { ref.current?.focus() }, [])
  return (
    <input
      ref={ref}
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); onEnter() } }}
      autoComplete="off"
      spellCheck={false}
      className="w-full bg-transparent border-0 border-b-2 border-[#797ea6]/30 focus:border-[#7aa2f7] outline-none font-mono font-bold text-[24px] text-[#cbd1e6] placeholder:text-[#797ea6]/40 placeholder:font-normal pb-[8px] transition-colors duration-200"
    />
  )
}

function LongText({ value, onChange, placeholder, onEnter }: {
  value: string; onChange: (v: string) => void
  placeholder?: string; onEnter: () => void
}) {
  const ref = useRef<HTMLTextAreaElement>(null)
  useEffect(() => { ref.current?.focus() }, [])
  return (
    <textarea
      ref={ref}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      onKeyDown={e => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) { e.preventDefault(); onEnter() } }}
      rows={4}
      className="w-full bg-transparent border border-[#797ea6]/30 focus:border-[#7aa2f7] outline-none font-mono font-medium text-[16px] text-[#cbd1e6] placeholder:text-[#797ea6]/40 p-[12px] resize-none transition-colors duration-200"
    />
  )
}

function ChoiceList({ options, value, onChange, multi, onAdvance }: {
  options: string[]; value: AnswerValue
  onChange: (v: AnswerValue) => void; multi?: boolean; onAdvance: () => void
}) {
  const selected = multi ? (Array.isArray(value) ? value : []) : value as string | undefined

  const toggle = useCallback((opt: string) => {
    if (multi) {
      const sel = Array.isArray(selected) ? selected : []
      onChange(sel.includes(opt) ? sel.filter(o => o !== opt) : [...sel, opt])
    } else {
      onChange(opt)
      setTimeout(() => onAdvance(), 380)
    }
  }, [selected, multi, onChange, onAdvance])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      if (e.metaKey || e.ctrlKey) return
      const idx = e.key.toUpperCase().charCodeAt(0) - 65
      if (idx >= 0 && options[idx]) { e.preventDefault(); toggle(options[idx]) }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [options, toggle])

  return (
    <div className="flex flex-col gap-[8px]">
      {options.map((opt, i) => {
        const isOn = multi ? (Array.isArray(selected) && selected.includes(opt)) : selected === opt
        return (
          <button
            key={opt}
            type="button"
            onClick={() => toggle(opt)}
            className={`flex items-center gap-[12px] px-[14px] py-[11px] border text-left transition-all duration-150 ${
              isOn
                ? 'border-[#7aa2f7] bg-[#7aa2f7]/14'
                : 'border-[#797ea6]/30 hover:border-[#7aa2f7]/40 hover:bg-[#7aa2f7]/08'
            }`}
          >
            <span className={`inline-flex items-center justify-center w-[24px] h-[24px] shrink-0 border font-mono font-bold text-[11px] transition-colors ${
              isOn ? 'border-[#7aa2f7] text-[#7aa2f7]' : 'border-[#797ea6]/50 text-[#797ea6]'
            }`}>
              {letter(i)}
            </span>
            <span className="font-mono font-bold text-[15px] text-[#cbd1e6] flex-1 leading-snug">{opt}</span>
            {isOn && <span className="font-mono font-bold text-[#7aa2f7] shrink-0">{multi ? '✓' : '→'}</span>}
          </button>
        )
      })}
    </div>
  )
}

function AddressInput({ value, onChange, onEnter }: {
  value: AddressValue; onChange: (v: AddressValue) => void; onEnter: () => void
}) {
  const v = value || {}
  const update = (key: keyof AddressValue, val: string | null) => onChange({ ...v, [key]: val })
  const ref = useRef<HTMLInputElement>(null)
  useEffect(() => { ref.current?.focus() }, [])
  const onKey = (e: React.KeyboardEvent) => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) { e.preventDefault(); onEnter() } }

  const fieldCls = "w-full bg-[#797ea6]/05 border border-[#797ea6]/25 focus:border-[#7aa2f7] focus:bg-[#7aa2f7]/08 outline-none font-mono font-medium text-[14px] text-[#cbd1e6] placeholder:text-[#797ea6]/40 px-[10px] py-[8px] transition-colors"
  const labelCls = "font-mono font-bold text-[10px] text-[#797ea6] uppercase tracking-[0.12em]"

  return (
    <div className="grid grid-cols-2 gap-x-[12px] gap-y-[14px]">
      <label className="col-span-2 flex flex-col gap-[5px]">
        <span className={labelCls}>Full name on package</span>
        <input ref={ref} type="text" value={v.name || ''} onChange={e => update('name', e.target.value)} placeholder="As it should appear on the label" className={fieldCls} onKeyDown={onKey} />
      </label>
      <label className="col-span-2 flex flex-col gap-[5px]">
        <span className={labelCls}>Street address</span>
        <input type="text" value={v.street || ''} onChange={e => update('street', e.target.value)} placeholder="123 Memory Lane, Apt 4" className={fieldCls} onKeyDown={onKey} autoComplete="address-line1" />
      </label>
      <label className="flex flex-col gap-[5px]">
        <span className={labelCls}>City</span>
        <input type="text" value={v.city || ''} onChange={e => update('city', e.target.value)} placeholder="Edmonton" className={fieldCls} onKeyDown={onKey} autoComplete="address-level2" />
      </label>
      <label className="flex flex-col gap-[5px]">
        <span className={labelCls}>State / region</span>
        <input type="text" value={v.region || ''} onChange={e => update('region', e.target.value)} placeholder="AB · BC · ON" className={fieldCls} onKeyDown={onKey} autoComplete="address-level1" />
      </label>
      <label className="flex flex-col gap-[5px]">
        <span className={labelCls}>Postal code</span>
        <input type="text" value={v.postal || ''} onChange={e => update('postal', e.target.value)} placeholder="T5A 0A1" className={fieldCls} onKeyDown={onKey} autoComplete="postal-code" />
      </label>
      <label className="flex flex-col gap-[5px]">
        <span className={labelCls}>Country</span>
        <input type="text" value={v.country || ''} onChange={e => update('country', e.target.value)} placeholder="Canada · USA · Japan" className={fieldCls} onKeyDown={onKey} autoComplete="country-name" />
      </label>
      <div className="col-span-2 flex flex-col gap-[5px]">
        <span className={labelCls}>T-shirt size <span className="font-normal text-[#797ea6]/60">(optional)</span></span>
        <div className="flex gap-[8px] flex-wrap">
          {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(s => (
            <button key={s} type="button"
              onClick={() => update('size', v.size === s ? null : s)}
              className={`font-mono font-bold text-[12px] px-[10px] py-[5px] border transition-colors ${
                v.size === s
                  ? 'border-[#7aa2f7] bg-[#7aa2f7]/14 text-[#7aa2f7]'
                  : 'border-[#797ea6]/30 text-[#797ea6] hover:border-[#7aa2f7]/40 hover:text-[#cbd1e6]'
              }`}
            >{s}</button>
          ))}
        </div>
      </div>
      <p className="col-span-2 font-mono text-[11px] text-[#797ea6]/60">
        ⌘ <kbd className="border border-[#797ea6]/30 px-[4px] py-[1px] text-[10px]">↵</kbd> to continue · stored securely, used only to ship merch.
      </p>
    </div>
  )
}

function Welcome({ onStart }: { onStart: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Enter') { e.preventDefault(); onStart() } }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onStart])

  return (
    <div className="flex flex-col gap-[20px]">
      <p className="font-mono text-[11px] text-[#797ea6] tracking-[0.18em] uppercase">
        // TSUIN.AI · TECHNICAL ADVISORY BOARD
      </p>
      <h1 className="font-display font-bold text-[36px] leading-[1.1] text-[#cbd1e6]">
        Let's shape the future of<br /><span className="text-[#7aa2f7]">software development</span> together.
      </h1>
      <p className="font-mono font-medium text-[15px] text-[#797ea6] leading-[1.6]">
        Ten questions. Eight minutes. The most useful answers get invited to a{' '}
        <strong className="text-[#7aa2f7] font-bold">30-minute introductory call</strong>, a seat
        on our <strong className="text-[#7aa2f7] font-bold">Technical Advisory Board</strong>, and
        a piece of merch we're a little too proud of.
      </p>
      <ul className="flex flex-col gap-[4px]">
        {['Early access to the beta', 'Direct line to the founders', 'Private advisor Discord', 'Special-edition merch drop'].map(item => (
          <li key={item} className="flex items-center gap-[14px] font-mono font-medium text-[15px] text-[#797ea6] py-[5px]">
            <span className="text-[#7aa2f7] text-[11px]">◆</span>
            {item}
          </li>
        ))}
      </ul>
      <div className="flex flex-col gap-[10px] mt-[4px]">
        <button
          onClick={onStart}
          className="flex items-center gap-[16px] font-mono font-bold text-[15px] text-[#1a1b26] bg-[#7aa2f7] px-[28px] py-[14px] w-fit hover:bg-[#cbd1e6] transition-colors"
        >
          Start
          <span className="font-mono font-normal text-[11px] opacity-70">
            press <kbd className="font-bold">Enter</kbd> ↵
          </span>
        </button>
        <p className="font-mono text-[12px] text-[#797ea6]/60">~ 8 minutes · we read every answer.</p>
      </div>
    </div>
  )
}

function Success({ data }: { data: Answers }) {
  const firstName = ((data.first_name as string) || '').trim() || 'friend'
  const addr = (data.address as AddressValue) || {}
  const hasAddress = addr.street || addr.city || addr.country
  const merchLine = hasAddress
    ? `Shipping to ${[addr.city, addr.country].filter(Boolean).join(', ') || 'your address'}`
    : "We'll grab your address on the call"

  return (
    <div className="flex flex-col gap-[20px]">
      <p className="font-mono text-[11px] text-[#7aa2f7] tracking-[0.18em] uppercase">
        // RECEIVED · 双
      </p>
      <h1 className="font-mono font-bold text-[36px] leading-[1.1] text-[#cbd1e6]">
        Thank you,<br /><span className="text-[#7aa2f7]">{firstName}</span>.
      </h1>
      <p className="font-mono font-medium text-[15px] text-[#797ea6] leading-[1.6]">
        We read every answer ourselves. If your story matches what we're building, you'll hear
        from a founder within <strong className="text-[#7aa2f7] font-bold">72 hours</strong> to
        schedule your introductory call.
      </p>
      <div className="border border-[#7aa2f7]/25 bg-[#7aa2f7]/06 p-[16px] flex flex-col">
        {[
          { label: 'STATUS', value: 'WAITLIST · ADVISORY TRACK' },
          { label: 'NEXT', value: 'Founder reply within 72h' },
          { label: 'MERCH', value: merchLine },
        ].map(row => (
          <div key={row.label} className="flex justify-between gap-[24px] py-[9px] border-b border-[#797ea6]/15 last:border-0">
            <span className="font-mono font-bold text-[11px] text-[#797ea6] tracking-[0.08em]">{row.label}</span>
            <span className="font-mono font-bold text-[13px] text-[#cbd1e6] text-right">{row.value}</span>
          </div>
        ))}
      </div>
      <p className="font-mono text-[12px] text-[#797ea6]/60 mt-[8px]">
        While you wait —{' '}
        <a href="/manifesto" className="text-[#7aa2f7] hover:text-[#cbd1e6] transition-colors">read the manifesto</a>
        {' '}or{' '}
        <a href="/about" className="text-[#7aa2f7] hover:text-[#cbd1e6] transition-colors">meet the founders</a>.
      </p>
    </div>
  )
}

function QuestionScreen({ q, value, onChange, onAdvance }: {
  q: Question; value: AnswerValue; onChange: (v: AnswerValue) => void; onAdvance: () => void
}) {
  let input: React.ReactNode
  const strVal = (value as string) || ''

  if (q.type === 'text' || q.type === 'email') {
    input = <TextInput value={strVal} onChange={v => onChange(v)} placeholder={q.placeholder} type={q.type} onEnter={onAdvance} />
  } else if (q.type === 'longtext') {
    input = <LongText value={strVal} onChange={v => onChange(v)} placeholder={q.placeholder} onEnter={onAdvance} />
  } else if (q.type === 'address') {
    input = <AddressInput value={(value as AddressValue) || {}} onChange={v => onChange(v)} onEnter={onAdvance} />
  } else if (q.type === 'single' || q.type === 'multi') {
    input = <ChoiceList options={q.options!} value={value} onChange={onChange} multi={q.type === 'multi'} onAdvance={onAdvance} />
  }

  return (
    <div className="flex flex-col gap-[16px]">
      <h2 className="font-display font-bold text-[26px] text-[#cbd1e6] leading-[1.2]">{q.title}</h2>
      {q.description && <p className="font-mono font-medium text-[13px] text-[#797ea6] leading-relaxed">{q.description}</p>}
      <div className="mt-[4px]">{input}</div>
      {q.type === 'longtext' && (
        <p className="font-mono text-[11px] text-[#797ea6]/50">⌘ <kbd className="border border-[#797ea6]/30 px-[3px]">↵</kbd> to continue</p>
      )}
    </div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function WaitlistPage() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})
  const [dir, setDir] = useState(1)
  const [submitting, setSubmitting] = useState(false)
  const [shaking, setShaking] = useState(false)

  const stateRef = useRef({ step, answers })
  useEffect(() => { stateRef.current = { step, answers } }, [step, answers])

  const q = step > 0 && step <= TOTAL ? QUESTIONS[step - 1] : null

  function isValid(): boolean {
    const { step: s, answers: a } = stateRef.current
    const qq = s > 0 && s <= TOTAL ? QUESTIONS[s - 1] : null
    if (!qq || !qq.required) return true
    const v = a[qq.id]
    if (qq.type === 'text' || qq.type === 'longtext') return typeof v === 'string' && v.trim().length > 0
    if (qq.type === 'email') return typeof v === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())
    if (qq.type === 'single') return !!v
    if (qq.type === 'multi') return Array.isArray(v) && v.length > 0
    return true
  }

  async function submit(data: Answers) {
    setSubmitting(true)
    try {
      await fetch('/api/waitlist-responses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
    } catch {
      // non-blocking — show success regardless
    } finally {
      setSubmitting(false)
    }
  }

  const next = useCallback(() => {
    if (!isValid()) {
      setShaking(true)
      setTimeout(() => setShaking(false), 500)
      return
    }
    const { step: s, answers: a } = stateRef.current
    if (s === TOTAL) { submit(a) }
    setDir(1)
    setStep(prev => Math.min(prev + 1, TOTAL + 1))
  }, [])

  const back = useCallback(() => {
    setDir(-1)
    setStep(prev => Math.max(prev - 1, 0))
  }, [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (step === 0) return // Welcome handles its own Enter
      if (e.key === 'Enter' && !e.shiftKey) {
        const isTextField = e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement
        if (!isTextField) { e.preventDefault(); next() }
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [step, next])

  const showFooter = step > 0 && step <= TOTAL
  const showOk = showFooter && q && (q.type !== 'single' || !answers[q.id])
  const groupLabel = q ? GROUP_LABELS[q.group] : ''

  return (
    <div className="flex flex-col h-svh bg-[#1a1b26] text-[#cbd1e6] overflow-hidden">

      {/* Header */}
      <header className="h-[62px] flex items-center justify-between px-[20px] shrink-0">
        <a href="/" aria-label="tsuin.ai home">
          <img
            src="/assets/tsuin.ai-logo copy.ai/tsuin-white-horizontal-full.png"
            alt="Tsuin.AI"
            className="h-[26px] w-auto"
          />
        </a>
        {step > 0 && step <= TOTAL && (
          <div className="flex items-center gap-[12px] font-mono text-[11px] tracking-[0.12em]">
            <span className="text-[#797ea6] hidden sm:inline">{groupLabel}</span>
            <span className="text-[#797ea6]">
              {step} <span className="text-[#797ea6]/40">→</span> {TOTAL}
            </span>
          </div>
        )}
        {step === 0 && (
          <span className="font-mono text-[10px] text-[#797ea6] tracking-[0.18em] uppercase">WAITLIST</span>
        )}
        {step > TOTAL && (
          <span className="font-mono text-[10px] text-[#7aa2f7] tracking-[0.18em] uppercase">DONE</span>
        )}
      </header>

      {/* Progress */}
      <ProgressBar step={step} total={TOTAL} />

      {/* Main */}
      <main className="flex-1 min-h-0 flex items-center justify-center px-[20px] overflow-y-auto">
        <div className={`w-full max-w-[520px] py-[24px] ${shaking ? 'animate-shake' : ''}`}>
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={step}
              custom={dir}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              {step === 0 && <Welcome onStart={next} />}
              {step > 0 && step <= TOTAL && q && (
                <QuestionScreen q={q} value={answers[q.id]} onChange={v => setAnswers(a => ({ ...a, [q.id]: v }))} onAdvance={next} />
              )}
              {step > TOTAL && <Success data={answers} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Footer nav */}
      {showFooter && (
        <footer className="h-[60px] flex items-center justify-between px-[20px] shrink-0 border-t border-[#797ea6]/15">
          <button
            onClick={back}
            aria-label="back"
            className="w-[38px] h-[38px] flex items-center justify-center border border-[#797ea6]/30 text-[#797ea6] hover:text-[#7aa2f7] hover:border-[#7aa2f7] transition-colors"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>

          {showOk && (
            <button
              onClick={next}
              disabled={submitting || !isValid()}
              className="flex items-center gap-[10px] font-mono font-bold text-[13px] text-[#1a1b26] bg-[#7aa2f7] px-[20px] py-[9px] disabled:opacity-35 disabled:cursor-not-allowed hover:bg-[#cbd1e6] transition-colors"
            >
              {submitting ? 'Saving…' : 'OK'}
              <span className="font-mono font-normal text-[11px] opacity-70">↵</span>
            </button>
          )}

          {!showOk && q?.type === 'single' && (
            <span className="font-mono text-[11px] text-[#797ea6]/60">
              press a letter <kbd className="border border-[#797ea6]/30 px-[4px] text-[10px]">A</kbd>–<kbd className="border border-[#797ea6]/30 px-[4px] text-[10px]">{letter((q.options?.length ?? 1) - 1)}</kbd>
            </span>
          )}
        </footer>
      )}
    </div>
  )
}
