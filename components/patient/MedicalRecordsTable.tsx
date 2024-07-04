"use client";
import { GET_PATIENT_BY_RUT_QUERY } from "@/components/apollo/queries";
import { useQuery } from "@apollo/client";
import { Patient } from "@/interfaces/Patient";
import { useState } from "react";
import DataTable from "react-data-table-component";
import { select } from "@nextui-org/theme";

export default function MedicalRecordsTable() {
  //call endpoint to get patientbyrut
  let rut;
  if (typeof window !== "undefined") {
    rut = window.localStorage.getItem("rut");
  }
  const {
    loading: loadingPatient,
    error: errorPatient,
    data: dataPatient,
  } = useQuery(GET_PATIENT_BY_RUT_QUERY, {
    variables: {
      rut: rut,
    },
  });

  const patient = dataPatient?.getPatientByRut;

  if (loadingPatient) return <p>Loading...</p>;
  if (errorPatient) return <p>Error: {errorPatient.message}</p>;

  const columns = [
    {
      name: "Fecha",
      selector: (row: Patient["medical_records"][number]) => {
        const date = new Date(row.date_time);
        return date.toLocaleDateString(); // Formato predeterminado basado en la configuración regional
      },
      sortable: true,
      width: "150px",
    },
    {
      name: "Diagnóstico",
      selector: (row: Patient["medical_records"][number]) => row.diagnosis,
      sortable: true,
    },
    {
      name: "Prescripción",
      selector: (row: Patient["medical_records"][number]) => row.prescription,
      sortable: true,
    },
  ];

  return (
    <div>
      <div className="space-y-8 w-[1200px] ">
        <DataTable
          title={
            patient ? `Detalle de mi historial médico` : "Historial Medico:"
          }
          columns={columns}
          data={patient.medical_records}
          pagination
        />
      </div>
    </div>
  );
}
