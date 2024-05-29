"use client";
import { useMutation, useQuery, ApolloProvider } from "@apollo/client";
import { useState, useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UPDATE_PERSONNEL_MUTATION } from "../../apollo/mutations"; // assuming you have a mutation to update personnel details
import { GET_BRANCHES_QUERY, GET_PERSONNEL_QUERY } from "../../apollo/queries"; // assuming you have a query to get personnel details
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Branch } from "@/interfaces/Branch";
import LoadingButton from "@/components/ui/loadingButton";

interface EditFormProps {
  rut: string;
}

export default function PersonnelEditForm({ rut }: EditFormProps) {
  const { data: personnelData, loading: personnelLoading } = useQuery(
    GET_PERSONNEL_QUERY,
    {
      variables: { rut },
    }
  );

  const [first_name, setFirstName] = useState("");
  const [middle_name, setMiddleName] = useState("");
  const [surname, setSurname] = useState("");
  const [second_surname, setSecondSurname] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [id_branch, setIdBranch] = useState(0);
  const [branchAddress, setBranchAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const [updatePersonnel] = useMutation(UPDATE_PERSONNEL_MUTATION);

  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  const {
    loading: loadingBranches,
    error: errorBranches,
    data: dataBranches,
  } = useQuery(GET_BRANCHES_QUERY);

  const handleValueChange = (value: string) => {
    const [id, address] = value.split("\n");
    setIdBranch(parseInt(id));
    setBranchAddress(address);
  };

  useEffect(() => {
    if (personnelData) {
      const {
        first_name,
        middle_name,
        surname,
        second_surname,
        email,
        role,
        speciality,
        branch: { id: id_branch, address: branchAddress },
      } = personnelData.getPersonnelByRut;
      setFirstName(first_name || "");
      setMiddleName(middle_name || "");
      setSurname(surname || "");
      setSecondSurname(second_surname || "");
      setEmail(email || "");
      setRole(role || "");
      setSpeciality(speciality || "");
      setIdBranch(id_branch || 0);
      setBranchAddress(branchAddress || "");
    }
  }, [personnelData]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data, errors } = await updatePersonnel({
        variables: {
          UpdatePersonnelInput: {
            rut,
            first_name,
            middle_name,
            surname,
            second_surname,
            email,
            role,
            speciality,
            id_branch,
          },
        },
      });
      if (data?.updatePersonnel.success) {
        setAlertType("success");
        setAlertMessage("Datos actualizados correctamente");
      } else {
        setAlertType("error");
        setAlertMessage("Error al actualizar datos");
      }
    } catch (error) {
      setAlertType("big error");
      setAlertMessage("Revise sus datos e intente nuevamente");
    } finally {
      setLoading(false);
    }
  };

  if (personnelLoading) {
    return <Loader2 className="mr-2 h-4 w-4 animate-spin" />;
  }

  return (
    <div className="flex flex-col w-[700px] lg:flex-row gap-8 p-4 md:p-6 text-gray-900 bg-gray-100">
      <form onSubmit={onSubmit} className="lg:w-full space-y-4">
        <div className="grid w-full items-center gap-1.5">
          <Label className="text-[#26313c]" htmlFor="first_name">
            Primer Nombre
          </Label>
          <Input
            className="text-[#26313c]"
            required
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
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
            className="text-[#26313c]"
            value={middle_name}
            onChange={(e) => setMiddleName(e.target.value)}
            id="middle_name"
            type="text"
            maxLength={50}
            name="middle_name"
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label className="text-[#26313c]" htmlFor="surname">
            Apellido
          </Label>
          <Input
            className="text-[#26313c]"
            required
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            id="surname"
            type="text"
            maxLength={50}
            name="surname"
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label className="text-[#26313c]" htmlFor="second_surname">
            Segundo Apellido
          </Label>
          <Input
            className="text-[#26313c]"
            required
            value={second_surname}
            onChange={(e) => setSecondSurname(e.target.value)}
            id="second_surname"
            type="text"
            maxLength={50}
            name="second_surname"
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label className="text-[#26313c]" htmlFor="email">
            Email
          </Label>
          <Input
            className="text-[#26313c]"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            type="email"
            maxLength={254}
            name="email"
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label className="text-[#26313c]" htmlFor="role">
            Rol
          </Label>
          <Input
            className="text-[#26313c]"
            required
            value={role}
            onChange={(e) => setRole(e.target.value)}
            id="role"
            type="text"
            maxLength={50}
            name="role"
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label className="text-[#26313c]" htmlFor="speciality">
            Especialidad
          </Label>
          <Input
            className="text-[#26313c]"
            required
            value={speciality}
            onChange={(e) => setSpeciality(e.target.value)}
            id="speciality"
            type="text"
            maxLength={254}
            name="speciality"
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label className="text-[#26313c]">Branch</Label>
          <Select onValueChange={handleValueChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={branchAddress} />
            </SelectTrigger>
            <SelectContent>
              {dataBranches?.getBranches.map((branch: Branch) => (
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
        <div className="w-full">
          <LoadingButton
            title="Actualizar datos"
            loadingTitle="Actualizando..."
            isLoading={loading}
            styling="w-full"
          />
        </div>
        {alertMessage && (
          <div className="fixed bottom-4 right-4">
            <Alert variant={alertType === "big error" ? "destructive" : "default"}>
              <AlertTitle>
                {alertType === "big error"
                  ? "¡Oops, ocurrió un error!"
                  : "¡Actualización exitosa!"}
              </AlertTitle>
              <AlertDescription>{alertMessage}</AlertDescription>
            </Alert>
          </div>
        )}
      </form>
    </div>
  );
}
