import { Branch } from "./Branch";

export interface Personnel {
  id? : string;
  rut: string;
  password: string;
  first_name: string;
  middle_name?: string;
  surname: string;
  second_surname?: string;
  email: string;
  role: string;
  speciality: string;
  id_branch?: number;
  branch: Branch;
}
