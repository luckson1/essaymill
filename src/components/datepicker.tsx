
import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import type { ControllerFieldState, Noop, RefCallBack, } from 'react-hook-form';
import { MobileDateTimePicker } from '@mui/x-date-pickers';
import moment from 'moment';
import { TextField } from '@mui/material';





export default function BasicDateTimePicker({name,  fieldState, onBlur, ref, onChange, }:     {name:string, onChange: (...event: any[]) => void, fieldState:ControllerFieldState, onBlur: Noop, ref: RefCallBack}) {

    const nextWeek=  moment().add(1, 'weeks')
const [error, setError]=React.useState("Deadline")
const [val, setVal]=React.useState<string | undefined>()
  return (
    
    <LocalizationProvider dateAdapter={AdapterMoment}>
     
        <MobileDateTimePicker onError={()=>setError(error)} label={error} className="w-full max-w-xs h-16 "  
          disablePast
          defaultValue={moment(nextWeek)}
          views={['year', 'month', 'day', 'hours', 'minutes']}
          onChange={(e) => onChange(e?.toISOString())}

          slots={<TextField
          ref={ref}
   onChange={e=>setVal(e.target.value.toString())}
            onBlur={onBlur}
            name={name}
            value={val}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />}
       
           
        
          />
          

    </LocalizationProvider>
  );
}



