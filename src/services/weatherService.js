import axios from 'axios';

const API_KEY = '015f8e29ae863fe6899f5fbaa71b4639';

const getWeather = async (city, country) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`;
  const response = await axios.get(url);
  return response.data;
};

export default {
  getWeather
};
