import { Appointment } from "./Appointment";
import { Branch } from "./Branch";
export interface Box {
    id: number;
    box: number;
    branch: Branch;
    appointments: Appointment[];
    is_active: boolean;
}