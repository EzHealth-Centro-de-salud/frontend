
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from 'next/link'

export default function PersonnelSingleCard() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
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
