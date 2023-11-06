import React, { useEffect, useMemo, useState } from 'react';
import { FormCRUD, Modal } from '@/components';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { IoMdAdd } from 'react-icons/io';
import {
  createProductRequest,
  deleteProductRequest,
  getProductsRequest,
  updateProductRequest,
} from '@/services';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Product } from '@/models/product';
import { ColDef } from 'ag-grid-community';
import { VscLoading } from 'react-icons/vsc';
import Cookies from 'js-cookie';

const ProductPage = () => {
  const [addProduct, setAddProduct] = useState(false);
  const [updateProduct, setEditProduct] = useState(false);
  const [productUpdate, setProductUpdate] = useState<Product>();

  const id = Cookies.get('userId');

  const { data: dataProducts, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: () => {
      if (id) return getProductsRequest(id);
    },
    cacheTime: 100000,
    refetchOnWindowFocus: false,
    staleTime: 100000,
  });

  const queryClient = useQueryClient();
  const addProductMutation = useMutation({
    mutationFn: createProductRequest,
    onSuccess: () => {
      queryClient.invalidateQueries(['products']);
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: updateProductRequest,
    onSuccess: () => {
      queryClient.invalidateQueries(['products']);
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: deleteProductRequest,
    onSuccess: () => {
      queryClient.invalidateQueries(['products']);
    },
  });

  const handleAddProduct = () => {
    setAddProduct(!addProduct);
  };

  const handleEditProduct = () => {
    setEditProduct(!updateProduct);
  };

  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);

  const DeleteRenderer = (props: any) => {
    const id = props.value;
    return (
      <div className="flex gap-4 justify-start items-center">
        <button
          className="p-4 bg-red-600 text-white hover:opacity-80 font-semibold flex justify-center items-center w-20 h-10 rounded-3xl hover:scale-110 active:scale-90 transition"
          onClick={() => {
            deleteProductMutation.mutate(id);
          }}
        >
          {deleteProductMutation.isLoading ? (
            <>
              <VscLoading className="h-5 w-5 animate-spin transition" />
              <h3>Deleting</h3>
            </>
          ) : (
            <h3>Delete</h3>
          )}
        </button>
      </div>
    );
  };

  const UpdateRenderer = (props: any) => {
    return (
      <div className="flex gap-4 justify-start items-center">
        <button
          className="p-4 bg-blue-600 text-white	hover:opacity-80 font-semibold flex justify-center items-center w-20 h-10 rounded-3xl hover:scale-110 active:scale-90 transition"
          onClick={() => {
            handleEditProduct();
            setProductUpdate(props.data);
          }}
        >
          {updateProductMutation.isLoading ? (
            <>
              <VscLoading className="h-5 w-5 animate-spin transition" />
              <h3>Updating</h3>
            </>
          ) : (
            <h3>Update</h3>
          )}
        </button>
      </div>
    );
  };

  const [rowData, setRowData] = useState<Product[]>([]);

  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { field: 'title', headerName: 'Title' },
    { field: 'price', headerName: 'Price' },
    { field: 'category', headerName: 'Category' },
    { field: 'brand', headerName: 'Brand' },
    { field: 'description', headerName: 'Description' },
    {
      headerName: '',
      minWidth: 150,
      field: '_id',
      type: 'agColumnHeader',
      cellRenderer: UpdateRenderer,
    },
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
    <section className="h-[calc(100vh-64px)] p-16 bg-gray-600">
      <div>
        <button
          type="button"
          id="productModalButton"
          onClick={handleAddProduct}
          className="flex items-center justify-center text-white bg-gray-700 hover:bg-gray-800 font-medium rounded-lg text-sm px-4 py-2"
        >
          <IoMdAdd className="w-6 h-6" />
          Add product
        </button>
      </div>
      <Modal show={handleAddProduct} title="Add product" isOpen={addProduct}>
        <FormCRUD handleIsOpen={handleAddProduct} action={addProductMutation} focus={addProduct} />
      </Modal>

      <Modal show={handleEditProduct} title="Edit product" isOpen={updateProduct}>
        <FormCRUD
          handleIsOpen={handleEditProduct}
          action={updateProductMutation}
          product={productUpdate as Product}
          focus={addProduct}
        />
      </Modal>
      <div style={containerStyle} className="mt-2">
        <div style={{ height: '100%', boxSizing: 'border-box' }}>
          <div style={gridStyle} className="ag-theme-alpine">
            <AgGridReact rowData={rowData} columnDefs={columnDefs} defaultColDef={defaultColDef} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductPage;
