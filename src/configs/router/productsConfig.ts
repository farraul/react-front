import { GridColDef } from '@mui/x-data-grid';

export const columns: GridColDef[] = [
  { field: 'name', headerName: 'Name', width: 150, editable: true },
  { field: 'email', headerName: 'Email', width: 180, editable: true },
  { field: 'url', headerName: 'Url', width: 200, editable: true },
  { field: 'status', headerName: 'Status', width: 100, editable: true },
  { field: 'contact', headerName: 'Contact', width: 100, editable: true },
  { field: 'tasks', headerName: 'Tasks', width: 100, editable: true },
  { field: 'description', headerName: 'Description', width: 180, editable: true },
];
