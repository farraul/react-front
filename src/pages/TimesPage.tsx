import React, { useState } from 'react';
import { formatInTimeZone } from 'date-fns-tz';
import { format, add } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;

function Times() {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  return (
    <section className="h-[calc(100vh-64px)] p-16 bg-gray-600 text-white">
      <p>Fecha actual : {String(new Date())}</p>

      <h2 className=" text-xl font-bold text-white mt-10 mb-3">Librería utilizada: date-fns</h2>
      <p>Fecha actual +2 meses: {format(add(new Date(), { months: 2 }), 'dd-MM-yyyy')};</p>
      <p>Zona horaria: {tz}</p>
      <p>Zona horaria mia: {formatInTimeZone(new Date(), tz, 'dd-MM-yyyy HH:mm:ssXXX')} </p>
      <p>
        Zona horaria nueva york:{' '}
        {formatInTimeZone(new Date(), 'America/New_York', 'dd-MM-yyyy HH:mm:ssXXX')}{' '}
      </p>

      <h2 className="text-xl font-bold text-white mt-10">Librería utilizada: react-datepicker</h2>
      <DatePicker
        className="text-black mt-5"
        selected={startDate}
        onChange={(date) => setStartDate(date)}
      />
    </section>
  );
}

export default Times;
