import { useEffect, useState } from 'react'

/**
 * Returns the id of the section the visitor is currently reading.
 *
 * A section counts as "current" once its top edge has scrolled past a reading line
 * a third of the way down the screen. Sections without a nav link (like Toolkit)
 * simply keep the previous link lit. At the very bottom of the page the last
 * section wins, since a short final section may never reach the reading line.
 */
export function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState(ids[0])
  const key = ids.join(',')

  useEffect(() => {
    const sectionIds = key.split(',')
    let frame = 0

    const update = () => {
      frame = 0
      const readingLine = window.innerHeight / 3
      let current = sectionIds[0]

      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= readingLine) current = id
      }

      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
      if (atBottom) current = sectionIds[sectionIds.length - 1]

      setActive(current)
    }

    // Run at most once per animation frame while scrolling.
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [key])

  return active
}
