import { Button } from "@/components/ui/button"

export default function ProfileInfoCard({ userName, name, role }: { userName: string, name: string, role: string}) {
    return (
        <article className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-lg">
            <header className="flex items-center justify-center">
                {userName && (
                    <img
                        src={ `https://unavatar.io/${userName}`}
                        alt="Profile Picture"
                        className="w-24 h-24 rounded-full"/>
                )}
                <div className="ml-4">
                    <strong>{name} </strong>
                    <span>@{userName}</span>
                    <strong>{role}</strong>
                </div>    
            </header>
            <aside>
                <button>
                    Edit profile
                </button>
            </aside>    
        </article>
      )
}