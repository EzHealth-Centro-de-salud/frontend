"use client";

import {
  useMutation,
} from "@apollo/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import { LOGIN_PERSONNEL_MUTATION } from "../../apollo/mutations";
import client from "../../apollo/ApolloClient";
import { Loader2 } from "lucide-react";
import { useRouter } from 'next/navigation'

export default function PersonnelLoginForm() {
  const router = useRouter()
  const [rut, setRut] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [loginPersonnel] = useMutation(LOGIN_PERSONNEL_MUTATION, {
    client,
  });

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
        console.log(data.loginPersonnel);
        window.alert("Login exitoso");
        if(data?.loginPersonnel.role === "admin"){
          router.push("/admin/dashboard");
        } else{
          router.push("/personnel/dashboard");
        }
        
      } else {
        console.log(errors);
        setError("Error al iniciar sesión");
      }
    } catch (error) {
      console.error(error);
    }finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 bg-[#16202a] flex items-center justify-center py-12">
      <div className="mx-auto  w-[350px] space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold text-slate-200">
            Login Personnel
          </h1>
          <p className="mt-2 text-xs text-slate-400">
            See Your Growth and get consulting growth
          </p>
        </div>
        <form onSubmit={onSubmit}>
          <Label className="text-slate-200" htmlFor="email">
            RUT
          </Label>
          <Input
            className="mt-2 mb-4 bg-transparent rounded-full text-white"
            onChange={(e) => setRut(e.target.value)}
            type="text"
            id="rut"
            placeholder="rut"
            maxLength={9}
          />
          <Label className="text-slate-200" htmlFor="password">
            Password*
          </Label>
          <Input
            className="mt-2 bg-transparent rounded-full text-white"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            placeholder="password"
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
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Ingresando...
              </span>
            ) : (
              "Ingresar"
            )}
          </Button>

          

          <p className="text-center mt-2 text-zinc-500">
            ¿Olvidaste tu contraseña?{" "}
            <Link
              className="text-indigo-500 hover:underline"
              href="./recoveryPassword"
            >
              Recupérala
            </Link>{" "}
          </p>
          <p className="text-center mt-2 text-zinc-500">
            ¿No tienes una cuenta?{" "}
            <Link
              className="text-indigo-500 hover:underline"
              href="/auth/personnelRegister"
            >
              Créala
            </Link>{" "}
          </p>
        </form>
        <p className="mt-4 text-xs text-slate-200">@2023 All rights reserved</p>
      </div>
    </div>
  );
}
