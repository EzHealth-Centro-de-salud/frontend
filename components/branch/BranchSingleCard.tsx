import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function TripleCard() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Sucursal</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Link className="grid gap-4" href="/admin/branch/new">
            <Button variant="outline">Crear Sucursal</Button>
          </Link>
          <Link className="grid gap-4" href="/admin/branch/branches">
            <Button variant="outline">Ver de Sucursales</Button>
          </Link>
          <Button variant="outline">Editar Sucursal</Button>
          <Button variant="outline">Eliminar Sucursal</Button>
          <Link className="grid gap-4" href="/admin/box/new">
            <Button variant="outline">Agregar Box a Surcursal</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
