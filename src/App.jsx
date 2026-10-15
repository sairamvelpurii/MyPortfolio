import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import {
  ArrowDownRight, ArrowUpRight, ArrowRight, Menu, X, Github, Linkedin,
  Mail, ExternalLink, Code2, BrainCircuit, Database, ChartNoAxesCombined,
  Sparkles, Layers3, Terminal, MoveUpRight, Send, Check, ChevronDown
} from 'lucide-react'

const projects = [
  {
    number: '01', name: 'DeepWorC', type: 'FULL STACK · REAL-TIME COLLABORATION',
    description: 'A digital workspace designed around focused teamwork, temporary spaces, priority messaging, and real-time collaboration.',
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.IO', 'JWT'],
    link: 'https://deepworc-work-space.vercel.app', github: 'https://github.com/sairamvelpurii/DeepWorC--workSpace',
    tone: 'violet', mark: 'DW', detail: 'Real-time messaging · Temporary workspaces · Focus mode'
  },
  {
    number: '02', name: 'TickFlow', type: 'FULL STACK · SUPPORT TICKETING',
    description: 'A support ticket dashboard for tracking issues, managing assignments, and making ticket workflows easier to navigate.',
    stack: ['React', 'Node.js', 'Express', 'MySQL', 'JWT', 'Tailwind CSS'],
    link: 'https://i-manager-omega.vercel.app/', github: 'https://github.com/sairamvelpurii/TickFlow--Support-Ticketing',
    tone: 'cream', mark: 'TF', detail: 'Ticket filtering · Activity tracking · CSV export'
  },
  {
    number: '03', name: 'Voice to Image', type: 'AI · GENERATIVE WORKFLOW',
    description: 'An academic machine-learning project exploring a voice-driven path from spoken input to generated visual output.',
    stack: ['Python', 'Machine Learning', 'Speech Processing', 'Image Generation'],
    link: '', github: 'https://github.com/sairamvelpurii',
    tone: 'dark', mark: 'V→I', detail: 'Voice input · Processing pipeline · Image output'
  },
  {
    number: '04', name: 'LENE Smart Tracker', type: 'AI · PERSONAL FINANCE',
    description: 'A finance application concept focused on extracting information from bank statements and organizing spending insights.',
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Gemini integration'],
    link: '', github: 'https://github.com/sairamvelpurii',
    tone: 'violet', mark: 'LN', detail: 'Statement extraction · Categorization · Analytics'
  }
]

const skillGroups = [
  { id: 'dev', icon: Code2, title: 'Full Stack Engineering', subtitle: 'Building the product, end to end.', skills: ['JavaScript', 'TypeScript', 'React.js', 'Node.js', 'Express.js', 'HTML5', 'CSS3', 'Tailwind CSS', 'REST APIs', 'JWT Authentication'] },
  { id: 'ml', icon: BrainCircuit, title: 'Machine Learning & AI', subtitle: 'Turning data into useful systems.', skills: ['Machine Learning', 'Data Preprocessing', 'Feature Engineering', 'Model Evaluation', 'NLP', 'Computer Vision', 'Deep Learning Fundamentals'] },
  { id: 'data', icon: ChartNoAxesCombined, title: 'Data & Visualization', subtitle: 'Exploring, cleaning, and communicating data.', skills: ['NumPy', 'Pandas', 'Matplotlib', 'Seaborn', 'Exploratory Data Analysis', 'Data Cleaning', 'Statistical Analysis'] },
  { id: 'db', icon: Database, title: 'Databases & Tools', subtitle: 'The foundations behind reliable applications.', skills: ['MongoDB', 'MySQL', 'Git', 'GitHub', 'Postman', 'VS Code', 'Vercel', 'Render'] },
]

const skillProjectMap = {
  'React.js': ['DeepWorC', 'TickFlow', 'LENE Smart Tracker'],
  'Node.js': ['DeepWorC', 'TickFlow'],
  'MongoDB': ['DeepWorC'],
  'MySQL': ['TickFlow'],
  'Machine Learning': ['Voice to Image'],
  'NLP': ['Voice to Image'],
  'Computer Vision': ['Voice to Image'],
  'Data Preprocessing': ['Voice to Image', 'LENE Smart Tracker'],
  'Pandas': ['LENE Smart Tracker'],
  'TypeScript': ['LENE Smart Tracker'],
}

const reveal = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } }
}

function Eyebrow({ children, className = '' }) {
  return <p className={`eyebrow ${className}`}>{children}</p>
}

function SectionHeading({ index, eyebrow, title, description }) {
  return (
    <motion.div className="section-heading" variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
      <Eyebrow>{index} / {eyebrow}</Eyebrow>
      <h2>{title}</h2>
      {description && <p className="section-description">{description}</p>}
    </motion.div>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSkill, setActiveSkill] = useState('')
  const [copied, setCopied] = useState(false)
  const reduceMotion = useReducedMotion()

  const relatedProjects = activeSkill ? (skillProjectMap[activeSkill] || []) : []
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('velpurisairam.dev@gmail.com')
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = 'mailto:velpurisairam.dev@gmail.com'
    }
  }

  const closeMenu = () => setMenuOpen(false)
  const goTo = (id) => {
    closeMenu()
    document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' })
  }

  return (
    <div className="site-shell">
      <div className="top-strip"><span>PORTFOLIO / 2026</span><span className="top-status"><i /> OPEN TO OPPORTUNITIES</span></div>

      <header className="nav-wrap">
        <a className="brand" href="#home" aria-label="Sairam Velpuri home"><span className="brand-monogram">SV</span><span className="brand-name">SAIRAM VELPURI<span className="brand-dot">.</span></span></a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {['About', 'Projects', 'Skills', 'Journey', 'Contact'].map((label) => <button key={label} onClick={() => goTo(label.toLowerCase())}>{label}</button>)}
        </nav>
        <button className="menu-toggle" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen(v => !v)}>{menuOpen ? <X /> : <Menu />}</button>
      </header>

      <AnimatePresence>
        {menuOpen && <motion.div className="mobile-menu" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
          {['About', 'Projects', 'Skills', 'Journey', 'Contact'].map((label, i) => <button key={label} onClick={() => goTo(label.toLowerCase())}><span>0{i + 1}</span>{label}<ArrowUpRight size={20} /></button>)}
          <p>BUILD WITH INTENTION. KEEP LEARNING.</p>
        </motion.div>}
      </AnimatePresence>

      <main>
        <section id="home" className="hero">
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-copy">
            <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.12 } } }}>
              <motion.div variants={reveal}><Eyebrow>SOFTWARE DEVELOPER · AI/ML EXPLORER</Eyebrow></motion.div>
              <motion.h1 variants={reveal}>I BUILD<br /><span className="outline-word">DIGITAL</span><br /><span className="accent-word">EXPERIENCES.</span></motion.h1>
              <motion.p variants={reveal} className="hero-intro">I'm Sairam — a recent Computer Science graduate building useful web experiences and exploring how AI can make them smarter.</motion.p>
              <motion.div variants={reveal} className="hero-actions">
                <button className="button button-dark" onClick={() => goTo('projects')}>EXPLORE MY WORK <ArrowDownRight size={19} /></button>
                <button className="button button-outline" onClick={() => goTo('contact')}>LET'S CONNECT <ArrowUpRight size={18} /></button>
              </motion.div>
            </motion.div>
          </div>
          <motion.div className="hero-art" initial={{ opacity: 0, scale: 0.94, rotate: 2 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 0.9, delay: 0.25 }}>
            <div className="art-top"><span>FIG. 001</span><span>IDEAS → INTERFACES</span></div>
            <div className="art-core">
              <div className="orb orb-one" /><div className="orb orb-two" />
              <div className="core-grid" />
              <span className="core-symbol">S<span>V</span></span>
              <span className="core-caption">DESIGN / BUILD / LEARN</span>
              <div className="floating-tag tag-code"><Code2 size={15} /> &lt;build /&gt;</div>
              <div className="floating-tag tag-ai"><BrainCircuit size={15} /> AI + DATA</div>
            </div>
            <div className="art-bottom"><span>FULL STACK</span><span>CURIOUS BY DEFAULT ↗</span></div>
            <div className="art-stamp">SV<br /><span>2026</span></div>
          </motion.div>
          <div className="hero-bottom"><span>BASED IN INDIA · AVAILABLE WORLDWIDE</span><span>SCROLL TO EXPLORE <ChevronDown size={15} /></span></div>
        </section>

        <section id="about" className="about section-pad">
          <div className="about-label"><Eyebrow>01 / A LITTLE CONTEXT</Eyebrow><span className="side-note">CURIOUS MIND.<br />PRACTICAL BUILDER.</span></div>
          <div className="about-main">
            <SectionHeading index="01" eyebrow="ABOUT ME" title={<>FROM LINES OF CODE<br />TO <span className="accent-word">USEFUL THINGS.</span></>} />
            <motion.div className="about-content" variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
              <p className="about-lead">I’m a CSE graduate specializing in AI & Machine Learning, with a hands-on interest in full stack development, product thinking, and building things that solve real problems.</p>
              <div className="about-detail-grid">
                <p>I enjoy taking an idea from a rough concept to a working application — designing the interface, connecting APIs, shaping data, and figuring out the details that make a product feel complete.</p>
                <p>Right now, I'm strengthening my foundations in data analysis and machine learning while continuing to build practical software. I value clear thinking, consistent learning, and shipping work I can explain.</p>
              </div>
              <div className="about-facts"><div><span>01</span><b>Build</b><small>Full stack applications</small></div><div><span>02</span><b>Explore</b><small>AI, ML & data</small></div><div><span>03</span><b>Improve</b><small>One iteration at a time</small></div></div>
            </motion.div>
          </div>
        </section>

        <section id="projects" className="projects section-pad">
          <SectionHeading index="02" eyebrow="SELECTED WORK" title={<>PROJECTS WITH<br /><span className="accent-word">A PURPOSE.</span></>} description="A selection of products and experiments across full stack development and AI. Open a live project or explore the code." />
          <div className="project-list">
          {projects.map((project) => {
              const highlighted = activeSkill && relatedProjects.includes(project.name)
              const projectDestination = project.link || project.github
              return <motion.article key={project.number} className={`project-card ${project.tone} ${highlighted ? 'is-highlighted' : ''}`} variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }} layout>
                <div className="project-index"><span>{project.number} / PROJECT</span><a className="project-arrow" href={projectDestination} target="_blank" rel="noreferrer" aria-label={`Open ${project.name} ${project.link ? 'live project' : 'GitHub profile'}`}><ArrowUpRight size={22} /></a></div>
                <div className="project-middle">
                  <div className="project-mark" aria-hidden="true">{project.mark}</div>
                  <div className="project-info"><Eyebrow>{project.type}</Eyebrow><h3>{project.name}<span>.</span></h3><p>{project.description}</p><div className="tag-list">{project.stack.map(tag => <span key={tag}>{tag}</span>)}</div></div>
                </div>
                <div className="project-footer"><span>{project.detail}</span><div className="project-links">{project.link && <a href={project.link} target="_blank" rel="noreferrer">LIVE PROJECT <ExternalLink size={15} /></a>}<a href={project.github} target="_blank" rel="noreferrer">{project.github === 'https://github.com/sairamvelpurii' ? 'GITHUB PROFILE' : 'SOURCE CODE'} <Github size={15} /></a></div></div>
              </motion.article>
            })}
          </div>
          <div className="project-note"><Sparkles size={17} /><p>More experiments are in progress. This portfolio will grow alongside my work in AI and machine learning.</p></div>
        </section>

        <section id="skills" className="skills section-pad">
          <SectionHeading index="03" eyebrow="THE TOOLKIT" title={<>TOOLS ARE ONLY<br />THE <span className="accent-word">BEGINNING.</span></>} description="The technologies I use and the areas I'm actively exploring. Select a skill to see related projects when available." />
          <div className="skills-layout">
            <div className="skill-groups">
              {skillGroups.map((group, index) => {
                const Icon = group.icon
                return <motion.div key={group.id} className="skill-group" variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }}>
                  <button className="skill-group-head" onClick={() => setActiveSkill('')} aria-label={`Clear selected skill from ${group.title}`}><span className="skill-number">0{index + 1}</span><Icon size={22} /><span className="skill-title">{group.title}<small>{group.subtitle}</small></span><span className="skill-reset">CLEAR ↗</span></button>
                  <div className="skill-chips">{group.skills.map(skill => <button key={skill} className={`skill-chip ${activeSkill === skill ? 'active' : ''}`} aria-pressed={activeSkill === skill} onClick={() => setActiveSkill(activeSkill === skill ? '' : skill)}>{skill}{activeSkill === skill && <Check size={13} />}</button>)}</div>
                </motion.div>
              })}
            </div>
            <aside className="skill-aside">
              <div className="aside-orbit"><div className="orbit-ring ring-a" /><div className="orbit-ring ring-b" /><div className="orbit-center"><BrainCircuit size={34} /></div><span className="orbit-label orbit-label-a">DATA</span><span className="orbit-label orbit-label-b">CODE</span><span className="orbit-label orbit-label-c">AI</span></div>
              <Eyebrow>CONNECT THE DOTS</Eyebrow>
              <h3>{activeSkill ? activeSkill : 'One skill. Many possibilities.'}</h3>
              <p>{activeSkill ? relatedProjects.length ? `Explore projects connected to ${activeSkill}. The matching project cards are highlighted above.` : `I'm building practical experience with ${activeSkill}. As relevant projects grow, they'll be connected here.` : 'Select a technology to connect it with projects, or explore the different parts of my toolkit.'}</p>
              {activeSkill && <button className="text-link" onClick={() => { setActiveSkill(''); goTo('projects') }}>VIEW PROJECTS <ArrowRight size={16} /></button>}
            </aside>
          </div>
        </section>

        <section id="journey" className="journey section-pad">
          <SectionHeading index="04" eyebrow="THE JOURNEY SO FAR" title={<>LEARN. BUILD.<br /><span className="accent-word">REPEAT.</span></>} />
          <div className="timeline">
            <motion.div className="timeline-item" variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }}><span className="timeline-dot" /><div className="timeline-meta">EDUCATION / 2026</div><div><h3>B.Tech — CSE (AI & ML)</h3><p>CMR University, Bengaluru</p><small>Computer Science foundations with a specialization in Artificial Intelligence and Machine Learning.</small></div><span className="timeline-count">01</span></motion.div>
            <motion.div className="timeline-item" variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }}><span className="timeline-dot" /><div className="timeline-meta">EXPERIENCE / 2025</div><div><h3>Web Development Intern</h3><p>ApexPlanet Software Pvt. Ltd.</p><small>Worked on responsive web application development using HTML, CSS, JavaScript, Bootstrap, and React.</small></div><span className="timeline-count">02</span></motion.div>
            <motion.div className="timeline-item" variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }}><span className="timeline-dot" /><div className="timeline-meta">CERTIFICATION</div><div><h3>Advanced Certificate Programme</h3><p>upGrad · Full Stack Development — Pro</p><small>Completed the programme modules and projects focused on full stack development.</small></div><span className="timeline-count">03</span></motion.div>
            <motion.div className="timeline-item" variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }}><span className="timeline-dot" /><div className="timeline-meta">CERTIFICATION</div><div><h3>OCI AI Foundations Associate</h3><p>Oracle Cloud Infrastructure · 2025</p><small>AI foundations certification; listed as valid through August 2027.</small></div><span className="timeline-count">04</span></motion.div>
            <motion.div className="timeline-item current" variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }}><span className="timeline-dot" /><div className="timeline-meta">CURRENT FOCUS / 2026</div><div><h3>Going deeper into AI/ML</h3><p>Data analysis → Machine learning → NLP & Computer Vision</p><small>Practising with NumPy, Pandas, Matplotlib, Seaborn, preprocessing workflows, and core ML concepts.</small></div><span className="timeline-count">05</span></motion.div>
          </div>
        </section>

        <section className="principles section-pad">
          <Eyebrow>05 / HOW I APPROACH THE WORK</Eyebrow>
          <div className="principle-grid">
            <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }}><span>01</span><h3>Understand<br />the problem.</h3><p>Start with the user and the real need, not just the feature request.</p></motion.div>
            <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }}><span>02</span><h3>Build with<br />intention.</h3><p>Keep the solution clear, useful, and maintainable.</p></motion.div>
            <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }}><span>03</span><h3>Keep getting<br />better.</h3><p>Learn from feedback, test assumptions, and iterate.</p></motion.div>
          </div>
        </section>

        <section id="contact" className="contact section-pad">
          <div className="contact-top"><Eyebrow>06 / HAVE SOMETHING IN MIND?</Eyebrow><span className="contact-sticker"><Send size={22} /> OPEN TO<br />GOOD IDEAS</span></div>
          <h2>LET'S MAKE<br />SOMETHING <span className="accent-word">MATTER.</span></h2>
          <p className="contact-copy">Interested in a role, collaboration, or a conversation about software and AI? I'd be glad to connect.</p>
          <div className="contact-actions"><button className="button button-dark" onClick={copyEmail}>{copied ? 'EMAIL COPIED' : 'COPY EMAIL'} {copied ? <Check size={18} /> : <Mail size={18} />}</button><a className="button button-outline" href="mailto:velpurisairam.dev@gmail.com">SEND AN EMAIL <ArrowUpRight size={18} /></a></div>
          <div className="social-links"><a href="https://github.com/sairamvelpurii" target="_blank" rel="noreferrer"><Github size={18} /> GITHUB <ArrowUpRight size={14} /></a><a href="https://www.linkedin.com/in/velpuri-sairam-25a402299/" target="_blank" rel="noreferrer"><Linkedin size={18} /> LINKEDIN <ArrowUpRight size={14} /></a><a href="https://leetcode.com/u/saiiram/" target="_blank" rel="noreferrer"><Terminal size={18} /> LEETCODE <ArrowUpRight size={14} /></a></div>
        </section>
      </main>

      <footer className="footer"><a className="brand footer-brand" href="#home" aria-label="Sairam Velpuri, back to top"><span className="brand-monogram">SV</span><span className="brand-name">SAIRAM VELPURI<span className="brand-dot">.</span></span></a><span>BUILT WITH CURIOSITY & CODE.</span><button onClick={() => goTo('home')}>BACK TO TOP <MoveUpRight size={15} /></button><small>© {new Date().getFullYear()} SAIRAM VELPURI</small></footer>
    </div>
  )
}

export default App
