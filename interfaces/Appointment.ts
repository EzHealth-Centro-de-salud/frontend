import { Box } from "./Box";
import { MedicalRecord } from "./Medical_Record";
import { Patient } from "./Patient";
import { Personnel } from "./Personnel";
export interface Appointment {
    id: number;
    date: string;
    time: string;
    type: string;
    status: string;
    box: Box;
    patient: Patient;
    personnel: Personnel;
    medical_record?: MedicalRecord;
}