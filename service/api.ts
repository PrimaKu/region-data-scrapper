import axios from 'axios';
import { Province } from '../model/province';
import { City } from '../model/city';
import { District } from '../model/district';

export class ApiService {
  private readonly axiosInstance;
  private readonly year: number;
  private readonly timeoutBeforeReq: number;

  constructor(year = 2024, timeoutBeforeReq = 100) {
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

  public async getDistricts(cities: City[]): Promise<District[]> {
    const districts: District[] = [];
    let districtId = 1;

    for (const city of cities) {
      console.log(`Getting districts of ${city.name}...`);
      await this.delay();

      const { data } = await this.axiosInstance.get('/api/wilayah/list_kec', {
        params: {
          thn: this.year,
          pro: city.province.code,
          kab: city.code.replace(city.province.code, ''),
        },
      });

      for (const key in data) {
        const district = new District({ id: districtId++, key, name: data[key], city});
        districts.push(district);
        console.log(`ID ${district.id} | Code ${district.code} | ${district.name}`);
      }
    }

    return districts;
  }

  /**
   * to prevent too many requests
   */
  private delay(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, this.timeoutBeforeReq));
  }
}
