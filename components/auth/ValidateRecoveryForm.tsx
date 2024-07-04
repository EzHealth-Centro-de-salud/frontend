import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { VALIDATE_RECOVERY_MUTATION } from "@/components/apollo/mutations";
import Swal from "sweetalert2";

export default function ValidateRecoveryForm() {
  const [code, setCode] = useState("");
  const [validateRecovery] = useMutation(VALIDATE_RECOVERY_MUTATION);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const integerCode = parseInt(code);
    try {
      const { data } = await validateRecovery({
        variables: {
          recoveryInput: {
            recoveryPass: integerCode,
          },
        },
      });
      if (data?.validateRecovery.success) {
        console.log("validate recovery: ", data.validateRecovery);
        Swal.fire({
          icon: "success",
          title: "Código válido",
          text: "El código de recuperación es válido.",
          confirmButtonText: "OK",
        }).then(() => {
          window.location.href =
            "/auth/recoveryPassword/validateRecovery/changePasswordPatient";
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Código inválido",
          text: "El código de recuperación es inválido.",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un error al validar el código.",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-stone-400">
      <div className="shadow-xl px-8 pb-8 pt-12 bg-white rounded-xl space-y-12">
        <h3 className="font-semibold text-2xl">
          Si su rut es válido se enviará un correo con el código de recuperación{" "}
        </h3>
        <form onSubmit={onSubmit} className="space-y-8 w-[400px]">
          <div className="grid w-full items-center gap-1.5">
            <Label>Código de recuperación</Label>
            <Input
              required
              value={code}
              onChange={(e) => setCode(e.target.value)}
              id="recoveryCode"
              type="text"
              maxLength={9}
            />
          </div>
          <div className="w-full">
            <Button className="w-full" size="lg">
              Validar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
