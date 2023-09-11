import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { getCountries } from './service';

const CountryList = ({ onRowClick }) => {
  
  const [rowData, setRowData] = useState([]);
  const [gridApi, setGridApi] = useState(null);
  
  const [columnDefs] = useState([
    { field: 'countryName', headerName: 'Country Name' },
    { field: 'capital', headerName: 'Capital' },
    { field: 'population', headerName: 'Population' },
    { field: 'numberOfCity', headerName: 'Number of Cities' },
    // { field: 'countryId', headerName: 'Country ID' },
  ]);
  const onGridReady = params => {
    setGridApi(params.api);
  };

  useEffect(() => {
    if (gridApi) {
      gridApi.setRowData(rowData);
    }
  }, [rowData, gridApi]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let countries = await getCountries();
        console.log({countries})
        setRowData(countries);
      } catch (error) {
        console.error('Error fetching country data:', error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    console.log("data has come")
  }, [rowData]);

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
