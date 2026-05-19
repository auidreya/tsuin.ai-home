'use client'

import { useEffect, useRef, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronDown, ChevronUp, Cookie } from 'lucide-react'

function saveLocal(analytics: boolean, marketing: boolean) {
  localStorage.setItem(
    'tsuin_cookie_consent',
    JSON.stringify({ essential: true, analytics, marketing, timestamp: new Date().toISOString() }),
  )
}

function Toggle({
  label,
  description,
  checked,
  disabled,
  onChange,
}: {
  label: string
  description: string
  checked: boolean
  disabled?: boolean
  onChange?: (v: boolean) => void
}) {
  return (
    <div className="flex items-start justify-between gap-3 py-2.5 border-t border-[#797ea6]/20 first:border-t-0">
      <div className="flex-1 min-w-0">
        <div className="font-mono font-bold text-xs text-[#cbd1e6] flex items-center gap-1.5">
          {label}
          {disabled && (
            <span className="text-[10px] text-[#797ea6] border border-[#797ea6]/40 rounded px-1 py-0.5 font-normal">
              always on
            </span>
          )}
        </div>
        <p className="font-mono text-[11px] text-[#797ea6] mt-0.5 leading-relaxed">{description}</p>
      </div>
      <button
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange?.(!checked)}
        className={`
          relative shrink-0 mt-0.5 h-5 w-9 rounded-full transition-colors duration-200
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7aa2f7]
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          ${checked ? 'bg-[#7aa2f7]' : 'bg-[#797ea6]/30'}
        `}
      >
        <span
          className={`
            absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-[#cbd1e6] transition-transform duration-200
            ${checked ? 'translate-x-4' : 'translate-x-0'}
          `}
        />
      </button>
    </div>
  )
}

export function CookieCard() {
  const [open, setOpen] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [analytics, setAnalytics] = useState(true)
  const [marketing, setMarketing] = useState(false)
  const [saving, setSaving] = useState(false)
  const mounted = useRef(false)

  useEffect(() => {
    if (mounted.current) return
    mounted.current = true
    const stored = localStorage.getItem('tsuin_cookie_consent')
    if (!stored) setOpen(true)
  }, [])

  if (!open) return null

  function handleConsent(analyticsVal: boolean, marketingVal: boolean) {
    setSaving(true)
    saveLocal(analyticsVal, marketingVal)
    setSaving(false)
    setOpen(false)
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:right-auto sm:left-6 sm:w-[380px] z-50">
      {/* Blue dog mascot sits on top of the card */}
      <div className="flex justify-end pr-6 pointer-events-none">
        <img
          src="/assets/mascot copy/shibasuke-dark-cookie.svg"
          alt="Tsuin mascot with a cookie"
          width={100}
          height={100}
          className="-mb-5 drop-shadow-md select-none"
          draggable={false}
        />
      </div>

      <Card className="p-5 shadow-xl border-2 border-[#797ea6]/30">
        {/* Header */}
        <div className="flex items-start gap-3 mb-3">
          <Cookie size={22} className="text-[#7aa2f7] shrink-0 mt-0.5" />
          <div>
            <div className="font-display font-bold text-sm text-[#cbd1e6]">
              We baked some cookies.
            </div>
            <p className="font-mono text-[11px] text-[#797ea6] mt-1 leading-relaxed">
              Not the chocolate chip kind — sadly. These are the digital ones that help us
              understand how you use the site. No one actually reads these banners, but{' '}
              <span className="text-[#cbd1e6] font-bold">lawyers insist.</span>
            </p>
          </div>
        </div>

        {/* Summary pill */}
        <div className="font-mono text-[11px] text-[#797ea6] bg-[#797ea6]/10 rounded px-3 py-2 mb-3 leading-relaxed border border-[#797ea6]/20">
          <span className="font-bold text-[#cbd1e6]">Essential</span> (site works) ·{' '}
          <span className={analytics ? 'font-bold text-[#cbd1e6]' : ''}>Analytics</span>{' '}
          (we see what pages you visit) ·{' '}
          <span className={marketing ? 'font-bold text-[#cbd1e6]' : ''}>Marketing</span>{' '}
          (ads follow you like a lost puppy)
        </div>

        {/* Expandable preferences */}
        {expanded && (
          <div className="mb-3 border border-[#797ea6]/20 rounded px-3 py-1">
            <Toggle
              label="Essential cookies"
              description="Login sessions, preferences, security. The site literally breaks without these."
              checked={true}
              disabled
            />
            <Toggle
              label="Analytics cookies"
              description="We use these to see which pages you actually read and which you bail from in 3 seconds."
              checked={analytics}
              onChange={setAnalytics}
            />
            <Toggle
              label="Marketing cookies"
              description="Enables ads to haunt you across the internet. You've been warned."
              checked={marketing}
              onChange={setMarketing}
            />
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="teal"
              className="flex-1 text-[11px]"
              loading={saving}
              onClick={() => handleConsent(true, true)}
            >
              Accept all
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="flex-1 text-[11px]"
              disabled={saving}
              onClick={() => handleConsent(false, false)}
            >
              Essential only
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <button
              onClick={() => setExpanded((v) => !v)}
              className="flex items-center gap-1 font-mono text-[11px] text-[#797ea6] hover:text-[#cbd1e6] transition-colors"
            >
              {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
              {expanded ? 'Hide preferences' : 'Manage preferences'}
            </button>
            {expanded && (
              <button
                disabled={saving}
                onClick={() => handleConsent(analytics, marketing)}
                className="font-mono text-[11px] text-[#7aa2f7] hover:text-[#cbd1e6] transition-colors disabled:opacity-50"
              >
                {saving ? 'Saving…' : 'Save my choices'}
              </button>
            )}
            {!expanded && (
              <a
                href="/privacy"
                className="font-mono text-[11px] text-[#797ea6] hover:text-[#cbd1e6] transition-colors"
              >
                Cookie policy
              </a>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}
