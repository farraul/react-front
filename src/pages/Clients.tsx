import * as React from 'react';
import Box from '@mui/material/Box';
import { GridRowModesModel, GridColDef, GridValidRowModel } from '@mui/x-data-grid';
import { getClientsRequest } from '@/services/clientService';
import { useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { TableMui } from '@/components/TableMui';

export default function Clients() {
  const id = Cookies.get('userId');
  const { data: dataClients = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: () => {
      if (id) return getClientsRequest(id);
    },
    cacheTime: 100000,
    refetchOnWindowFocus: false,
    staleTime: 100000,
  });
  console.log({ dataClients });

  const dataClientsFormat: GridValidRowModel[] = dataClients?.map((client) => ({
    id: client._id,
    name: client.name,
    email: client.email,
    url: client.url,
  }));

  const [rows, setRows] = React.useState(dataClientsFormat);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
  console.log({ rows });

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', width: 180, editable: true },
    { field: 'email', headerName: 'Email', width: 180, editable: true },
    { field: 'url', headerName: 'Url', width: 180, editable: true },
  ];

  return (
    <div className="w-full flex justify-center py-40">
      <div className="max-w-4xl	">
        <Box
          sx={{
            height: 500,
            width: '100%',
            '& .actions': {
              color: 'text.secondary',
            },
            '& .textPrimary': {
              color: 'text.primary',
            },
          }}
        >
          <TableMui
            rows={rows}
            columns={columns}
            editMode="row"
            rowModesModel={rowModesModel}
            setRows={setRows}
            setRowModesModel={setRowModesModel}
            initValueEdit={{ id: '', name: '', email: '', url: '' }}
          />
        </Box>
      </div>
    </div>
  );
}
