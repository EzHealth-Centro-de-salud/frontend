"use client";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { REGISTER_PATIENT_MUTATION } from "../../apollo/mutations";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import chileRegions from "@/constants/chileRegions";
import LoadingButton from "@/components/ui/loadingButton";

interface PatientFormState{
  rut: string;
  password: string;
  birthdate: string;
  first_name: string;
  middle_name: string;
  surname: string;
  second_surname: string
  sex: string;
  address: string;
  region: string;
  commune: string;
  email: string;
  phone: string;
}

export default function PatientRegisterForm() {
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  const [patientFormState, setPatientFormState] = useState<PatientFormState>({
    rut: "",
    password: "",
    birthdate: "",
    first_name: "",
    middle_name: "",
    surname: "",
    second_surname: "",
    sex: "",
    address: "",
    region: "",
    commune: "",
    email: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [registerPatient] = useMutation(REGISTER_PATIENT_MUTATION);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setPatientFormState({
      ...patientFormState,
      [name]: value,
    });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); //evita que se refresque la pagina al enviar el formulario
    setLoading(true);
    try {
      console.log("inside try");
      const { data, errors } = await registerPatient({
        variables: {
          CreatePatientInput: {
            ...patientFormState,
          },
        },
      });
      if (data?.createPatient.success) {
        setAlertType("success");
        setAlertMessage("Usuario creado exitosamente");
        setPatientFormState({
          rut: "",
          password: "",
          birthdate: "",
          first_name: "",
          middle_name: "",
          surname: "",
          second_surname: "",
          sex: "",
          address: "",
          region: "",
          commune: "",
          email: "",
          phone: "",
        });        
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
    <div className="space-y-5 w-[1100px] ">
      <form onSubmit={onSubmit} className="space-y-5 ">
        <div className="grid w-full items-center gap-1">
          <Label className="text-[#26313c]">
            RUT
          </Label>
          <Input
            className=" text-[#26313c]"
            required
            value={patientFormState.rut}
            onChange={handleInputChange}
            id="rut"
            type="text"
            name="rut"
            placeholder="Ingrese su rut"
            maxLength={12}
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
              value={patientFormState.first_name}
              onChange={handleInputChange}
              id="first_name"
              name="first_name"
              type="text"
              maxLength={50}
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label className="text-[#26313c]" htmlFor="middle_name">
              Segundo Nombre
            </Label>
            <Input
              className=" text-[#26313c]"
              value={patientFormState.middle_name}
              onChange={handleInputChange}
              id="middle_name"
              type="text"
              name="middle_name"
              maxLength={50}
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
              value={patientFormState.surname}
              onChange={handleInputChange}
              id="surname"
              type="text"
              name="surname"
              maxLength={50}
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label className="text-[#26313c]" htmlFor="second_surname">
              Apellido Materno
            </Label>
            <Input
              className=" text-[#26313c]"
              value={patientFormState.second_surname}
              onChange={handleInputChange}
              id="second_surname"
              type="text"
              name="second_surname"
              maxLength={50}
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
              value={patientFormState.email}
              onChange={handleInputChange}
              id="email"
              type="email"
              name="email"
              maxLength={254}
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label className="text-[#26313c]" htmlFor="password">
              Contraseña
            </Label>
            <Input
              className=" text-[#26313c]"
              required
              value={patientFormState.password}
              onChange={handleInputChange}
              id="password"
              type="password"
              name="password"
              maxLength={128}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid w-full items-center gap-1.5">
            <Label className="text-[#26313c]" htmlFor="birthdate">
              Fecha de Nacimiento
            </Label>
            <Input
              className=" text-[#26313c]"
              required
              value={patientFormState.birthdate}
              onChange={handleInputChange}
              id="birthdate"
              name="birthdate"
              type="date"
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label className="text-[#26313c]" htmlFor="sex">
              Sexo
            </Label>
            <Select onValueChange={(value) =>
                setPatientFormState({
                  ...patientFormState,
                  sex: value, // Update the sex field in the state
                })
              } >
              <SelectTrigger className=" text-[#26313c]">
                <SelectValue placeholder="Seleccione..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Femenino">Femenino</SelectItem>
                <SelectItem value="Masculino">Masculino</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid w-full items-center gap-1.5">
            <Label className="text-[#26313c]" htmlFor="address">
              Dirección
            </Label>
            <Input
              className=" text-[#26313c]"
              required
              value={patientFormState.address}
              onChange={handleInputChange}
              id="address"
              name="address"
              type="text"
              maxLength={100}
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label className="text-[#26313c]" htmlFor="region">
              Región
            </Label>
            <Select onValueChange={(value) =>
                setPatientFormState({
                    ...patientFormState,
                    region: value, // Update the region field in the state
                  })
                }>
              <SelectTrigger className=" text-[#26313c]">
                <SelectValue placeholder="Seleccione..." />
              </SelectTrigger>
              <SelectContent>
                {chileRegions.map((region, index) => (
                  <SelectItem key={index} value={region.name}>
                    {region.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid w-full items-center gap-1.5">
            <Label className="text-[#26313c]" htmlFor="commune">
              Comuna
            </Label>
            <Input
              className=" text-[#26313c]"
              required
              value={patientFormState.commune}
              onChange={handleInputChange}
              id="commune"
              type="text"
              name="commune"
              maxLength={60}
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label className="text-[#26313c]" htmlFor="phone">
              Teléfono
            </Label>
            <Input
              className=" text-[#26313c]"
              required
              value={patientFormState.phone}
              onChange={handleInputChange}
              id="phone"
              name="phone"
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
        </div>
        <div className="w-full flex justify-center">
          <LoadingButton title="Registrar paciente" loadingTitle="Registrando..." isLoading={loading} styling= "w-[300px]"/>
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
