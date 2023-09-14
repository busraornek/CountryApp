import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { getCountries } from './service';

const CountryList = ({ onRowClick, countries }) => {
  
  const [rowData, setRowData] = useState([]);
  const [gridApi, setGridApi] = useState(null);
  
  const [columnDefs] = useState([
    { field: 'countryName', headerName: 'Country Name' },
    { field: 'capital', headerName: 'Capital' },
    { field: 'population', headerName: 'Population' },
    { field: 'numberOfCity', headerName: 'Number of Cities' },
  
  ]);
  
  const onGridReady = params => {
    setGridApi(params.api);
  };

  useEffect(() => {
    if (gridApi) {
      gridApi.setRowData(countries);
    }
  }, [countries, gridApi]);

  useEffect(() => {
    console.log("data has come", countries);
  }, [countries]);

  console.log(columnDefs)

  return (
    <div className="ag-theme-alpine" style={{ height: '400px', width: '600px' }}>
      <AgGridReact
        onGridReady={onGridReady}
        columnDefs={columnDefs}
        onRowClicked={onRowClick}
      />
    </div>
  );
};

export default CountryList;