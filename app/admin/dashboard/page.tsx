import ProfileInfoCard from "@/components/common/ProfileInfoCard"
import TripleCard from "@/components/common/TripleCard"
export default function AdminDashboardPage() {
    return (
        <div className="flex">
            <main className="flex-1">
                <ProfileInfoCard userName="johndoe" name="John Doe" role="Administrador" />
                <TripleCard />
            </main>
        </div>
    )
}