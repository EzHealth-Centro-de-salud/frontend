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
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default function LoginForm() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showAlert, setShowAlert] = useState(false);
  const [error, setError] = useState<string | null>(null)
  const [loginPatient] = useMutation(LOGIN_PATIENT_MUTATION, {
    client,
  }

  )
  const onSubmit = async (e: React.FormEvent) => {

  }

  return (
    <main className="bg-[#26313c] h-screen flex items-center justify-center p-10">
      <div className="grid w-full h-full grid-cols-1 bg-white box-anim md:grid-cols-2">
        <div className="bg-[#16202a] text-white flex items-center justify-center flex-col">
          <div className="my-4">
            <h1 className="text-3xl font-semibold ">Login</h1>
            <p className="mt-2 text-xs text-slate-400">
              See Your Growth and get consulting growth
            </p>
          </div>
          <form onSubmit={onSubmit}>

            <Label htmlFor="email">Email*</Label>
            <Input
              className="mt-2 mb-4 bg-transparent rounded-full"
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              placeholder="Email"
              maxLength={254}
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
                href="./recoverypassword"
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
        <div className="relative hidden md:block">
        <div className="absolute top-0 left-0 w-full h-full object-cover">
        <Image className="object-cover" src={ezhealth} alt="ezhealth" width={800} height={1080} priority />
        </div>
        </div>
      </div>
    </main>
  );
}