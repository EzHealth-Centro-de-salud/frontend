import ProfileInfoCard from "@/components/common/ProfileInfoCard"
export default function AdminDashboardPage() {
    return (
        <div className="flex">
            <main className="flex-1">
                <ProfileInfoCard userName="johndoe" name="John Doe" role="Administrador" />
                
            </main>
        </div>
    )
}