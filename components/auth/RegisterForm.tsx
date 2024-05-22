"use client";
import { useMutation, ApolloProvider } from "@apollo/client";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { REGISTER_PATIENT_MUTATION } from "../apollo/mutations";
import { Loader2 } from "lucide-react";

import client from "@/components/apollo/ApolloClient";

function RegisterForm() {
  const [rut, setRut] = useState("");
  const [password, setPassword] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [middle_name, setMiddle_name] = useState("");
  const [surname, setSurname] = useState("");
  const [second_surname, setSecond_surname] = useState("");
  const [sex, setSex] = useState("");
  const [address, setAddress] = useState("");
  const [region, setRegion] = useState("");
  const [commune, setCommune] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const [registerPatient] = useMutation(REGISTER_PATIENT_MUTATION, {
    client,
  });
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); //evita que se refresque la pagina al enviar el formulario
    setLoading(true);
    try {
      console.log("inside try");
      const { data, errors } = await registerPatient({
        variables: {
          CreatePatientInput: {
            rut,
            password,
            birthdate,
            first_name,
            middle_name,
            surname,
            second_surname,
            sex,
            address,
            region,
            commune,
            email,
            phone,
          },
        },
      });
      if (data?.createPatient.success) {
        setAlertType("success");
        setAlertMessage("Usuario creado, volviendo al menú principal...");
        setRut("");
        setPassword("");
        setBirthdate("");
        setFirst_name("");
        setMiddle_name("");
        setSurname("");
        setSecond_surname("");
        setSex("");
        setAddress("");
        setRegion("");
        setCommune("");
        setEmail("");
        setPhone("");
        setTimeout(() => {
          window.location.href = "/";
        }, 4000);
      } else {
        console.log("inside else");
        setAlertType("error");
        setAlertMessage("Error al crear usuario");
      }
    } catch (error) {
      console.log("inside catch");
      setAlertType("big error");
      setAlertMessage("Revise sus datos e intente nuevamente");
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
            value={rut}
            onChange={(e) => setRut(e.target.value)}
            id="rut"
            type="text"
            placeholder="Ingrese su rut"
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
            <Label className="text-white" htmlFor="birthdate">
              Fecha de Nacimiento
            </Label>
            <Input
              className="bg-[#26313c] text-white"
              required
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              id="birthdate"
              type="date"
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label className="text-white" htmlFor="sex">
              Sexo
            </Label>
            <select
              className="bg-[#26313c] text-white"
              required
              value={sex}
              onChange={(e) => setSex(e.target.value)}
              id="sex"
            >
              <option value="">Seleccione...</option>
              <option value="femenino">Femenino</option>
              <option value="masculino">Masculino</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid w-full items-center gap-1.5">
            <Label className="text-white" htmlFor="address">
              Dirección
            </Label>
            <Input
              className="bg-[#26313c] text-white"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              id="address"
              type="text"
              maxLength={100}
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label className="text-white" htmlFor="region">
              Región
            </Label>
            <select
              className="bg-[#26313c] text-white"
              required
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              id="region"
            >
              <option value="">Seleccione...</option>
              <option value="Arica y Parinacota">
                Arica y Parinacota
              </option>{" "}
              <option value="Tarapacá">Tarapacá</option>{" "}
              <option value="Antofagasta">Antofagasta</option>{" "}
              <option value="Atacama">Atacama</option>{" "}
              <option value="Coquimbo">Coquimbo</option>{" "}
              <option value="Valparaíso">Valparaíso</option>{" "}
              <option value="Metropolitana de Santiago">Metropolitana</option>{" "}
              <option value="Libertador General Bernardo O'Higgins">
                Lib. Bernardo O&apos;Higgins
              </option>{" "}
              <option value="Maule">Maule</option>{" "}
              <option value="Ñuble">Ñuble</option>{" "}
              <option value="Biobío">Biobío</option>{" "}
              <option value="La Araucanía">La Araucanía</option>{" "}
              <option value="Los Ríos">Los Ríos</option>{" "}
              <option value="Los Lagos">Los Lagos</option>{" "}
              <option value="Aysén del General Carlos Ibáñez del Campo">
                Aysén
              </option>{" "}
              <option value="Magallanes y de la Antártica Chilena">
                Magallanes
              </option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid w-full items-center gap-1.5">
            <Label className="text-white" htmlFor="commune">
              Comuna
            </Label>
            <Input
              className="bg-[#26313c] text-white"
              required
              value={commune}
              onChange={(e) => setCommune(e.target.value)}
              id="commune"
              type="text"
              maxLength={60}
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label className="text-white" htmlFor="phone">
              Teléfono
            </Label>
            <Input
              className="bg-[#26313c] text-white"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              id="phone"
              type="text"
              maxLength={9}
            />
          </div>
        </div>
        <div className="w-full">
          {/*<Button type="submit" className="w-full" size="lg">
            {loading ? (
              <Button disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Registrando...
              </Button>
            ) : (
              "Registrar personal"
            )}
          </Button>*/}
          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={loading}
          >
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
const RegisterFormComponent = () => (
  <ApolloProvider client={client}>
    <RegisterForm /> 
  </ApolloProvider>
);
RegisterFormComponent.displayName = "RegisterFormComponent";
export default RegisterFormComponent;
