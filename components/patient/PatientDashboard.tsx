"use client"
import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_PATIENT_QUERY } from '../apollo/queries';
import { Patient } from '@/interfaces/Patient';

export default function PatientDashboard() {
    const [patientId, setPatientId] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [totalAppointments, setTotalAppointments] = useState(0);
    const [totalCompletedAppointments, setTotalCompletedAppointments] = useState(0);
    const [totalPendingAppointments, setTotalPendingAppointments] = useState(0);
    const [totalConfirmedAppointments, setTotalConfirmedAppointments] = useState(0);
    const [totalCanceledAppointments, setTotalCanceledAppointments] = useState(0);
  
    useEffect(() => {
      const patient_id = localStorage.getItem("patient_id");
      if (patient_id) {
        setPatientId(parseInt(patient_id as string));
        setLoading(false);
      } else {
        setError(true);
        setLoading(false);
      }
    }, []);

    const { data, loading: loadingPatient, error: errorPatient } = useQuery(GET_PATIENT_QUERY, {
        variables: { id: patientId },
        skip: patientId === 0
    });

    useEffect(() => {
        if (data && data.getPatient) {
            const patient: Patient = data.getPatient;
            setTotalAppointments(patient.appointments.length);

            const completedAppointments = patient.appointments.filter(appointment => appointment.status === "Completada").length;
            setTotalCompletedAppointments(completedAppointments);

            const pendingAppointments = patient.appointments.filter(appointment => appointment.status === "Pendiente").length;
            setTotalPendingAppointments(pendingAppointments);

            const confirmedAppointments = patient.appointments.filter(appointment => appointment.status === "Confirmada").length;
            setTotalConfirmedAppointments(confirmedAppointments);

            const canceledAppointments = patient.appointments.filter(appointment => appointment.status === "Cancelada").length;
            setTotalCanceledAppointments(canceledAppointments);
        }
    }, [data]);

    if (loading || loadingPatient) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (error || errorPatient) {
        return <div className="flex justify-center items-center h-screen">Error: {error }</div>;
    }

    const patient: Patient = data.getPatient;
    
    let fullName = `${patient.first_name}`;
    if (patient.middle_name) {
      fullName += ` ${patient.middle_name}`;
    }
    fullName += ` ${patient.surname}`;
    if (patient.second_surname) {
      fullName += ` ${patient.second_surname}`;
    }

    return (
        <div className="p-8 bg-gray-100 h-[700px]">
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold text-center mb-6">Bienvenido, {fullName}</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-4 bg-bl-100 rounded-lg text-center shadow">
                        <h2 className="text-xl font-semibold">Citas Agendadas</h2>
                        <p className="text-2xl font-bold text-blue-">{totalAppointments}</p>
                    </div>
                    <div className="p-4 bg-purple-100 rounded-lg text-center shadow">
                        <h2 className="text-xl font-semibold">Citas Pendientes</h2>
                        <p className="text-2xl font-bold text-green-600">{totalPendingAppointments}</p>
                    </div>
                    <div className="p-4 bg-blue-100 rounded-lg text-center shadow">
                        <h2 className="text-xl font-semibold">Citas Confirmadas</h2>
                        <p className="text-2xl font-bold text-yellow-500">{totalConfirmedAppointments}</p>
                    </div>
                    <div className="p-4 bg-red-100 rounded-lg text-center shadow">
                        <h2 className="text-xl font-semibold">Citas Canceladas</h2>
                        <p className="text-2xl font-bold text-yellow-500">{totalCanceledAppointments}</p>
                    </div>
                    <div className="p-4 bg-green-100 rounded-lg text-center shadow">
                        <h2 className="text-xl font-semibold">Citas Completadas</h2>
                        <p className="text-2xl font-bold text-green-500">{totalCompletedAppointments}</p>
                    </div>
                </div>
                <div className="mt-8 p-4 bg-white rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4">Medicamentos Preescritos</h2>
                    <p className="text-gray-600">No hay medicamentos preescritos actualmente.</p>
                </div>
            </div>
        </div>
    );
}
