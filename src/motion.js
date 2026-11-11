import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

export function scrollToElement(target) {
  if (!target) return
  gsap.to(window, { scrollTo: { y: target, offsetY: 60 }, duration: 1.3, ease: 'power4.inOut', overwrite: 'auto' })
}

export function initMotion() {
  const mm = gsap.matchMedia()
  

  mm.add('all', () => {
    const cleanups = []
    const st = (trigger, extra = {}) => ({ trigger, start: 'top bottom', end: 'bottom top', scrub: 0.8, invalidateOnRefresh: true, ...extra })

    /* ---------- Transição da página feito por rhuan + hero timeline ---------- */
    document.body.style.overflow = 'hidden'
    gsap.set('.hero .lead,.hero .scroll,.hero .eyebrow', { willChange: 'transform,opacity' })
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, onComplete: () => { document.body.style.overflow = '' } })
    tl.fromTo('.curtain img', { opacity: 0, scale: 0.8, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: 0.7 })
      .to('.curtain img', { opacity: 0, y: -20, duration: 0.35 }, '+=0.2')
      .to('.curtain', { yPercent: -100, duration: 1, ease: 'power4.inOut' }, '<0.1')
      .from('.nav', { y: -60, opacity: 0, duration: 0.8 }, '-=0.5')
      .from('.hero .grid', { opacity: 0, scale: 1.15, duration: 1.6, ease: 'expo.out' }, '<')
      .from('.hero .orb', { scale: 0.3, opacity: 0, duration: 1.6, stagger: 0.2, ease: 'expo.out' }, '<')
      .from('.hero-l .eyebrow', { y: 20, opacity: 0, duration: 0.7 }, '-=1.1')
      .from('.hero h1 .ln > span', { yPercent: 115, rotate: 3, duration: 1.1, stagger: 0.14, ease: 'power4.out' }, '-=0.6')
      .from('.hero .lead', { y: 24, opacity: 0, duration: 0.8 }, '-=0.7')
      .from('.hero .store', { opacity: 0, scale: 0.98, duration: 0.55, stagger: 0.12, ease: 'power2.out' }, '-=0.1')
      .from('.hero .scroll', { opacity: 0, x: -16, duration: 0.7 }, '-=0.4')
      .from('.hero .circle', { scale: 0.55, opacity: 0, duration: 1.3, ease: 'expo.out' }, 0.9 + 0.9)
      .from('.hero .phone', { y: 110, opacity: 0, rotate: 5, duration: 1.3, ease: 'power4.out' }, '<0.1')
      .from('.hero .chip,.hero .apples', { x: -50, opacity: 0, scale: 0.8, duration: 0.9, stagger: 0.15, ease: 'back.out(1.6)' }, '-=0.8')
      .from('.hero .cap', { opacity: 0, duration: 0.6 }, '-=0.3')
      .add(() => {
        gsap.to('.hero .chip', { y: -12, duration: 2.6, yoyo: true, repeat: -1, ease: 'sine.inOut' })
        gsap.to('.hero .apples', { y: 10, rotate: -4, duration: 3.2, yoyo: true, repeat: -1, ease: 'sine.inOut' })
        gsap.to('.hero .phone', { yPercent: -2, duration: 3.4, yoyo: true, repeat: -1, ease: 'sine.inOut' })
      })

    /* ---------- Fundo tecnológico: nós de dados + orbs ---------- */
    gsap.utils.toArray('.hero-bg .nd').forEach((el) => {
      gsap.set(el, { left: gsap.utils.random(2, 98) + '%', top: gsap.utils.random(4, 96) + '%', scale: gsap.utils.random(0.5, 1.6) })
      gsap.to(el, { opacity: gsap.utils.random(0.15, 0.8), y: gsap.utils.random(-40, 40), x: gsap.utils.random(-30, 30), duration: gsap.utils.random(3, 6), repeat: -1, yoyo: true, ease: 'sine.inOut', delay: gsap.utils.random(0, 2) })
    })
    gsap.to('.orb.o1', { x: 60, y: 40, duration: 8, repeat: -1, yoyo: true, ease: 'sine.inOut' })
    gsap.to('.orb.o2', { x: -50, y: -30, duration: 10, repeat: -1, yoyo: true, ease: 'sine.inOut' })

    /* ---------- Barra de progresso + nav inteligente ---------- */
    gsap.to('.progress', { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.3 } })
    const nav = gsap.to('.nav', { yPercent: -110, paused: true, duration: 0.35, ease: 'power2.out' })
    ScrollTrigger.create({ start: 120, end: 'max', onUpdate: (s) => (s.direction === 1 ? nav.play() : nav.reverse()), onLeaveBack: () => nav.reverse() })

    /* ---------- Parallax do hero ---------- */
    const hs = (extra) => ({ trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.8, ...extra })
    gsap.to('.hero .grid', { yPercent: 18, ease: 'none', scrollTrigger: hs() })
    gsap.to('.hero .circle', { y: 90, scale: 1.08, ease: 'none', scrollTrigger: hs() })
    gsap.to('.hero-l', { y: -50, opacity: 0.4, ease: 'none', scrollTrigger: hs() })
    gsap.to('.hero .orb.o2', { yPercent: -30, ease: 'none', scrollTrigger: hs() })

    /* ---------- Reveals com stagger por ScrollTrigger.batch ---------- */
    const reveal = (sel, from = {}) => {
      const els = gsap.utils.toArray(sel)
      if (!els.length) return
      gsap.set(els, { opacity: 0, y: 50, ...from })
      ScrollTrigger.batch(els, {
        start: 'top 88%', once: true,
        onEnter: (b) => gsap.to(b, { opacity: 1, y: 0, x: 0, scale: 1, duration: 0.95, stagger: 0.13, ease: 'power3.out', overwrite: true }),
      })
    }
    reveal('section:not(.hero) .eyebrow')
    reveal('section:not(.hero) h2', { y: 70 })
    reveal('section:not(.hero) .lead, .side, .note, .tech, .cta .tiny')
    reveal('.three > div, .tags span, .duo .card', { y: 60 })
    reveal('.checks li, .steps li', { y: 0, x: -40 })
    reveal('.q', { y: 30 })
    reveal('.cta .store, .cta-art, .profile-card, .footer-main > *, .footer-bottom > *')
    reveal('.peach-card', { scale: 0.94 })
    reveal('.food .fd', { scale: 0.4, y: 20 })

    /* ---------- Scroll-based: telas, anel e equipamento ---------- */
    gsap.utils.toArray('.s4 .phone, .s7 .phone, .cta .phone').forEach((p) =>
      gsap.fromTo(p, { yPercent: 12, rotate: -2 }, { yPercent: -8, rotate: 2, ease: 'none', scrollTrigger: st(p) }))
    gsap.fromTo('.s4 .circle', { scale: 0.7 }, { scale: 1.05, ease: 'none', scrollTrigger: st('.s4') })
    gsap.fromTo('.s4 .chip', { x: -60, opacity: 0 }, { x: 0, opacity: 1, scrollTrigger: { trigger: '.s4', start: 'top 55%', end: 'center center', scrub: 0.8 } })
    gsap.to('.ring', { rotate: 180, ease: 'none', scrollTrigger: st('.s6') })
    gsap.fromTo('.equip:not(.sm)', { scale: 0.8, rotate: -6 }, { scale: 1, rotate: 0, ease: 'none', scrollTrigger: { trigger: '.s6', start: 'top 80%', end: 'center center', scrub: 0.8 } })
    gsap.fromTo('.orange-box', { scale: 0.9 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: '.s3', start: 'top 80%', end: 'center center', scrub: 0.8 } })
    gsap.fromTo('.profile-card', { rotate: 1.5 }, { rotate: 0, ease: 'none', scrollTrigger: { trigger: '.s7', start: 'top 85%', end: 'center 60%', scrub: 0.8 } })
    gsap.fromTo('.cta h2', { backgroundPositionX: '0%' }, { backgroundPositionX: '100%', ease: 'none', scrollTrigger: st('.cta') })

    /* ---------- Microinterações: botões magnéticos ---------- */
    document.querySelectorAll('.btn').forEach((el) => {
      const qx = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3' })
      const qy = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3' })
      const move = (e) => { const r = el.getBoundingClientRect(); qx((e.clientX - r.left - r.width / 2) * 0.25); qy((e.clientY - r.top - r.height / 2) * 0.35) }
      const leave = () => { gsap.to(el, { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1,0.4)' }) }
      el.addEventListener('mousemove', move); el.addEventListener('mouseleave', leave)
      cleanups.push(() => { el.removeEventListener('mousemove', move); el.removeEventListener('mouseleave', leave) })
    })

    /* ---------- Transição suave entre âncoras ---------- */
    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]'); if (!a) return
      const t = document.querySelector(a.getAttribute('href')); if (!t) return
      e.preventDefault()
      scrollToElement(t)
    }
    document.addEventListener('click', onClick)
    cleanups.push(() => document.removeEventListener('click', onClick))

    return () => { cleanups.forEach((c) => c()); document.body.style.overflow = '' }
  })
  return () => mm.revert()
}
