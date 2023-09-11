import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { getCountries } from './service';

const CountryList = ({ onRowClick }) => {
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    console.log("usefect içi")
    const fetchData = async() => {
      console.log("fectData içi")
      try {
        console.log("try içi")
        let countries = await getCountries();
        console.log('Başarılı:');
        setRowData(countries.data);
        console.log("try sonu")
      } catch (error) {
        console.error('Veriler alınırken hata oluştu:', error);
      }
    }

    fetchData();
  }, []);

  const columnDefs = [
    { headerName: 'Ülke Adı', field: 'countryName', sortable: true, filter: true },
    { headerName: 'Başkenti', field: 'capital', sortable: true, filter: true },
    { headerName: 'Nüfus', field: 'population', sortable: true, filter: true },
    { headerName: 'Şehir Sayısı', field: 'numberOfCity', sortable: true, filter: true },
  ];

  let gridOptions = {
    rowData: rowData,
    onRowClicked: (event) => {
      let selectedCountry = event.data;
      onRowClick(selectedCountry);
    },
  };

  return (
    <div className="ag-theme-alpine" style={{ height: '300px', width: '100%' }}>
      <AgGridReact
        columnDefs={columnDefs}
        gridOptions={gridOptions}
        
      />
    </div>
  );
}

export default CountryList;
