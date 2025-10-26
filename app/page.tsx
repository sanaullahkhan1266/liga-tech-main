"use client"

import { Button } from "@/components/ui/button"
import { Star, Menu, LogIn, ShieldCheck, Coins, Handshake, Clock } from "lucide-react"
import { motion, useInView, useScroll, useSpring } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import MotionButton from "@/components/motion-button"
import ParallaxHero from "@/components/parallax-hero"
import ThemeToggle from "@/components/theme-toggle"
import CounterUp from "@/components/counter-up"

function HowSteps() {
  const [open, setOpen] = useState(0)
  const steps = [
    {
      title: 'Discover Talents',
      desc: 'Browse a curated collection of skilled AI/UX experts across specialities such as web design, mobile app design, and more.'
    },
    { title: 'Collaborate with Your Designer', desc: 'Kickoff with shared goals, deliverables, and timelines.' },
    { title: 'Finalize Your Project', desc: 'Iterate quickly with reviews and approvals until done.' },
    { title: 'Review the Designer', desc: 'Leave feedback to improve the ecosystem.' }
  ]
  return (
    <div className="space-y-5">
      {steps.map((s, i) => (
        <motion.div key={s.title} className={`rounded-2xl border ${open===i? 'bg-slate-900 text-white border-slate-900':'bg-white border-slate-200'} overflow-hidden`}>          
          <button onClick={() => setOpen(i)} className={`w-full flex items-center justify-between gap-4 px-5 py-4 ${open===i? '':'text-slate-900'}`}>
            <span className={`text-xl sm:text-2xl font-semibold ${open===i? 'text-white':'text-slate-900'}`}>{s.title}</span>
            <span className={`size-8 rounded-full grid place-items-center ${open===i? 'bg-white/10 text-white':'bg-slate-100 text-slate-900'}`}>{open===i? '−':'+'}</span>
          </button>
          <motion.div initial={false} animate={{ height: open===i? 'auto':'0', opacity: open===i? 1:0 }} className="px-5 pb-5 text-sm text-slate-400">
            {s.desc}
          </motion.div>
        </motion.div>
      ))}
    </div>
  )
}

function TopProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, mass: 0.2 })
  return <motion.div style={{ scaleX }} className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[60] bg-gradient-to-r from-black via-slate-700 to-black" />
}

export default function Home() {
  const rootRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.fromTo(el, { y: 40, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 80%" }
        })
      })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  // scrollspy
  const [active, setActive] = useState<string>('services')
  useEffect(() => {
    const ids = ['expert-services','mission','services','how','clients','youth','talents']
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) })
    }, { rootMargin: '-30% 0px -60% 0px', threshold: 0.1 })
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el) })
    return () => obs.disconnect()
  }, [])

  // sticky CTA dock
  const [dock, setDock] = useState(false)
  useEffect(() => {
    const onScroll = () => setDock(window.scrollY > window.innerHeight * 0.6)
    window.addEventListener('scroll', onScroll)
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div ref={rootRef} className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-white">
      {/* Top progress bar */}
      <TopProgress />
      {/* Full-page soft vignette */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-[1] shadow-[inset_0_0_220px_80px_rgba(0,0,0,0.08)]"></div>
      {/* Navbar full-width */}
      <motion.header initial={{y:-20,opacity:0}} animate={{y:0,opacity:1}} transition={{duration:0.6,ease:'easeOut'}}
        className="sticky top-0 z-50 w-full border-b border-slate-200/70 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/50 shadow-md shadow-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-5">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-md bg-gradient-to-br from-blue-500 to-indigo-600" />
              <span className="text-2xl font-extrabold tracking-tight text-slate-900">lega-tech</span>
            </div>
            <nav className="hidden md:flex items-center gap-8 text-[16px] text-slate-600">
              {[
                {href:'#expert-services',label:'Services'},
                {href:'#how',label:'How It Works'},
                {href:'#clients',label:'For Clients'},
                {href:'#youth',label:'Empowering Youth'},
              ].map(link => (
                <a key={link.href} className={`relative transition-colors after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-slate-900 after:transition-all hover:after:w-full ${active===link.href.slice(1)?'text-slate-900 after:w-full':'hover:text-slate-900'}`} href={link.href}>{link.label}</a>
              ))}
            </nav>
            <div className="flex items-center gap-3">
              <button className="md:hidden p-2 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50"><Menu className="w-4 h-4"/></button>
              <ThemeToggle />
              <MotionButton className="hidden md:inline-flex bg-black hover:bg-black/90 border border-black/80 shadow-black/20"> <LogIn className="w-4 h-4 mr-2"/> Login</MotionButton>
            </div>
          </div>
        </div>
</motion.header>

      {/* Hero full-height */}
      <section className="relative min-h-screen w-full flex items-center justify-center reveal">
        <ParallaxHero>
        <div className="pointer-events-none absolute inset-0 [background:radial-gradient(900px_500px_at_50%_-10%,rgba(2,132,199,0.10),transparent_60%),radial-gradient(700px_350px_at_90%_0%,rgba(15,23,42,0.06),transparent_55%)]" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 border border-slate-200 bg-white shadow-sm text-slate-600 text-xs">
            <Star className="w-4 h-4 text-amber-400"/> Rated 5/5 from 700+ reviews
          </div>
          <motion.h1 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.8}}
            className="mt-6 text-5xl sm:text-6xl md:text-7xl font-black tracking-tight text-slate-900 leading-[1.05]">
            Build Extraordinary Products with <span className="inline-block align-middle px-3 py-1 rounded-full bg-black text-white text-4xl sm:text-5xl">lega‑tech</span>
          </motion.h1>
          <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.1,duration:0.8}}
            className="mt-6 text-slate-600 text-base sm:text-lg max-w-2xl mx-auto">From AI engineering to world‑class UX, tap into senior talent and start shipping in days—not months.</motion.p>
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.2,duration:0.8}}
            className="mt-8 flex items-center justify-center gap-4">
            <MotionButton>Hire an Expert</MotionButton>
            <MotionButton variant="outline">Explore Services</MotionButton>
          </motion.div>

          {/* Trusted by */}
          <div className="mt-14 text-slate-400 text-sm">Trusted by</div>
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-5 gap-6 items-center justify-items-center text-slate-400">
            {['Outreach','Framer','attentive','slack','pipedrive'].map((n) => (
              <div key={n} className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full border border-slate-300"/>
                <span className="font-semibold">{n}</span>
              </div>
            ))}
          </div>
        </div>
        </ParallaxHero>
      </section>

      {/* Mission/Impact */}
      <section id="mission" className="py-28 min-h-screen flex items-center reveal">
        <div className="w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-[80px_1fr] gap-8 items-start">
              <Image src="https://i.pravatar.cc/112?img=12" alt="Profile" width={112} height={112} className="size-20 rounded-2xl object-cover" />
              <div>
                <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 leading-tight">
                  We believe that great AI and design talent deserves to shine.
                  <br />
                  <span className="text-slate-900">Our platform is built to help experts like you showcase your skills</span>
                  <span className="text-slate-400">, connect with high‑quality clients, and take your career to the next level.</span>
                </h2>

                <div className="mt-12 flex flex-wrap gap-6">
                  {/* Stat 1 */}
                  <div className="rounded-2xl border border-slate-200 bg-white/90 shadow-sm p-6 w-[260px]">
                    <div className="mb-3 inline-flex items-center gap-2 rounded-lg bg-slate-900 text-white text-[10px] px-2.5 py-1">
                      <span className="size-1.5 rounded-full bg-emerald-400" /> Client Satisfaction
                    </div>
                  <div className="text-6xl font-black text-slate-900"><CounterUp to={92} /></div>
                    <p className="mt-2 text-[11px] text-slate-600 leading-4">Clients report high satisfaction with projects.</p>
                  </div>
                  {/* Stat 2 */}
                  <div className="rounded-2xl border border-slate-200 bg-white/90 shadow-sm p-6 w-[260px]">
                    <div className="mb-3 inline-flex items-center gap-2 rounded-lg bg-slate-100 text-slate-700 text-[10px] px-2.5 py-1">
                      Talent Growth
                    </div>
                  <div className="text-6xl font-black text-slate-900"><CounterUp to={80} /></div>
                    <p className="mt-2 text-[11px] text-slate-600 leading-4">Experts have seen increased job opportunities.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expert Services (showcase) */}
      <section id="expert-services" className="py-28 min-h-screen reveal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <div className="absolute -inset-24 -z-10 bg-[radial-gradient(600px_300px_at_15%_10%,rgba(59,130,246,0.08),transparent_60%),radial-gradient(700px_300px_at_90%_20%,rgba(99,102,241,0.06),transparent_60%)]" />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 text-sm text-slate-500">
                <span className="size-1.5 rounded-full bg-orange-400" /> Explore
              </div>
              <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900">Our Expert Services</h2>
              <p className="mt-2 text-slate-500 text-sm">Tailored solutions for every digital project.</p>
            </div>
            <div>
              <button className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm bg-white border border-slate-200 shadow-sm hover:bg-slate-50">
                <span className="size-1.5 rounded-full bg-orange-400" /> Explore Talent Services
              </button>
            </div>
          </div>

          <div className="mt-10 text-[11px] text-slate-400">Categories</div>

          <motion.div initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{staggerChildren:0.1}} className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Dark card */}
            <motion.div whileHover={{y:-6,scale:1.01}} className="rounded-3xl bg-slate-900 text-white p-8 sm:p-10 shadow-lg min-h-[360px]">
              <div className="mb-4 inline-flex items-center justify-center size-8 rounded-full bg-white/10">
                <span className="size-2 rounded-full bg-white" />
              </div>
              <h3 className="text-3xl font-semibold">Web Design</h3>
              <p className="mt-4 text-sm text-white/80 max-w-sm">Crafting visually stunning and user‑centric websites.</p>
              <div className="mt-8 flex flex-wrap gap-2 text-[11px]">
                {['Responsive','E‑commerce','Landing Pages','WordPress & CMS'].map(t => (
                  <span key={t} className="px-3 py-1 rounded-full bg-white/10 border border-white/15">{t}</span>
                ))}
              </div>
            </motion.div>

            {/* Light cards */}
            <motion.div whileHover={{y:-6,scale:1.01}} className="rounded-3xl bg-gradient-to-br from-slate-50 via-white to-slate-50 border border-slate-200 p-8 sm:p-10 min-h-[360px]">
              <div className="mb-4 inline-flex items-center justify-center size-8 rounded-full bg-indigo-100">
                <span className="size-2 rounded-full bg-indigo-500" />
              </div>
              <h3 className="text-3xl font-semibold text-slate-900">Mobile App Design</h3>
              <p className="mt-4 text-sm text-slate-600 max-w-sm">Engaging and intuitive interfaces for mobile users.</p>
            </motion.div>

            <motion.div whileHover={{y:-6,scale:1.01}} className="rounded-3xl bg-gradient-to-br from-slate-50 via-white to-slate-50 border border-slate-200 p-8 sm:p-10 min-h-[360px]">
              <div className="mb-4 inline-flex items-center justify-center size-8 rounded-full bg-teal-100">
                <span className="size-2 rounded-full bg-teal-500" />
              </div>
              <h3 className="text-3xl font-semibold text-slate-900">UX Design & Research</h3>
              <p className="mt-4 text-sm text-slate-600 max-w-sm">Improving user experience through data‑driven design.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 min-h-screen reveal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 text-center">Explore Our Expert Services</h2>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[{t:'Web Design',d:'Crafting visually stunning, user‑centric websites.'},{t:'Mobile App Design',d:'Engaging and intuitive interfaces for mobile.'},{t:'UI Systems',d:'Design systems and component libraries.'}].map((c,i)=> (
              <div key={i} className={`rounded-2xl border border-slate-200 p-6 bg-white shadow-sm hover:shadow-md transition ${i===0? 'bg-slate-900 text-white':''}`}>
                <h3 className="text-xl font-semibold">{c.t}</h3>
                <p className={`mt-2 ${i===0? 'text-white/80':'text-slate-600'}`}>{c.d}</p>
                <div className="mt-4 flex flex-wrap gap-2 text-xs">
                  {["Landing Pages","E‑commerce","Dashboards"].map((tag)=> (
                    <span key={tag} className={`px-2.5 py-1 rounded-full border ${i===0? 'border-white/20 text-white/90':'border-slate-200 text-slate-600'}`}>{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="relative py-28 min-h-screen reveal">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(800px_400px_at_10%_10%,rgba(2,132,199,0.08),transparent_60%),radial-gradient(700px_300px_at_100%_20%,rgba(15,23,42,0.06),transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900">How lega-tech Works</h2>
            <p className="mt-2 text-[13px] text-slate-500">Connecting you with the best AI/UX experts in three simple steps</p>
          </div>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Image side */}
            <div className="relative rounded-3xl overflow-hidden shadow-xl ring-1 ring-black/5">
              <Image src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1200&auto=format&fit=crop" alt="collaboration" width={1200} height={800} className="h-[460px] w-full object-cover" priority />
              {/* overlay profile chip */}
              <div className="absolute left-4 bottom-4 right-4 rounded-2xl bg-white/95 backdrop-blur border border-slate-200 p-3 shadow-md flex items-center gap-3">
                <div className="size-9 rounded-full bg-slate-200" />
                <div className="text-sm">
                  <div className="font-semibold text-slate-900">Rebecca</div>
                  <div className="text-[11px] text-slate-500">rebecca@example.com</div>
                </div>
                <div className="ml-auto flex items-center gap-4 text-[11px] text-slate-600">
                  <span className="hidden sm:block">Yogyakarta</span>
                  <span>$35/hr</span>
                  <button className="rounded-full bg-slate-900 text-white px-3 py-1 text-xs">Show More</button>
                </div>
              </div>
            </div>

            {/* Steps side */}
            <HowSteps />
          </div>
        </div>
      </section>

      {/* Clients and Talents */}
      <section id="clients" className="relative py-28 min-h-screen reveal">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(900px_400px_at_10%_10%,rgba(2,132,199,0.06),transparent_60%),radial-gradient(700px_300px_at_100%_30%,rgba(15,23,42,0.05),transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900">Built for Clients</h2>
            <p className="mt-3 text-slate-600">Transparent pricing, flexible engagements, and rigorous quality.</p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[{icon:ShieldCheck,title:'Quality‑first',desc:'Senior‑vetted experts, reviews, and SLAs.'},{icon:Coins,title:'Transparent pricing',desc:'Hourly or fixed scopes. No hidden fees.'},{icon:Handshake,title:'Flexible engagements',desc:'On‑demand, sprints, or long‑term retainers.'},{icon:Clock,title:'Fast start',desc:'Start within 48 hours with the right match.'}].map((f,i)=> (
              <motion.div key={f.title} whileHover={{y:-6}} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <f.icon className="w-6 h-6 text-blue-600"/>
                <h3 className="mt-4 font-semibold text-slate-900">{f.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{f.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Simple pricing CTA */}
          <div className="mt-14 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm flex flex-col md:flex-row items-center gap-6 md:gap-10">
            <div className="text-left">
              <div className="text-sm text-slate-500">From</div>
              <div className="text-5xl font-black text-slate-900 tracking-tight">$35<span className="text-xl align-top">/hr</span></div>
              <p className="mt-2 text-sm text-slate-600">Typical senior rates vary by region and scope.</p>
            </div>
            <div className="ml-auto">
              <MotionButton>Get a custom quote</MotionButton>
            </div>
          </div>
        </div>
      </section>
      <section id="talents" className="py-28 min-h-screen reveal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900">Empowering Talents</h2>
            <p className="mt-3 text-slate-600">Premium clients, swift payouts, and supportive community.</p>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900">Premium Clients</h3>
              <p className="mt-2 text-sm text-slate-600">Work with top startups and enterprises on real products.</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900">Swift Payouts</h3>
              <p className="mt-2 text-sm text-slate-600">No delays. Transparent billing and secure payments.</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900">Supportive Community</h3>
              <p className="mt-2 text-sm text-slate-600">Mentors, peer reviews, and learning paths to grow.</p>
            </div>
          </div>
          <div className="mt-10 flex justify-center gap-4">
            <MotionButton className="bg-black hover:bg-black/90">Join as Talent</MotionButton>
            <MotionButton variant="outline">View Opportunities</MotionButton>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-16 reveal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-5 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-md bg-gradient-to-br from-blue-500 to-indigo-600" />
              <span className="text-xl font-extrabold">lega-tech</span>
            </div>
            <p className="mt-3 text-sm text-slate-600">Building opportunities with advanced AI and design.</p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-600">
              <span className="size-2 rounded-full bg-emerald-400"/> Improving Talent Initiative
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 mb-3">Company</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><a href="#">About</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Press</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 mb-3">Resources</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><a href="#">Docs</a></li>
              <li><a href="#">Community</a></li>
              <li><a href="#youth">Empowering Youth</a></li>
              <li><a href="#clients">For Clients</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 mb-3">Newsletter</h4>
            <form className="flex gap-2">
              <input className="flex-1 h-10 rounded-md border border-slate-200 px-3 text-sm" placeholder="you@example.com" />
              <MotionButton className="bg-black hover:bg-black/90">Join</MotionButton>
            </form>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 text-center text-sm text-slate-500">© {new Date().getFullYear()} lega‑tech. All rights reserved.</div>
      </footer>

      {/* Sticky dock */}
      {dock && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
          <div className="flex items-center gap-3 rounded-full bg-white/90 backdrop-blur border border-slate-200 shadow-xl px-3 py-2">
            <MotionButton className="bg-black hover:bg-black/90">Hire Expert</MotionButton>
            <MotionButton variant="outline">Explore Services</MotionButton>
          </div>
        </div>
      )}
    </div>
  )
}
