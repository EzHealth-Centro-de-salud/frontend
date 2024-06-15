'use client'
import React, { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import { decrypt } from '@/utils/cryptoUtils';
import PatientAppointments from '@/components/admin/patient/PatientAppointments';
import BookAppointmentFlow from "@/components/admin/patient/BookAppointmentFlow";

const Page = () => {
  const [patientRut, setPatientRut] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const localStoragePatientId= localStorage.getItem("patient_id");
    if (localStoragePatientId != "") {
      setLoading(false);
    } else {
      setError(true);
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="mr-2 h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>No hay un rut definido para agendar una cita.</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-8 w-full">
      <div className="bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Agendar cita para el paciente
        </h1>
        <BookAppointmentFlow />
      </div>
    </div>
  );
};

export default Page;