import { Box } from "./Box";
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
}