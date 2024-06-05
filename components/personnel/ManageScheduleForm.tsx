"use client";
import React, { useState } from "react";
import { GET_ALL_PERSONNEL_QUERY } from "../apollo/queries";
import { ASSIGN_AVAILABILITY_MUTATION } from "../apollo/mutations";
import { useQuery, useMutation } from "@apollo/client";
import { Button } from "@/components/ui/button";

interface Personnel {
  id: number;
  access_token?: string;
  recovery_code?: number;
  rut: string;
  password: string;
  first_name: string;
  middle_name?: string;
  surname: string;
  second_surname?: string;
  email: string;
  role: string;
  speciality: string;
  is_active: boolean;
}

export default function ManageScheduleForm() {
  const { loading, error, data } = useQuery(GET_ALL_PERSONNEL_QUERY);
  const [assignAvailability] = useMutation(ASSIGN_AVAILABILITY_MUTATION);
  const personnel = data?.getAllPersonnel;
  console.log(personnel);
  const [selectedId, setSelectedId] = useState("");
  const [schedule, setSchedule] = useState({
    semana: [
      { dia: "lunes", turno: "ninguno" },
      { dia: "martes", turno: "ninguno" },
      { dia: "miércoles", turno: "ninguno" },
      { dia: "jueves", turno: "ninguno" },
      { dia: "viernes", turno: "ninguno" },
    ],
  });
  type Day = "lunes" | "martes" | "miércoles" | "jueves" | "viernes";
  type Period = "mañana" | "tarde";
  type Availability = {
    day: Day;
    turn: Period;
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    setSelectedId(selectedId);

    // Find the selected personnel
    const selectedIdNumber = Number(selectedId);
    const selectedPersonnel = personnel.find(
      (person: Personnel) => person.id === selectedIdNumber
    );

    // Define the correct order of days
    const daysOrder: Day[] = [
      "lunes",
      "martes",
      "miércoles",
      "jueves",
      "viernes",
    ];

    // If the selected personnel is found and has availability
    if (selectedPersonnel && selectedPersonnel.availability) {
      // Create a new schedule in the correct order
      const newSchedule = daysOrder.map((day) => {
        // Find the availability for this day
        const avail = selectedPersonnel.availability.find(
          (a: Availability) => a.day === day
        );

        // If availability is found, return it, otherwise return 'ninguno'
        return {
          dia: day,
          turno: avail ? avail.turn : "ninguno",
        };
      });

      // Update the schedule state
      setSchedule({ semana: newSchedule });
    }
  };

  const handleCheckboxChange = (day: Day, period: Period) => {
    setSchedule((prevSchedule) => {
      const updatedWeek = prevSchedule.semana.map((d) => {
        if (d.dia === day) {
          if (d.turno === "ninguno") {
            return { ...d, turno: period };
          } else if (d.turno === period) {
            return { ...d, turno: "ninguno" };
          } else if (d.turno === "ambos") {
            return { ...d, turno: period === "mañana" ? "tarde" : "mañana" };
          } else {
            return { ...d, turno: "ambos" };
          }
        }
        return d;
      });

      return { semana: updatedWeek };
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const onsubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const scheduleJson = JSON.stringify(schedule);
    const selectedIdInt = parseInt(selectedId);
    try {
      const { data, errors } = await assignAvailability({
        variables: {
          input: {
            id_personnel: selectedIdInt,
            turns: scheduleJson,
          },
        },
      });
      console.log(data);
      if (data?.assignAvailability.success) {
        console.log("Schedule assigned successfully");
      } else {
        console.log("Error: ", errors);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="space-y-8 w-[800px] flex">
      <form action="" onSubmit={onsubmit} className="w-[400px]">
        <div>
          <select value={selectedId} onChange={handleChange}>
            <option value="">Seleccione un profesional</option>
            {personnel &&
              personnel.map((person: Personnel) => (
                <option key={person.id} value={person.id}>
                  {person.first_name} {person.surname} {person.second_surname}
                </option>
              ))}
          </select>
        </div>
        <Button type="submit" className="mt-40">
          Submit
        </Button>
      </form>
      <table className="ml-4">
        <thead>
          <tr>
            <th>Día</th>
            <th>mañana</th>
            <th>tarde</th>
          </tr>
        </thead>
        <tbody>
          {schedule.semana.map(({ dia, turno }) => (
            <tr key={dia}>
              <td>{dia}</td>
              {["mañana", "tarde"].map((period) => {
                const daySchedule = schedule.semana.find((d) => d.dia === dia);
                return (
                  <td key={period}>
                    <input
                      type="checkbox"
                      checked={
                        daySchedule
                          ? daySchedule.turno === period ||
                            daySchedule.turno === "ambos"
                          : false
                      }
                      onChange={() =>
                        handleCheckboxChange(dia as Day, period as Period)
                      }
                    />
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
//id
//turns
