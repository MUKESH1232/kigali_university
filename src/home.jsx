import { useState } from 'react'
import './Home.css'

const accountKey = 'ku-local-account-v1'
const imageBase = 'https://images.unsplash.com/'

const faculties = [
  {
    id: 'agriculture',
    number: '01',
    name: 'Agriculture & Environmental Sciences',
    shortName: 'Agriculture & Environment',
    icon: '🌱',
    image: 'photo-1500382017468-9049fed747ef',
    description:
      'Build a more sustainable future through modern agriculture, environmental stewardship, and community-led innovation.',
    programs: ['Agricultural Sciences', 'Environmental Management', 'Agribusiness'],
    focus: 'Sustainable food systems, climate resilience, and the future of Rwanda’s natural resources.',
  },
  {
    id: 'business',
    number: '02',
    name: 'Business & Economics',
    shortName: 'Business & Economics',
    icon: '📈',
    image: 'photo-1460925895917-afdab827c52f',
    description:
      'Develop the entrepreneurial mindset and practical expertise to lead businesses and strengthen the regional economy.',
    programs: ['Business Administration', 'Economics', 'Accounting & Finance'],
    focus: 'Entrepreneurship, responsible leadership, and inclusive economic growth.',
  },
  {
    id: 'education',
    number: '03',
    name: 'Education',
    shortName: 'Education',
    icon: '📚',
    image: 'photo-1509062522246-3755977927d7',
    description:
      'Prepare to inspire the next generation with strong teaching practice, educational research, and a passion for learning.',
    programs: ['Primary Education', 'Secondary Education', 'Educational Leadership'],
    focus: 'Excellent teaching, lifelong learning, and stronger education systems.',
  },
  {
    id: 'engineering',
    number: '04',
    name: 'Engineering & Technology',
    shortName: 'Engineering & Technology',
    icon: '⚙️',
    image: 'photo-1581091226825-a6a2a5aee158',
    description:
      'Turn bold ideas into useful solutions with hands-on engineering, technology, and design-led problem solving.',
    programs: ['Civil Engineering', 'Electrical Engineering', 'Mechanical Engineering'],
    focus: 'Practical innovation, resilient infrastructure, and technology for everyday life.',
  },
  {
    id: 'law',
    number: '05',
    name: 'Law',
    shortName: 'Law',
    icon: '⚖️',
    image: 'photo-1589829545856-d10d557cf95f',
    description:
      'Explore justice, public service, and the law while building the skills to advocate for people and communities.',
    programs: ['Bachelor of Laws', 'Public Law', 'Commercial Law'],
    focus: 'Access to justice, ethical practice, and the rule of law.',
  },
  {
    id: 'medicine',
    number: '06',
    name: 'Medicine & Health Sciences',
    shortName: 'Medicine & Health',
    icon: '🩺',
    image: 'photo-1576091160399-112ba8d25d1d',
    description:
      'Learn to improve lives through compassionate care, health research, and a commitment to healthier communities.',
    programs: ['Medicine', 'Nursing', 'Public Health'],
    focus: 'Patient-centred care, prevention, and better health outcomes for all.',
  },
  {
    id: 'architecture',
    number: '07',
    name: 'Architecture & Built Environment',
    shortName: 'Architecture & Built Environment',
    icon: '🏛️',
    image: 'photo-1487958449943-2429e8be8625',
    description:
      'Shape how people live, work, and connect through thoughtful architecture and sustainable urban design.',
    programs: ['Architecture', 'Urban Planning', 'Construction Management'],
    focus: 'Beautiful, inclusive, and sustainable places for growing communities.',
  },
  {
    id: 'communication',
    number: '08',
    name: 'Communication & Media Studies',
    shortName: 'Communication & Media',
    icon: '🎙️',
    image: 'photo-1493612276216-ee3925520721',
    description:
      'Tell meaningful stories and understand the media shaping our world, from journalism to digital communication.',
    programs: ['Journalism', 'Public Relations', 'Digital Media'],
    focus: 'Trusted information, creative storytelling, and responsible communication.',
  },
  {
    id: 'computing',
    number: '09',
    name: 'Computing & Information Technology',
    shortName: 'Computing & IT',
    icon: '💻',
    image: 'photo-1519389950473-47ba0277781c',
    description:
      'Create the digital tools of tomorrow with a strong foundation in computing, data, and information systems.',
    programs: ['Computer Science', 'Information Systems', 'Data Science'],
    focus: 'Digital skills, responsible technology, and locally relevant innovation.',
  },
  {
    id: 'social-sciences',
    number: '10',
    name: 'Social Sciences & Humanities',
    shortName: 'Social Sciences & Humanities',
    icon: '🌍',
    image: 'photo-1529156069898-49953e39b3ac',
    description:
      'Understand people, culture, and society—and use that knowledge to contribute to a more thoughtful, connected world.',
    programs: ['Sociology', 'Psychology', 'History & Cultural Studies'],
    focus: 'Human wellbeing, cultural understanding, and positive social change.',
  },
]

function getAccount() {
  const account = window.localStorage.getItem(accountKey)
  return account ? JSON.parse(account) : null
}

async function hashPassword(password, salt) {
  if (!window.crypto?.subtle) {
    throw new Error('Secure password tools are unavailable in this browser.')
  }

  const key = await window.crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    'PBKDF2',
    false,
    ['deriveBits'],
  )
  const bits = await window.crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt, iterations: 150000, hash: 'SHA-256' },
    key,
    256,
  )

  return Array.from(new Uint8Array(bits), (byte) =>
    byte.toString(16).padStart(2, '0'),
  ).join('')
}

function toHex(bytes) {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('')
}

function fromHex(value) {
  return new Uint8Array(value.match(/.{2}/g).map((byte) => Number.parseInt(byte, 16)))
}

function Header({ onHome, onFaculties, onAuth, user, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false)

  function navigate(action) {
    action()
    setMenuOpen(false)
  }

  return (
    <header className="site-header">
      <a className="brand" href="#home" onClick={(event) => {
        event.preventDefault()
        navigate(onHome)
      }}>
        <span className="brand-mark">K</span>
        <span className="brand-name">
          KIGALI UNIVERSITY
          <small>LEARN · LEAD · TRANSFORM</small>
        </span>
      </a>
      <button
        className="menu-toggle"
        type="button"
        aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? '✕' : '☰'}
      </button>
      <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation">
        <button type="button" className="nav-link" onClick={() => navigate(onHome)}>Home</button>
        <button type="button" className="nav-link" onClick={() => navigate(onFaculties)}>Faculties</button>
        <a className="nav-link" href="#about" onClick={() => setMenuOpen(false)}>About us</a>
        <a className="nav-link" href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        {user ? (
          <div className="nav-account">
            <span className="welcome-user">Hi, {user.name.split(' ')[0]}</span>
            <button type="button" className="button button-outline button-small" onClick={() => navigate(onLogout)}>Log out</button>
          </div>
        ) : (
          <div className="nav-account">
            <button type="button" className="button button-text" onClick={() => navigate(() => onAuth('login'))}>Log in</button>
            <button type="button" className="button button-primary button-small" onClick={() => navigate(() => onAuth('register'))}>Apply now <span aria-hidden="true">↗</span></button>
          </div>
        )}
      </nav>
    </header>
  )
}

function AuthDialog({ mode, onClose, onSuccess, onModeChange }) {
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setBusy(true)

    const form = new FormData(event.currentTarget)
    const email = String(form.get('email')).trim().toLowerCase()
    const password = String(form.get('password'))

    try {
      if (mode === 'register') {
        const name = String(form.get('name')).trim()
        const existingAccount = getAccount()
        if (existingAccount?.email === email) {
          throw new Error('An account with this email already exists on this device. Please log in.')
        }

        const salt = window.crypto.getRandomValues(new Uint8Array(16))
        const passwordHash = await hashPassword(password, salt)
        window.localStorage.setItem(
          accountKey,
          JSON.stringify({ name, email, salt: toHex(salt), passwordHash }),
        )
        onSuccess({ name, email })
      } else {
        const account = getAccount()
        if (!account || account.email !== email) {
          throw new Error('No local account was found for this email. Please register first.')
        }
        const passwordHash = await hashPassword(password, fromHex(account.salt))
        if (passwordHash !== account.passwordHash) {
          throw new Error('That password does not match this local account.')
        }
        onSuccess({ name: account.name, email: account.email })
      }
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : 'We could not complete your request. Please try again.',
      )
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="dialog-backdrop" role="presentation" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose()
    }}>
      <section className="auth-dialog" role="dialog" aria-modal="true" aria-labelledby="auth-title">
        <button className="dialog-close" type="button" aria-label="Close" onClick={onClose}>×</button>
        <div className="dialog-kicker">KIGALI UNIVERSITY</div>
        <h2 id="auth-title">{mode === 'register' ? 'Start your journey' : 'Welcome back'}</h2>
        <p className="dialog-intro">
          {mode === 'register'
            ? 'Create a local account to get started with your application.'
            : 'Log in to continue your university journey.'}
        </p>
        <form className="auth-form" onSubmit={handleSubmit}>
          {mode === 'register' && (
            <label>
              Full name
              <input name="name" type="text" autoComplete="name" placeholder="e.g. Aline Uwase" required minLength="2" />
            </label>
          )}
          <label>
            Email address
            <input name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
          </label>
          <label>
            Password
            <input name="password" type="password" autoComplete={mode === 'register' ? 'new-password' : 'current-password'} placeholder={mode === 'register' ? 'At least 8 characters' : 'Enter your password'} required minLength={mode === 'register' ? '8' : undefined} />
          </label>
          {error && <p className="form-error" role="alert">{error}</p>}
          <button className="button button-primary form-submit" type="submit" disabled={busy}>
            {busy ? 'Please wait…' : mode === 'register' ? 'Create account' : 'Log in'}
            {!busy && <span aria-hidden="true">↗</span>}
          </button>
        </form>
        <p className="auth-switch">
          {mode === 'register' ? 'Already have an account?' : 'New to Kigali University?'}
          <button type="button" onClick={() => onModeChange(mode === 'register' ? 'login' : 'register')}>
            {mode === 'register' ? ' Log in' : ' Create an account'}
          </button>
        </p>
        <p className="local-notice">Demo access is saved only in this browser. No university database is connected.</p>
      </section>
    </div>
  )
}

function FacultyCard({ faculty, onSelect }) {
  return (
    <button className="faculty-card" type="button" onClick={() => onSelect(faculty)}>
      <span
        className="faculty-card-image"
        style={{ backgroundImage: `url("${imageBase}${faculty.image}?auto=format&fit=crop&w=700&q=80")` }}
        role="img"
        aria-label={`${faculty.shortName} students and campus`}
      >
        <span className="faculty-icon">{faculty.icon}</span>
        <span className="faculty-number">{faculty.number}</span>
      </span>
      <span className="faculty-card-content">
        <span className="faculty-card-title">{faculty.name}</span>
        <span className="faculty-card-description">{faculty.description}</span>
        <span className="faculty-card-link">Explore faculty <span aria-hidden="true">↗</span></span>
      </span>
    </button>
  )
}

function FacultyPage({ faculty, onBack, onAuth }) {
  return (
    <main className="faculty-page">
      <div className="faculty-page-hero" style={{ backgroundImage: `linear-gradient(90deg, rgba(14, 36, 34, .92), rgba(14, 36, 34, .45)), url("${imageBase}${faculty.image}?auto=format&fit=crop&w=1800&q=85")` }}>
        <div className="page-container faculty-page-inner">
          <button className="back-link" type="button" onClick={onBack}>← All faculties</button>
          <span className="eyebrow light-eyebrow">FACULTY {faculty.number}</span>
          <h1>{faculty.name}</h1>
          <p>{faculty.description}</p>
          <button type="button" className="button button-primary" onClick={() => onAuth('register')}>Explore admissions <span aria-hidden="true">↗</span></button>
        </div>
      </div>
      <section className="page-container faculty-detail-grid">
        <div className="faculty-detail-main">
          <span className="eyebrow">YOUR FUTURE STARTS HERE</span>
          <h2>Learn with purpose.<br />Make a difference.</h2>
          <p>{faculty.focus} At Kigali University, you’ll grow your knowledge through practical learning, supportive teaching, and opportunities to apply what you learn beyond the classroom.</p>
        </div>
        <aside className="program-panel">
          <span className="eyebrow">AREAS OF STUDY</span>
          <h3>Find your path</h3>
          <ul>
            {faculty.programs.map((program) => <li key={program}><span aria-hidden="true">↗</span>{program}</li>)}
          </ul>
          <button type="button" className="button button-primary" onClick={() => onAuth('register')}>Start your application</button>
        </aside>
      </section>
    </main>
  )
}

function HomePage({ onFaculties, onRegister, onSelect }) {
  return (
    <main>
      <section className="hero-section" id="home">
        <div className="hero-photo" aria-hidden="true" />
        <div className="hero-shade" />
        <div className="page-container hero-content">
          <span className="eyebrow light-eyebrow"><span className="eyebrow-line" /> YOUR FUTURE, YOUR IMPACT</span>
          <h1>Learn today.<br />Lead <em>tomorrow.</em></h1>
          <p>Find your purpose, build your skills, and make a difference at Kigali University.</p>
          <div className="hero-actions">
            <button type="button" className="button button-primary" onClick={onFaculties}>Explore our faculties <span aria-hidden="true">↗</span></button>
            <a className="hero-secondary" href="#about">Discover Kigali University <span aria-hidden="true">↓</span></a>
          </div>
          <div className="hero-caption"><span className="caption-dot" /> A place to grow, in the heart of Kigali</div>
        </div>
        <div className="hero-aside" aria-hidden="true"><span>KNOWLEDGE</span><span>·</span><span>COMMUNITY</span><span>·</span><span>IMPACT</span></div>
      </section>

      <section className="intro-strip" id="about">
        <div className="page-container intro-inner">
          <p className="eyebrow">WELCOME TO KIGALI UNIVERSITY</p>
          <p className="intro-statement">Education with purpose.<br /><span>Opportunity without limits.</span></p>
          <p className="intro-description">We bring curious minds together to learn, create, and prepare for the opportunities of a changing world.</p>
        </div>
      </section>

      <section className="faculties-section" id="faculties">
        <div className="page-container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">FIND YOUR FIELD</span>
              <h2>Ten faculties.<br /><span>Countless possibilities.</span></h2>
            </div>
            <p>Whatever you’re curious about, there’s a place to explore it here. Discover the faculty that feels like your next step.</p>
          </div>
          <div className="faculty-grid">
            {faculties.map((faculty) => (
              <FacultyCard key={faculty.id} faculty={faculty} onSelect={onSelect} />
            ))}
          </div>
          <div className="all-faculties-row">
            <span>Ready to find your direction?</span>
            <button type="button" className="text-link" onClick={onFaculties}>Explore all faculties <span aria-hidden="true">↗</span></button>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="page-container cta-inner">
          <div>
            <span className="eyebrow light-eyebrow">YOUR NEXT CHAPTER</span>
            <h2>Big ambitions<br />start <em>somewhere.</em></h2>
          </div>
          <div className="cta-action">
            <p>Take the first step toward the future you imagine. We can’t wait to see what you’ll do.</p>
            <button type="button" className="button button-light" onClick={onRegister}>Begin your journey <span aria-hidden="true">↗</span></button>
          </div>
          <span className="cta-decoration" aria-hidden="true">K</span>
        </div>
      </section>
    </main>
  )
}

function Home() {
  const [selectedFaculty, setSelectedFaculty] = useState(null)
  const [authMode, setAuthMode] = useState('')
  const [user, setUser] = useState(null)

  function showHome() {
    setSelectedFaculty(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function showFaculties() {
    setSelectedFaculty(null)
    window.setTimeout(() => document.getElementById('faculties')?.scrollIntoView({ behavior: 'smooth' }), 0)
  }

  function openAuth(mode) {
    setAuthMode(mode)
  }

  function handleAuthSuccess(account) {
    setUser(account)
    setAuthMode('')
  }

  return (
    <>
      <Header
        onHome={showHome}
        onFaculties={showFaculties}
        onAuth={openAuth}
        user={user}
        onLogout={() => setUser(null)}
      />
      {selectedFaculty ? (
        <FacultyPage faculty={selectedFaculty} onBack={showFaculties} onAuth={openAuth} />
      ) : (
        <HomePage
          onFaculties={showFaculties}
          onRegister={() => openAuth('register')}
          onSelect={(faculty) => {
            setSelectedFaculty(faculty)
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
        />
      )}
      <footer className="site-footer" id="contact">
        <div className="page-container footer-main">
          <a className="brand footer-brand" href="#home" onClick={(event) => {
            event.preventDefault()
            showHome()
          }}>
            <span className="brand-mark">K</span>
            <span className="brand-name">KIGALI UNIVERSITY<small>LEARN · LEAD · TRANSFORM</small></span>
          </a>
          <p>Curious minds. Purposeful learning.<br />A future shaped together.</p>
          <div className="footer-links"><a href="#faculties" onClick={showFaculties}>Explore faculties</a><a href="mailto:admissions@kigaliuniversity.example">Contact admissions</a></div>
        </div>
        <div className="page-container footer-bottom"><span>© {new Date().getFullYear()} Kigali University</span><span>Learning for a brighter future.</span></div>
      </footer>
      {authMode && (
        <AuthDialog
          mode={authMode}
          onClose={() => setAuthMode('')}
          onSuccess={handleAuthSuccess}
          onModeChange={setAuthMode}
        />
      )}
    </>
  )
}

export default Home
