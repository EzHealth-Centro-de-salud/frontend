import Link from 'next/link'

export default function HomePage() {
  return (
    <div className=" bg-[#16202a] flex items-center justify-center h-screen">
      <div className=" text-center p-4">
        <h1 className="text-6xl font-bold text-white mb-4">Bienvenido</h1>
        <p className="text-2xl text-white">Disfruta de nuestra plataforma</p>
        <div className='text-2xl text-white mt-6'>
          <Link href="/auth/login  ">
            <h1>Login </h1>
          </Link>
          <Link href="/auth/personnelLogin  ">
            <h1>Personnel Login </h1>
          </Link>
        </div>
      </div>
      
    </div>
  )
}