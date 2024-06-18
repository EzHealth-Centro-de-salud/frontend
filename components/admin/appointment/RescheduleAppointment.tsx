"use client";
import {
  GET_ALL_PERSONNEL_QUERY,
  CHECK_SCHEDULE_QUERY,
} from "@/components/apollo/queries";
import { RESCHEDULE_APPOINTMENT_MUTATION } from "@/components/apollo/mutations";
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
import { Router } from "lucide-react";

interface Branch {
  id: number;
  address: string;
}
interface Props{
  id_patient: number;
  id_personnel: number;
  id_appointment: number;
  appointmentType: string;  
  branchAddress: string;
  onComplete: () => void;
}

export default function RescheduleAppointment( {id_patient, id_personnel, id_appointment, appointmentType, branchAddress, onComplete }: Props) {
  const [medicFullName, setMedicFullName] = useState("");
  const [medicSpeciality, setMedicSpeciality] = useState("");
  const [date, setDate] = useState("");
  const [calendarDate, setCalendarDate] = useState<DateValue | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [view, setView] = useState("startRescheduling");
  const [timetableView, setTimetableView] = useState(false);
  const [medicAvailability, setMedicAvailability] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [rescheduleAppointment] = useMutation(RESCHEDULE_APPOINTMENT_MUTATION);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [wasRescheduled, setWasRescheduled] = useState("false");
  const router = useRouter();


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
        id_patient: id_patient,
        date,
      },
    },
    skip: !id_personnel || !date || !id_patient,
  });

  let { locale } = useLocale();

  if (loadingPersonnel || loadingSchedule)
    return <p>Loading...</p>;
  if (errorPersonnel) return <p>Error :(</p>;

  if (errorSchedule)
    return (
      <div>
        <p>Hubo un problema con la disponibilidad del médico.</p>
        <Button>
          <Link href="/admin/appointment/manage">Volver al inicio</Link>
        </Button>
      </div>
    );


  const personnel: Personnel[] = dataPersonnel.getAllPersonnel;



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

  const handleContinueToMedicSelection = () => {
    setView("datePicking");
  }

  const handleBackToDatePicking = () => {
    setView("datePicking");
  };


  const handleContinueFromTimeSelection = () => {
    getMedicDetails(id_personnel);
    setView("Details");
  };

  const handlePatientsAppointments = () => {
    onComplete();
  };

  const getMedicDetails = (medicId: number) => {
    const medic = personnel.find(
      (personnel) => personnel.id === medicId
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
      const { data, errors } = await rescheduleAppointment({
        variables: {
          input: {
            id_appointment: id_appointment,
            date: date,
            time: selectedTime,
          },
        },
      });
      console.log(data);
      if (data?.rescheduleAppointment.success) {
        setWasRescheduled("true");
        setAlertType("success");
        setAlertMessage("Cita reagendada exitosamente");
      } else {
        setAlertType("error");
        setAlertMessage("Hubo un error al reagendar la cita");
        console.log("Error: ", errors);
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div>
      {view === "startRescheduling" && (
        <Button
          className="w-[400px]"
          onClick={handleContinueToMedicSelection}
        >
          Continuar
        </Button>
      )}
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
            Por favor confirma los detalles de la cita médica
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
            {wasRescheduled === "false" && (
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
            {wasRescheduled === "true" && (
              <div className="flex justify-center pt-3">
                <Button className="w-[400px]" onClick={handlePatientsAppointments}>
                  Ver lista de citas
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
                      : "¡Reagendado exitoso!"}
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
