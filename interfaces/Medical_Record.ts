import { Appointment } from "./Appointment";
import { Patient } from "./Patient";
import { Personnel } from "./Personnel";

export interface MedicalRecord {
    id: number;
    diagnosis: string;
    prescription: string;
    date_time: string;
    patient: Patient;
    personnel: Personnel;
    appointment: Appointment;
  }