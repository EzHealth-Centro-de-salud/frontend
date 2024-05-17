"use client";
import ChangePasswordPatientForm from "@/components/auth/ChangePasswordPatientForm";

export default function ChangePasswordPatientPage() {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-stone-400">
      <div className="shadow-xl px-8 pb-8 pt-12 bg-white rounded-xl space-y-12">
        <h3 className="font-semibold text-2xl ">
          Ingrese la nueva contraseña{" "}
        </h3>
        <ChangePasswordPatientForm />
      </div>
    </div>
  );
}