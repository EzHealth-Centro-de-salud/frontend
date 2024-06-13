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
    <div className="space-y-8 w-full flex flex-col items-center">
      <form
        action=""
        onSubmit={onsubmit}
        className="w-full max-w-lg bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            htmlFor="personnel-select"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Seleccione un profesional:
          </label>
          <select
            id="personnel-select"
            value={selectedId}
            onChange={handleChange}
            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Seleccione un profesional</option>
            {personnel &&
              personnel.map((person: Personnel) => (
                <option key={person.id} value={person.id}>
                  {person.first_name} {person.surname}{" "}
                  {person.second_surname}
                </option>
              ))}
          </select>
        </div>
        <div className="flex justify-center">
          <Button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Submit
          </Button>
        </div>
      </form>
      <table className="table-auto bg-white shadow-md rounded w-full max-w-lg">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Día</th>
            <th className="px-4 py-2">Mañana</th>
            <th className="px-4 py-2">Tarde</th>
          </tr>
        </thead>
        <tbody>
          {schedule.semana.map(({ dia, turno }) => (
            <tr key={dia} className="hover:bg-gray-100">
              <td className="border px-4 py-2">{dia}</td>
              {["mañana", "tarde"].map((period) => {
                const daySchedule = schedule.semana.find((d) => d.dia === dia);
                return (
                  <td key={period} className="border px-4 py-2 text-center">
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
