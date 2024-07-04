"use client";
import DataTable from "react-data-table-component";
import { useMutation, useQuery } from "@apollo/client";
import { GET_PATIENT_BY_RUT_QUERY } from "@/components/apollo/queries";
import { Patient } from "@/interfaces/Patient";
import { CANCEL_APPOINTMENT_MUTATION } from "../apollo/mutations";
import Swal from "sweetalert2";
import { CiSquareRemove } from "react-icons/ci";
import { differenceInHours, parseISO } from "date-fns";
// appointments{date, time, type, status, box{box}, personnel{rut, first_name, surname, speciality, role}}

export default function AppointmentsTable() {
  const [cancelAppointment] = useMutation(CANCEL_APPOINTMENT_MUTATION);
  let rut;
  if (typeof window !== "undefined") {
    rut = window.localStorage.getItem("rut");
  }

  const {
    data: patientData,
    loading: patientLoading,
    error: patientError,
    refetch,
  } = useQuery(GET_PATIENT_BY_RUT_QUERY, {
    variables: {
      rut: rut,
    },
  });

  if (patientLoading) return <p>Loading...</p>;
  if (patientError) return <p>Error :</p>;

  const handleCancelAppointmentClick = async (
    row: Patient["appointments"][number]
  ) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: `¿Estás seguro de que quieres cancelar la cita?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, confirmar",
      cancelButtonText: "Cancelar",
    });
    if (result.isConfirmed) {
      try {
        const { data, errors } = await cancelAppointment({
          variables: {
            input: {
              id_appointment: row.id,
              id_personnel: row.personnel.id,
            },
          },
        });

        if (data?.cancelAppointment.success) {
          Swal.fire("Éxito", "Has anulado la cita");
          refetch();
        } else {
          Swal.fire("Error", "error");
        }
      } catch (error) {
        Swal.fire("Error", "error");
      }
    }
  };

  const isAppointmentCancelable = (appointmentTime: string): boolean => {
    const now = new Date();
    const appointmentDateTime = parseISO(appointmentTime); // Parse the appointment time string into Date object
    const hoursDifference = differenceInHours(appointmentDateTime, now);
    return hoursDifference > 24;
  };

  const columns = [
    {
      name: "Fecha",
      selector: (row: Patient["appointments"][number]) => row.date,
      sortable: true,
      width: "120px",
    },
    {
      name: "Hora",
      selector: (row: Patient["appointments"][number]) => row.time,
      sortable: true,
      width: "80px",
    },
    {
      name: "Tipo",
      selector: (row: Patient["appointments"][number]) => row.type,
      sortable: true,
      width: "100px",
    },
    {
      name: "Estado",
      selector: (row: Patient["appointments"][number]) => row.status,
      sortable: true,
    },
    {
      name: "Box",
      selector: (row: Patient["appointments"][number]) => row.box.box,
      width: "55px",
    },
    {
      name: "Rut Profesional",
      selector: (row: Patient["appointments"][number]) => row.personnel.rut,
      width: "120px",
    },
    {
      name: "Nombre Personal",
      selector: (row: Patient["appointments"][number]) =>
        row.personnel.first_name + " " + row.personnel.surname,
    },
    {
      name: "Especialidad",
      selector: (row: Patient["appointments"][number]) =>
        row.personnel.speciality,
    },
    {
      name: "Sucursal",
      selector: (row: Patient["appointments"][number]) =>
        row.box.branch.address,
    },

    {
      name: "Anular Cita",
      cell: (row: Patient["appointments"][number]) => (
        <>
          {isAppointmentCancelable(row.date + " " + row.time) &&
            row.status !== "Cancelada" &&
            row.status !== "Completada" && (
              <CiSquareRemove
                onClick={() => handleCancelAppointmentClick(row)}
                style={{ cursor: "pointer" }}
              />
            )}
        </>
      ),

      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <div className="space-y-8 w-[1500px] ">
      {patientData?.getPatientByRut.appointments ? (
        <DataTable
          title="Citas del Paciente"
          columns={columns}
          data={patientData.getPatientByRut.appointments}
          pagination
        />
      ) : (
        <p>No se han encontrado citas agendadas</p>
      )}
    </div>
  );
}
