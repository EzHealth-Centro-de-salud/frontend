import RegisterFormComponent from "@/components/auth/RegisterForm";

export default function PersonnelRegisterPage() {
  return (
    <div className="min-h-full flex items-center justify-center bg-gray-100 py-12 w-full">
      <div className="bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Crea una cuenta
        </h1>
        <RegisterFormComponent />
        <div className="text-center mt-3">
          <p className="text-[#26313c]">
            ¿Ya tienes una cuenta?{" "}
            <a
              className="text-indigo-500 hover:underline"
              href="/auth/login"
            >
              Inicia sesión
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
