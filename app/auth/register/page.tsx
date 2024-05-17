import RegisterFormComponent from "@/components/auth/RegisterForm";

export default function PersonnelRegisterPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#26313c]">
      <div className="w-full max-w-md shadow-xl mt-10    px-8 pb-8 pt-12 bg-[#16202a] rounded-xl space-y-12">
        <h1 className="font-semibold text-2xl text-white mb-6">
          Crea una cuenta
        </h1>
        <RegisterFormComponent />
        <div className="text-center text-white">
          <p>
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
