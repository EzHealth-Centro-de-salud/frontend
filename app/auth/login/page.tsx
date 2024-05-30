import LoginForm from "@/components/auth/LoginForm";
import Image from "next/image";

export default function PersonnelLoginPage() {
  return (
    <div className="h-full flex">
      <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
        <div className="hidden lg:block">
          <Image
            alt="Image"
            className="h-full w-full"
            height="1080"
            src="/patientLogin.jpg"
            style={{
              aspectRatio: "1920/1080",
              objectFit: "cover",
              objectPosition: "0 30%",
            }}
            width="1920"
          />
        </div>
        <div className="flex flex-col">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
