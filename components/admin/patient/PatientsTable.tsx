"use client"
import DataTable from "react-data-table-component";
import { Patient } from "@/interfaces/Patient";
import { useQuery } from "@apollo/client";
import { GET_ALL_PATIENTS_QUERY } from "@/components/apollo/queries";
import { CiCirclePlus, CiEdit, CiRead, CiTrash } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { encrypt } from "@/utils/cryptoUtils";
import Swal from "sweetalert2";

export default function PatientsTable() {
  const router = useRouter();
  const {
    loading: loadingPatients,
    error: errorPatients,
    data: dataPatients,
  } = useQuery(GET_ALL_PATIENTS_QUERY);

  const Patients = dataPatients?.getAllPatients;

  if (loadingPatients) return <p>Loading...</p>;
  if (errorPatients) return <p>Error: {errorPatients.message}</p>;

  const handleEditClick = (row: Patient) => {
    const encryptedRut = encrypt(row.rut);
    localStorage.setItem("patientRut", encryptedRut);
    router.push("/admin/patient/edit");
  };

  const handleDeactivateClick = (row: Patient) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Quieres desactivar al paciente con RUT ${row.rut}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, desactivar!'
    }).then((result) => {
      if (result.isConfirmed) {
        // Add your deactivation logic, such as calling an API to update the user's status
        Swal.fire(
          'Desactivado!',
          'El usuario ha sido desactivado.',
          'success'
        );
      }
    });
  };

  const handleShowAppointmentsClick = (row: Patient) => {
    const encryptedRut = encrypt(row.rut);
    localStorage.setItem("patientRut", encryptedRut);
    router.push("/admin/patient/appointments");
  };

  const handleBookAppointmentClick = (row: Patient) => {
    if(row.id){
      localStorage.setItem("patient_id", row.id.toString());
    }
    router.push("/admin/patient/bookAppointment");
  }

  const columns = [
    { name: "Rut", selector: (row: Patient) => row.rut, sortable: true },
    {
      name: "Nombre completo",
      selector: (row: Patient) => {
        let fullName = `${row.first_name}`;

        if (row.middle_name) {
          fullName += ` ${row.middle_name}`;
        }
        fullName += ` ${row.surname}`;
        if (row.second_surname) {
          fullName += ` ${row.second_surname}`;
        }
        return fullName;
      },
      sortable: true,
    },
    { name: "Región", selector: (row: Patient) => row.region, sortable: true },
    {
      name: "Comuna",
      selector: (row: Patient) => row.commune,
      sortable: true,
    },
    {
      name: "Dirección",
      selector: (row: Patient) => row.address,
      sortable: true,
    },
    { name: "Email", selector: (row: Patient) => row.email, sortable: true },
    { name: "Teléfono", selector: (row: Patient) => row.phone, sortable: true },
    { name: "Sexo", selector: (row: Patient) => row.sex, sortable: true },
    {
      name: "Editar",
      cell: (row: Patient) => (
        <CiEdit
          onClick={() => handleEditClick(row)}
          style={{ cursor: "pointer" }}
        />
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    {
      name: "Desactivar",
      cell: (row: Patient) => (
        <CiTrash
          onClick={() => handleDeactivateClick(row)}
          style={{ cursor: "pointer" }}
        />
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    {
      name: "Ver citas",
      cell: (row: Patient) => (
        <CiRead
          onClick={() => handleShowAppointmentsClick(row)}
          style={{ cursor: "pointer" }}
        />
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    {
      name: "Agendar cita",
      cell: (row: Patient) => (
        <CiCirclePlus
          onClick={() => handleBookAppointmentClick(row)}
          style={{ cursor: "pointer" }}
        />
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    }

  ];

  return (
    <div className="space-y-8 w-[1550px] ">
      <DataTable
        title="Lista de Pacientes"
        columns={columns}
        data={Patients}
        pagination
      />
    </div>
  );
}
