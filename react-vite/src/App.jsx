import React, { useEffect, useState } from 'react'
import data from './data'
import gsap from 'gsap'
import './styles.css'

export default function App() {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    gsap.from('.intro', { y: 10, opacity: 0, duration: 0.8 })
  }, [])

  const projects = data.projects || []

  return (
    <div className="app-root">
      <header className="header">
        <div className="brand">
          <span className="logo">♣</span>
          <h2>{data.name}</h2>
        </div>
      </header>

      <main>
        <section className="intro">
          <img src={data.profilePhoto} alt="profile" className="profile-photo" />
          <h1>{data.title}</h1>
          <p>{data.subtitle}</p>
        </section>

        <section className="projects">
          <h2>Projects</h2>
          <div className="carousel">
            <button onClick={() => setIdx((idx - 1 + projects.length) % projects.length)}>‹</button>
            <div className="project-slide">
              {projects[idx] && (
                <>
                  <img src={projects[idx].image} alt={projects[idx].title} />
                  <div>
                    <h3>{projects[idx].title}</h3>
                    <p>{projects[idx].description}</p>
                    {projects[idx].link && <a href={projects[idx].link} target="_blank" rel="noopener noreferrer">View</a>}
                  </div>
                </>
              )}
            </div>
            <button onClick={() => setIdx((idx + 1) % projects.length)}>›</button>
          </div>
        </section>
      </main>
    </div>
  )
}
