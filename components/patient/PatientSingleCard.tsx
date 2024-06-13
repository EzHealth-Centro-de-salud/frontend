'use client'
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function PatientSingleCard() {
  const router = useRouter()
  return (
    <div className="grid gap-4 ">
      <Card>
        <CardHeader>
          <CardTitle>Paciente</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Button variant="outline" onClick={() => router.push('/admin/patient/new')}>Agregar paciente</Button>
          <Button variant="outline" onClick={() => router.push('/admin/patient/patients')}>Ver lista de pacientes</Button>
          <Button disabled variant="outline">Agendar Paciente</Button>
          <Button disabled variant="outline">Bloquear Agenda de Paciente</Button>
        </CardContent>
      </Card>
    </div>
  )
}