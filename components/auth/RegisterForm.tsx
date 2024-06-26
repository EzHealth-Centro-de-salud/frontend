'use client'
import { ApolloClient, InMemoryCache, useMutation, ApolloProvider } from "@apollo/client";
import { httpLink } from "@/components/apollo/ApolloConfig";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { REGISTER_PATIENT_MUTATION } from "../apollo/mutations";

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
});

function RegisterForm() {
    const [rut, setRut] = useState('');
    const [password, setPassword] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [first_name, setFirst_name] = useState('');
    const [middle_name, setMiddle_name] = useState('');
    const [surname, setSurname] = useState('');
    const [second_surname, setSecond_surname] = useState('')
    const [sex, setSex] = useState('');
    const [address, setAddress] = useState('');
    const [region, setRegion] = useState('');
    const [commune, setCommune] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [registerPatient] = useMutation(REGISTER_PATIENT_MUTATION, {
        client,
    })
    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();//evita que se refresque la pagina al enviar el formulario

        const { data, errors } = await registerPatient({
            variables: {
                CreatePatientInput: {
                    rut, password, birthdate, first_name,
                    middle_name, surname, second_surname,
                    sex, address, region, commune, email, phone


                }
            }
        });
        console.log(data)
        if (data?.createPatient.success) {
            window.alert('Usuario creado')
            history.back();
        } else {
            window.alert('Error al crear usuario')
        }

    }

    return (
        <div className="space-y-8 w-[400px] ">
            <form onSubmit={onSubmit} className="space-y-8 ">
                <div className="grid w-full items-center gap-1.5">
                    <Label className="text-white" htmlFor="rut">RUT</Label>
                    <Input
                        className="bg-[#26313c] text-white"
                        required
                        value={rut}
                        onChange={(e) => setRut(e.target.value)}
                        id="rut"
                        type="text"
                        maxLength={12}
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="grid w-full items-center gap-1.5">
                        <Label className="text-white" htmlFor="first_name">Primer Nombre</Label>
                        <Input
                            className="bg-[#26313c] text-white"
                            required
                            value={first_name}
                            onChange={(e) => setFirst_name(e.target.value)}
                            id="first_name"
                            type="text"
                            maxLength={50}
                        />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                        <Label className="text-white" htmlFor="middle_name">Segundo Nombre</Label>
                        <Input
                            className="bg-[#26313c] text-white"
                            value={middle_name}
                            onChange={(e) => setMiddle_name(e.target.value)}
                            id="middle_name"
                            type="text"
                            maxLength={50}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="grid w-full items-center gap-1.5">
                        <Label className="text-white" htmlFor="surname">Apellido Paterno</Label>
                        <Input
                            className="bg-[#26313c] text-white"
                            required
                            value={surname}
                            onChange={(e) => setSurname(e.target.value)}
                            id="surname"
                            type="text"
                            maxLength={50}
                        />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                        <Label className="text-white" htmlFor="second_surname">Apellido Materno</Label>
                        <Input
                            className="bg-[#26313c] text-white"
                            required
                            value={second_surname}
                            onChange={(e) => setSecond_surname(e.target.value)}
                            id="second_surname"
                            type="text"
                            maxLength={50}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="grid w-full items-center gap-1.5">
                        <Label className="text-white" htmlFor="email">Email</Label>
                        <Input
                            className="bg-[#26313c] text-white"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            id="email"
                            type="email"
                            maxLength={254}
                        />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                        <Label className="text-white" htmlFor="password">Contraseña</Label>
                        <Input
                            className="bg-[#26313c] text-white"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            id="password"
                            type="password"
                            maxLength={128}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="grid w-full items-center gap-1.5">
                        <Label className="text-white" htmlFor="birthdate">Fecha de Nacimiento</Label>
                        <Input
                            className="bg-[#26313c] text-white"
                            required
                            value={birthdate}
                            onChange={(e) => setBirthdate(e.target.value)}
                            id="birthdate"
                            type="date"
                        />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                        <Label className="text-white" htmlFor="sex">Sexo</Label>
                        <select
                            className="bg-[#26313c] text-white"
                            required
                            value={sex}
                            onChange={(e) => setSex(e.target.value)}
                            id="sex"
                        >
                            <option value="">Seleccione...</option>
                            <option value="femenino">Femenino</option>
                            <option value="masculino">Masculino</option>
                            <option value="masculino">Tanque Panzer</option>
                        </select>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="grid w-full items-center gap-1.5">
                        <Label className="text-white" htmlFor="address">Dirección</Label>
                        <Input
                            className="bg-[#26313c] text-white"
                            required
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            id="address"
                            type="text"
                            maxLength={100}
                        />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                        <Label className="text-white" htmlFor="region">Región</Label>
                        <select
                            className="bg-[#26313c] text-white"
                            required
                            value={region}
                            onChange={(e) => setRegion(e.target.value)}
                            id="region"
                        >
                            <option value="">Seleccione...</option>
                            <option value="Arica y Parinacota">Arica y Parinacota</option> <option value="Tarapacá">Tarapacá</option> <option value="Antofagasta">Antofagasta</option> <option value="Atacama">Atacama</option> <option value="Coquimbo">Coquimbo</option> <option value="Valparaíso">Valparaíso</option> <option value="Metropolitana de Santiago">Metropolitana</option> <option value="Libertador General Bernardo O'Higgins">Lib. Bernardo O'Higgins</option> <option value="Maule">Maule</option> <option value="Ñuble">Ñuble</option> <option value="Biobío">Biobío</option> <option value="La Araucanía">La Araucanía</option> <option value="Los Ríos">Los Ríos</option> <option value="Los Lagos">Los Lagos</option> <option value="Aysén del General Carlos Ibáñez del Campo">Aysén</option> <option value="Magallanes y de la Antártica Chilena">Magallanes</option>
                        </select>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="grid w-full items-center gap-1.5">
                        <Label className="text-white" htmlFor="commune">Comuna</Label>
                        <Input
                            className="bg-[#26313c] text-white"
                            required
                            value={commune}
                            onChange={(e) => setCommune(e.target.value)}
                            id="commune"
                            type="text"
                            maxLength={60}
                        />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                        <Label className="text-white" htmlFor="phone">Teléfono</Label>
                        <Input
                            className="bg-[#26313c] text-white"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            id="phone"
                            type="text"
                            maxLength={9}
                        />
                    </div>
                </div>
                <div className="w-full">
                    <Button type="submit" className="w-full" size="lg">
                        Registrarse
                    </Button>
                </div>
            </form>
        </div>
    )

}
const RegisterFormComponent = () => (
    <ApolloProvider client={client}>
        <RegisterForm />
    </ApolloProvider>
)
RegisterFormComponent.displayName = 'RegisterFormComponent';
export default RegisterFormComponent;