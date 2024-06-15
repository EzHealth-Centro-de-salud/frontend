"use client";
import { GET_PERSONNEL_QUERY } from "@/components/apollo/queries";
import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Personnel } from "@/interfaces/Personnel";
import DataTable from "react-data-table-component";
import { input, select } from "@nextui-org/theme";
import { Button } from "@/components/ui/button";
import { DragHandleIcon } from "@chakra-ui/icons";
import {Menu, MenuButton, MenuList, MenuItem, IconButton } from "@chakra-ui/react";
import { CONFIRM_APPOINTMENT_MUTATION } from "@/components/apollo/mutations";
import Swal from 'sweetalert2';


export default function PersonnelAppointmentsTable() {
  //variables
  const [personnelRut, setPersonnelRut] = useState<string | null>(null);
  const [confirmAppointment] = useMutation(CONFIRM_APPOINTMENT_MUTATION);
  //call endpoint
  const { data: personnelData, loading: personnelLoading, refetch } = useQuery(
    GET_PERSONNEL_QUERY,
    {
      variables: { rut: personnelRut },
    }
  );
  //get rut in server side
  useEffect(() => {
    setPersonnelRut(localStorage.getItem("rut"));
  }, []);

  const handleAcceptAppointment = async (id_appointment: number, id_personnel: number) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: "¿Estás seguro de que quieres confirmar la cita?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, confirmar',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      try {
        const { data, errors } = await confirmAppointment({
          variables: {
            input: {
              id_appointment: id_appointment,
              id_personnel: id_personnel
            }
          }
        });
        if (data?.confirmAppointment?.success) {
          Swal.fire(
            'Cita confirmada',
            'La cita ha sido confirmada exitosamente.',
            'success'
          );
          refetch();
        } else {
          console.error("Error al confirmar la cita: ", errors);
          Swal.fire(
            'Error',
            'Hubo un error al confirmar la cita.',
            'error'
          );
        }
      } catch (error) {
        console.error("Error al confirmar la cita: ", error);
        Swal.fire(
          'Error',
          'Hubo un error al confirmar la cita.',
          'error'
        );
      }
    }
  }
  const handleCompleteAppointment = async (id_appointment: number, id_personnel: number) => {
    //TODO: request diagnosis and presecription
    console.log(id_appointment, id_personnel)
    console.log ("Completar cita");
  }

  ;
  //columns for datatable
  const columns = [
    {
      name: "Fecha",
      selector: (row: Personnel["appointments"][number]) => row.date,
      sortable: true,
      width: "120px",
    },
    {
      name: "Hora",
      selector: (row: Personnel["appointments"][number]) => row.time,
      sortable: true,
      width: "80px",
    },
    {
      name: "Tipo",
      selector: (row: Personnel["appointments"][number]) => row.type,
      sortable: true,
      width: "100px",
    },
    {
      name: "Estado",
      selector: (row: Personnel["appointments"][number]) => row.status,
      sortable: true,
      width: "125px",
    },
    {
      name: "Box",
      selector: (row: Personnel["appointments"][number]) => row.box.box,
      width: "55px",
    },
    {
      name: "Rut Personal",
      selector: (row: Personnel["appointments"][number]) => row.personnel.rut,
      width: "120px",
    },
    {
      name: "Nombre Personal",
      selector: (row: Personnel["appointments"][number]) =>
        row.personnel.first_name + " " + row.personnel.surname,
    },
    {
      name: "Rut Paciente",
      selector: (row: Personnel["appointments"][number]) => row.patient.rut,
      width: "120px",
    },
    {
      name: "Nombre Paciente",
      selector: (row: Personnel["appointments"][number]) =>
        row.patient.first_name + " " + row.patient.surname,
    },
    {
      name: "Sucursal",
      selector: (row: Personnel["appointments"][number]) =>
        row.box.branch.address,
    },
    {
        name: "Acciones",
        cell: (row: Personnel["appointments"][number]) => (
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<DragHandleIcon />}
              size="sm"
            />
            <MenuList bg="orange">
              {row.status === "Pendiente" && (
                <MenuItem
                  onClick={() => handleAcceptAppointment(row.id, row.personnel.id)}
                  border="1px solid #000" // Agrega un borde
                  borderRadius="md" // Redondea las esquinas del borde
                  p={2} // Agrega relleno
                >
                  Confirmar cita
                </MenuItem>
              )}
              {row.status === "Confirmada" && (
                <MenuItem
                  onClick={() => handleCompleteAppointment(row.id, row.personnel.id)} // Asegúrate de definir esta función
                  border="1px solid #000" // Agrega un borde
                  borderRadius="md" // Redondea las esquinas del borde
                  p={2} // Agrega relleno
                >
                  Completar cita
                </MenuItem>
              )}
            </MenuList>
          </Menu>
        ),
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
      }
  ];

  return (
    <div className="space-y-8 w-[1200px] ">
      {personnelData?.getPersonnelByRut ? (
        <DataTable
          title="Citas del Medico"
          columns={columns}
          data={personnelData?.getPersonnelByRut.appointments}
          pagination
        />
      ) : (
        <p>No se han encontrado citas agendadas</p>
      )}
    </div>
  );
}
