import axios from 'axios';

const API_BASE_URL = "https://belsoftintern.miktatcento.repl.co";
const API_GET_URL = `${API_BASE_URL}/countries`;
const API_UPDATE_URL = `${API_BASE_URL}/updateCountry`;
const API_ADD_URL = `${API_BASE_URL}/insertCountry`;




export const getCountries = async () => {
  try {
    console.log('girdi');
    axios.get(API_GET_URL).then((response) => {
      console.log("servicedata",response.data);
      return response.data
    });
  } catch (error) {
    console.error('Hata:', error);
    throw error;
  }
};


export const insertCountry = async (country) => {
  try {
    axios.post(API_ADD_URL, country).then((response)=> {
      console.log(response.data);
      return response.data
    });
   
  } catch (error) {
    console.error('Hata:', error);
    throw error;
  }
};


export const updateCountry = async (country) => {
  try {
    axios.post(API_UPDATE_URL, country).then((response)=> {
       console.log(response.data);
      return response.data
    });
  } catch (error) {
    console.error('Hata:', error);
    throw error;
  }
};
