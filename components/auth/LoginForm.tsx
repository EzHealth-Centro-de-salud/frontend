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

export default function LoginForm() {
  const [rut, setRut] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [loginPatient] = useMutation(LOGIN_PATIENT_MUTATION, {
    client,
  });
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); //evita que se refresque la pagina al enviar el formulario
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
        setError("Login exitoso, redirigiendo...");
        setTimeout(() => {
          setError(null);
          window.location.href = "/patient/dashboard";
        }, 4000);
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
    <main className="bg-[#26313c] h-screen flex items-center justify-center p-10">
      <div className="grid w-full h-full grid-cols-1 bg-white box-anim ">
        <div className="bg-[#16202a] text-white flex items-center justify-center flex-col">
          <div className="my-4">
            <h1 className="text-3xl font-semibold ">Inicio de Sesión</h1>
            <p className="mt-2 text-xs text-slate-400 text-center">
              Vive mejor, vive fácil con EzHealth.
            </p>
          </div>
          <form onSubmit={onSubmit}>
            <Label>RUT</Label>
            <Input
              className="mt-2 mb-4 bg-transparent rounded-full"
              onChange={(e) => setRut(e.target.value)}
              type="text"
              id="rut"
              placeholder="Ingrese su RUT"
              required
              maxLength={12}
            />
            <Label htmlFor="password">Contraseña</Label>
            <Input
              className="mt-2 bg-transparent rounded-full"
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              placeholder="Ingrese su contraseña"
              required
              maxLength={128}
            />

            <Button
              type="submit"
              className="w-full mt-6 bg-indigo-600 rounded-full hover:bg-indigo-700"
            >
              {loading ? (
                <Button
                  disabled
                  className="w-full bg-indigo-600 rounded-full hover:bg-indigo-700"
                >
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Logiando...
                </Button>
              ) : (
                "Login"
              )}
            </Button>
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
          <p className="mt-4 text-xs text-slate-200">
            @2023 All rights reserved
          </p>
          {error && (
            <div className="pt-10" >
              <Alert
                variant={error === "Login exitoso, redirigiendo..." ? "default" : "destructive"}
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
