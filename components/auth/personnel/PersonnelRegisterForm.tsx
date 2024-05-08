"use client";
import {
  ApolloClient,
  InMemoryCache,
  useMutation,
  ApolloProvider,
} from "@apollo/client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { REGISTER_PERSONNEL_MUTATION } from "../../apollo/mutations";
import client from "../../apollo/ApolloClient";

function PersonnelRegisterForm() {
  const [rut, setRut] = useState("");
  const [password, setPassword] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [middle_name, setMiddle_name] = useState("");
  const [surname, setSurname] = useState("");
  const [second_surname, setSecond_surname] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [branchId, setBranchId] = useState("");
  const [registerPersonnel] = useMutation(REGISTER_PERSONNEL_MUTATION, {
    client,
  });
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); //evita que se refresque la pagina al enviar el formulario

    const { data, errors } = await registerPersonnel({
      variables: {
        CreatePersonnelInput: {
          rut,
          password,
          first_name,
          middle_name,
          surname,
          second_surname,
          email,
          role,
          specialty,
          branchId,
        },
      },
    });
    console.log(data);
    if (data?.createPatient.success) {
      window.alert("Usuario creado");
      history.back();
    } else {
      window.alert("Error al crear usuario");
    }
  };

  return (
    <div className="space-y-8 w-[400px] ">
      <form onSubmit={onSubmit} className="space-y-8 ">
        <div className="grid w-full items-center gap-1.5">
          <Label className="text-white" htmlFor="rut">
            RUT
          </Label>
          <Input
            className="bg-[#26313c] text-white"
            required
            value={rut}
            onChange={(e) => setRut(e.target.value)}
            id="rut"
            type="text"
            maxLength={12}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid w-full items-center gap-1.5">
            <Label className="text-white" htmlFor="first_name">
              Primer Nombre
            </Label>
            <Input
              className="bg-[#26313c] text-white"
              required
              value={first_name}
              onChange={(e) => setFirst_name(e.target.value)}
              id="first_name"
              type="text"
              maxLength={50}
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label className="text-white" htmlFor="middle_name">
              Segundo Nombre
            </Label>
            <Input
              className="bg-[#26313c] text-white"
              value={middle_name}
              onChange={(e) => setMiddle_name(e.target.value)}
              id="middle_name"
              type="text"
              maxLength={50}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid w-full items-center gap-1.5">
            <Label className="text-white" htmlFor="surname">
              Apellido Paterno
            </Label>
            <Input
              className="bg-[#26313c] text-white"
              required
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              id="surname"
              type="text"
              maxLength={50}
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label className="text-white" htmlFor="second_surname">
              Apellido Materno
            </Label>
            <Input
              className="bg-[#26313c] text-white"
              required
              value={second_surname}
              onChange={(e) => setSecond_surname(e.target.value)}
              id="second_surname"
              type="text"
              maxLength={50}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid w-full items-center gap-1.5">
            <Label className="text-white" htmlFor="email">
              Email
            </Label>
            <Input
              className="bg-[#26313c] text-white"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              type="email"
              maxLength={254}
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label className="text-white" htmlFor="password">
              Contraseña
            </Label>
            <Input
              className="bg-[#26313c] text-white"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              type="password"
              maxLength={128}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid w-full items-center gap-1.5">
            <Label className="text-white" htmlFor="email">
              Especialidad
            </Label>
            <Input
              className="bg-[#26313c] text-white"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              type="email"
              maxLength={254}
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label className="text-white" htmlFor="sex">
              Sucursal
            </Label>
            <select
              className="bg-[#26313c] text-white"
              required
              value={branchId}
              onChange={(e) => setBranchId(e.target.value)}
              id="sex"
            >
              <option value="">Seleccione...</option>
              <option value={parseInt("0", 10)}>Coquimbo 1</option>
              <option value={parseInt("1", 10)}>Coquimbo 2</option>
              <option value={parseInt("2", 10)}>La Serena 1</option>
            </select>
          </div>
        </div>

        <div className="w-full">
          <Button type="submit" className="w-full" size="lg">
            Registrar personal
          </Button>
        </div>
      </form>
    </div>
  );
}
const PersonnelRegisterFormComponent = () => (
  <ApolloProvider client={client}>
    <PersonnelRegisterForm />
  </ApolloProvider>
);
PersonnelRegisterFormComponent.displayName = "PersonnelRegisterFormComponent";
export default PersonnelRegisterFormComponent;
