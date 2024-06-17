"use client";
import { GET_ALL_PATIENTS_QUERY } from "@/components/apollo/queries";
import { useQuery } from "@apollo/client";
import { Patient } from "@/interfaces/Patient";
import { useState } from "react";
import DataTable from "react-data-table-component";
import { select } from "@nextui-org/theme";

export default function MedicalRecordsTable() {
  //call endpoint to get all patients
  const {
    loading: loadingPatients,
    error: errorPatients,
    data: dataPatients,
  } = useQuery(GET_ALL_PATIENTS_QUERY);

  const patients = dataPatients?.getAllPatients;
  console.log(patients);
  const [selectedPatient, setSelectedPatient] = useState<number | undefined>(
    undefined
  );

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPatient(Number(event.target.value));
  };

  if (loadingPatients) return <p>Loading...</p>;
  if (errorPatients) return <p>Error: {errorPatients.message}</p>;

  const columns = [
    /*{ name: "Rut", selector: (row: Patient) => row.rut, sortable: true, width: "200px"},
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
    },*/
    {
      name: "Fecha",
      selector: (row: Patient) => row.medical_records.map(record => record.date_time).join(", "),
      sortable: true,
    },
    {
      name: "Diagnóstico",
      selector: (row: Patient) => row.medical_records.map(record => record.diagnosis).join(", "),
      sortable: true,
    },
    {
      name: "Prescripción",
      selector: (row: Patient) => row.medical_records.map(record => record.prescription).join(", "),
      sortable: true,
    }

  ];
  const filteredPatients = patients?.filter(
    (patient: Patient) => patient.id === selectedPatient
  );
  const selectedPatientData = patients?.find(
    (patient: Patient) => patient.id === selectedPatient
  );

  return (
    <div>
      <select value={selectedPatient} onChange={handleSelectChange}>
        <option value="">Seleccione un paciente</option>
        {patients?.map((patient: Patient) => (
          <option key={patient.id} value={patient.id?.toString()}>
            {patient.first_name} {patient.surname}
          </option>
        ))}
      </select>
      <div className="space-y-8 w-[1200px] ">
        <DataTable
          title={
            selectedPatientData
              ? `Historial Medico de : ${selectedPatientData.first_name} ${selectedPatientData.surname} ${selectedPatientData.rut}`
              : "Historial Medico:"
          }
          columns={columns}
          data={filteredPatients}
          pagination
        />
      </div>
    </div>
  );
}
