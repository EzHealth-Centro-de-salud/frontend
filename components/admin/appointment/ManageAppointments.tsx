"use client";
import {
  GET_ALL_APPOINTMENTS_QUERY,
  GET_PERSONNEL_QUERY,
} from "@/components/apollo/queries";
import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import DataTable from "react-data-table-component";
import { DragHandleIcon } from "@chakra-ui/icons";
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
    IconButton,
    Button,
  } from '@chakra-ui/react'
import { CONFIRM_APPOINTMENT_MUTATION } from "@/components/apollo/mutations";
import Swal from "sweetalert2";
import { Appointment } from "@/interfaces/Appointment";

export default function ManageAppointments() {
  //variables
  const [personnelRut, setPersonnelRut] = useState<string | null>(null);
  const [confirmAppointment] = useMutation(CONFIRM_APPOINTMENT_MUTATION);
  //call endpoint

  const { data: appointmentData, loading: appointmentLoading } = useQuery(
    GET_ALL_APPOINTMENTS_QUERY
  );
  if (appointmentLoading) return <p>Cargando...</p>;

  console.log(appointmentData);

  const appointments: Appointment[] = appointmentData.getAllAppointments;

  const handleAcceptAppointment = async (
    id_appointment: number,
    id_personnel: number
  ) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Estás seguro de que quieres confirmar la cita?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, confirmar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        const { data, errors } = await confirmAppointment({
          variables: {
            input: {
              id_appointment: id_appointment,
              id_personnel: id_personnel,
            },
          },
        });
        if (data?.confirmAppointment?.success) {
          Swal.fire(
            "Cita confirmada",
            "La cita ha sido confirmada exitosamente.",
            "success"
          );
        } else {
          console.error("Error al confirmar la cita: ", errors);
          Swal.fire("Error", "Hubo un error al confirmar la cita.", "error");
        }
      } catch (error) {
        console.error("Error al confirmar la cita: ", error);
        Swal.fire("Error", "Hubo un error al confirmar la cita.", "error");
      }
    }
  };
  const handleCompleteAppointment = async (
    id_appointment: number,
    id_personnel: number
  ) => {
    //TODO: request diagnosis and presecription
    console.log(id_appointment, id_personnel);
    console.log("Completar cita");
  };

  //columns for datatable
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
      name: "Acciones",
      cell: (row: Appointment) => (
        <>
        <Menu>
        <MenuButton as={IconButton} icon={<DragHandleIcon/>} size="sm" >
        </MenuButton>
        <MenuList>
            <MenuItem>Download</MenuItem>
            <MenuItem>Create a Copy</MenuItem>
            <MenuItem>Mark as Draft</MenuItem>
            <MenuItem>Delete</MenuItem>
            <MenuItem>Attend a Workshop</MenuItem>
        </MenuList>
        </Menu>
        
        
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <div className="space-y-8 w-[1550px] ">
      {appointments.length > 0 ? (
        <DataTable
          title="Citas Agendadas"
          columns={columns}
          data={appointments}
          pagination
        />
      ) : (
        <p>No se han encontrado citas agendadas</p>
      )}
    </div>
  );
}
