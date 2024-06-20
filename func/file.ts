import fs from 'fs';
import path from 'path';
import type { City } from '../class/city';
import type { Province } from '../class/province';

export const saveProvincesToSQLFile = (provinces: Province[]) => {
  const filePath = path.join(__dirname, '../result/Province.sql');
  const sqlStatements = provinces
    .map(
      (province) =>
        `INSERT INTO Province (id, code, name) VALUES (${province.id}, '${province.code}', '${province.name}');`
    )
    .join('\n');

  fs.writeFileSync(filePath, sqlStatements);
  console.log(`Provinces saved to ${filePath}`);
};

export const saveCitiesToSQLFile = (cities: City[]) => {
  const filePath = path.join(__dirname, '../result/City.sql');
  const sqlStatements = cities
    .map(
      (city) =>
        `INSERT INTO City (id, code, provinceId, name) VALUES (${city.id}, '${city.code}', '${city.provinceId}', ${city.name});`
    )
    .join('\n');

  fs.writeFileSync(filePath, sqlStatements);
  console.log(`Cities saved to ${filePath}`);
};
