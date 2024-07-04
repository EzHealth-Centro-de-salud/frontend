"use client";
import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_PERSONNEL_QUERY } from "../apollo/queries";
import { Personnel } from "@/interfaces/Personnel";

export default function PersonnelDashboard() {
  const [personnelRut, setPersonnelRut] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [totalAppointments, setTotalAppointments] = useState(0);
  const [totalCompletedAppointments, setTotalCompletedAppointments] =
    useState(0);
  const [totalPendingAppointments, setTotalPendingAppointments] = useState(0);
  const [totalConfirmedAppointments, setTotalConfirmedAppointments] =
    useState(0);
  const [totalCanceledAppointments, setTotalCanceledAppointments] = useState(0);

  useEffect(() => {
    const personnelRut = localStorage.getItem("rut");
    if (personnelRut) {
      setPersonnelRut(personnelRut);
      setLoading(false);
    } else {
      setError(true);
      setLoading(false);
    }
  }, []);

  console.log(personnelRut);
  const {
    data,
    loading: loadingPersonnel,
    error: errorPersonnel,
  } = useQuery(GET_PERSONNEL_QUERY, {
    variables: { rut: personnelRut },
    skip: !personnelRut,
  });

  useEffect(() => {
    if (data && data.getPersonnelByRut) {
      const personnel: Personnel = data.getPersonnelByRut;
      setTotalAppointments(personnel.appointments.length);

      const completedAppointments = personnel.appointments.filter(
        (appointment) => appointment.status === "Completada"
      ).length;
      setTotalCompletedAppointments(completedAppointments);

      const pendingAppointments = personnel.appointments.filter(
        (appointment) => appointment.status === "Pendiente"
      ).length;
      setTotalPendingAppointments(pendingAppointments);

      const confirmedAppointments = personnel.appointments.filter(
        (appointment) => appointment.status === "Confirmada"
      ).length;
      setTotalConfirmedAppointments(confirmedAppointments);

      const canceledAppointments = personnel.appointments.filter(
        (appointment) => appointment.status === "Cancelada"
      ).length;
      setTotalCanceledAppointments(canceledAppointments);
    }
  }, [data]);

  if (loading || loadingPersonnel) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (error || errorPersonnel) {
    return (
      <div className="flex justify-center items-center h-screen">
        Error: {error}
      </div>
    );
  }

  const personnel: Personnel = data.getPersonnelByRut;

  let fullName = `${personnel.first_name}`;
  if (personnel.middle_name) {
    fullName += ` ${personnel.middle_name}`;
  }
  fullName += ` ${personnel.surname}`;
  if (personnel.second_surname) {
    fullName += ` ${personnel.second_surname}`;
  }

  return (
    <div className="p-8 bg-gray-100 h-[700px]">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-6">
          Bienvenido, {fullName}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-bl-100 rounded-lg text-center shadow">
            <h2 className="text-xl font-semibold">Citas Agendadas</h2>
            <p className="text-2xl font-bold text-blue-">{totalAppointments}</p>
          </div>
          <div className="p-4 bg-purple-100 rounded-lg text-center shadow">
            <h2 className="text-xl font-semibold">Citas Pendientes</h2>
            <p className="text-2xl font-bold text-green-600">
              {totalPendingAppointments}
            </p>
          </div>
          <div className="p-4 bg-blue-100 rounded-lg text-center shadow">
            <h2 className="text-xl font-semibold">Citas Confirmadas</h2>
            <p className="text-2xl font-bold text-yellow-500">
              {totalConfirmedAppointments}
            </p>
          </div>
          <div className="p-4 bg-red-100 rounded-lg text-center shadow">
            <h2 className="text-xl font-semibold">Citas Canceladas</h2>
            <p className="text-2xl font-bold text-yellow-500">
              {totalCanceledAppointments}
            </p>
          </div>
          <div className="p-4 bg-green-100 rounded-lg text-center shadow">
            <h2 className="text-xl font-semibold">Citas Completadas</h2>
            <p className="text-2xl font-bold text-green-500">
              {totalCompletedAppointments}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
