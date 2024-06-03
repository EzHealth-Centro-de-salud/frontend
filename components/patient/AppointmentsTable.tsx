'use client'
import DataTable from "react-data-table-component";
import { useQuery } from "@apollo/client";
import { GET_PATIENT_BY_RUT_QUERY } from "@/components/apollo/queries";
import { Patient } from "@/interfaces/Patient";
// appointments{date, time, type, status, box{box}, personnel{rut, first_name, surname, speciality, role}}
const columns = [
    {
    name: "Fecha",
    selector: (row: Patient['appointments'][number]) => row.date,
    sortable: true,
    },
    {
    name: "Hora",
    selector: (row: Patient['appointments'][number]) => row.time,
    sortable: true,
    },
    {
    name: "Tipo",
    selector: (row: Patient['appointments'][number]) => row.type,
    sortable: true,
    },
    {
    name: "Estado",
    selector: (row: Patient['appointments'][number]) => row.status,
    sortable: true,
    },
    { 
    name: "Box",
    selector: (row: Patient['appointments'][number]) => row.box.box,
    },
    {
    name: "Rut Profesional",
    selector: (row: Patient['appointments'][number]) => row.personnel.rut

    },
    {
    name: "Personal",
    selector: (row: Patient['appointments'][number]) => row.personnel.first_name + ' ' + row.personnel.surname,
    },
    {
    name: "Especialidad",
    selector: (row: Patient['appointments'][number]) => row.personnel.speciality,
    },
    {
    name: "Rol",
    selector: (row: Patient['appointments'][number]) => row.personnel.role,
    },
    
  
]
export default function AppointmentsTable() {
    let rut;
    if (typeof window !== 'undefined') {
        rut = window.localStorage.getItem('rut');
    }
    console.log("rut paciente: ", rut)
    const { data: patientData, loading: patientLoading, error: patientError } = useQuery(
        GET_PATIENT_BY_RUT_QUERY,
        {
          variables: 
            { 
                rut: rut
            }
        }
    );
    console.log("patientData:",patientData);
    if (patientLoading) return <p>Loading...</p>;
    if (patientError) return <p>Error :</p>;
    console.log("patientError:", patientError)
    return (
        <div className="space-y-8 w-[1000px] ">
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
    )
}