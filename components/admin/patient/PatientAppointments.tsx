"use client";
import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { useQuery } from "@apollo/client";
import { GET_PATIENT_BY_RUT_QUERY } from "@/components/apollo/queries";
import { Patient } from "@/interfaces/Patient";

const columns = [
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
    selector: (row: Patient["appointments"][number]) => row.box.branch.address,
  },
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
];

export default function PatientAppointments({ rut }: { rut: string }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  
  const {
    data: patientData,
    loading: patientLoading,
    error: patientError,
  } = useQuery(GET_PATIENT_BY_RUT_QUERY, {
    variables: {
      rut: rut,
    },
  });

  if (patientLoading) return <p>Loading...</p>;
  if (patientError) return <p>Error :</p>;

  const filteredAppointments = patientData?.getPatientByRut.appointments.filter(
    (appointment: Patient["appointments"][number]) =>
      (appointment.personnel.first_name
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      appointment.personnel.surname
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      appointment.personnel.rut
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      appointment.box.branch.address
        .toLowerCase()
        .includes(searchQuery.toLowerCase())) &&
      (statusFilter === "" || appointment.status.toLowerCase() === statusFilter) &&
      (typeFilter === "" || appointment.type.toLowerCase() === typeFilter)
  );

  return (
    <div className="space-y-8 w-[1200px]">
      <div className="flex space-x-4">
        <input
          type="text"
          placeholder="Buscar..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="">Todos</option>
          <option value="pendiente">Pendiente</option>
          <option value="aceptada">Aceptada</option>
          <option value="cancelada">Cancelada</option>
          <option value="reprogramada">Reprogramada</option>
        </select>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="">Todos</option>
          <option value="control">Control</option>
          <option value="procedimiento">Procedimiento</option>
          <option value="consulta">Consulta</option>
        </select>
      </div>
      {patientData?.getPatientByRut.appointments ? (
        <DataTable
          title={
            "Citas del paciente: " +
            patientData.getPatientByRut.first_name +
            " " +
            patientData.getPatientByRut.surname +
            " | Rut: " +
            patientData.getPatientByRut.rut
          }
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