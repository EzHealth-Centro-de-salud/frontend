"use client";
import { CHECK_SCHEDULE_ADMIN_QUERY } from "@/components/apollo/queries";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { useQuery } from "@apollo/client";
import { useState } from "react";
import { DatePicker, DateValue } from "@nextui-org/react";
import { today, isWeekend, getLocalTimeZone } from "@internationalized/date";
import { useLocale } from "@react-aria/i18n";

interface EditFormProps {
  personnelId: string;
}

export default function PersonnelAvailability({ personnelId }: EditFormProps) {
  const [date, setDate] = useState("");
  const [timetableView, setTimetableView] = useState(false);
  const [medicAvailability, setMedicAvailability] = useState<string[]>([]);
  const [calendarDate, setCalendarDate] = useState<DateValue | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isNotAvailable, setIsNotAvailable] = useState(false);

  const {
    loading: loadingSchedule,
    error: errorSchedule,
    data: dataSchedule,
    refetch: refetchSchedule,
  } = useQuery(CHECK_SCHEDULE_ADMIN_QUERY, {
    variables: {
      CheckScheduleAdminInput: {
        id_personnel: parseFloat(personnelId as string),
        date,
      },
    },
    skip: !personnelId || !date,
  });

  const handleContinueFromDatePicking = () => {
    if (!date) {
      setShowTooltip(true);
    } else {
      setShowTooltip(false);
      if (date) {
        refetchSchedule();
        const availabilityByMedicId = dataSchedule?.checkScheduleAdmin.message;

        if (!availabilityByMedicId) {
          setIsNotAvailable(true);
        }
        if (availabilityByMedicId) {
          setMedicAvailability(JSON.parse(availabilityByMedicId));
          setIsNotAvailable(false);
        }
        setTimetableView(true);
      }
    }
  };

  let { locale } = useLocale();
  let isDateUnavailable = (date: any) => isWeekend(date, locale);

  if (loadingSchedule) return <p>Cargando...</p>;
  if (errorSchedule) return <p>Error: {errorSchedule.message}</p>;

  return (
    <div>
      <div className="w-[550px] justify-center pb-5">
        <Label className="text-[#26313c] mb-5">Seleccionar Fecha</Label>
        <DatePicker
          label="Fecha de la cita"
          aria-label="Appointment date"
          isDateUnavailable={isDateUnavailable}
          minValue={today(getLocalTimeZone())}
          value={calendarDate}
          onChange={(value) => {
            setCalendarDate(value);
            if (value) {
              setTimetableView(false);
              setDate(value.toString());
            }
          }}
        />
        <div className="flex justify-center pt-3">
          <Button className="w-[400px]" onClick={handleContinueFromDatePicking}>
            Buscar por esta fecha
          </Button>
        </div>
      </div>

      {timetableView && (
        <>
          {isNotAvailable ? (
            <Label className="text-[#26313c] mb-5">
              No hay horarios disponibles con este médico
            </Label>
          ) : (
            <>
              <Label className="text-[#26313c] mb-5">
                Horarios disponibles con este médico
              </Label>
              <div className="grid grid-cols-3 gap-4">
                {medicAvailability.map((time) => (
                  <div
                    key={time}
                    className="p-4 text-center border rounded-lg bg-gray-200"
                  >
                    {time}
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
