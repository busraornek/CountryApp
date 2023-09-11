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
      },
      isUpdate: false,
    };
  }
  

  componentDidMount() {
    this.fetchCountries();
  }

  async fetchCountries() {
    let countries = await getCountries();
    this.setState({ countries });
  }


  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      newCountry: {
        ...prevState.newCountry,
        [name]: value, // Hangi girdi alanının değiştirildiğini 'name' özelliği ile belirle
      },
    }));
  };
  
  
 


  handleNewClick = async () => {
    console.log("handleNev girişi ")
    try {
      // Yeni ülke verilerini this.state.newCountry içinde alın
      let newCountryData = this.state.newCountry;
      console.log("handleNev içi ")
      // insertCountry işlevini çağırarak yeni ülkeyi ekleyin
      let response = await insertCountry(newCountryData);
  console.log("if ")
      if (response && response.success) {
        console.log("if içi ")
        // Yeni ülke başarıyla eklendi, yeni ülkeyi eklemek için state'i güncelleyin
        this.setState((prevState) => ({
          countries: [...prevState.countries, newCountryData],
          newCountry: {
            countryName: '',
            capital: '',
            population: 0,
            numberOfCity: 0,
            
          },
          isUpdate: false,
          
        })); console.log("if dışı")
      } else {
        // Yeni ülke eklerken hata oluştu, hata mesajını işleyin veya kullanıcıya bildirin.
        console.error('Yeni ülke eklenirken bir hata oluştu.');
      }
    } catch (error) {
      console.error('Yeni ülke eklerken bir hata oluştu:', error);
    }
  };
  
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
    
    // Mevcut seçili ülkenin index'ini bulun (örneğin, seçili bir ülke olsun).
    const selectedIndex = countries.findIndex((country) => country.name === newCountry.name);
  
    if (selectedIndex !== -1) {
      // Seçilen ülkenin index'ini bulduğumuzda, yeni verilerle güncelleyin.
      const updatedCountries = [...countries];
      updatedCountries[selectedIndex] = newCountry;
  
      // Servis fonksiyonunu kullanarak güncelleme işlemini gerçekleştirin (örneğin, updateCountry fonksiyonu kullanılsın).
      await updateCountry(newCountry);
  
      // Güncellenmiş ülkelerle birlikte durumu güncelleyin.
      this.setState({
        countries: updatedCountries,
        newCountry: {},
        isUpdate: false,
      });
    }
  };
  
  handleRowClick = (country) => {
    // Tıklanan ülkenin bilgilerini işlemek için bu işlevi kullanabilirsiniz.
    console.log('Tıklanan Ülke:', country);
    // Başka işlemler yapabilirsiniz, örneğin seçili ülkenin detay sayfasına yönlendirebilirsiniz.
     this.setState({
      newCountry: country,
      isUpdate: true, // Bu, güncelleme modunu etkinleştirebilir
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
       
       <button onClick={this.state.isUpdate ? this.handleNewClick : this.handleNewClick}>
  {this.state.isUpdate ? 'New' : 'Yeni'}
</button>
<button onClick={this.state.isUpdate ? this.handleInputChange : this.handleNewClick}>
  {this.state.isUpdate ? 'Add' : 'Kaydet'}
</button>
<button onClick={this.state.isUpdate ? this.handleUpdateClick : this.handleNewClick}>
  {this.state.isUpdate ? 'Update' : 'Güncelle'}
</button>

        <CountryList countries={this.state.countries} onRowClick={this.handleRowClick} />
      </div>
    );
  }
}

export default App;
