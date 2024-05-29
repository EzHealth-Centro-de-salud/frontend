"use client";

import { useMutation } from "@apollo/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import { LOGIN_PATIENT_MUTATION } from "../apollo/mutations";
import { Loader2 } from "lucide-react";
import client from "../apollo/ApolloClient";
import { Alert } from "../ui/alert";
import LoadingButton from "../ui/loadingButton";

export default function LoginForm() {
  const [rut, setRut] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [loginPatient] = useMutation(LOGIN_PATIENT_MUTATION);
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data, errors } = await loginPatient({
        variables: {
          LoginInput: {
            rut,
            password,
          },
        },
      });
      if (data?.loginPatient) {
        localStorage.setItem("rut", data.loginPatient.rut);
        localStorage.setItem("access_token", data.loginPatient.access_token);
        setError("Login exitoso, redirigiendo...");
        setTimeout(() => {
          setError(null);
          window.location.href = "/patient/dashboard";
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
              Inicio de Sesión Paciente
            </h1>
            <p className="mt-2 text-xs text-[#26313c]">
              See Your Growth and get consulting growth
            </p>
          </div>
          <form onSubmit={onSubmit}>
            <Label>RUT</Label>
            <Input
              className="mt-2 mb-4 bg-transparent rounded-full text-[#26313c]"
              onChange={(e) => setRut(e.target.value)}
              type="text"
              id="rut"
              placeholder="Ingrese su RUT"
              required
              maxLength={12}
            />
            <Label htmlFor="password">Contraseña</Label>
            <Input
              className="mt-2 bg-transparent rounded-full text-[#26313c]"
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              placeholder="Ingrese su contraseña"
              required
              maxLength={128}
            />

            {/*<Button
              type="submit"
              className=""
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
            */}
            <LoadingButton
              title="Ingresar"
              loadingTitle="Ingresando..."
              isLoading={loading}
              styling="w-full mt-6 bg-indigo-600 rounded-full hover:bg-indigo-700"
            />
            <p className="text-center mt-2">
              ¿Olvidaste tu contraseña?{" "}
              <Link
                className="text-indigo-500 hover:underline"
                href="./recoveryPassword"
              >
                Recupérala
              </Link>{" "}
            </p>
            <p className="text-center mt-2">
              ¿No tienes una cuenta?{" "}
              <Link
                className="text-indigo-500 hover:underline"
                href="/auth/register"
              >
                Créala
              </Link>{" "}
            </p>
          </form>
          <p className="mt-4 text-xs text-slate-700 text-center">
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
