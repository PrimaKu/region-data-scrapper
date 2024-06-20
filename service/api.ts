import axios from 'axios';
import { Province } from '../class/province';
import { City } from '../class/city';

export class ApiService {
  private readonly axiosInstance;
  private readonly year: number;
  private readonly timeoutBeforeReq: number;

  constructor(year = 2024, timeoutBeforeReq = 1000) {
    this.axiosInstance = axios.create({
      baseURL: 'https://sipedas.pertanian.go.id',
    });
    this.year = year;
    this.timeoutBeforeReq = timeoutBeforeReq;
  }

  public async getProvinces(): Promise<Province[]> {
    const provinces: Province[] = [];
    let provinceId = 1;

    console.log('Getting provinces...');
    await this.delay();

    const { data } = await this.axiosInstance.get('/api/wilayah/list_pro', {
      params: {
        thn: this.year,
      },
    });

    for (const key in data) {
      const province = new Province({ id: provinceId++, key, name: data[key] });
      provinces.push(province);
      console.log(`ID ${province.id} | Code ${province.code} | ${province.name}`);
    }

    return provinces;
  }

  public async getCities(provinces: Province[]): Promise<City[]> {
    const cities: City[] = [];
    let cityId = 1;

    for (const province of provinces) {
      console.log(`Getting cities of ${province.name}...`);
      await this.delay();

      const { data } = await this.axiosInstance.get('/api/wilayah/list_kab', {
        params: {
          thn: this.year,
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
  }

  /**
   * to prevent too many requests
   */
  private delay(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, this.timeoutBeforeReq));
  }
}
