import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import Modal from './Modal';
import { IoMdAdd } from 'react-icons/io';
import FormCRUD from './FormCRUD';
import {
  deleteProductRequest,
  getProductsRequest,
  updateProductRequest,
} from '@/services';
import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { Product } from '@/models/product';
import { ColDef, ValueFormatterParams } from 'ag-grid-community';
import { useAppSelector } from '@/hooks/useApp';
import { VscLoading } from 'react-icons/vsc';

const Datatable = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { userInfo } = useAppSelector((state) => state.user);

  const { data: dataProducts, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: () => {
      return getProductsRequest(userInfo?.id as string)
    },
    cacheTime: 10000,
    refetchOnWindowFocus: false,
    staleTime: 10000,
  });

  const queryClient = useQueryClient();

  const deleteProductMutation = useMutation({
    mutationFn: deleteProductRequest,
    onSuccess: () => {
      queryClient.invalidateQueries(['products']);
    },
  });

  const handleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  const containerStyle = useMemo(
    () => ({ width: '100%', height: '100%' }),
    [],
  );
  const gridStyle = useMemo(
    () => ({ height: '100%', width: '100%' }),
    [],
  );

  const DeleteRenderer = (props: any) => {
    const id = props.value
    return (
      <div className="flex gap-4 justify-start items-center">
        <button
          className="p-4 bg-red-600 hover:opacity-80 font-semibold flex justify-center items-center w-20 h-10 rounded-3xl hover:scale-110 active:scale-90 transition"
          onClick={() => {
            deleteProductMutation.mutate(id)
          }}
        >
          {deleteProductMutation.isLoading ? (
            <>
            <VscLoading  className="h-5 w-5 animate-spin transition"/>
            <h3>Deleting</h3>
            </>
          ) : (
            <h3>Delete</h3>
          )}
        </button>
      </div>
    );
  };
  

  const [rowData, setRowData] = useState<Product[]>([]);

  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { field: 'title', headerName: 'Title' },
    { field: 'category', headerName: 'Category' },
    { field: 'brand', headerName: 'Brand' },
    { field: 'price', headerName: 'Price' },
    {
      headerName: '',
      minWidth: 150,
      field: '_id',
      type: 'agColumnHeader',
      cellRenderer: DeleteRenderer,
    },
  ]);

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 150,
      filter: true,
    };
  }, []);

  useEffect(() => {
    if (dataProducts) {
      setRowData(dataProducts);
    }
  }, [dataProducts]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <button
        type="button"
        id="productModalButton"
        onClick={handleIsOpen}
        className="flex items-center justify-center text-white bg-gray-700 hover:bg-gray-800 font-medium rounded-lg text-sm px-4 py-2"
      >
        <IoMdAdd className="w-6 h-6" />
        Add product
      </button>

      <Modal show={handleIsOpen} isOpen={isOpen}>
        <FormCRUD handleIsOpen={handleIsOpen}/>
      </Modal>

      <div style={containerStyle} className="mt-2">
        <div style={{ height: '100%', boxSizing: 'border-box' }}>
          <div style={gridStyle} className="ag-theme-alpine">
            <AgGridReact
              rowData={rowData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Datatable;
