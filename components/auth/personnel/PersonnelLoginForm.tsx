"use client";

import { useMutation } from "@apollo/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import { LOGIN_PERSONNEL_MUTATION } from "../../apollo/mutations";
import client from "../../apollo/ApolloClient";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Alert } from "@/components/ui/alert";

export default function PersonnelLoginForm() {
  const router = useRouter();
  const [rut, setRut] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [loginPersonnel] = useMutation(LOGIN_PERSONNEL_MUTATION,  );

  const onSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    try {
      console.log("here");
      e.preventDefault();
      const { data, errors } = await loginPersonnel({
        variables: {
          input: {
            rut,
            password,
          },
        },
      });
      if (data?.loginPersonnel) {
        localStorage.setItem("rut", data.loginPersonnel.rut);
        localStorage.setItem("access_token", data.loginPersonnel.access_token);
        setError("Login exitoso, redirigiendo...");
        setTimeout(() => {
          setError(null);
          if (data?.loginPersonnel.role === "admin") {
            router.push("/admin/dashboard");
          } else {
            router.push("/personnel/dashboard");
          }
        }, 200);
      } else {
        console.log(errors);
        setError("Error al iniciar sesión");
      }
    } catch (error) {
      setError("Credenciales inválidas, intente nuevamente.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const showAlert = (type: string, message: string) => {
    setError(message);
    setTimeout(() => {
      setError(null);
    }, 5000); // Clear the error message after 5 seconds
  };

  return (
    <main className="bg-gray-100 h-[855px] flex p-10">
      <div className="flex-1 bg-white flex items-center justify-center py-12 ">
        <div className="mx-auto w-[350px] space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-semibold text-[#26313c] ">
              Inicio de Sesión Personal
            </h1>
            <p className="mt-2 text-xs text-[#26313c]">
              See Your Growth and get consulting growth
            </p>
          </div>
          <form onSubmit={onSubmit}>
            <Label className="text-[#26313c]" htmlFor="email">
              RUT
            </Label>
            <Input
              className="mt-2 mb-4 bg-transparent rounded-full text-[#26313c]"
              onChange={(e) => setRut(e.target.value)}
              type="text"
              id="rut"
              placeholder="Ingrese su RUT"
              maxLength={9}
            />
            <Label className="text-[#26313c]" htmlFor="password">
              Contraseña
            </Label>
            <Input
              className="mt-2 bg-transparent rounded-full text-[#26313c]"
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              placeholder="Ingrese su contraseña"
              maxLength={128}
            />
            <Button
              type="submit"
              className="w-full mt-6 bg-indigo-600 rounded-full hover:bg-indigo-700"
              size="lg"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                  Ingresando...
                </span>
              ) : (
                "Ingresar"
              )}
            </Button>

            <p className="text-center mt-2 text-zinc-700">
              ¿Olvidaste tu contraseña?{" "}
              <Link
                className="text-indigo-500 hover:underline"
                href="./recoveryPassword"
              >
                Recupérala
              </Link>{" "}
            </p>
            <p className="text-center mt-2 text-zinc-700">
              ¿No tienes una cuenta?{" "}
              <Link
                className="text-indigo-500 hover:underline"
                href="/auth/personnelRegister"
              >
                Créala
              </Link>{" "}
            </p>
          </form>
          <p className="mt-4 text-xs flex justify-center text-[#26313c]">
            @{new Date().getFullYear()} All rights reserved
          </p>
          {error && (
            <div className="pt-10">
              <Alert
                variant={
                  error === "Login exitoso, redirigiendo..."
                    ? "default"
                    : "destructive"
                }
              >
                {error}
              </Alert>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
