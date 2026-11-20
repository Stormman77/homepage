import './App.css'
import portrait from './assets/alexey.webp'
import ThemeToggle from './ThemeToggle'
import { useActiveSection } from './useActiveSection'

type Entry = {
  when: string
  title: string
  org: string
  note?: string
  link?: { href: string; label: string }
}

type Group = {
  label: string
  entries: Entry[]
}

const experience: Group[] = [
  {
    label: 'Education',
    entries: [
      {
        when: 'Class of 2027',
        title: 'B.S. Computer Science',
        org: 'Florida State University · intended minor in Mathematics',
      },
      {
        when: '2024 — now',
        title: 'President, Slavic Student Association',
        org: 'Leadership · FSU',
        note: 'Leading the organization after a term as vice president.',
      },
    ],
  },
  {
    label: 'Work',
    entries: [
      {
        when: '2025 — now',
        title: 'Full-Stack Developer',
        org: 'Smart Solutions · remote',
        note: 'Building a payment and records platform for state utility offices, now serving around 600,000 clients. C# and SQL on the back end, TypeScript and Next.js on the front.',
      },
      {
        when: '2022 — now',
        title: 'Content Moderator',
        org: 'ESL FACEIT Group · contract',
        note: 'Chat moderation for esports broadcasts with over 120,000 live viewers on Twitch and YouTube.',
      },
    ],
  },
  {
    label: 'Projects',
    entries: [
      {
        when: '2025',
        title: 'ParkSense',
        org: 'Seminole Innovators · FSU',
        note: 'A campus parking app built in React Native, with REST APIs in Python and TypeScript and data in MySQL and Supabase.',
      },
      {
        when: 'Coursework',
        title: 'Learning Management System',
        org: 'Full Stack Development in C# · FSU',
        note: 'A full-stack learning management application built in C# for the course project.',
      },
    ],
  },
]

const toolkit = [
  ['Languages', 'TypeScript, C#, C/C++, Python, SQL'],
  ['Frameworks', 'React, React Native, Next.js'],
  ['Tools', 'Docker, Azure DevOps, AWS, Git, MySQL'],
  ['Speaks', 'English, Russian, some Spanish'],
]

const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'outside', label: 'Off the clock' },
  { id: 'contact', label: 'Contact' },
]

const navIds = navLinks.map((l) => l.id)

function App() {
  const activeSection = useActiveSection(navIds)

  return (
    <>
      <header className="topbar">
        <a href="#top" className="mark">
          A. Cherepanov
        </a>
        <nav>
          {navLinks.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={activeSection === l.id ? 'active' : undefined}
              aria-current={activeSection === l.id ? 'location' : undefined}
            >
              {l.label}
            </a>
          ))}
        </nav>
        <ThemeToggle />
      </header>

      <main id="top">
        <section id="about" className="about">
          <div className="about-text">
            <p className="eyebrow">Tallahassee, FL | 30.45° N, 84.25° W</p>
            <h1>
              Alexey Cherepanov
            </h1>
            <p className="lede">
              Senior computer science student at Florida State University and
              full-stack developer.
            </p>
            <p>
              I was born in Russia and now study computer science at FSU, with
              an intended minor in math. I graduate in May 2027. Most of my work
              is full-stack: databases and APIs on one end, interfaces people
              actually use on the other.
            </p>
            <p>
              Away from the keyboard I'm into everything that moves or flies,
              Formula 1 above all.
            </p>
          </div>

          <figure className="portrait">
            <img
              src={portrait}
              alt="portrait"
              width={1280}
              height={960}
            />
            {/* <figcaption>Trackside, Florida</figcaption> */}
          </figure>
        </section>

        <section id="experience" className="block">
          <h2>
            <span className="num">01</span> Experience
          </h2>

          {experience.map((group) => (
            <div className="group" key={group.label}>
              <h3 className="group-label">{group.label}</h3>
              <ol className="timeline">
                {group.entries.map((e) => (
                  <li key={e.title}>
                    <div className="when">{e.when}</div>
                    <div>
                      <h4>{e.title}</h4>
                      <p className="org">{e.org}</p>
                      {e.note && <p className="note">{e.note}</p>}
                      {e.link && (
                        <a className="entry-link" href={e.link.href} target="_blank" rel="noreferrer">
                          {e.link.label} <span aria-hidden="true">↗</span>
                        </a>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          ))}

          <p className="also">
            Also: prize-winner at the FSU ACM Programming Contest (2025) and a
            24-hour hackathon team (2024).
          </p>
        </section>

        <section className="block">
          <h2>
            <span className="num">02</span> Toolkit
          </h2>
          <dl className="toolkit">
            {toolkit.map(([k, v]) => (
              <div key={k + v}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section id="outside" className="block">
          <h2>
            <span className="num">03</span> Off the clock
          </h2>
          <p className="interests-intro">Everything that moves or flies.</p>
          <div className="interests">
            <article>
              <p className="tag">Motorsport</p>
              <h3>Formula 1, mostly</h3>
              <p>
                Some people say that autosport is just driving in circles; in reality, there is so much more in it.
                I watch the race weekends and the strategy calls behind them. A
                pit stop decided by tyre data is engineering under a stopwatch,
                which is a big part of why I like it.
              </p>
            </article>
            <article>
              <p className="tag">Aviation</p>
              <h3>Anything with wings</h3>
              <p>
                I love learning technical details about various aircraft, as well as piloting them. I
                like how much has to go right, all at once, for a flight to be
                boring. Planning on getting a pilot license and start flying in a couple years.
              </p>
            </article>
          </div>
        </section>

        <section id="contact" className="block contact">
          <h2>
            <span className="num">04</span> Contact
          </h2>
          <p>The easiest way to reach me is LinkedIn.</p>
          <ul>
            <li>
              <a href="https://www.linkedin.com/in/cherepanov-alexey" target="_blank" rel="noreferrer">
                LinkedIn <span aria-hidden="true">↗</span>
              </a>
            </li>
          </ul>
        </section>
      </main>

      <footer className="footer">
        <span>Built for CIS4930</span>
      </footer>
    </>
  )
}

export default App
