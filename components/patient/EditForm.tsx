"use client";
import { useMutation, useQuery, ApolloProvider } from "@apollo/client";
import { useState, useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UPDATE_PATIENT_MUTATION } from "../apollo/mutations";
import { GET_PATIENT_QUERY } from "../apollo/queries"; // assuming you have a query to get patient details
import { Loader2 } from "lucide-react";
import client from "@/components/apollo/ApolloClient";
import chileRegions from "@/constants/chileRegions";

interface EditFormProps {
  rut: string;
}

export default function EditForm({ rut }: EditFormProps) {
  const { data: patientData, loading: patientLoading } = useQuery(
    GET_PATIENT_QUERY,
    {
      variables: { rut },
    }
  );

  const [first_name, setFirstName] = useState("");
  const [middle_name, setMiddleName] = useState("");
  const [surname, setSurname] = useState("");
  const [second_surname, setSecondSurname] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [region, setRegion] = useState("");
  const [commune, setCommune] = useState("");
  const [loading, setLoading] = useState(false);

  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  useEffect(() => {
    if (patientData) {
      const {
        first_name,
        middle_name,
        surname,
        second_surname,
        birthdate,
        email,
        phone,
        address,
        region,
        commune,
      } = patientData.getPatientByRut;
      setFirstName(first_name || "");
      setMiddleName(middle_name || "");
      setSurname(surname || "");
      setSecondSurname(second_surname || "");
      setBirthdate(birthdate || "");
      setEmail(email || "");
      setPhone(phone || "");
      setAddress(address || "");
      setRegion(region || "");
      setCommune(commune || "");
    }
  }, [patientData]);

  const [updatePatient] = useMutation(UPDATE_PATIENT_MUTATION,  );

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data, errors } = await updatePatient({
        variables: {
          UpdatePatientInput: {
            id: rut,
            first_name,
            middle_name,
            surname,
            second_surname,
            birthdate,
            email,
            phone,
            address,
            region,
            commune,
          },
        },
      });
      if (data?.updatePatient.success) {
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

  if (patientData) {
    console.log(patientData.getPatientByRut.region);
  }

  if (patientLoading) {
    return <Loader2 className="mr-2 h-4 w-4 animate-spin" />;
  }

  return (
    <div className="flex flex-col w-[1000px] lg:flex-row gap-8 p-4 md:p-6 text-gray-900 bg-gray-100 dark:bg-gray-800 dark:text-gray-50">
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
            Fecha de Nacimiento
          </Label>
          <div className="text-[#26313c] bg-white p-2 rounded-md">
            {birthdate}
          </div>
        </div>
      </div>

      {/* Right Column */}
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
          <div className="grid w-full items-center gap-1.5">
            <Label className="text-gray-900 dark:text-gray-50" htmlFor="phone">
              Teléfono
            </Label>
            <Input
              className="text-[#26313c]"
              required
              placeholder="Ej: 912345678"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              id="phone"
              type="text"
              maxLength={9}
              minLength={9}
              onKeyDownCapture={(e) => {
                if (
                  !/[0-9]/.test(e.key) &&
                  e.key !== "Backspace" &&
                  e.key !== "Delete" &&
                  e.key !== "ArrowLeft" &&
                  e.key !== "ArrowRight" &&
                  e.key !== "Tab"
                ) {
                  e.preventDefault();
                }
              }}
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label
              className="text-gray-900 dark:text-gray-50"
              htmlFor="address"
            >
              Dirección
            </Label>
            <Input
              className="text-[#26313c]"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              id="address"
              type="text"
              maxLength={100}
            />
          </div>

          <div className="grid w-full items-center gap-1.5">
            <Label className="text-gray-900 dark:text-gray-50" htmlFor="region">
              Región
            </Label>
            <div className="relative">
              <select
                className="text-sm w-full py-2 pl-3 pr-10 text-[#26313c] bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-[#26313c] focus:ring focus:ring-[#26313c] focus:ring-opacity-50"
                required
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                id="region"
              >
                <option value="">Seleccione...</option>
                {chileRegions.map((regionObj, index) => (
                  <option key={index} value={regionObj.name}>
                    {regionObj.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid w-full items-center gap-1.5">
            <Label
              className="text-gray-900 dark:text-gray-50"
              htmlFor="commune"
            >
              Comuna
            </Label>
            <Input
              className="text-[#26313c]"
              required
              value={commune}
              onChange={(e) => setCommune(e.target.value)}
              id="commune"
              type="text"
              maxLength={60}
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