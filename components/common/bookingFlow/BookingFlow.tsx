"use client";
import {
  GET_ALL_BRANCHES_QUERY,
  GET_ALL_BRANCHES_WITH_PERSONNEL_QUERY,  
  GET_ALL_PERSONNEL_QUERY,
} from "@/components/apollo/queries";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import LoadingButton from "@/components/ui/loadingButton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import { Personnel } from "@/interfaces/Personnel";
//import { Branch } from "@/interfaces/Branch";
import {
  Autocomplete,
  AutocompleteItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { Input } from "@/components/ui/input";

interface Branch {
  id: number;
  address: string;
}

export default function BookingFlow() {
  const [branch, setBranch] = useState("");
  const [branchAddress, setBranchAddress] = useState("");
  const [medicId, setMedicId] = useState<string | null>(null);
  const [medicFullName, setMedicFullName] = useState("");
  const [medicSpeciality, setMedicSpeciality] = useState("");
  const [date, setDate] = useState("");
  const [view, setView] = useState("branchSelection");
  const [showTooltip, setShowTooltip] = useState(false);
  const [timetableView, setTimetableView] = useState(false);


  const medicAvailability = [
    "09:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
  ];
  const [selectedTime, setSelectedTime] = useState("");

  //Branches
  const {
    loading: loadingBranches,
    error: errorBranches,
    data: dataBranches,
  } = useQuery(GET_ALL_BRANCHES_WITH_PERSONNEL_QUERY);

  const {
    loading: loadingPersonnel,
    error: errorPersonnel,
    data: dataPersonnel,
  } = useQuery(GET_ALL_PERSONNEL_QUERY);

  if (loadingBranches || loadingPersonnel) return <p>Loading...</p>;
  if (errorBranches || errorPersonnel) return <p>Error :(</p>;

  const branches: Branch[] = dataBranches.getAllBranches;

  const personnel: Personnel[] = dataPersonnel.getAllPersonnel;

 //Personnel for the selected branch
  const personnelForBranch = personnel.filter((personnel) => {
    return personnel.branch.id === parseInt(branch);
  });

  const handleContinueFromBranchSelection = () => {
    if (!branch) {
      setShowTooltip(true);
    } else {
      setShowTooltip(false);
      setView("medicSelection");
    }
  };

  const handleBackToMedicSelection = () => {
    setDate("");
    setTimetableView(false);
    setView("medicSelection");
  };

  const handleContinueFromMedicSelection = () => {
    if (!medicId) {
      setShowTooltip(true);
    } else {
      setShowTooltip(false);
      setView("datePicking");
    }
  };

  const handleContinueFromDatePicking = () => {
    if (!date) {
      setShowTooltip(true);
    } else {
      setShowTooltip(false);
      setTimetableView(true);
    }
  };

  const handleBackToSelection = () => {
    setBranch("");
    setMedicId(null);
    setView("branchSelection");
  };

  const handleBackToDatePicking = () => {
    setView("datePicking");
  };

  const handleSetMedicId = (key: any) => {
    setMedicId(key as string); // Ensure the key is treated as a string
  };

  const handleContinueFromTimeSelection = () => {
    getMedicDetails(medicId as string);
    setView("Details");
  };

  const getMedicDetails = (medicId: string) => {
    const medic = personnel.find((personnel) => personnel.id === parseInt(medicId));
    if (medic) {
      setMedicFullName(medic.first_name + " " + medic.middle_name + " " + medic.surname + " " + medic.second_surname);
      setMedicSpeciality(medic.speciality);
    }
  }

  const getBranchAddress= (branchId: string) => {
    const branch = branches.find((branch) => branch.id === parseInt(branchId));
    if (branch) {
      setBranchAddress(branch.address);
    }
  }
  

  return (
    <div>
      {view === "branchSelection" && (
        <div className="w-[550px]">
          <Label className="text-[#26313c] mb-5">Sucursal</Label>
          <div>
            <Select onValueChange={(value) => setBranch(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecciona una sucursal" />
              </SelectTrigger>
              <SelectContent>
                {branches.map((branch: Branch) => (
                  <SelectItem value={branch.id.toString()} key={branch.id}>
                    {branch.address}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {showTooltip && (
              <p className="text-red-500 mt-2">
                Por favor selecciona una sucursal
              </p>
            )}
            <div className="flex justify-center pt-3">
              <Button
                className="w-[400px]"
                onClick={handleContinueFromBranchSelection}
              >
                Continuar
              </Button>
            </div>
          </div>
        </div>
      )}

      {view === "medicSelection" && (
        <div className="w-[550px]">
          <div className="flex w-full flex-wrap  ">
            <Autocomplete
              label="Busca por un médico o especialidad"
              placeholder="Escribe o despliega"
              className="max-w-[550px] "
              selectedKey={medicId}
              onSelectionChange={handleSetMedicId}
            >
              {personnelForBranch.map((item) => (
                <AutocompleteItem
                  key={item.id.toString()}
                  value={item.id.toString()}
                >
                  {item.first_name +
                    " " +
                    item.surname +
                    " | " +
                    item.speciality}
                </AutocompleteItem>
              ))}
            </Autocomplete>
            {showTooltip && (
              <p className="text-red-500 mt-2">
                Por favor selecciona un médico o especialidad
              </p>
            )}
          </div>
          <div className="flex justify-center pt-3">
            <Button className="w-[100px] mr-5 " onClick={handleBackToSelection}>
              Volver
            </Button>
            <Button
              className="w-[400px]"
              onClick={handleContinueFromMedicSelection}
            >
              Continuar
            </Button>
          </div>
        </div>
      )}
      {view === "datePicking" && (
        <div>
          <div className="w-[550px] justify-center pb-5">
            <Label className="text-[#26313c] mb-5">Seleccionar Fecha</Label>
            <Input
              className=" text-[#26313c]"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              id="birthdate"
              type="date"
            />
            <div className="flex justify-center pt-3">
              <Button
                className="w-[100px] mr-5 "
                onClick={handleBackToMedicSelection}
              >
                Volver
              </Button>
              <Button
                className="w-[400px]"
                onClick={handleContinueFromDatePicking}
              >
                Buscar por esta fecha
              </Button>
            </div>
          </div>
          {timetableView && (
            <div className="w-[550px] justify-center pb-5">
              <Label className="text-[#26313c] mb-5">
                Selecciona uno de los horarios disponibles con este médico
              </Label>
              <div>
                <Select onValueChange={(value) => setSelectedTime(value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecciona el horario que necesites" />
                  </SelectTrigger>
                  <SelectContent>
                    {medicAvailability.map((time) => (
                      <SelectItem value={time} key={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-center pt-3">
                <Button
                  className="w-[400px]"
                  onClick={handleContinueFromTimeSelection}
                >
                  Agendar Cita Médica
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
      {view === "Details" && (
        //show details before confirming
        <div className="w-[550px] justify-center pb-5">
          <Label className="text-[#26313c] mb-5 flex align-middle justify-center">
            Por favor confirma los detalles de tu cita médica
          </Label>
          <Table aria-label="Example static collection table">
            <TableHeader>
              <TableColumn>Nombre Médico</TableColumn>
              <TableColumn>Especialidad</TableColumn>
              <TableColumn>Fecha</TableColumn>
              <TableColumn>Hora</TableColumn>
            </TableHeader>
            <TableBody>
              <TableRow key="1">
                <TableCell>{medicFullName}</TableCell>
                <TableCell>{medicSpeciality}</TableCell>
                <TableCell>{date}</TableCell>
                <TableCell>{selectedTime}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div className="flex justify-center pt-3">
            <Button
              className="w-[100px] mr-5 "
              onClick={handleBackToDatePicking}
            >
              Volver
            </Button>
            <LoadingButton
              title="Agendar Cita"
              loadingTitle="Agendando..."
              isLoading={loadingBranches}
              styling="w-[400px]"
            />
          </div>
        </div>
      )}
    </div>
  );
}
