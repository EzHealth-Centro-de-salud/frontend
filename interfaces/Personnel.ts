import { Branch } from "./Branch";
import { Appointment } from "./Appointment";

export interface Personnel {
  id : number;
  rut: string;
  password: string;
  first_name: string;
  middle_name: string;
  surname: string;
  second_surname?: string;
  email: string;
  role: string;
  speciality: string;
  id_branch?: number;
  branch: Branch;
  is_active: boolean;
  appointments: Appointment[];
}
