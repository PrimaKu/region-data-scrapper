import axios from 'axios';
import { Province } from '../class/province';
import { City } from '../class/city';

const axiosInstance = axios.create({
  baseURL: 'https://sipedas.pertanian.go.id',
});

export const getProvinces = async ({ year = 2024, timeoutBeforeReq = 1000 } = {}) => {
  const provinces: Province[] = [];
  let provinceId = 1;

  console.log('Getting provinces...');
  await new Promise((resolve) => setTimeout(resolve, timeoutBeforeReq)); // to prevent too many request

  const { data } = await axiosInstance.get('/api/wilayah/list_pro', {
    params: {
      thn: year,
    },
  });

  for (const key in data) {
    const province = new Province({ id: provinceId++, key, name: data[key] });
    provinces.push(province);
    console.log(`ID ${province.id} | Code ${province.code} | ${province.name}`);
  }

  return provinces;
};

export const getCities = async ({
  provinces,
  year = 2024,
  timeoutBeforeReq = 1000,
}: {
  provinces: Province[];
  year?: number;
  timeoutBeforeReq?: number;
}) => {
  const cities: City[] = [];
  let cityId = 1;

  for (const province of provinces) {
    console.log(`Getting cities of ${province.name}...`);
    await new Promise((resolve) => setTimeout(resolve, timeoutBeforeReq)); // to prevent too many request

    const { data } = await axiosInstance.get('/api/wilayah/list_kab', {
      params: {
        thn: year,
        pro: province.code,
      },
    });

    for (const key in data) {
      const city = new City({ id: cityId++, key, name: data[key], province });
      cities.push(city);
      console.log(`ID ${city.id} | Code ${city.code} | ${city.name}`);
    }
  }

  return cities;
};
