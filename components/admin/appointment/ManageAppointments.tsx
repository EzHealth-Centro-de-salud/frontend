"use client";
import { GET_ALL_APPOINTMENTS_QUERY } from "@/components/apollo/queries";
import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import DataTable from "react-data-table-component";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import {
  CANCEL_APPOINTMENT_MUTATION,
  CONFIRM_APPOINTMENT_MUTATION,
  RESCHEDULE_APPOINTMENT_MUTATION,
} from "@/components/apollo/mutations";
import Swal from "sweetalert2";
import { Appointment } from "@/interfaces/Appointment";
import { CiCalendar, CiMenuKebab } from "react-icons/ci";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ManageAppointments() {
  const [confirmAppointment] = useMutation(CONFIRM_APPOINTMENT_MUTATION);
  const [cancelAppointment] = useMutation(CANCEL_APPOINTMENT_MUTATION);
  const [rescheduleAppointment] = useMutation(RESCHEDULE_APPOINTMENT_MUTATION);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("Todos");
  const [typeFilter, setTypeFilter] = useState("Todos");
  const [showReschedule, setShowReschedule] = useState(false);
  //For rescheduling
  const [medicId, setMedicId] = useState(0);
  const [patientId, setPatientId] = useState(0);
  const [appointment, setAppointment] = useState(0);
  const [appointmentType, setAppointmentType] = useState("");

  const {
    data: appointmentData,
    loading: appointmentLoading,
    refetch,
  } = useQuery(GET_ALL_APPOINTMENTS_QUERY);
  if (appointmentLoading) return <p>Cargando...</p>;

  const allAppointments: Appointment[] = appointmentData.getAllAppointments;

  const appointments = allAppointments.filter(
    (appointment) =>
      appointment.status !== "Cancelada" &&
      appointment.status !== "Completada" &&
      appointment.status !== "Rechazada"
  );

  const handleAppointmentStatus = async (
    id_appointment: number,
    id_personnel: number,
    status: string
  ) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: `¿Estás seguro de que quieres ${
        status == "confirm"
          ? "confirmar"
          : status == "reject"
          ? "rechazar"
          : status == "cancel"
          ? "cancelar"
          : "error"
      } la cita?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, confirmar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      let mutationFunction;
      let successMessage;
      let errorMessage;

      switch (status) {
        case "confirm":
          mutationFunction = confirmAppointment;
          successMessage = "La cita ha sido confirmada exitosamente.";
          errorMessage = "Hubo un error al confirmar la cita.";
          break;
        case "cancel":
          mutationFunction = cancelAppointment;
          successMessage = "La cita ha sido cancelada exitosamente.";
          errorMessage = "Hubo un error al cancelar la cita.";
          break;
        // case "reject":
        //   mutationFunction = rejectAppointment;
        //   successMessage = "La cita ha sido rechazada exitosamente.";
        //   errorMessage = "Hubo un error al rechazar la cita.";
        //   break;
        default:
          console.error("Estado no válido: ", status);
          return;
      }
      try {
        const { data, errors } = await mutationFunction({
          variables: {
            input: {
              id_appointment: id_appointment,
              id_personnel: id_personnel,
            },
          },
        });

        if (data?.[status + "Appointment"]?.success) {
          Swal.fire("Éxito", successMessage, "success");
          refetch();
        } else {
          console.error("Error: ", errors);
          Swal.fire("Error", errorMessage, "error");
        }
      } catch (error) {
        console.error("Error: ", error);
        Swal.fire("Error", errorMessage, "error");
      }
    }
  };

  const handleRescheduleBookAppointment = async (
    id_patient: number,
    id_personnel: number,
    id_appointment: number,
    appointmentType: string,
  ) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: `¿Estás seguro de que quieres reprogramar la cita?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, reprogramar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      setShowReschedule(true);
      setMedicId(id_personnel);
      setPatientId(id_patient);
      setAppointment(id_appointment);
      setAppointmentType(appointmentType);
    }
  };

  const filteredAppointments = appointments.filter(
    (appointment) => {
      const searchTerm = searchQuery.toLowerCase().trim();
      const searchTerms = searchTerm.split(' ');

      return searchTerms.every(term =>
        (appointment.personnel.first_name.toLowerCase().includes(term) ||
          appointment.personnel.surname.toLowerCase().includes(term) ||
          appointment.personnel.rut.toLowerCase().includes(term) ||
          appointment.box.branch.address.toLowerCase().includes(term)) &&
        (statusFilter === "Todos" || appointment.status.toLowerCase() === statusFilter) &&
        (typeFilter === "Todos" || appointment.type.toLowerCase() === typeFilter)
      );
    }
  );

  const columns = [
    {
      name: "Rut Personal",
      selector: (row: Appointment) => row.personnel.rut,
      width: "110px",
    },
    {
      name: "Nombre Personal",
      selector: (row: Appointment) =>
        row.personnel.first_name + " " + row.personnel.surname,
      width: "200px",
    },
    {
      name: "Rut Paciente",
      selector: (row: Appointment) => row.patient.rut,
      width: "110px",
    },
    {
      name: "Nombre Paciente",
      selector: (row: Appointment) =>
        row.patient.first_name + " " + row.patient.surname,
      width: "200px",
    },
    {
      name: "Tipo",
      selector: (row: Appointment) => row.type,
      sortable: true,
      width: "130px",
    },
    {
      name: "Fecha",
      selector: (row: Appointment) => row.date,
      sortable: true,
      width: "120px",
    },
    {
      name: "Hora",
      selector: (row: Appointment) => row.time,
      sortable: true,
      width: "80px",
    },
    {
      name: "Estado",
      selector: (row: Appointment) => row.status,
      sortable: true,
      width: "125px",
    },
    {
      name: "Sucursal",
      selector: (row: Appointment) => row.box.branch.address,
    },
    {
      name: "Box",
      selector: (row: Appointment) => row.box.box,
      width: "55px",
    },
    {
      name: "Cambiar Estado",
      cell: (row: Appointment) => (
        <>
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<CiMenuKebab />}
              size="sm"
            ></MenuButton>
            <MenuList>
              {row.status !== "Confirmada" && (
                <MenuItem
                  onClick={() =>
                    handleAppointmentStatus(row.id, row.personnel.id, "confirm")
                  }
                >
                  Confirmar
                </MenuItem>
              )}
              <MenuItem
                onClick={() =>
                  handleAppointmentStatus(row.id, row.personnel.id, "cancel")
                }
              >
                Cancelar
              </MenuItem>
              <MenuItem
                onClick={() =>
                  handleAppointmentStatus(row.id, row.personnel.id, "reject")
                }
              >
                Rechazar
              </MenuItem>
            </MenuList>
          </Menu>
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    {
      name: "Reagendar cita",
      cell: (row: Appointment) => (
        <CiCalendar
          onClick={() =>
            handleRescheduleBookAppointment(row.patient.id as number, row.personnel.id, row.id, row.type)
          }
          style={{ cursor: "pointer" }}
        />
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  if (showReschedule) {
    return <div> Reschedule </div>;
  }

  return (
    <div className="space-y-1 w-[1550px] ">
      <div className="flex space-x-4">
        <div>
          <Label>Buscar por nombre de personal, RUT o Sucursal</Label>
          <Input
            type="text"
            placeholder="Buscar..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 border border-gray-300 rounded w-[500px]"
          />
        </div>
        <div>
          <Label>Filtrar por estado</Label>
          <Select onValueChange={(value) => setStatusFilter(value)}>
            <SelectTrigger className="w-[300px]">
              <SelectValue placeholder="Filtrar por estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Todos">Todos</SelectItem>
              <SelectItem value="pendiente">Pendiente</SelectItem>
              <SelectItem value="confirmada">Confirmada</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="w-[400px]">
          <Label>Filtrar por tipo</Label>
          <Select onValueChange={(value) => setTypeFilter(value)}>
            <SelectTrigger className="w-[300px]">
              <SelectValue placeholder="Filtrar por tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Todos">Todos</SelectItem>
              <SelectItem value="control">Control</SelectItem>
              <SelectItem value="procedimiento">Procedimiento</SelectItem>
              <SelectItem value="consulta">Consulta</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      {filteredAppointments.length > 0 ? (
        <DataTable
          columns={columns}
          data={filteredAppointments}
          pagination
        />
      ) : (
        <p>No se han encontrado citas agendadas</p>
      )}
    </div>
  );
}
