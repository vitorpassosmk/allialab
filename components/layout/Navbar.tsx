'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import { fadeInDelayed } from '@/lib/motion'

const navLinks = [
  { label: 'Serviços', href: '/servicos' },
  { label: 'Cases', href: '/cases' },
  { label: 'Sobre', href: '/sobre' },
  { label: 'Contato', href: '/contato' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      variants={fadeInDelayed}
      initial="hidden"
      animate="visible"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-900/80 backdrop-blur-md border-b border-slate-600/50'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/trefoil.png"
            alt="ALLiA LAB"
            width={32}
            height={32}
            priority
          />
          <span className="font-display font-semibold text-slate-50 ml-2">
            ALLiA LAB
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <Button key={link.href} variant="ghost" href={link.href}>
              {link.label}
            </Button>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <Button
            variant="primary"
            size="sm"
            href="/diagnostico"
            className="hidden md:inline-flex"
          >
            Diagnóstico gratuito
          </Button>
          <button
            className="md:hidden text-slate-300 hover:text-slate-50 transition-colors"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden bg-slate-900/95 backdrop-blur-md border-t border-slate-600/50 px-6 py-6 flex flex-col gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-slate-300 hover:text-slate-50 text-lg transition-colors"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Button variant="primary" size="md" href="/diagnostico">
            Diagnóstico gratuito
          </Button>
        </div>
      )}
    </motion.header>
  )
}
