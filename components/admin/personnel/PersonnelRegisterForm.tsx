"use client";
import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { REGISTER_PERSONNEL_MUTATION } from "../../apollo/mutations";
import { GET_ALL_BRANCHES_QUERY } from "@/components/apollo/queries";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Branch } from "@/interfaces/Branch";
import LoadingButton from "@/components/ui/loadingButton";

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

export default function PersonnelRegisterForm() {

  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  
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
  } = useQuery(GET_ALL_BRANCHES_QUERY);

  

  const [registerPersonnel] = useMutation(REGISTER_PERSONNEL_MUTATION,  );

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
      setAlertType("success");
      setAlertMessage("Personal creado exitosamente.");
    } catch (error) {
      console.error("Error registering personnel:", error);
      setAlertType("big error");
      setAlertMessage("Revise los datos e intente nuevamente");
    } finally {
      setLoading(false);
    }
  };

  if (loadingBranches) return <p>Loading...</p>;
  if (errorBranches) return <p>Error: {errorBranches.message}</p>;
  

  return (
    <div className="space-y-5 w-[1000px] ">
      <form onSubmit={onSubmit} className="space-y-3">
        <div className="grid w-full items-center gap-1.5">
          <Label className="text-[#26313c]">RUT</Label>
          <Input
            className="text-[#26313c]"
            required
            value={personnelFormState.rut}
            onChange={handleInputChange}
            id="rut"
            type="text"
            maxLength={12}
            name="rut"
            onKeyDownCapture={(e) => {
              if (
                !/[0-9]/.test(e.key) &&
                e.key !== "Backspace" &&
                e.key !== "Delete" &&
                e.key !== "ArrowLeft" &&
                e.key !== "ArrowRight" &&
                e.key !== "Tab" &&
                e.key !== "k" &&
                e.key !== "K"
              ) {
                e.preventDefault();
              }
            }}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid w-full items-center gap-1.5">
            <Label className="text-[#26313c]" htmlFor="first_name">
              Primer Nombre
            </Label>
            <Input
              className=" text-[#26313c]"
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
            <Label className="text-[#26313c]" htmlFor="middle_name">
              Segundo Nombre
            </Label>
            <Input
              className=" text-[#26313c]"
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
            <Label className="text-[#26313c]" htmlFor="surname">
              Apellido Paterno
            </Label>
            <Input
              className=" text-[#26313c]"
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
            <Label className="text-[#26313c]" htmlFor="second_surname">
              Apellido Materno
            </Label>
            <Input
              className=" text-[#26313c]"
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
            <Label className="text-[#26313c]" htmlFor="email">
              Email
            </Label>
            <Input
              className=" text-[#26313c]"
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
            <Label className="text-[#26313c]" htmlFor="password">
              Contraseña
            </Label>
            <Input
              className=" text-[#26313c]"
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
            <Label className="text-[#26313c]" htmlFor="speciality">
              Especialidad
            </Label>
            <Input
              className=" text-[#26313c]"
              required
              value={personnelFormState.speciality}
              onChange={handleInputChange}
              id="speciality"
              maxLength={254}
              name="speciality"
            />
          </div>
          <div>
          <Label className="text-[#26313c]">Branch</Label>
          <Select onValueChange={(value) => personnelFormState.id_branch}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecciona una sucursal" />
            </SelectTrigger>
            <SelectContent>
              {dataBranches.getAllBranches.map((branch: Branch) => (
                <SelectItem
                  value={branch.id + "\n" + branch.address}
                  key={branch.id}
                >
                  {branch.address}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
          <div className="grid w-full items-center gap-1.5">
            <Label className="text-[#26313c]" htmlFor="role">
              Rol
            </Label>
            <Input
              className=" text-[#26313c]"
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
        <div className="w-full flex justify-center pt-8">
          <LoadingButton title="Registrar personal" loadingTitle="Registrando..." isLoading={loading} styling= "w-[300px]"/>
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
  );
}