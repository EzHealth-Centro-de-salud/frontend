"use client";
import { useMutation, ApolloProvider, useQuery } from "@apollo/client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { REGISTER_PERSONNEL_MUTATION } from "../../apollo/mutations";
import client from "../../apollo/ApolloClient";
import { Loader2 } from "lucide-react";
import { GET_BRANCHES_QUERY } from "@/components/apollo/queries";

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

  const {
    loading: loadingBranches,
    error: errorBranches,
    data: dataBranches,
  } = useQuery(GET_BRANCHES_QUERY, { client });

  const branches = dataBranches?.getBranches || [];

  const [registerPersonnel] = useMutation(REGISTER_PERSONNEL_MUTATION, {
    client,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setPersonnelFormState({
      ...personnelFormState,
      [name]: name === "id_branch" ? parseInt(value) : value,
    });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await registerPersonnel({
        variables: {
          input: {
            ...personnelFormState,
            id_branch: parseInt(personnelFormState.id_branch.toString()),
          },
        },
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
        speciality: "",
        id_branch: 1,
      });
    } catch (error) {
      console.error("Error registering personnel:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loadingBranches) return <p>Loading...</p>;

  return (
    <div className="space-y-8 w-[400px] ">
      <form onSubmit={onSubmit} className="space-y-8 ">
        <div className="grid w-full items-center gap-1.5">
          <Label className="text-white">RUT</Label>
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
            <Label className="text-white">Sucursal</Label>
            <select
              className="text-sm w-full py-2 pl-3 pr-10 text-[#26313c] bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-[#26313c] focus:ring focus:ring-[#26313c] focus:ring-opacity-50"
              required
              value={personnelFormState.id_branch}
              onChange={handleInputChange}
              id="id_branch"
              name="id_branch"
            >
              {loadingBranches ? (
                <option>Cargando...</option>
              ) : (
                branches.map((branch: any) => (
                  <option key={branch.id} value={branch.id}>
                    {branch.address}
                  </option>
                ))
              )}
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
          <Button type="submit" className="w-full" size="lg" disabled={loading}>
            {loading ? (
              <span className="flex items-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Registrando...
              </span>
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
