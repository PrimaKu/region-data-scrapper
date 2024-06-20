import axios from 'axios';
import { Province } from './class/province';
import { City } from './class/city';

const axiosInstance = axios.create({
  baseURL: 'https://sipedas.pertanian.go.id',
});

const year = '2024';

const { data: provincesData } = await axiosInstance.get('/api/wilayah/list_pro', {
  params: {
    thn: year,
  },
});

for (const pKey in provincesData) {
  const province = new Province({ id: 1, key: pKey, name: provincesData[pKey] });

  console.log({ province });

  const { data: cities } = await axiosInstance.get('/api/wilayah/list_kab', {
    params: {
      thn: year,
      pro: province.code,
    },
  });

  for (const cKey in cities) {
    const city = new City({ id: 1, key: cKey, name: cities[cKey], province });

    console.log({ city });
  }
}
