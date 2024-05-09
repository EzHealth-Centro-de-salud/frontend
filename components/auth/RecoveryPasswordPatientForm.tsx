"use client";
import { ApolloClient, InMemoryCache, useMutation } from "@apollo/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { httpLink } from "@/components/apollo/ApolloConfig";
import { useState } from "react";
import { RECOVERY_PATIENT_MUTATION } from "../apollo/mutations";
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default function RecoveryPasswordPatientForm() {
  const [rut, setRut] = useState("");
  const [recoveryPatient] = useMutation(RECOVERY_PATIENT_MUTATION, {
    client,
  });
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, errors } = await recoveryPatient({
      variables: {
        recoveryInput: {
          rut,
        },
      },
    });
    if (data?.recoveryPatient) {
      //si el correo se envio correctamente
      localStorage.setItem("rut", rut);
      console.log(data.recoveryPatient);
      window.alert("Correo enviado");
      window.location.href = "/auth/recoveryPassword/validateRecovery";
    }
  };

  return (
    <div className="space-y-8 w-[400px]">
      <form onSubmit={onSubmit} className="space-y-8 w-[400px]">
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="email">RUT</Label>
          <Input
            required
            value={rut}
            onChange={(e) => setRut(e.target.value)}
            id="rut"
            type="text"
            placeholder="Ingrese su rut"
            maxLength={9}
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
