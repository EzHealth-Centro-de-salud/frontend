'use client'
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function TripleCard() {
  const router = useRouter()

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Paciente</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Button variant="outline" onClick={() => router.push('/admin/patient/new')}>Agregar paciente</Button>
          <Button variant="outline" onClick={() => router.push('/admin/patient/patients')}>Ver lista de pacientes / agendar</Button>
          <Button disabled variant="outline">Bloquear Agenda de Paciente</Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Sucursal</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Link className="grid gap-4" href="/admin/branch/new">
            <Button variant="outline">Crear Sucursal</Button></Link>  
          <Link className="grid gap-4" href="/admin/branch/branches">
          <Button variant="outline">Ver de Sucursales</Button></Link>
          <Button variant="outline">Eliminar Sucursal</Button>
          <Button variant="outline">Editar Sucursal</Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Personal</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
           <Button variant="outline" onClick={() => router.push('/admin/personnel/new')}>Agregar profesional</Button>
          <Button variant="outline" onClick={() => router.push('/admin/personnel/personnel')}>Lista de profesionales</Button>
          <Button variant="outline" onClick={() => router.push('/admin/appointment/manage')}>Administrar Citas</Button>
          <Button disabled variant="outline">Ver Disponibilidad Medicos</Button>
          <Button disabled variant="outline">Ingresar Sobrecupo</Button>
          <Button variant="outline" onClick={() => router.push('/admin/personnel/manageSchedule')}>Administrar Horarios</Button>
        </CardContent>
      </Card>
    </div>
  )
}