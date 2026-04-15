"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const faqItems = [
  {
    q: "Who can join Innovation Club?",
    a: "Any KITS student with curiosity and commitment. We screen for consistency and craft, not pedigree.",
  },
  {
    q: "How do partnerships work?",
    a: "We design co-branded workshops, hiring loops, and challenge tracks with clear outcomes and timelines.",
  },
  {
    q: "Is this only for coders?",
    a: "No. We welcome designers, builders, and operators — anyone who ships end-to-end impact.",
  },
] as const

export function HomeFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-4 md:px-8">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent-primary">FAQ</p>
        <h2 className="mt-3 font-display text-4xl font-bold text-text-primary">Straight answers</h2>

        <div className="mt-10 space-y-3">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index
            return (
              <div key={item.q} className="rounded-2xl border border-border-default bg-bg-surface">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="gold-focus-ring flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="font-heading text-base font-semibold text-text-primary">{item.q}</span>
                  <span className="font-mono text-accent-primary">{isOpen ? "−" : "+"}</span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="border-t border-border-default px-5 pb-4 pt-2 text-sm leading-relaxed text-text-secondary">
                        {item.a}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
