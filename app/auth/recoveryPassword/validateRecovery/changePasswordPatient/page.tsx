'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react";
import { ApolloClient, InMemoryCache, useMutation } from "@apollo/client";
import { VALIDATE_RECOVERY_MUTATION } from "@/components/apollo/mutations";
import { httpLink } from "@/components/apollo/ApolloConfig"


export default function changePasswordPatientPage() {

    const [newPass, setNewPass] = useState("");
    const [repeatPass, setRepeatPass] = useState("");

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()//evita que la pagina se recargue
        
    }
    return (
        <div className="h-screen w-screen flex justify-center items-center bg-stone-400" >
            <div className="shadow-xl px-8 pb-8 pt-12 bg-white rounded-xl space-y-12">
                <h3 className="font-semibold text-2xl ">Ingrese la nueva contrasenia </h3>
                <form onSubmit={onSubmit} className="space-y-8 w-[400px]">
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="email">Nueva contraseña</Label>
                        <Input
                            required
                            value={newPass}
                            onChange={e => setNewPass(e.target.value)}
                            id="recoveryPass"
                            type="text"
                            maxLength={9}
                        />

                    </div>
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="email">Repita Nueva contraseña</Label>
                        <Input
                            required
                            value={repeatPass}
                            onChange={e => setRepeatPass(e.target.value)}
                            id="recoveryPass"
                            type="text"
                            maxLength={9}
                        />

                    </div>
                    <div className="w-full">
                        <Button className="w-full" size="lg">Validar</Button>
                    </div>
                </form>



            </div>
        </div>
    )
}