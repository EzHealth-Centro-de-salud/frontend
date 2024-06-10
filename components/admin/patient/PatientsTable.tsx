"use client"
import DataTable from "react-data-table-component";
import { Patient } from "@/interfaces/Patient";
import { useQuery } from "@apollo/client";
import { GET_ALL_PATIENTS_QUERY } from "@/components/apollo/queries";
import { CiEdit } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { encrypt } from "@/utils/cryptoUtils";

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
  ];

  return (
    <div className="space-y-8 w-[1400px] ">
      <DataTable
        title="Lista de Pacientes"
        columns={columns}
        data={Patients}
        pagination
      />
    </div>
  );
}
