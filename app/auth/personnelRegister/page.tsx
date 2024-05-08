import PersonnelRegisterFormComponent from "@/components/auth/personnel/PersonnelRegisterForm"

export default function PersonnelRegisterPage() {
    return (
        <div className="h-screen w-screen flex justify-center items-center bg-[#26313c]">
            <div className="shadow-xl px-8 pb-8 pt-12 bg-[#16202a] rounded-xl space-y-12">
                <h1 className="font-semibold text-2xl text-white ">Crea una cuenta de personal</h1>
                <PersonnelRegisterFormComponent />
                <div className="text-center">
                    <p className="text-white">¿Ya tienes una cuenta? <a className="text-indigo-500 hover:underline" href="/auth/personnelLogin">Inicia sesión</a></p>
                </div>
            </div>
        </div>
    )
}