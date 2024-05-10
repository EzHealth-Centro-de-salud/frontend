"use client";
import {
  useMutation,
  ApolloProvider,
} from "@apollo/client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { REGISTER_PERSONNEL_MUTATION } from "../../apollo/mutations";
import client from "../../apollo/ApolloClient";
import { Loader2 } from "lucide-react";

interface PersonnelFormState {
  rut: string;
  password: string;
  first_name: string;
  middle_name?: string;
  surname: string;
  second_surname?: string;
  email: string;
  role: string;
  speciality: string;
  id_branch: number;
}

function PersonnelRegisterForm() {
  const [personnelFormState, setPersonnelFormState] =
    useState<PersonnelFormState>({
      rut: "",
      password: "",
      first_name: "",
      middle_name: "",
      surname: "",
      second_surname: "",
      email: "",
      role: "",
      speciality: "",
      id_branch: 1,
    });
  const [loading, setLoading] = useState(false);

  const [registerPersonnel] = useMutation(REGISTER_PERSONNEL_MUTATION, {
    client,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const parsedValue = name === 'id_branch' ? parseInt(value, 10) : value;
    setPersonnelFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    console.log("passed loading true")
    try {
      await registerPersonnel({
        variables: { input: personnelFormState },
      });
      setPersonnelFormState({
        rut: "",
        password: "",
        first_name: "",
        middle_name: "",
        surname: "",
        second_surname: "",
        email: "",
        role: "",
        speciality: "", // Corrected field name
        id_branch: 1,
      });
      // Handle success, maybe show a success message or redirect
    } catch (error) {
      console.error("Error registering personnel:", error);
      // Handle error
    } finally {
      setLoading(false);
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
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid w-full items-center gap-1.5">
            <Label className="text-white" htmlFor="first_name">
              Primer Nombre
            </Label>
            <Input
              className="bg-[#26313c] text-white"
              required
              value={personnelFormState.first_name}
              onChange={handleInputChange}
              id="first_name"
              type="text"
              maxLength={50}
              name="first_name"
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label className="text-white" htmlFor="middle_name">
              Segundo Nombre
            </Label>
            <Input
              className="bg-[#26313c] text-white"
              value={personnelFormState.middle_name}
              onChange={handleInputChange}
              id="middle_name"
              type="text"
              maxLength={50}
              name="middle_name"
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
            <Label className="text-white" htmlFor="second_surname">
              Apellido Materno
            </Label>
            <Input
              className="bg-[#26313c] text-white"
              value={personnelFormState.second_surname}
              onChange={handleInputChange}
              id="second_surname"
              type="text"
              maxLength={50}
              name="second_surname"
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
            <Label className="text-white" htmlFor="speciality">
              Especialidad
            </Label>
            <Input
              className="bg-[#26313c] text-white"
              required
              value={personnelFormState.speciality}
              onChange={handleInputChange}
              id="speciality"
              maxLength={254}
              name="speciality"
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label className="text-white" htmlFor="id_branch">
              Sucursal
            </Label>
            <select
              className="bg-[#26313c] text-white"
              required
              value={personnelFormState.id_branch}
              onChange={handleInputChange}
              id="id_branch"
              name="id_branch"
            >
              <option value="">Seleccione...</option>
              <option value={0}>Coquimbo 1</option>
              <option value={1}>Coquimbo 2</option>
              <option value={2}>La Serena 1</option>
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
            {loading ? (
              <Button disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Registrando...
              </Button>
            ) : (
              "Registrar personal"
            )}
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
