import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CHANGE_PASSWORD_PATIENT_MUTATION } from "@/components/apollo/mutations";
//import client from "@/components/apollo/ApolloClient";

export default function ChangePasswordPatientForm() {
  const [newPass, setNewPass] = useState("");
  const [repeatPass, setRepeatPass] = useState("");
  const [error, setError] = useState("");
  const [changePasswordPatient] = useMutation( CHANGE_PASSWORD_PATIENT_MUTATION);
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPass !== repeatPass) {
      setError("Las contraseñas no coinciden");
      return;
    }
    const { data } = await changePasswordPatient({
      variables: {
        recoveryInput: {
          rut: localStorage.getItem("rut"),
          newPassword: newPass,
        },
      },
    });
    if (data?.changePasswordPatient.success) {
      // Password successfully changed
      window.alert("Contraseña cambiada");
      // Clear localStorage
      localStorage.removeItem("rut");
      // Redirect to login page
      window.location.href = "/auth/login";
    } else {
      setError("Error al cambiar la contraseña");
    }
  };
  return (
    <form onSubmit={onSubmit} className="space-y-8 w-[400px]">
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="password">Nueva contraseña</Label>
        <Input
          required
          value={newPass}
          onChange={(e) => setNewPass(e.target.value)}
          id="recoveryPass"
          type="password"
          maxLength={128}
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="password">Repita Nueva contraseña</Label>
        <Input
          required
          value={repeatPass}
          onChange={(e) => setRepeatPass(e.target.value)}
          id="recoveryPassRepeat"
          type="password"
          maxLength={128}
        />
      </div>
      {error && <p>{error}</p>}
      <div className="w-full">
        <Button className="w-full" size="lg">
          Validar
        </Button>
      </div>
    </form>
  );
}