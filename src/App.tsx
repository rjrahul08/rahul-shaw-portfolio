import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Html, OrbitControls, Sparkles, Stars } from '@react-three/drei'
import { TypeAnimation } from 'react-type-animation'
import CountUp from 'react-countup'
import { ArrowDown, ArrowRight, Copy, Github, Linkedin, Mail, Phone, Send, TerminalSquare } from 'lucide-react'
import Lenis from 'lenis'
import { CustomCursor } from './components/CustomCursor'
import { GlowButton } from './components/GlowButton'
import { Loader } from './components/Loader'
import { Navbar } from './components/Navbar'
import { SectionWrapper } from './components/SectionWrapper'
import {
  aiAnswers,
  constellationNodes,
  experience,
  githubRepos,
  heroTypeSequence,
  metrics,
  nowCards,
  personalInfo,
  pipelineNodes,
  proficiency,
  projects,
  ragCode,
  skillGroups,
  stats,
  timeline,
} from './lib/constants'
import { cn, isMobile, scrollToId } from './lib/utils'

function ConstellationScene() {
  const group = useRef<any>(null)
  const [hovered, setHovered] = useState<string | null>(null)
  const lanes = useMemo(
    () => [
      {
        category: 'AI/ML',
        x: -3.6,
        color: '#00f5ff',
        summary: 'Retrieval, embeddings, grounding, and LLM orchestration.',
        items: constellationNodes.filter((node) => node.category === 'AI/ML'),
      },
      {
        category: 'Cloud',
        x: -1.2,
        color: '#7b2fff',
        summary: 'Scalable deployment, compute, storage, and automation.',
        items: constellationNodes.filter((node) => node.category === 'Cloud'),
      },
      {
        category: 'Backend',
        x: 1.2,
        color: '#00ff88',
        summary: 'APIs and services that operationalize intelligent systems.',
        items: constellationNodes.filter((node) => node.category === 'Backend'),
      },
      {
        category: 'Frontend',
        x: 3.6,
        color: '#ff6b35',
        summary: 'Experience layer for shipping usable AI products.',
        items: constellationNodes.filter((node) => node.category === 'Frontend'),
      },
    ],
    [],
  )

  const bridgeLinks = useMemo(
    () => [
      { from: [-3.6, 0.7, 0], to: [-1.2, 0.35, 0], color: '#00f5ff' },
      { from: [-1.2, 0.35, 0], to: [1.2, -0.1, 0], color: '#7b2fff' },
      { from: [1.2, -0.1, 0], to: [3.6, -0.45, 0], color: '#00ff88' },
    ],
    [],
  )

  useFrame(({ clock }) => {
    if (!group.current) return
    group.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.12) * 0.03
    group.current.position.y = Math.sin(clock.getElapsedTime() * 0.35) * 0.06
  })

  return (
    <group ref={group}>
      <mesh position={[0, -1.95, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10.5, 5.6]} />
        <meshBasicMaterial color="#0a0a12" transparent opacity={0.28} />
      </mesh>

      {lanes.map((lane) => (
        <group key={lane.category} position={[lane.x, 0, 0]}>
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.04, 0.04, 4.4, 16]} />
            <meshStandardMaterial color={lane.color} emissive={lane.color} emissiveIntensity={1.5} />
          </mesh>
          <mesh position={[0, 1.95, 0]}>
            <sphereGeometry args={[0.12, 20, 20]} />
            <meshStandardMaterial color={lane.color} emissive={lane.color} emissiveIntensity={3} />
          </mesh>
          {lane.items.map((item, index) => {
            const y = 1.3 - index * 0.72
            const active = hovered === item.id
            return (
              <group key={item.id} position={[0, y, 0]}>
                <mesh
                  position={[0, 0, 0]}
                  scale={active ? 1.2 : 1}
                  onPointerOver={(e) => {
                    e.stopPropagation()
                    setHovered(item.id)
                  }}
                  onPointerOut={() => setHovered(null)}
                >
                  <sphereGeometry args={[0.14, 24, 24]} />
                  <meshStandardMaterial color={item.color} emissive={item.color} emissiveIntensity={active ? 3.5 : 2} />
                </mesh>
                <mesh position={[0.48, 0, 0]}>
                  <boxGeometry args={[0.72, 0.02, 0.02]} />
                  <meshBasicMaterial color={item.color} transparent opacity={0.6} />
                </mesh>
                <Html position={[1.25, 0, 0]} distanceFactor={9} transform sprite>
                  <div className={`w-36 rounded-2xl border px-3 py-2 backdrop-blur-xl transition-all duration-300 ${active ? 'border-white/30 bg-[rgba(5,5,8,0.92)] shadow-[0_0_22px_rgba(0,245,255,0.2)]' : 'border-white/10 bg-[rgba(10,10,15,0.72)]'}`}>
                    <div className="font-mono text-[9px] uppercase tracking-[0.24em] text-[var(--text-muted)]">{lane.category}</div>
                    <div className="mt-1 text-sm font-semibold text-white">{item.label}</div>
                  </div>
                </Html>
              </group>
            )
          })}
          <Html position={[0, -2.55, 0]} center distanceFactor={10}>
            <div className="w-48 rounded-3xl border border-white/10 bg-[rgba(5,5,8,0.86)] p-4 text-center backdrop-blur-xl">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em]" style={{ color: lane.color }}>{lane.category}</div>
              <div className="mt-2 text-xs leading-5 text-[var(--text-secondary)]">{lane.summary}</div>
            </div>
          </Html>
        </group>
      ))}

      {bridgeLinks.map((link, index) => (
        <line key={index}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[new Float32Array([...link.from, ...link.to]), 3]} />
          </bufferGeometry>
          <lineBasicMaterial color={link.color} transparent opacity={0.45} />
        </line>
      ))}

      <Html position={[0, 2.6, 0]} center>
        <div className="rounded-full border border-white/10 bg-[rgba(5,5,8,0.82)] px-5 py-3 font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--text-secondary)] backdrop-blur-xl">
          Intelligence → Infrastructure → APIs → Product Interface
        </div>
      </Html>
    </group>
  )
}

function TimelineScene() {
  const group = useRef<any>(null)
  const [hovered, setHovered] = useState<string | null>(null)

  const helixPoints = useMemo(
    () =>
      timeline.map((item, index) => {
        const angle = index * 1.55 - 1.35
        return {
          ...item,
          position: [Math.cos(angle) * 1.8, 1.4 - index * 1.35, Math.sin(angle) * 1.8] as [number, number, number],
          angle,
        }
      }),
    [],
  )

  useFrame(({ clock }) => {
    if (!group.current) return
    group.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.16) * 0.28
  })

  return (
    <group ref={group}>
      {Array.from({ length: 40 }).map((_, index) => {
        const y = 2 - index * 0.18
        const angle = index * 0.38
        return (
          <mesh key={index} position={[Math.cos(angle) * 0.42, y, Math.sin(angle) * 0.42]}>
            <torusGeometry args={[1.45, 0.012, 8, 48]} />
            <meshBasicMaterial color="#00f5ff" transparent opacity={0.05 + (index % 5) * 0.01} />
          </mesh>
        )
      })}

      <mesh>
        <cylinderGeometry args={[0.08, 0.08, 5.4, 16]} />
        <meshStandardMaterial color="#0fdfff" emissive="#00f5ff" emissiveIntensity={1.4} />
      </mesh>

      {helixPoints.map((item, index) => {
        const active = hovered === item.year
        return (
          <group key={item.year} position={item.position}>
            <mesh
              onPointerOver={(e) => {
                e.stopPropagation()
                setHovered(item.year)
              }}
              onPointerOut={() => setHovered(null)}
              scale={active ? 1.2 : 1}
            >
              <icosahedronGeometry args={[0.22, 0]} />
              <meshStandardMaterial color={index === 0 ? '#7b2fff' : index === 1 ? '#00f5ff' : '#00ff88'} emissive="#00f5ff" emissiveIntensity={active ? 3.2 : 1.8} />
            </mesh>
            <mesh scale={active ? 1.8 : 1.35}>
              <torusGeometry args={[0.38, 0.02, 12, 42]} />
              <meshBasicMaterial color="#ffffff" transparent opacity={active ? 0.5 : 0.16} />
            </mesh>
            <Html position={[index % 2 === 0 ? -2.15 : 2.15, 0.1, 0]} center distanceFactor={9}>
              <div className={`w-52 rounded-3xl border px-4 py-4 backdrop-blur-xl transition-all duration-300 ${active ? 'border-cyan-300/70 bg-[rgba(5,5,8,0.94)] shadow-[0_0_24px_rgba(0,245,255,0.24)]' : 'border-white/10 bg-[rgba(10,10,15,0.76)]'}`}>
                <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--cyan)]">{item.year}</div>
                <div className="mt-2 text-base font-semibold text-white">{item.title}</div>
                <div className="mt-2 text-xs leading-5 text-[var(--text-secondary)]">{item.description}</div>
              </div>
            </Html>
          </group>
        )
      })}

      <Html position={[0, 2.55, 0]} center>
        <div className="rounded-full border border-white/10 bg-[rgba(5,5,8,0.84)] px-5 py-3 font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--text-secondary)] backdrop-blur-xl">
          Career growth visualized as an upward helix, not a flat line
        </div>
      </Html>
    </group>
  )
}

function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const total = document.body.scrollHeight - window.innerHeight
      setProgress(total > 0 ? window.scrollY / total : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return <div className="fixed left-0 top-0 z-[60] h-0.5 origin-left bg-[var(--cyan)] shadow-[0_0_18px_rgba(0,245,255,0.6)]" style={{ width: `${progress * 100}%` }} />
}

function NeuralField() {
  const group = useRef<any>(null)
  useFrame(({ clock }) => {
    if (!group.current) return
    group.current.rotation.y = clock.getElapsedTime() * 0.06
    group.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.2) * 0.08
  })

  const points = useMemo(() => {
    const count = isMobile() ? 60 : 120
    return Array.from({ length: count }, (_, i) => ({
      key: i,
      position: [
        (Math.random() - 0.5) * 9,
        (Math.random() - 0.5) * 5.5,
        (Math.random() - 0.5) * 4,
      ] as [number, number, number],
      scale: Math.random() * 0.05 + 0.02,
    }))
  }, [])

  return (
    <group ref={group}>
      {points.map((point) => (
        <mesh key={point.key} position={point.position}>
          <sphereGeometry args={[point.scale, 12, 12]} />
          <meshBasicMaterial color="#00f5ff" transparent opacity={0.8} />
        </mesh>
      ))}
      {points.slice(0, 45).map((point, index) => {
        const next = points[(index * 3 + 7) % points.length]
        return (
          <line key={`line-${point.key}`}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                args={[new Float32Array([...point.position, ...next.position]), 3]}
              />
            </bufferGeometry>
            <lineBasicMaterial color="#7b2fff" transparent opacity={0.25} />
          </line>
        )
      })}
    </group>
  )
}

function FloatingKnot() {
  const mesh = useRef<any>(null)
  useFrame(({ clock }) => {
    if (!mesh.current) return
    mesh.current.rotation.x = clock.getElapsedTime() * 0.35
    mesh.current.rotation.y = clock.getElapsedTime() * 0.25
  })

  return (
    <Float floatIntensity={1} rotationIntensity={0.7} speed={2}>
      <group ref={mesh}>
        <mesh>
          <torusKnotGeometry args={[1, 0.3, 160, 20]} />
          <meshStandardMaterial color="#7b2fff" metalness={0.85} roughness={0.12} emissive="#3a117d" />
        </mesh>
        <mesh scale={1.04}>
          <torusKnotGeometry args={[1, 0.3, 160, 20]} />
          <meshBasicMaterial color="#00f5ff" wireframe transparent opacity={0.18} />
        </mesh>
        <Sparkles count={30} scale={3} size={2} color="#00f5ff" />
      </group>
    </Float>
  )
}

function HeroSection() {
  return (
    <section id="hero" className="relative flex min-h-screen items-center overflow-hidden px-6 pt-28 md:px-10">
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.6} />
          <NeuralField />
        </Canvas>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(10,10,15,0.28)_45%,rgba(5,5,8,0.95)_100%)]" />
        <div className="absolute inset-0 opacity-[0.06] [background-image:repeating-linear-gradient(to_bottom,transparent_0,transparent_2px,rgba(255,255,255,0.5)_3px)]" />
      </div>
      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
          <div className="hero-label mb-5 font-mono text-xs uppercase tracking-[0.4em] text-[var(--cyan)]">// AI BACKEND ENGINEER</div>
          <h1 className="hero-name font-display text-[clamp(3.5rem,8vw,7rem)] leading-none text-[var(--text-primary)]">
            Rahul Prasad Shaw
          </h1>
          <div className="mt-6 font-mono text-lg text-[var(--cyan)] md:text-2xl">
            <TypeAnimation sequence={heroTypeSequence as unknown as (string | number)[]} repeat={Infinity} speed={48} cursor />
          </div>
          <p className="hero-tagline mt-6 max-w-2xl text-lg text-[var(--text-secondary)] md:text-xl">
            Engineering the Intelligence Layer. I build the backend that makes AI products actually work — at scale.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <GlowButton className="hero-cta" onClick={() => scrollToId('projects')}>View My Work</GlowButton>
            <GlowButton className="hero-cta" href="/resume.pdf" variant="secondary">Download Resume</GlowButton>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-5 border-t border-white/10 pt-6 font-mono text-xs uppercase tracking-[0.24em] text-[var(--text-muted)]">
            <a className="hero-social hover:text-[var(--cyan)]" href={personalInfo.github} target="_blank" rel="noreferrer">github.com/rjrahul08</a>
            <a className="hero-social hover:text-[var(--cyan)]" href={personalInfo.linkedin} target="_blank" rel="noreferrer">linkedin</a>
            <a className="hero-social hover:text-[var(--cyan)]" href={`mailto:${personalInfo.email}`}>email</a>
          </div>
        </motion.div>
        <div className="relative hidden lg:block">
          <div className="glass-card rounded-[28px] p-6">
            <div className="font-mono text-xs uppercase tracking-[0.35em] text-[var(--text-muted)]">Live Stack Snapshot</div>
            <div className="mt-6 space-y-4">
              {['RAG Systems', 'Vector Search', 'AWS Lambda', 'Production APIs', 'LLM Integration'].map((item, index) => (
                <div key={item} className="rounded-2xl border border-white/8 bg-white/3 p-4">
                  <div className="flex items-center justify-between font-mono text-sm text-[var(--text-primary)]">
                    <span>{item}</span>
                    <span className="text-[var(--cyan)]">0{index + 1}</span>
                  </div>
                  <div className="mt-3 h-2 rounded-full bg-white/8">
                    <div className="h-full rounded-full bg-[linear-gradient(90deg,var(--cyan),var(--violet))]" style={{ width: `${78 + index * 4}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <button onClick={() => scrollToId('about')} className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.4em] text-[var(--text-muted)]">
        Scroll
        <ArrowDown className="animate-bounce text-[var(--cyan)]" size={18} />
      </button>
    </section>
  )
}

function AboutSection() {
  return (
    <SectionWrapper id="about" label="// 02 — ABOUT" title="The infrastructure behind intelligent software.">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="glass-card h-[380px] overflow-hidden rounded-[28px]">
          <Canvas camera={{ position: [0, 0, 4] }}>
            <ambientLight intensity={0.9} />
            <pointLight position={[2, 2, 2]} intensity={2} color="#00f5ff" />
            <FloatingKnot />
          </Canvas>
        </div>
        <div>
          <h3 className="font-display text-3xl text-[var(--text-primary)]">Who I Am</h3>
          <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--text-secondary)] md:text-lg">
            Rahul Prasad Shaw is an AI Backend Engineer based in Kolkata, India, with 2+ years building the infrastructure that makes intelligent products possible. He specializes in Retrieval-Augmented Generation architectures, vector search pipelines with Pinecone and FAISS, LLM integration, and cloud-native systems on AWS — crafting backends that are fast, scalable, and genuinely intelligent.
          </p>
          <p className="mt-4 max-w-2xl text-base leading-8 text-[var(--text-secondary)] md:text-lg">
            Currently at RoboAnalytics, Rahul builds AI automation systems serving global users and is open to full-time roles and freelance AI product development.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="glass-card rounded-2xl p-5">
                <div className="font-display text-4xl text-[var(--cyan)]">
                  <CountUp end={stat.value} suffix={stat.suffix} enableScrollSpy scrollSpyOnce />
                </div>
                <div className="mt-2 font-mono text-xs uppercase tracking-[0.25em] text-[var(--text-muted)]">{stat.label}</div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a className="glass-card inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm text-[var(--text-primary)]" href={personalInfo.github}><Github size={16} /> GitHub</a>
            <a className="glass-card inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm text-[var(--text-primary)]" href={personalInfo.linkedin}><Linkedin size={16} /> LinkedIn</a>
            <a className="glass-card inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm text-[var(--text-primary)]" href={`mailto:${personalInfo.email}`}><Mail size={16} /> Email</a>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}

function SkillsSection() {
  return (
    <SectionWrapper id="skills" label="// 03 — SKILLS" title="Tech Arsenal">
      <div className="mb-10 overflow-hidden rounded-full border border-white/8 bg-white/3 py-3">
        <div className="marquee whitespace-nowrap font-mono text-xs uppercase tracking-[0.35em] text-[var(--text-muted)]">
          {Array.from({ length: 2 }).map((_, idx) => (
            <span key={idx} className="mx-4 inline-block">
              PYTHON • RAG • PINECONE • FAISS • AWS LAMBDA • LLM INTEGRATION • VECTOR SEARCH • FLASK • REACT • DOCKER • TYPESCRIPT • NODE.JS • MONGODB •
            </span>
          ))}
        </div>
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {skillGroups.map((group) => (
          <motion.div key={group.title} whileHover={{ y: -6 }} className="glass-card rounded-[24px] p-6">
            <div className="mb-4 flex items-center gap-3 font-mono text-sm uppercase tracking-[0.25em] text-[var(--text-primary)]">
              <span className="text-xl">{group.icon}</span>
              {group.title}
            </div>
            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span key={skill} className="rounded-full border border-white/8 bg-white/5 px-3 py-1 font-mono text-xs text-[var(--text-secondary)]">{skill}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
      <div className="glass-card mt-8 rounded-[28px] p-6 md:p-8">
        <div className="space-y-5">
          {proficiency.map((item) => (
            <div key={item.label}>
              <div className="mb-2 flex items-center justify-between font-mono text-xs uppercase tracking-[0.25em] text-[var(--text-muted)]">
                <span>{item.label}</span>
                <span>{item.value}%</span>
              </div>
              <div className="h-2 rounded-full bg-white/8">
                <motion.div initial={{ width: 0 }} whileInView={{ width: `${item.value}%` }} viewport={{ once: true }} transition={{ duration: 1, ease: 'easeOut' }} className="h-full rounded-full bg-[linear-gradient(90deg,var(--cyan),var(--violet))]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}

function ExperienceSection() {
  return (
    <SectionWrapper id="experience" label="// 04 — EXPERIENCE" title="Journey">
      <div className="relative mx-auto max-w-5xl">
        <div className="absolute left-4 top-0 h-full w-px bg-[linear-gradient(180deg,var(--cyan),var(--violet))] md:left-1/2" />
        <div className="space-y-8">
          {experience.map((item, index) => (
            <div key={item.title} className={cn('relative md:flex', index % 2 === 0 ? 'md:justify-start' : 'md:justify-end')}>
              <div className="absolute left-4 top-8 h-3 w-3 -translate-x-1/2 rounded-full bg-[var(--cyan)] shadow-[0_0_18px_rgba(0,245,255,0.8)] md:left-1/2" />
              <div className="glass-card ml-10 rounded-[24px] border-l-2 border-[var(--cyan)] p-6 md:ml-0 md:w-[calc(50%-2rem)]">
                <div className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--text-muted)]">{item.period} • {item.location}</div>
                <h3 className="mt-3 font-display text-2xl text-[var(--text-primary)]">{item.title}</h3>
                <p className="mt-1 text-lg text-[var(--text-secondary)]">{item.company}</p>
                <ul className="mt-5 space-y-3 text-[var(--text-secondary)]">
                  {item.points.map((point) => <li key={point}>▸ {point}</li>)}
                </ul>
                <div className="mt-5 flex flex-wrap gap-2">
                  {item.tags.map((tag) => <span key={tag} className="rounded-full border border-white/8 bg-white/5 px-3 py-1 font-mono text-xs text-[var(--text-secondary)]">{tag}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}

function ProjectsSection() {
  return (
    <SectionWrapper id="projects" label="// 05 — PROJECTS" title="What I've Built">
      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((project) => (
          <motion.article key={project.id} whileHover={{ y: -8 }} className={cn('group glass-card relative overflow-hidden rounded-[28px] p-6 md:p-7', project.size === 'large' ? 'md:col-span-1' : '')}>
            <div className="absolute inset-0 translate-x-[-120%] bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.08),transparent)] transition-transform duration-700 group-hover:translate-x-[120%]" />
            <div className="relative z-10 flex h-full flex-col">
              <div className="mb-5 flex items-start justify-between gap-4">
                <h3 className="font-display text-2xl text-[var(--text-primary)]">{project.title}</h3>
                <span className="rounded-full border border-white/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--cyan)]">{project.badge}</span>
              </div>
              <p className="text-[var(--text-secondary)]">{project.description}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {project.techStack.map((tech) => <span key={tech} className="rounded-full border border-white/8 bg-white/5 px-3 py-1 font-mono text-xs text-[var(--text-secondary)]">{tech}</span>)}
              </div>
              <button className="mt-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.28em] text-[var(--cyan)]">Case <ArrowRight size={14} /></button>
            </div>
          </motion.article>
        ))}
      </div>
    </SectionWrapper>
  )
}

function PipelineSection() {
  const [copied, setCopied] = useState(false)
  const copyCode = async () => {
    await navigator.clipboard.writeText(ragCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 1400)
  }

  return (
    <SectionWrapper id="pipeline" label="// 06 — RAG PIPELINE" title="Inside My AI">
      <div className="glass-card rounded-[28px] p-6 md:p-8">
        <div className="grid gap-4 lg:grid-cols-6">
          {pipelineNodes.map((node, index) => (
            <div key={node.title} className="relative">
              <div className="interactive rounded-[22px] border border-[var(--border-glow)] bg-[var(--bg-card)] p-4 text-center shadow-[var(--glow-cyan-sm)]/30 h-full">
                <div className="text-2xl">{node.icon}</div>
                <div className="mt-3 font-mono text-xs uppercase tracking-[0.25em] text-[var(--text-muted)]">Step 0{index + 1}</div>
                <div className="mt-2 font-display text-xl text-[var(--text-primary)]">{node.title}</div>
                <div className="mt-2 text-sm text-[var(--text-secondary)]">{node.subtitle}</div>
                <div className="mt-3 text-xs text-[var(--text-muted)]">{node.tooltip}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 overflow-hidden rounded-[24px] border border-white/8 bg-[#0a0d16]">
          <div className="flex items-center justify-between border-b border-white/8 px-4 py-3 font-mono text-xs text-[var(--text-muted)]">
            <span>rag_pipeline.py</span>
            <button onClick={copyCode} className="inline-flex items-center gap-2 text-[var(--text-primary)]"><Copy size={14} /> {copied ? 'Copied' : 'Copy'}</button>
          </div>
          <pre className="overflow-x-auto p-5 text-sm leading-7 text-[var(--text-secondary)]"><code>{ragCode}</code></pre>
        </div>
      </div>
    </SectionWrapper>
  )
}

function TerminalSection() {
  const [history, setHistory] = useState<string[]>([
    '> Initializing Rahul.AI v2.0...',
    '> Loading neural profile... ████████████ 100%',
    "> System ready. Type 'help' to begin.",
  ])
  const [input, setInput] = useState('')
  const [past, setPast] = useState<string[]>([])
  const [cursor, setCursor] = useState(-1)

  const commands: Record<string, string | (() => string)> = {
    help: `Available commands:\n  skills\n  projects\n  experience\n  education\n  contact\n  rag\n  about\n  hire\n  github\n  linkedin\n  clear\n  whoami`,
    skills: 'Technical Skills:\n  [AI] RAG, LLM Integration, Vector Embeddings, Prompt Engineering\n  [VECTOR] Pinecone, FAISS\n  [LANG] Python, JavaScript, TypeScript\n  [BACKEND] Flask, Node.js, Express.js, REST APIs\n  [CLOUD] AWS, Docker\n  [FRONT] React.js, Next.js, Tailwind CSS',
    projects: 'Projects:\n  01. Stock Market Analysis System\n  02. Linkomatic — AI SaaS Platform\n  03. Enterprise Component Builder [NDA]\n  04. Vector Search System [NDA]',
    experience: 'Software Developer @ RoboAnalytics\nJan 2024 – Present\nBuilt scalable AI backend services, AWS Lambda pipelines, and high-performance APIs.',
    education: 'B.Sc. Computer Science\nNew Alipore College, University of Calcutta\n2021 | CGPA: 7.29',
    contact: `Email: ${personalInfo.email}\nPhone: ${personalInfo.phone}\nLinkedIn: ${personalInfo.linkedin}\nGitHub: ${personalInfo.github}`,
    rag: 'Retrieval-Augmented Generation grounds LLM responses in retrieved context from vector databases. Rahul builds these systems with Pinecone, FAISS, and OpenAI embeddings.',
    about: 'Rahul Prasad Shaw\nAI Backend Engineer | Kolkata, India\nSpecializes in RAG, LLM integration, vector search, AWS, and scalable backend APIs.',
    whoami: 'role: AI Backend Engineer\nstatus: open_to_work ✓\ncurrent_employer: RoboAnalytics\navailability: full_time | freelance',
    hire: () => {
      setTimeout(() => {
        window.location.href = `mailto:${personalInfo.email}`
      }, 800)
      return 'Excellent choice. Opening email client...'
    },
    github: () => {
      setTimeout(() => window.open(personalInfo.github, '_blank'), 400)
      return '> Opening GitHub...'
    },
    linkedin: () => {
      setTimeout(() => window.open(personalInfo.linkedin, '_blank'), 400)
      return '> Opening LinkedIn...'
    },
    clear: 'CLEAR_TERMINAL',
  }

  const runCommand = (raw: string) => {
    const cmd = raw.trim().toLowerCase()
    if (!cmd) return
    setPast((prev) => [cmd, ...prev].slice(0, 20))
    setCursor(-1)
    const result = commands[cmd]
    if (result === 'CLEAR_TERMINAL') {
      setHistory([])
      setInput('')
      return
    }
    const output = typeof result === 'function' ? result() : result
    setHistory((prev) => [...prev, `rahul@portfolio:~$ ${cmd}`, output ?? `> Command not found: ${cmd}`])
    if (!result) setHistory((prev) => [...prev, `rahul@portfolio:~$ ${cmd}`, `> Command not found: "${cmd}". Type 'help' for available commands.`])
    setInput('')
  }

  const quickCommands = ['help', 'projects', 'skills', 'rag', 'contact']

  return (
    <SectionWrapper id="terminal" label="// 07 — TERMINAL" title="> portfolio.exe">
      <div className="overflow-hidden rounded-[28px] border border-white/8 bg-[var(--bg-void)] shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
        <div className="flex items-center gap-2 border-b border-white/8 bg-[#131625] px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          <div className="ml-4 font-mono text-xs text-[var(--text-muted)]">rahul@portfolio: ~</div>
        </div>
        <div className="border-b border-white/8 px-4 py-3 md:hidden">
          <div className="flex flex-wrap gap-2">
            {quickCommands.map((cmd) => <button key={cmd} onClick={() => runCommand(cmd)} className="rounded-full border border-white/8 px-3 py-1 font-mono text-xs text-[var(--text-secondary)]">{cmd}</button>)}
          </div>
        </div>
        <div className="max-h-[420px] overflow-y-auto p-5 font-mono text-sm text-[var(--cyan)]">
          <div className="mb-5 text-[10px] leading-4 text-[var(--cyan)] md:text-xs">
            <div>██████╗  █████╗ ██╗  ██╗██╗   ██╗██╗</div>
            <div>██╔══██╗██╔══██╗██║  ██║██║   ██║██║</div>
            <div>██████╔╝███████║███████║██║   ██║██║</div>
            <div>██╔══██╗██╔══██║██╔══██║██║   ██║██║</div>
            <div>██║  ██║██║  ██║██║  ██║╚██████╔╝███████╗</div>
            <div>╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝</div>
          </div>
          {history.map((line, index) => <div key={`${line}-${index}`} className="mb-2 whitespace-pre-wrap text-[var(--cyan)]">{line}</div>)}
          <div className="mt-4 flex items-center gap-2 text-[var(--cyan)]">
            <span>rahul@portfolio:~$</span>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') runCommand(input)
                if (e.key === 'ArrowUp') {
                  e.preventDefault()
                  const next = Math.min(cursor + 1, past.length - 1)
                  setCursor(next)
                  setInput(past[next] ?? '')
                }
                if (e.key === 'ArrowDown') {
                  e.preventDefault()
                  const next = Math.max(cursor - 1, -1)
                  setCursor(next)
                  setInput(next === -1 ? '' : past[next] ?? '')
                }
                if (e.key === 'Tab') {
                  e.preventDefault()
                  const match = Object.keys(commands).find((cmd) => cmd.startsWith(input.toLowerCase()))
                  if (match) setInput(match)
                }
              }}
              className="flex-1 bg-transparent outline-none"
              placeholder="type a command"
            />
            <span className="animate-pulse">█</span>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}

function MetricsSection() {
  return (
    <SectionWrapper id="metrics" label="// 08 — METRICS" title="Metrics That Matter">
      <div className="mb-6 flex items-center gap-4 font-mono text-xs uppercase tracking-[0.28em] text-[var(--text-muted)]">
        <span>● LIVE</span>
        <span>Last updated: 2025</span>
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {metrics.map((metric, index) => (
          <div key={metric.label} className="glass-card rounded-[24px] p-6">
            <div className="font-mono text-xs uppercase tracking-[0.28em] text-[var(--text-muted)]">// {metric.label}</div>
            <div className={cn('mt-6 font-display text-5xl', index % 3 === 0 ? 'text-[var(--cyan)]' : index % 3 === 1 ? 'text-[var(--green)]' : 'text-[var(--violet)]')}>{metric.value}</div>
            <div className="mt-4 text-xl text-[var(--text-primary)]">{metric.title}</div>
            <div className="mt-1 text-sm text-[var(--text-secondary)]">{metric.subtitle}</div>
          </div>
        ))}
      </div>
      <div className="glass-card mt-6 rounded-[28px] p-6 md:p-8">
        <div className="mb-6 font-mono text-xs uppercase tracking-[0.28em] text-[var(--text-muted)]">AI Tech Proficiency</div>
        <div className="space-y-5">
          {proficiency.map((item) => (
            <div key={item.label}>
              <div className="mb-2 flex justify-between font-mono text-xs uppercase tracking-[0.25em] text-[var(--text-muted)]"><span>{item.label}</span><span>{item.value}%</span></div>
              <div className="h-1.5 rounded-full bg-white/8"><motion.div initial={{ width: 0 }} whileInView={{ width: `${item.value}%` }} viewport={{ once: true }} transition={{ duration: 1.1 }} className="h-full rounded-full bg-[linear-gradient(90deg,var(--cyan),var(--violet))]" /></div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}

function ConstellationSection() {
  return (
    <SectionWrapper id="constellation" label="// 09 — CONSTELLATION" title="My Universe of Tools">
      <div className="glass-card rounded-[28px] p-4 md:p-6">
        <div className="h-[420px] overflow-hidden rounded-[24px] bg-[radial-gradient(circle_at_center,rgba(123,47,255,0.18),transparent_45%),rgba(5,5,8,0.9)]">
          <Canvas camera={{ position: [0, 0, 8] }}>
            <ambientLight intensity={0.95} />
            <pointLight position={[0, 0, 4]} intensity={16} color="#00f5ff" />
            <pointLight position={[0, -2, -2]} intensity={10} color="#7b2fff" />
            <Stars radius={50} depth={20} count={1400} factor={3.4} saturation={0} fade speed={0.5} />
            <ConstellationScene />
            <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
          </Canvas>
        </div>
        <div className="mt-6 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[24px] border border-white/8 bg-white/4 p-5">
            <div className="font-mono text-xs uppercase tracking-[0.28em] text-[var(--text-muted)]">How to read this architecture skyline</div>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              <div className="rounded-2xl border border-white/8 bg-black/20 p-4 text-sm text-[var(--text-secondary)]">
                <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--cyan)]">1. Read left to right</div>
                <p className="mt-2">The lanes show how Rahul turns intelligence into shipped product systems.</p>
              </div>
              <div className="rounded-2xl border border-white/8 bg-black/20 p-4 text-sm text-[var(--text-secondary)]">
                <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--violet)]">2. Follow bridges</div>
                <p className="mt-2">The glowing links show how one layer hands off to the next in production.</p>
              </div>
              <div className="rounded-2xl border border-white/8 bg-black/20 p-4 text-sm text-[var(--text-secondary)]">
                <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--green)]">3. Hover tools</div>
                <p className="mt-2">Each glowing node reveals the exact technologies Rahul uses inside that layer.</p>
              </div>
            </div>
          </div>
          <div className="rounded-[24px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-5">
            <div className="font-mono text-xs uppercase tracking-[0.28em] text-[var(--text-muted)]">Why this is different</div>
            <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">
              Instead of a random orbit of tools, this section now reads like an AI system blueprint — from model intelligence to cloud to backend to end-user interface.
            </p>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          {['AI/ML', 'Cloud', 'Backend', 'Frontend'].map((item, index) => (
            <span key={item} className="rounded-full border border-white/8 px-4 py-2 font-mono text-xs uppercase tracking-[0.25em] text-[var(--text-secondary)]">
              <span className={cn('mr-2 inline-block h-2 w-2 rounded-full', index === 0 ? 'bg-[var(--cyan)]' : index === 1 ? 'bg-[var(--violet)]' : index === 2 ? 'bg-[var(--green)]' : 'bg-[var(--orange)]')} />
              {item}
            </span>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}

function AIDemoSection() {
  const [messages, setMessages] = useState([{ role: 'assistant', content: "Hi! I'm Rahul's AI assistant. Ask me anything about his skills, projects, or experience." }])
  const [input, setInput] = useState('')
  const [count, setCount] = useState(0)

  const ask = (question: string) => {
    if (!question.trim() || count >= 10) return
    const q = question.trim()
    const lower = q.toLowerCase()
    const answer = Object.entries(aiAnswers).find(([key]) => key !== 'default' && lower.includes(key))?.[1] ?? aiAnswers.default
    setMessages((prev) => [...prev, { role: 'user', content: q }, { role: 'assistant', content: answer }])
    setInput('')
    setCount((prev) => prev + 1)
  }

  return (
    <SectionWrapper id="ai-demo" label="// 10 — ASK MY AI" title="Ask My AI" subtitle="Powered by a smart portfolio knowledge layer about Rahul.">
      <div className="glass-card rounded-[28px] p-6 md:p-8">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div key={`${message.role}-${index}`} className={cn('max-w-3xl rounded-[22px] px-5 py-4', message.role === 'assistant' ? 'bg-white/5 text-[var(--text-primary)]' : 'ml-auto bg-[rgba(0,245,255,0.08)] text-[var(--cyan)]')}>
              {message.content}
            </div>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {['What is RAG?', 'Can Rahul freelance?', 'Tell me about his AWS work', 'Is he available?'].map((item) => (
            <button key={item} onClick={() => ask(item)} className="rounded-full border border-white/8 px-3 py-2 text-sm text-[var(--text-secondary)]">{item}</button>
          ))}
        </div>
        <div className="mt-6 flex gap-3">
          <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask something about Rahul..." className="flex-1 rounded-full border border-white/10 bg-white/5 px-5 py-4 text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)] focus:border-[var(--cyan)]" />
          <button onClick={() => ask(input)} className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,var(--cyan),var(--violet))] px-5 py-4 font-mono text-xs uppercase tracking-[0.25em] text-[var(--bg-void)]"><Send size={16} /> Send</button>
        </div>
        {count >= 10 ? <div className="mt-4 text-sm text-[var(--text-muted)]">Session limit reached. Contact Rahul directly at {personalInfo.email}</div> : null}
      </div>
    </SectionWrapper>
  )
}

function TimelineSection() {
  return (
    <SectionWrapper id="timeline3d" label="// 11 — 3D TIMELINE" title="Career Trajectory">
      <div className="glass-card rounded-[28px] p-6 md:p-8">
        <div className="h-[360px] overflow-hidden rounded-[24px] bg-[radial-gradient(circle_at_top,rgba(0,245,255,0.12),transparent_50%),rgba(5,5,8,0.95)]">
          <Canvas camera={{ position: [0, 1.2, 7] }}>
            <ambientLight intensity={0.85} />
            <pointLight position={[0, 3, 3]} intensity={14} color="#00f5ff" />
            <pointLight position={[-2, -1, -2]} intensity={8} color="#7b2fff" />
            <Stars radius={40} depth={20} count={900} factor={2.6} fade />
            <TimelineScene />
            <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
          </Canvas>
        </div>
        <div className="mt-6 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[24px] border border-white/8 bg-white/4 p-5">
            <div className="font-mono text-xs uppercase tracking-[0.28em] text-[var(--text-muted)]">Reading the helix</div>
            <div className="mt-4 space-y-3 text-sm leading-7 text-[var(--text-secondary)]">
              <p>This section treats Rahul's journey as upward motion — foundation, execution, and momentum — instead of a flat horizontal strip.</p>
              <p>The spiral form makes progress feel dimensional and alive, while the side cards keep each milestone easy to read.</p>
              <p>Hover any milestone to bring that chapter into focus.</p>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              ['Foundation', 'Academic grounding in computer science and problem solving.'],
              ['Execution', 'Production backend delivery across AWS, Flask, Node, and AI systems.'],
              ['Trajectory', 'Clear movement toward deeper AI infrastructure and product engineering.'],
            ].map(([title, text]) => (
              <div key={title} className="rounded-[24px] border border-white/8 bg-black/20 p-5">
                <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--cyan)]">{title}</div>
                <div className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{text}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {timeline.map((item) => (
            <div key={item.year} className="rounded-[22px] border border-white/8 bg-white/4 p-5">
              <div className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--cyan)]">{item.year}</div>
              <div className="mt-3 font-display text-2xl text-[var(--text-primary)]">{item.title}</div>
              <div className="mt-2 text-[var(--text-secondary)]">{item.description}</div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}

function GithubSection() {
  const cells = Array.from({ length: 48 }, (_, i) => (i * 7) % 5)
  return (
    <SectionWrapper id="github" label="// 12 — GITHUB" title="Open Source Presence">
      <div className="glass-card rounded-[28px] p-6 md:p-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--text-muted)]">github.com/rjrahul08</div>
          <a href={personalInfo.github} className="text-sm text-[var(--cyan)]">Visit profile</a>
        </div>
        <div className="rounded-[22px] border border-white/8 bg-white/4 p-5">
          <div className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-[var(--text-muted)]">Contribution Graph</div>
          <div className="grid grid-cols-12 gap-2 md:grid-cols-16">
            {cells.map((value, index) => (
              <div key={index} className="aspect-square rounded-[4px]" style={{ background: value === 0 ? 'rgba(255,255,255,0.05)' : value === 1 ? 'rgba(0,255,136,0.25)' : value === 2 ? 'rgba(0,255,136,0.45)' : value === 3 ? 'rgba(0,255,136,0.65)' : 'rgba(0,255,136,0.9)' }} />
            ))}
          </div>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {githubRepos.map((repo) => (
            <div key={repo.name} className="rounded-[22px] border border-white/8 bg-white/4 p-5">
              <div className="font-display text-xl text-[var(--text-primary)]">{repo.name}</div>
              <div className="mt-2 text-sm text-[var(--text-secondary)]">{repo.description}</div>
              <div className="mt-4 flex items-center justify-between font-mono text-xs uppercase tracking-[0.25em] text-[var(--text-muted)]">
                <span>{repo.language}</span>
                <span>★ {repo.stars}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}

function NowSection() {
  return (
    <SectionWrapper id="now" label="// 13 — NOW" title="< Now />" subtitle="Last updated: March 2025">
      <div className="grid gap-5 md:grid-cols-2">
        {nowCards.map((card) => (
          <div key={card.title} className="glass-card rounded-[26px] p-6">
            <div className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--text-muted)]">{card.icon} {card.title}</div>
            <p className="mt-4 text-lg leading-8 text-[var(--text-secondary)]">{card.text}</p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}

function ContactSection() {
  const [submitted, setSubmitted] = useState(false)
  return (
    <SectionWrapper id="contact" label="// 14 — CONTACT" title="Let's Build Something" subtitle="Open to full-time roles & freelance projects globally">
      <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
        <form
          className="glass-card rounded-[28px] p-6 md:p-8"
          onSubmit={(e) => {
            e.preventDefault()
            setSubmitted(true)
          }}
        >
          <div className="grid gap-4 md:grid-cols-2">
            <input className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-[var(--text-primary)] outline-none focus:border-[var(--cyan)]" placeholder="Name" />
            <input className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-[var(--text-primary)] outline-none focus:border-[var(--cyan)]" placeholder="Email" type="email" />
          </div>
          <select className="contact-select mt-4 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-[var(--text-primary)] outline-none focus:border-[var(--cyan)]">
            <option>Full-time Role</option>
            <option>Freelance Project</option>
            <option>Collaboration</option>
            <option>Just Saying Hi</option>
          </select>
          <textarea className="mt-4 min-h-40 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-[var(--text-primary)] outline-none focus:border-[var(--cyan)]" placeholder="Message" />
          <button className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,var(--cyan),var(--violet))] px-6 py-4 font-mono text-xs uppercase tracking-[0.28em] text-[var(--bg-void)]">
            <Send size={16} /> {submitted ? 'Message sent!' : 'Send Message'}
          </button>
          {submitted ? <div className="mt-3 text-sm text-[var(--green)]">Message sent! Rahul will reply within 24h.</div> : null}
        </form>
        <div className="glass-card rounded-[28px] p-6 md:p-8">
          <div className="font-display text-2xl text-[var(--text-primary)]">Direct Links</div>
          <div className="mt-6 space-y-4 text-[var(--text-secondary)]">
            <a className="flex items-center gap-3" href={`mailto:${personalInfo.email}`}><Mail size={18} /> {personalInfo.email}</a>
            <a className="flex items-center gap-3" href={`tel:${personalInfo.phone}`}><Phone size={18} /> {personalInfo.phone}</a>
            <a className="flex items-center gap-3" href={personalInfo.linkedin}><Linkedin size={18} /> LinkedIn</a>
            <a className="flex items-center gap-3" href={personalInfo.github}><Github size={18} /> GitHub</a>
            <div className="flex items-center gap-3"><TerminalSquare size={18} /> {personalInfo.location}</div>
          </div>
          <div className="mt-8 rounded-[22px] border border-white/8 bg-white/4 p-5">
            <div className="font-mono text-xs uppercase tracking-[0.28em] text-[var(--text-muted)]">Availability</div>
            <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-[rgba(0,255,136,0.25)] bg-[rgba(0,255,136,0.08)] px-3 py-2 text-sm text-[var(--green)]">● Open to work</div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}

function Footer() {
  return (
    <footer className="border-t border-white/8 px-6 py-10 md:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="font-mono text-lg font-bold tracking-[0.35em] text-[var(--cyan)]">RPS</div>
          <div className="mt-3 text-[var(--text-primary)]">Rahul Prasad Shaw</div>
          <div className="mt-1 text-[var(--text-secondary)]">AI Backend Engineer · Kolkata, India</div>
          <div className="mt-3 text-sm text-[var(--text-muted)]">Built with React, Three.js, motion, and way too much ☕</div>
        </div>
        <div className="flex flex-col items-start gap-3 md:items-end">
          <button onClick={() => scrollToId('hero')} className="font-mono text-xs uppercase tracking-[0.28em] text-[var(--text-secondary)]">↑ Back to top</button>
          <div className="text-sm text-[var(--text-muted)]">© 2025 Rahul Prasad Shaw · All rights reserved</div>
        </div>
      </div>
    </footer>
  )
}

function App() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2 })
    let raf = 0
    const loop = (time: number) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
    }
  }, [])

  return (
    <div className="min-h-screen bg-[var(--bg-void)] text-[var(--text-primary)]">
      <Loader />
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <PipelineSection />
        <TerminalSection />
        <MetricsSection />
        <ConstellationSection />
        <AIDemoSection />
        <TimelineSection />
        <GithubSection />
        <NowSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}

export default App
