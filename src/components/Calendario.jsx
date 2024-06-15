import * as React from "react";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import Button from "./Button";

export default function Calendario({fechaAlta, setFechaAlta}) {

  const [value, setValue] = React.useState(dayjs(Date.now()));

  return (

    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DateCalendar", "DateCalendar"]}>
          <DemoItem label="">
            <DateCalendar
              value={fechaAlta}
              onChange={(newValue) => setFechaAlta(newValue)}
            />
          </DemoItem>
        </DemoContainer>
      </LocalizationProvider>

    </div>
  );
}
