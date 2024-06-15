'use client'
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'

export default function PersonnelSingleCard() {
  const router = useRouter()

  return (
    <div className="grid gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Personal</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Button variant="outline" onClick={() => router.push('/admin/personnel/new')}>Agregar profesional</Button>
          <Button variant="outline" onClick={() => router.push('/admin/personnel/personnel')}>Lista de profesionales</Button>
          <Button disabled variant="outline">Confirmar Cita</Button>
          <Button disabled variant="outline">Ver Disponibilidad Medicos</Button>
          <Button disabled variant="outline">Ingresar Sobrecupo</Button>
          <Button variant="outline" onClick={() => router.push('/admin/personnel/manageSchedule')}>Administrar Horarios</Button>
        </CardContent>
      </Card>
    </div>
  )
}
