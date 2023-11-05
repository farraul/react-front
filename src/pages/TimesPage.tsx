import React from 'react';
import { formatInTimeZone } from 'date-fns-tz';

import { format, add } from 'date-fns';

function Times() {
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return (
    <section className="h-[calc(100vh-64px)] p-16 bg-gray-600 text-white">
      <p>Fecha actual : {String(new Date())}</p>
      <p>Fecha actual +2 meses: {format(add(new Date(), { months: 2 }), 'dd-MM-yyyy')};</p>
      <p>Zona horaria: {tz}</p>
      <p>Zona horaria mia: {formatInTimeZone(new Date(), tz, 'dd-MM-yyyy HH:mm:ssXXX')} </p>
      <p>
        Zona horaria nueva york:{' '}
        {formatInTimeZone(new Date(), 'America/New_York', 'dd-MM-yyyy HH:mm:ssXXX')}{' '}
      </p>
    </section>
  );
}

export default Times;
