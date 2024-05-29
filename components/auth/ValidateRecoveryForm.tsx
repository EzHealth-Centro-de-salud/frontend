import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { VALIDATE_RECOVERY_MUTATION } from "@/components/apollo/mutations";
//import client from "@/components/apollo/ApolloClient";

export default function ValidateRecoveryForm() {
  const [code, setCode] = useState("");
  const [validateRecovery] = useMutation(VALIDATE_RECOVERY_MUTATION);

  const onSubmit = async (e: React.FormEvent) => {
    const integerCode = parseInt(code);
    e.preventDefault(); //evita que la pagina se recargue
    const { data } = await validateRecovery({
      variables: {
        recoveryInput: {
          recoveryPass: integerCode,
        },
      },
    });
    if (data?.validateRecovery.success) {
      //si el codigo es valido
      console.log("validate recovery: ", data.validateRecovery);
      window.alert("Codigo valido");
      window.location.href =
        "/auth/recoveryPassword/validateRecovery/changePasswordPatient";
    } else window.alert("Codigo invalido");
  };
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-stone-400">
      <div className="shadow-xl px-8 pb-8 pt-12 bg-white rounded-xl space-y-12">
        <h3 className="font-semibold text-2xl ">
          si su rut es valido se enviara un correo con el codigo de recuperacion{" "}
        </h3>
        <form onSubmit={onSubmit} className="space-y-8 w-[400px]">
          <div className="grid w-full items-center gap-1.5">
            <Label>Codigo de recuperacion</Label>
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
