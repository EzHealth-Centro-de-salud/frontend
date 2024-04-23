'use client';

import { ApolloClient, InMemoryCache, useMutation, ApolloProvider } from "@apollo/client"; 
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from 'next/link'
import Image from 'next/image';
import { useState } from "react"
import ezhealth from '@/img/ezhealth.png'
import { httpLink } from "@/components/apollo/ApolloConfig";
import { LOGIN_PATIENT_MUTATION } from "../apollo/mutations";
import { Navigate, redirect  } from "react-router-dom";
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default function LoginForm() {

  const [rut, setRut] = useState('')
  const [password, setPassword] = useState('')
  const [showAlert, setShowAlert] = useState(false);
  const [error, setError] = useState<string | null>(null)
  const [loginPatient] = useMutation(LOGIN_PATIENT_MUTATION, {
    client,
  }

  )
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();//evita que se refresque la pagina al enviar el formulario
    const { data, errors } = await loginPatient({
      variables: {
        LoginInput: {
          rut,
          password,
        },
      },
    });
    if (data?.loginPatient) {
      console.log(data.loginPatient)
      window.alert('Login exitoso')
      //redirect('/patient/dashboard')
      window.location.href = '/patient/dashboard'

      
    }else{
      console.log(errors)
      setError('Error al iniciar sesión')
    }
  }

  return (
    <main className="bg-[#26313c] h-screen flex items-center justify-center p-10">
      <div className="grid w-full h-full grid-cols-1 bg-white box-anim ">
        <div className="bg-[#16202a] text-white flex items-center justify-center flex-col">
          <div className="my-4">
            <h1 className="text-3xl font-semibold ">Login</h1>
            <p className="mt-2 text-xs text-slate-400">
              See Your Growth and get consulting growth
            </p>
          </div>
          <form onSubmit={onSubmit}>

            <Label htmlFor="email">RUT</Label>
            <Input
              className="mt-2 mb-4 bg-transparent rounded-full"
              onChange={(e) => setRut(e.target.value)}
              type="text"
              id="email"
              placeholder="Email"
              maxLength={9}
            />
            <Label htmlFor="password">Password*</Label>
            <Input
              className="mt-2 bg-transparent rounded-full"
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              placeholder="password"
              maxLength={128}
            />

            <Button
              type="submit"
              className="w-full mt-6 bg-indigo-600 rounded-full hover:bg-indigo-700"
            >
              Login
            </Button>
            <p className="text-center mt-2" >
              ¿Olvidaste tu contraseña?{" "}
              <Link
                className="text-indigo-500 hover:underline"
                href="./recoveryPassword"
              >
                Recupérala
              </Link>{" "}
            </p>
            <p className="text-center mt-2" >
              ¿No tienes una cuenta?{" "}
              <Link
                className="text-indigo-500 hover:underline"
                href="/auth/register"
              >
                Creala
              </Link>{" "}
            </p>

          </form>
          <p className="mt-4 text-xs text-slate-200">
            @2023 All rights reserved
          </p>
        </div>
        
      </div>
    </main>
  );
}