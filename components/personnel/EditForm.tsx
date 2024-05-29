"use client";
import { useMutation, useQuery, ApolloProvider } from "@apollo/client";
import { useState, useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UPDATE_PERSONNEL_MUTATION } from "../apollo/mutations"; // assuming you have a mutation to update personnel details
import { GET_PERSONNEL_QUERY } from "../apollo/queries"; // assuming you have a query to get personnel details
import { Loader2 } from "lucide-react";
//import client from "@/components/apollo/ApolloClient";

interface EditFormProps {
  rut: string;
}

export default function EditForm({ rut }: EditFormProps) {
  const { data: personnelData, loading: personnelLoading } = useQuery(GET_PERSONNEL_QUERY,{
    variables: { rut }
  });

  
  
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

  console.log(personnelData?.getPersonnelByRut.branch);

  return (
    <div className="flex flex-col w-[1000px] lg:flex-row gap-8 p-4 md:p-6 text-gray-900 bg-gray-100 dark:bg-gray-800 dark:text-gray-50">
      {/* Left Column */}
      <div className="lg:w-1/2 space-y-4">
        <div>
          <Label className="text-gray-900 dark:text-gray-50">RUT</Label>
          <div className="text-[#26313c] bg-white p-2 rounded-md">{rut}</div>
        </div>
        <div>
          <Label className="text-gray-900 dark:text-gray-50">
            Nombre Completo
          </Label>
          <div className="text-[#26313c] bg-white p-2 rounded-md">
            {first_name +
              " " +
              middle_name +
              " " +
              surname +
              " " +
              second_surname}
          </div>
        </div>
        <div>
          <Label className="text-gray-900 dark:text-gray-50">
            Especialidad
          </Label>
          <div className="text-[#26313c] bg-white p-2 rounded-md">
            {speciality}
          </div>
        </div>
        <div>
          <Label className="text-gray-900 dark:text-gray-50">Sucursal</Label>
          <div className="text-[#26313c] bg-white p-2 rounded-md">
            {branchAddress}
          </div>
        </div>
      </div>

      <div className="lg:w-1/2 space-y-8 w-[400px]">
        <form onSubmit={onSubmit} className="space-y-8">
          <div className="grid w-full items-center gap-1.5">
            <Label className="text-gray-900 dark:text-gray-50" htmlFor="email">
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
            />
          </div>
          <div className="w-full">
            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                  Actualizando...
                </span>
              ) : (
                "Actualizar datos"
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
                  : "¡Actualización exitosa!"}
              </AlertTitle>
              <AlertDescription>{alertMessage}</AlertDescription>
            </Alert>
          </div>
        )}
      </div>
    </div>
  );
}
