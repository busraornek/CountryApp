import axios from 'axios';

const API_BASE_URL = "https://belsoftintern.miktatcento.repl.co";
const API_GET_URL = `${API_BASE_URL}/countries`;
const API_UPDATE_URL = `${API_BASE_URL}/updateCountry`;
const API_ADD_URL = `${API_BASE_URL}/insertCountry`;



// Örnek getCountries fonksiyonu
export async function getCountries() {
  try {
    let response = await fetch(API_GET_URL);
    if (!response.ok) {
      throw new Error('API çağrısı başarısız oldu');
    }
    let data = await response.json();
    console.log(data)
    return { data }; // Verileri içeren bir nesne döndürün
  } catch (error) {
    throw error;
  }
}



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
