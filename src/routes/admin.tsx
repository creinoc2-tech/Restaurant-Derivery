import { createFileRoute } from '@tanstack/react-router'
import { DomainShell } from '@/components/templates/DomainShell'

export const Route = createFileRoute('/admin')({
  component: AdminLayout,
})

function AdminLayout() {
  return (
    <DomainShell
      title="Admin"
      description="Supervisa la operación completa de Kaddo."
      links={[{ label: 'Resumen', to: '/admin' }, { label: 'Cliente', to: '/' }]}
    >
      <section className="domain-panel">
        <span className="panel-label">Consola global</span>
        <h2>Una vista de toda la operación</h2>
        <p>Restaurantes, usuarios, pedidos y métricas se incorporarán por dominio.</p>
      </section>
    </DomainShell>
  )
}
