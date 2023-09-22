import React from 'react';
import { Datatable } from '@/components';

function Dashboard() {
  return (
    <section className="h-[calc(100vh-64px)] p-16 bg-gray-600">
      <Datatable />
    </section>
  );
}

export default Dashboard;
