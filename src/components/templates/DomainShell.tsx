import type { ReactNode } from 'react'
import { Link } from '@tanstack/react-router'

type DomainShellProps = Readonly<{
  title: string
  description: string
  children: ReactNode
  links: ReadonlyArray<{ label: string; to: string }>
}>

export function DomainShell({ title, description, children, links }: DomainShellProps) {
  return (
    <div className="domain-shell">
      <header className="domain-header">
        <Link to="/" className="domain-brand">Kaddo</Link>
        <nav aria-label={`${title} navigation`} className="domain-nav">
          {links.map((link) => <Link key={link.to} to={link.to}>{link.label}</Link>)}
        </nav>
      </header>
      <main className="domain-content">
        <p className="eyebrow">{title}</p>
        <h1>{description}</h1>
        {children}
      </main>
    </div>
  )
}
