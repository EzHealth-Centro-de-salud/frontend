import { Appointment } from './Appointment';
import { MedicalRecord } from './MedicalRecords';
export interface Patient{
    id?: number
    rut: string;
    first_name: string;
    middle_name: string;
    surname: string;
    second_surname: string;
    birthdate: string;
    sex: string;
    address: string;
    region: string;
    commune: string;
    email: string;
    phone: string;
    appointments: Appointment[];
    medical_records: MedicalRecord[];
}