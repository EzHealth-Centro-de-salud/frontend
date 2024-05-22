
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from 'next/link'

export default function TripleCard() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Paciente</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Button disabled variant="outline" >Agregar Paciente</Button>
          <Button disabled variant="outline">Agendar Paciente</Button>
          <Button disabled variant="outline">Bloquear Agenda de Paciente</Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Sucursal</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Link className="grid gap-4" href="/admin/sucursal/new">
            <Button variant="outline">Crear Sucursal</Button>
          </Link>  
          <Button variant="outline">Ver de Sucursales</Button>
          <Button variant="outline">Eliminar Sucursal</Button>
          <Button variant="outline">Editar Sucursal</Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Personal</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Button disabled variant="outline">Agregar Profesional</Button>
          <Button disabled variant="outline">Confirmar Turnos</Button>
          <Button disabled variant="outline">Ver Disponibilidad Medicos</Button>
          <Button disabled variant="outline">Ingresar Sobrecupo</Button>
        </CardContent>
      </Card>
    </div>
  )
}