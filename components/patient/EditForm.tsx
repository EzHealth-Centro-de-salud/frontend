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

interface EditFormProps {
  rut: string;
}

/*interface GetPatientByRutQuery {
  getPatientByRut: {
    id: string;
    rut: string;
    first_name: string;
    middle_name: string;
    surname: string;
    second_surname: string;
    birthdate: string;
    phone: string;
    email: string;
    address: string;
    region: string;
    commune: string;    
  } | null;
}
*/

function EditForm({ rut }: EditFormProps) {
  const { data: patientData, loading: patientLoading } = useQuery(
    GET_PATIENT_QUERY,
    {
      variables: { id: rut },
      client,
    }
  );
  console.log(rut)
  
  
  const [first_name,setFirstName] = useState("");
  const [middle_name,setMiddleName] = useState("");
  const [surname,setSurname] = useState("");
  const [second_surname,setSecondSurname] = useState("");
  const [birthdate,setBirthdate] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [region, setRegion] = useState("");
  const [commune, setCommune] = useState("");
  const [loading, setLoading] = useState(false);

  const [updatePatient] = useMutation(UPDATE_PATIENT_MUTATION, {
    client,
  });
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

  if (patientLoading) {
    return <Loader2 className="mr-2 h-4 w-4 animate-spin" />;
  }

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
            {first_name + " " + middle_name + " " + surname + " " + second_surname}
          </div>
        </div>
        <div>
          <Label className="text-gray-900 dark:text-gray-50">
            Fecha de Nacimiento
          </Label>
          <div className="text-[#26313c] bg-white p-2 rounded-md">
            {"test"}
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
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              id="phone"
              type="text"
              maxLength={9}
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
            <select
              className="text-[#26313c]"
              required
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              id="region"
            >
              <option value="">Seleccione...</option>
              <option value="Arica y Parinacota">Arica y Parinacota</option>
              <option value="Tarapacá">Tarapacá</option>
              <option value="Antofagasta">Antofagasta</option>
              <option value="Atacama">Atacama</option>
              <option value="Coquimbo">Coquimbo</option>
              <option value="Valparaíso">Valparaíso</option>
              <option value="Metropolitana de Santiago">Metropolitana</option>
              <option value="Libertador General Bernardo O'Higgins">
                Lib. Bernardo O&apos;Higgins
              </option>
              <option value="Maule">Maule</option>
              <option value="Ñuble">Ñuble</option>
              <option value="Biobío">Biobío</option>
              <option value="La Araucanía">La Araucanía</option>
              <option value="Los Ríos">Los Ríos</option>
              <option value="Los Lagos">Los Lagos</option>
              <option value="Aysén del General Carlos Ibáñez del Campo">
                Aysén
              </option>
              <option value="Magallanes y de la Antártica Chilena">
                Magallanes
              </option>
            </select>
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
            <Button type="submit" className="w-full" size="lg">
              {loading ? (
                <Button disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                  Actualizando...
                </Button>
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

const EditFormComponent = ({ rut }: EditFormProps) => (
  <ApolloProvider client={client}>
    <EditForm rut={rut} />
  </ApolloProvider>
);

EditFormComponent.displayName = "EditFormComponent";
export default EditFormComponent;
