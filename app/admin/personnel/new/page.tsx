import PersonnelRegisterFormComponent from "@/components/auth/personnel/PersonnelRegisterForm";

export default function PersonnelRegisterPage() {
  return (
    <div className="min-h-full flex items-center justify-center bg-gray-100 py-10 pb-44 w-full ">
      <div className="bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Crea una cuenta de personal
        </h1>
        <PersonnelRegisterFormComponent />
      </div>
    </div>
  );
}
