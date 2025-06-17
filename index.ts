import { ApiService } from './service/api';
import { FileService } from './service/file';

const apiService = new ApiService();
const fileService = new FileService();

const provinces = await apiService.getProvinces();
fileService.saveProvincesToSQLFile(provinces);

const cities = await apiService.getCities(provinces);
fileService.saveCitiesToSQLFile(cities);

const districts = await apiService.getDistricts(cities);
fileService.saveDistrictsToSQLFile(districts);
