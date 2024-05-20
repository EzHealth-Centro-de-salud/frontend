'use client'
import { useMutation } from "@apollo/client";
import React, { useState } from 'react'
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import client from "@/components/apollo/ApolloClient";
import { CREATE_BRANCH_MUTATION } from "../apollo/mutations";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

function CreateBranchForm() {
  const [address, setAddress] = useState('')  
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [loading, setLoading] = useState(false);

  const [registerPatient] = useMutation(CREATE_BRANCH_MUTATION, {
    client,
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true);
    try {
      const { data, errors } = await registerPatient({
        variables: {
          input: {
            address
          },
        },
      });
      if (data?.createBranch) {
        setAlertType("success");
        setAlertMessage("sucursal creada exitosamente");
      } else {
        console.log(errors)
        setAlertType("error");
        setAlertMessage("Error al crear la sucursal");
      }
    } catch (error) {
      console.error(error)
      setAlertType("error");
      setAlertMessage("Error al crear la sucursal");
    }finally {
      setLoading(false);
    }
  
  
  }

  return (
    <div className="space-y-8 w-[400px] ">
      <form onSubmit={onSubmit} className="space-y-8 ">
        <div className="grid w-full items-center gap-1.5">
          <Label className="text-gray-900 dark:text-gray-50" htmlFor="rut">
            Address
          </Label>
          <Input
            className="text-[#26313c]"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            id="address"
            type="text"
            placeholder="Ingrese la dirección de la sucursal"
            maxLength={12}
          />
        </div>
        <div className="w-full">
          <Button type="submit" className="w-full" size="lg">
            {loading ? (
              <Button disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Registrando sucursal...
              </Button>
            ) : (
              "Registrar sucursal"
            )}
          </Button>
        </div>
      </form>
      {alertMessage && (
        <div className="fixed bottom-4 right-4">
          <Alert
            variant={alertType === "big error" ? "destructive" : "default"}
          >
            <AlertTitle>
              {alertType === "big error"
                ? "¡Oops, ocurrió un error!"
                : "¡Registro exitoso!"}
            </AlertTitle>
            <AlertDescription>{alertMessage}</AlertDescription>
          </Alert>
        </div>
      )}
    </div>
  )
}

export default CreateBranchForm