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

interface PersonnelFormState {
  rut: string;
  password: string;
  firstName: string;
  middleName: string;
  surname: string;
  secondSurname: string;
  email: string;
  role: string;
  specialty: string;
  idBranch: string;
}

function PersonnelRegisterForm() {
  const [personnelFormState, setPersonnelFormState] =
    useState<PersonnelFormState>({
      rut: "",
      password: "",
      firstName: "",
      middleName: "",
      surname: "",
      secondSurname: "",
      email: "",
      role: "",
      specialty: "",
      idBranch: "",
    });

  const [registerPersonnel] = useMutation(REGISTER_PERSONNEL_MUTATION, {
    client,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setPersonnelFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); //evita que se refresque la pagina al enviar el formulario

    const { data, errors } = await registerPersonnel({
      variables: {
        CreatePersonnelInput: { ...personnelFormState },
      },
    });

    console.log(data);
    if (data?.createPersonnel.success) {
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
            value={personnelFormState.rut}
            onChange={handleInputChange}
            id="rut"
            type="text"
            maxLength={12}
            name="rut"
          />
          {errors.rut && <span className="text-red-500">{errors.rut}</span>}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid w-full items-center gap-1.5">
            <Label className="text-white" htmlFor="firstName">
              Primer Nombre
            </Label>
            <Input
              className="bg-[#26313c] text-white"
              required
              value={personnelFormState.firstName}
              onChange={handleInputChange}
              id="firstName"
              type="text"
              maxLength={50}
              name="firstName"
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label className="text-white" htmlFor="middleName">
              Segundo Nombre
            </Label>
            <Input
              className="bg-[#26313c] text-white"
              value={personnelFormState.middleName}
              onChange={handleInputChange}
              id="middleName"
              type="text"
              maxLength={50}
              name="middleName"
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
              value={personnelFormState.surname}
              onChange={handleInputChange}
              id="surname"
              type="text"
              maxLength={50}
              name="surname"
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label className="text-white" htmlFor="secondSurname">
              Apellido Materno
            </Label>
            <Input
              className="bg-[#26313c] text-white"
              required
              value={personnelFormState.secondSurname}
              onChange={handleInputChange}
              id="secondSurname"
              type="text"
              maxLength={50}
              name="secondSurname"
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
              value={personnelFormState.email}
              onChange={handleInputChange}
              id="email"
              type="email"
              maxLength={254}
              name="email"
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label className="text-white" htmlFor="password">
              Contraseña
            </Label>
            <Input
              className="bg-[#26313c] text-white"
              required
              value={personnelFormState.password}
              onChange={handleInputChange}
              id="password"
              type="password"
              maxLength={128}
              name="password"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid w-full items-center gap-1.5">
            <Label className="text-white" htmlFor="specialty">
              Especialidad
            </Label>
            <Input
              className="bg-[#26313c] text-white"
              required
              value={personnelFormState.specialty}
              onChange={handleInputChange}
              id="specialty"
              maxLength={254}
              name="specialty"
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label className="text-white" htmlFor="idBranch">
              Sucursal
            </Label>
            <select
              className="bg-[#26313c] text-white"
              required
              value={personnelFormState.idBranch}
              onChange={handleInputChange}
              id="idBranch"
              name="idBranch"
            >
              <option value="">Seleccione...</option>
              <option value={parseInt("0", 10)}>Coquimbo 1</option>
              <option value={parseInt("1", 10)}>Coquimbo 2</option>
              <option value={parseInt("2", 10)}>La Serena 1</option>
            </select>
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label className="text-white" htmlFor="role">
              Rol
            </Label>
            <Input
              className="bg-[#26313c] text-white"
              required
              value={personnelFormState.role}
              onChange={handleInputChange}
              id="role"
              type="text"
              maxLength={50}
              name="role"
            />
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
