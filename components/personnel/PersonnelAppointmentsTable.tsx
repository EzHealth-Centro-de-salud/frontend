"use client";
import { GET_PERSONNEL_QUERY } from "@/components/apollo/queries";
import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Personnel } from "@/interfaces/Personnel";
import DataTable from "react-data-table-component";
import { DragHandleIcon } from "@chakra-ui/icons";
import {Menu, MenuButton, MenuList, MenuItem, IconButton } from "@chakra-ui/react";
import { CONFIRM_APPOINTMENT_MUTATION, COMPLETE_APPOINTMENT_MUTATION } from "@/components/apollo/mutations";
import Swal from 'sweetalert2';
import  CompleteAppointmentModal  from "@/components/personnel/CompleteAppointmentModal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function PersonnelAppointmentsTable() {
  //variables
  const [personnelRut, setPersonnelRut] = useState<string | null>(null);
  const [confirmAppointment] = useMutation(CONFIRM_APPOINTMENT_MUTATION);
  const [completeAppointment] = useMutation(COMPLETE_APPOINTMENT_MUTATION);
  const [isModalOpen, setModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("Todos");
  const [selectedAppointment, setSelectedAppointment] = useState<{ id_appointment: number, id_personnel: number } | null>(null);
  //call endpoint
  const { data: personnelData, loading: personnelLoading, refetch } = useQuery(
    GET_PERSONNEL_QUERY,
    {
      variables: { rut: personnelRut },
    }
  );
  console.log(personnelData);
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
  const handleCompleteAppointment = async (id_appointment: number, id_personnel: number, date: string) => {
    const today = new Date().toISOString().split('T')[0];

    if (date !== today) {
      Swal.fire(
        'No se puede completar la cita',
        'La cita no se puede completar porque aún no es el día de la cita.',
        'error'
      );
      return;
    }
    setSelectedAppointment({ id_appointment, id_personnel });
    setModalOpen(true);
  }

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedAppointment(null);
  };

  const handleModalSubmit = async ({ diagnosis, prescription }: { diagnosis: string; prescription: string }) => {
    if (!selectedAppointment) return;

    const { id_appointment, id_personnel } = selectedAppointment;

    try {
      const { data, errors } = await completeAppointment({
        variables: {
          input: {
            id_appointment,
            id_personnel,
            diagnosis,
            prescription
          }
        }
      });

      if (data?.completeAppointment?.success) {
        Swal.fire(
          'Cita completada',
          'La cita ha sido completada exitosamente.',
          'success'
        );
        refetch();
      } else {
        console.error("Error al completar la cita: ", errors);
        Swal.fire(
          'Error',
          'Hubo un error al completar la cita.',
          'error'
        );
      }
    } catch (error) {
      console.error("Error al completar la cita: ", error);
      Swal.fire(
        'Error',
        'Hubo un error al completar la cita.',
        'error'
      );
    }
  };

  
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
            <MenuList>
              {row.status === "Pendiente" && (
                <>
                <MenuItem
                  onClick={() => handleAcceptAppointment(row.id, row.personnel.id)}
                >
                  Confirmar cita
                </MenuItem>
                <MenuItem
                  onClick={() => handleAcceptAppointment(row.id, row.personnel.id)}
                >
                  Bloquear paciente
                </MenuItem>
                </>
                            )}
              {row.status === "Confirmada" && (
                <MenuItem
                  onClick={() => handleCompleteAppointment(row.id, row.personnel.id, row.date)} // Asegúrate de definir esta función
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

  const filteredAppointments = personnelData?.getPersonnelByRut?.appointments.filter((appointment: Personnel["appointments"][number]) => {
    if (statusFilter === "Todos") return true;
    return appointment.status.toLowerCase() === statusFilter.toLowerCase();
  });

  return (
    
    <div className="space-y-8 w-[1550px] ">
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
              <SelectItem value="completada">Completada</SelectItem>
            </SelectContent>
          </Select>
        </div>
      {personnelData?.getPersonnelByRut ? (
        <DataTable
          title="Citas del Medico"
          columns={columns}
          data={filteredAppointments}
          pagination
        />
      ) : (
        <p>No se han encontrado citas agendadas</p>
      )}
      <CompleteAppointmentModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
}