import PersonnelLoginForm from "@/components/auth/personnel/PersonnelLoginForm";
import Image from "next/image";

export default function PersonnelLoginPage() {
  return (
    <div className="h-screen flex">
      <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
        <div className="hidden lg:block">
          <Image
            alt="Image"
            className="h-full w-full object-cover"
            height="1080"
            src="/loginPersonnel.jpg"
            style={{
              aspectRatio: "1920/1080",
              objectFit: "cover",
            }}
            width="1920"
          />
        </div>
        <div className="flex flex-col">
          <PersonnelLoginForm />
        </div>
      </div>
    </div>
  );
}
