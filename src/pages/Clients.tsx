import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import {
  GridRowModesModel,
  GridColDef,
  GridValidRowModel,
  GridRowModes,
  GridRowId,
  GridActionsCellItem,
} from '@mui/x-data-grid';
import { createClientRequest, getClientsRequest, updateClientRequest, deleteClientRequest } from '@/services/clientService';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { TableMui } from '@/components/TableMui';

export default function Clients() {
  const id = Cookies.get('userId');
  const [rows, setRows] = useState<GridValidRowModel[]>([]);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  const { data: dataClients = [] } = useQuery({
    queryKey: ['clients'],
    queryFn: () => {
      if (id) return getClientsRequest(id);
    },
    cacheTime: 100000,
    refetchOnWindowFocus: false,
    staleTime: 100000,
  });

  const queryClient = useQueryClient();

  const addClientMutation = useMutation({
    mutationFn: createClientRequest,
    onSuccess: () => {
      queryClient.invalidateQueries(['clients']);
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: updateClientRequest,
    onSuccess: () => {
      queryClient.invalidateQueries(['clients']);
    },
  });


  const deleteProductMutation = useMutation({
    mutationFn: deleteClientRequest,
    onSuccess: () => {
      queryClient.invalidateQueries(['clients']);
    },
  });

  useEffect(() => {
    const dataClientsFormat: GridValidRowModel[] = dataClients?.map((client) => ({
      id: client._id,
      name: client.name,
      email: client.email,
      url: client.url,
      status: client.status,
      tasks: client.tasks,
      contact: client.contact,
      description: client.description,
    }));

    setRows(dataClientsFormat);
  }, [dataClients]);

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', width: 150, editable: true },
    { field: 'email', headerName: 'Email', width: 180, editable: true },
    { field: 'url', headerName: 'Url', width: 200, editable: true },
    { field: 'status', headerName: 'Status', width: 100, editable: true },
    { field: 'contact', headerName: 'Contact', width: 100, editable: true },
    { field: 'tasks', headerName: 'Tasks', width: 100, editable: true },
    { field: 'description', headerName: 'Description', width: 180, editable: true },
  ];

  // const handleSaveClick = (id: GridRowId) => () => {
  //   setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  // };

  return (
    <div className="w-full flex justify-center py-40">
      <div className="max-w-6xl	">
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
            setRows={setRows}
            rowModesModel={rowModesModel}
            setRowModesModel={setRowModesModel}
            columns={columns}
            editMode="row"
            initValueEdit={{ id: '', name: '', email: '', url: '' }}
            create={addClientMutation}
            update={updateProductMutation}
            remove={deleteProductMutation}
          />
        </Box>
      </div>
    </div>
  );
}
