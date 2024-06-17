"use client";
import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { useQuery } from "@apollo/client";
import { GET_PATIENT_BY_RUT_QUERY } from "@/components/apollo/queries";
import { Patient } from "@/interfaces/Patient";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

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
  (appointment: Patient["appointments"][number]) => {
    const searchTerm = searchQuery.toLowerCase().trim();
    const searchTerms = searchTerm.split(' ');

    return searchTerms.every(term =>
      (appointment.personnel.first_name.toLowerCase().includes(term) ||
      appointment.personnel.surname.toLowerCase().includes(term) ||
      appointment.personnel.rut.toLowerCase().includes(term) ||
      appointment.box.branch.address.toLowerCase().includes(term)) &&
      
      (statusFilter === "" || statusFilter === "Todos" || appointment.status.toLowerCase() === statusFilter) &&
      (typeFilter === "" || typeFilter === "Todos" || appointment.type.toLowerCase() === typeFilter)
    );
  }
);

  return (
    <div className="space-y-8 w-[1200px]">
      <div className="flex space-x-4">
        <div>
        <Label>Buscar por nombre de personal, RUT o Sucursal</Label>
        <Input
          type="text"
          placeholder="Buscar..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border border-gray-300 rounded w-[500px]"
        />
        </div>
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
            <SelectItem value="cancelada">Cancelada</SelectItem>
            <SelectItem value="reprogramada">Reprogramada</SelectItem>
          </SelectContent>
        </Select>
        </div>

        <div className="w-[400]px">
        <Label>Filtrar por tipo</Label>
        <Select onValueChange={(value) => setTypeFilter(value)}>
          <SelectTrigger className="w-[300px]">
            <SelectValue placeholder="Filtrar por tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Todos">Todos</SelectItem>
            <SelectItem value="control">Control</SelectItem>
            <SelectItem value="procedimiento">Procedimiento</SelectItem>
            <SelectItem value="consulta">Consulta</SelectItem>
          </SelectContent>
        </Select>
        </div>

        {/* <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="">Todos</option>
          <option value="pendiente">Pendiente</option>
          <option value="confirmada">Confirmada</option>
          <option value="cancelada">Cancelada</option>
          <option value="reprogramada">Reprogramada</option>
        </select> */}
        
        {/* <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="">Todos</option>
          <option value="control">Control</option>
          <option value="procedimiento">Procedimiento</option>
          <option value="consulta">Consulta</option>
        </select> */}
        

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