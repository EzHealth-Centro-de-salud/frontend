"use client";
import {
  GET_ALL_BRANCHES_WITH_PERSONNEL_QUERY,
  GET_ALL_PERSONNEL_QUERY,
  CHECK_SCHEDULE_QUERY,
} from "@/components/apollo/queries";
import { CREATE_APPOINTMENT_MUTATION } from "@/components/apollo/mutations";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { Personnel } from "@/interfaces/Personnel";
import {
  Autocomplete,
  AutocompleteItem,
  DatePicker,
  DateValue,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { today, isWeekend, getLocalTimeZone } from "@internationalized/date";
import { useLocale } from "@react-aria/i18n";
import Link from "next/link";
import LoadingButton from "@/components/ui/loadingButton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useRouter } from "next/navigation";

interface Branch {
  id: number;
  address: string;
}
//mutation for rescheduling appointment
//   id_appointment
//   new_date
//   new_time


interface Props{
  id_patient: number;
  id_personnel: number;
  id_appointment: number;
  appointmentType: string;  
  branchAddress: string;
}


export default function RescheduleAppointment( {id_patient, id_personnel, id_appointment, appointmentType, branchAddress}: Props) {
  const [medicFullName, setMedicFullName] = useState("");
  const [medicSpeciality, setMedicSpeciality] = useState("");
  const [date, setDate] = useState("");
  const [calendarDate, setCalendarDate] = useState<DateValue | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [view, setView] = useState("datePicking");
  const [timetableView, setTimetableView] = useState(false);
  const [medicAvailability, setMedicAvailability] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [createAppointment] = useMutation(CREATE_APPOINTMENT_MUTATION);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [wasBooked, setWasBooked] = useState("false");
  const [patientId, setPatientId] = useState("");
  const router = useRouter();

  //Branches
  const {
    loading: loadingBranches,
    error: errorBranches,
    data: dataBranches,
  } = useQuery(GET_ALL_BRANCHES_WITH_PERSONNEL_QUERY);

  const {
    loading: loadingPersonnel,
    error: errorPersonnel,
    data: dataPersonnel,
  } = useQuery(GET_ALL_PERSONNEL_QUERY);

  const {
    loading: loadingSchedule,
    error: errorSchedule,
    data: dataSchedule,
    refetch: refetchSchedule,
  } = useQuery(CHECK_SCHEDULE_QUERY, {
    variables: {
      CheckScheduleInput: {
        id_personnel: id_personnel,
        date,
      },
    },
  });

  let { locale } = useLocale();

  if (loadingBranches || loadingPersonnel || loadingSchedule)
    return <p>Loading...</p>;
  if (errorBranches || errorPersonnel) return <p>Error :(</p>;

  if (errorSchedule)
    return (
      <div>
        <p>Hubo un problema con la disponibilidad del médico.</p>
        <Button>
          <Link href="/patient/dashboard">Volver al inicio</Link>
        </Button>
      </div>
    );

  const branches: Branch[] = dataBranches.getAllBranches;

  const personnel: Personnel[] = dataPersonnel.getAllPersonnel;

  const personnelForBranch = personnel.filter((personnel) => {
    return parseInt(personnel.branch.id) === parseInt(branch);
  });


  const handleContinueFromDatePicking = () => {
    if (!date) {
      setShowTooltip(true);
    } else {
      setShowTooltip(false);
      const availabilityByMedicId = dataSchedule?.checkSchedule?.message || [];
      setMedicAvailability(JSON.parse(availabilityByMedicId) || []);
      setTimetableView(true);
    }
  };

  const handleBackToDatePicking = () => {
    setView("datePicking");
  };


  const handleContinueFromTimeSelection = () => {
    getMedicDetails(medicId as string);
    getBranchAddress(branch);
    const localStoragePatientId = localStorage.getItem("patient_id");
    if (localStoragePatientId) {
      setPatientId(localStoragePatientId);
    }
    setView("Details");
  };

  const handleNewAppointment = () => {
    router.push("/admin/patient/patients");
  };

  const getMedicDetails = (medicId: string) => {
    const medic = personnel.find(
      (personnel) => personnel.id === parseInt(medicId)
    );
    if (medic) {
      setMedicFullName(
        medic.first_name +
          " " +
          medic.middle_name +
          " " +
          medic.surname +
          " " +
          medic.second_surname
      );
      setMedicSpeciality(medic.speciality);
    }
  };

  const getBranchAddress = (branchId: string) => {
    const branch = branches.find((branch) => branch.id === parseInt(branchId));
    if (branch) {
      setBranchAddress(branch.address);
    }
  };

  ///////////////////////////////////////////////////////////////////////
  let now = today(getLocalTimeZone());

  // let disabledRanges = [
  //   [now, now.add({ days: 5 })],
  //   [now.add({ days: 14 }), now.add({ days: 16 })],
  //   [now.add({ days: 23 }), now.add({ days: 24 })],
  // ];

  let isDateUnavailable = (date: any) => isWeekend(date, locale);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log("inside try");
      const { data, errors } = await createAppointment({
        variables: {
          input: {
            id_personnel: parseFloat(medicId as string),
            id_patient: parseFloat(patientId as string),
            date,
            time: selectedTime,
            type: appointmentType,
          },
        },
      });
      console.log(data);
      if (data?.createAppointment.success) {
        setWasBooked("true");
        setAlertType("success");
        setAlertMessage("Cita agendada exitosamente");
      } else {
        setAlertType("error");
        setAlertMessage("Hubo un error al agendar la cita");
        console.log("Error: ", errors);
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div>
      {view === "datePicking" && (
        <div>
          <div className="w-[550px] justify-center pb-5">
            <Label className="text-[#26313c] mb-5">Seleccionar Fecha</Label>
            <DatePicker
              label="Appointment date"
              aria-label="Appointment date"
              isDateUnavailable={isDateUnavailable}
              minValue={today(getLocalTimeZone())}
              value={calendarDate}
              onChange={(value) => {
                setCalendarDate(value);
                if (value) {
                  setTimetableView(false);
                  setDate(value.toString());
                }
              }}
            />
            <div className="flex justify-center pt-3">
              <Button
                className="w-[400px]"
                onClick={handleContinueFromDatePicking}
              >
                Buscar por esta fecha
              </Button>
            </div>
          </div>
          {timetableView && (
            <div className="w-[550px] justify-center pb-5">
              <Label className="text-[#26313c] mb-5">
                Selecciona uno de los horarios disponibles con este médico
              </Label>
              <div>
                <Select onValueChange={(value) => setSelectedTime(value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecciona el horario que necesites" />
                  </SelectTrigger>
                  <SelectContent>
                    {medicAvailability.map((time) => (
                      <SelectItem value={time} key={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-center pt-3">
                <Button
                  className="w-[400px]"
                  onClick={handleContinueFromTimeSelection}
                >
                  Agendar Cita Médica
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
      {view === "Details" && (
        <div className="w-[1000px] justify-center pb-5">
          <Label className="text-[#26313c] mb-5 flex align-middle justify-center">
            Por favor confirma los detalles de tu cita médica
          </Label>
          <Table aria-label="Example static collection table">
            <TableHeader>
              <TableColumn className="pr-20 text-center">
                Nombre Médico
              </TableColumn>
              <TableColumn className="text-center">Especialidad</TableColumn>
              <TableColumn className="px-20 text-center">
                Tipo de cita
              </TableColumn>
              <TableColumn className="px-20 text-center">Sucursal</TableColumn>
              <TableColumn className="text-center">Fecha</TableColumn>
              <TableColumn className="text-center">Hora</TableColumn>
            </TableHeader>
            <TableBody>
              <TableRow key="1">
                <TableCell className="pl-7">{medicFullName}</TableCell>
                <TableCell className="text-center">{medicSpeciality}</TableCell>
                <TableCell className="text-center">{appointmentType}</TableCell>
                <TableCell className="text-center">{branchAddress}</TableCell>
                <TableCell className="text-center">{date}</TableCell>
                <TableCell className="text-center">{selectedTime}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div className="flex justify-center pt-3" onSubmit={onSubmit}>
            {wasBooked === "false" && (
              <div className="flex ">
                <Button
                  className="w-[100px] mr-5 "
                  onClick={handleBackToDatePicking}
                >
                  Volver
                </Button>
                <form onSubmit={onSubmit}>
                  <LoadingButton
                    title="Agendar Cita"
                    loadingTitle="Agendando su Cita..."
                    isLoading={loading}
                    styling="w-[300px]"
                  />
                </form>
              </div>
            )}
            {wasBooked === "true" && (
              <div className="flex justify-center pt-3">
                <Button className="w-[400px]" onClick={handleNewAppointment}>
                  Agendar otra cita
                </Button>
              </div>
            )}
            {alertMessage && (
              <div className="fixed bottom-4 right-4">
                <Alert
                  variant={
                    alertType === "big error" ? "destructive" : "default"
                  }
                >
                  <AlertTitle>
                    {alertType === "big error"
                      ? "¡Oops, ocurrió un error!"
                      : "¡Agendado exitoso!"}
                  </AlertTitle>
                  <AlertDescription>{alertMessage}</AlertDescription>
                </Alert>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
