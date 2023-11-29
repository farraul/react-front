import * as React from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
  GridValidRowModel,
  GridEditMode,
} from '@mui/x-data-grid';
import { randomId } from '@mui/x-data-grid-generator';
import { UseMutationResult } from '@tanstack/react-query';
import { Client } from 'src/models/user/client';

type EditToolbarProps = {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (newModel: (oldModel: GridRowModesModel) => GridRowModesModel) => void;
};

type PropsTable = {
  rows: GridValidRowModel[];
  columns: GridColDef[];
  editMode: GridEditMode | undefined;
  rowModesModel: GridRowModesModel;
  setRows: React.Dispatch<React.SetStateAction<GridValidRowModel[]>>;
  setRowModesModel: React.Dispatch<React.SetStateAction<GridRowModesModel>>;
  initValueEdit: GridValidRowModel;
  create: UseMutationResult<void, unknown, Client, unknown>;
  update: UseMutationResult<void, unknown, Client, unknown>;
  remove: UseMutationResult<void, unknown, string, unknown>;
};

export const TableMui = ({
  rows,
  setRows,
  rowModesModel,
  setRowModesModel,
  columns,
  editMode,
  initValueEdit,
  create,
  update,
  remove,
}: PropsTable) => {
  function EditToolbar(props: EditToolbarProps) {
    const { setRows, setRowModesModel } = props;

    const handleClick = () => {
      const id = randomId();
      setRows((oldRows) => [...oldRows, { ...initValueEdit, id, isNew: true }]);
      setRowModesModel((oldModel) => ({
        ...oldModel,
        [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name', isNew: true },
      }));
    };

    return (
      <GridToolbarContainer>
        <Button color='primary' startIcon={<AddIcon />} onClick={handleClick}>
          Add recordd
        </Button>
      </GridToolbarContainer>
    );
  }

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleDeleteClick = async (id: GridRowId) => {
    setRows(rows.filter((row) => row.id !== id));
    await remove.mutateAsync(id as string);
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = async (newRow: GridRowModel) => {
    let updatedRow = {};

    if (newRow.isNew) {
      await create.mutateAsync({
        ...(newRow as Client),
      });
      updatedRow = { ...newRow, isNew: false };
      setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    } else {
      await update.mutateAsync({
        ...(newRow as Client),
      });
    }

    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  return (
    <DataGrid
      rows={rows}
      columns={[
        ...columns,
        {
          field: 'actions',
          type: 'actions',
          headerName: 'Actions',
          width: 100,
          cellClassName: 'actions',
          getActions: ({ id }) => {
            const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

            if (isInEditMode) {
              return [
                <GridActionsCellItem
                  icon={<SaveIcon />}
                  label='Save'
                  sx={{
                    color: 'primary.main',
                  }}
                  onClick={handleSaveClick(id)}
                />,
                <GridActionsCellItem
                  icon={<CancelIcon />}
                  label='Cancel'
                  className='textPrimary'
                  onClick={handleCancelClick(id)}
                  color='inherit'
                />,
              ];
            }

            return [
              <GridActionsCellItem
                icon={<EditIcon />}
                label='Edit'
                className='textPrimary'
                onClick={handleEditClick(id)}
                color='inherit'
              />,
              <GridActionsCellItem
                icon={<DeleteIcon />}
                label='Delete'
                onClick={() => handleDeleteClick(id)}
                color='inherit'
              />,
            ];
          },
        },
      ]}
      editMode={editMode}
      rowModesModel={rowModesModel}
      onRowModesModelChange={handleRowModesModelChange}
      onRowEditStop={handleRowEditStop}
      processRowUpdate={processRowUpdate}
      slots={{
        toolbar: EditToolbar,
      }}
      slotProps={{
        toolbar: { setRows, setRowModesModel },
      }}
    />
  );
};

export default TableMui;
