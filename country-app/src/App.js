import React, { Component } from 'react';
import CountryInput from './CountryInput';
import CountryList from './CountryList';
import { getCountries, insertCountry, updateCountry } from './service';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: [],
      newCountry: {
        countryName: '',
        capital: '',
        population: 0,
        numberOfCity: 0,
        countryId: ''
      },
      isUpdate: false,
    };
  }


  componentDidMount() {
    this.fetchCountries();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.countries !== this.state.countries) {
      console.log('Ülkeler güncellendi');
    }
  }


  async fetchCountries() {
    let countries = await getCountries();
    console.log("fetchCountries içi", countries)
    this.setState({ countries: countries.data });
  }


  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      newCountry: {
        ...prevState.newCountry,
        [name]: value, 
      },
    }));
  };

  handleSaveClick = async () => {
    console.log("handleNev girişi ")
    try {
      let newCountryData = {

        ...this.state.newCountry,
        population: parseInt(this.state.newCountry.population),
        numberOfCity: parseInt(this.state.newCountry.population),

      }
      console.log("handleNev içi ")
      let response = await insertCountry(newCountryData);
      console.log( response)
      if (response ) {
        console.log("if içi ")
      window.location.reload();

      } else {
        console.error('Yeni ---- ülke eklenirken bir hata oluştu.');
      }
    } catch (error) {
      console.error('Yeni ülke eklerken bir hata oluştu:', error);
    }
  };
  handleNewClick = () => {
    this.setState({
      newCountry: {
        countryName: '',
        capital: '',
        population: '',
        numberOfCity: ''
      },
      isUpdate: false
    });
  }

  handleCountryNameChange = (e) => {
    const { value } = e.target;
    this.setState((prevState) => ({
      newCountry: {
        ...prevState.newCountry,
        countryName: value,
      },
    }));
  }
  handleCapitalChange = (e) => {
    const { value } = e.target;
    this.setState((prevState) => ({
      newCountry: {
        ...prevState.newCountry,
        capital: value,
      },
    }));
  }
  handlePopulationChange = (e) => {
    const { value } = e.target;
    this.setState((prevState) => ({

      newCountry: {
        ...prevState.newCountry,
        population: value,

      },
    }));
  }
  handleNumberOfCityChange = (e) => {
    const { value } = e.target;
    this.setState((prevState) => ({
      newCountry: {
        ...prevState.newCountry,
        numberOfCity: value,
      },
    }));
  }
  handleUpdateClick = async () => {
    const { newCountry, countries } = this.state;
    const selectedIndex = countries.findIndex((country) => country.name === newCountry.name);

    if (selectedIndex !== -1) {
      const updatedCountries = [...countries];
      updatedCountries[selectedIndex] = newCountry;
      await updateCountry(newCountry);
      this.setState({
        countries: updatedCountries,
        newCountry: {},
        isUpdate: false,
      });
    }
  };
  handleRowClick = (country) => {
    console.log('Tıklanan Ülke:', country);
    this.setState({
      newCountry: country.data,
      isUpdate: true,
    });
  };
  render() {
    return (
      <div>
        <CountryInput
          label="Ülke Adı"
          name="countryName"
          value={this.state.newCountry.countryName}
          onChange={this.handleInputChange}
        />
        <CountryInput
          label="Başkenti"
          name="capital"
          value={this.state.newCountry.capital}
          onChange={this.handleInputChange}
        />
        <CountryInput
          label="Nüfus"
          name="population"
          value={this.state.newCountry.population}
          onChange={this.handleInputChange}
        />
        <CountryInput
          label="Şehir Sayısı"
          name="numberOfCity"
          value={this.state.newCountry.numberOfCity}
          onChange={this.handleInputChange}
        />

        {/* Add more input components for other fields */}

        <button onClick={this.handleNewClick}>
          Yeni
        </button>
        <button onClick={this.handleSaveClick} disabled={this.state.isUpdate}>
          Kaydet
        </button>
        <button onClick={this.handleUpdateClick} disabled={!this.state.isUpdate}>
          Güncelle
        </button>
        <CountryList countries={this.state.countries} onRowClick={this.handleRowClick} />
      </div>
    );
  }
}
export default App;