import { getCities, getProvinces } from './func/api';
import { saveCitiesToSQLFile, saveProvincesToSQLFile } from './func/file';

const provinces = await getProvinces();
saveProvincesToSQLFile(provinces);

const cities = await getCities({ provinces });
saveCitiesToSQLFile(cities);
