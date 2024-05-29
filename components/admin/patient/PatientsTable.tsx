"use client"
import DataTable from "react-data-table-component";
import { Patient } from "@/interfaces/Patient";
import { useQuery } from "@apollo/client";
import { GET_ALL_PATIENTS_QUERY } from "@/components/apollo/queries";


const columns = [
  { name: "Rut", selector: (row: Patient) => row.rut, sortable: true },
  { name: "Full name", selector: (row: Patient) => row.first_name + " " + row.middle_name+ " " + row.surname+ " " + row.second_surname, sortable: true },
  //{ name: "First Name", selector: (row: Patient) => row.first_name, sortable: true },
  //{ name: "Middle Name", selector: (row: Patient) => row.middle_name, sortable: true },
  //{ name: "Surname", selector: (row: Patient) => row.surname, sortable: true },
  //{ name: "Second Surname", selector: (row: Patient) => row.second_surname, sortable: true },
  { name: "Region" , selector: (row: Patient) => row.region, sortable: true },
  { name: "Commune" , selector: (row: Patient) => row.commune, sortable: true },
  { name: "Address" , selector: (row: Patient) => row.address, sortable: true },
  { name: "Email" , selector: (row: Patient) => row.email, sortable: true },
  { name: "Phone" , selector: (row: Patient) => row.phone, sortable: true },
  { name: "Sex", selector: (row: Patient) => row.sex, sortable: true}
  
];

export default function PatientsTable() {
  const {
    loading: loadingPatients,
    error: errorPatients,
    data: dataPatients,
  } = useQuery(GET_ALL_PATIENTS_QUERY);

  const Patients = dataPatients?.getAllPatients;

  if (loadingPatients) return <p>Loading...</p>;
  if (errorPatients) return <p>Error: {errorPatients.message}</p>;

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