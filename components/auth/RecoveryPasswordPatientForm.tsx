"use client";
import { useMutation } from "@apollo/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { RECOVERY_PATIENT_MUTATION } from "../apollo/mutations";
import Swal from "sweetalert2";

export default function RecoveryPasswordPatientForm() {
  const [rut, setRut] = useState("");
  const [recoveryPatient] = useMutation(RECOVERY_PATIENT_MUTATION);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await recoveryPatient({
        variables: {
          recoveryInput: {
            rut,
          },
        },
      });
      if (data?.recoveryPatient) {
        localStorage.setItem("rut", rut);
        console.log(data.recoveryPatient);
        Swal.fire({
          icon: "success",
          title: "Correo enviado",
          text: "Se ha enviado un correo para recuperar la contraseña",
          confirmButtonText: "OK",
        }).then(() => {
          window.location.href = "/auth/recoveryPassword/validateRecovery";
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un error al enviar el correo",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="space-y-8 w-[400px]">
      <form onSubmit={onSubmit} className="space-y-8 w-[400px]">
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="rut">RUT</Label>
          <Input
            required
            value={rut}
            onChange={(e) => setRut(e.target.value)}
            id="rut"
            type="text"
            placeholder="Ingrese su rut"
            maxLength={12}
          />
        </div>
        <div className="w-full">
          <Button className="w-full" size="lg">
            Enviar Correo
          </Button>
        </div>
      </form>
    </div>
  );
}
