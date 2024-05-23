
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
    </div>
  )
}