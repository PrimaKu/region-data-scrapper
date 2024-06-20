import fs from 'fs';
import path from 'path';
import type { City } from '../class/city';
import type { Province } from '../class/province';

const saveToSQLFile = (table: string, columns: string[], values: any[][], fileName: string) => {
  const filePath = path.join(__dirname, `../result/${fileName}`);
  const valuesString = values
    .map((valueArray) => `(${valueArray.map((value) => `'${value}'`).join(', ')})`)
    .join(',\n');
  const sqlStatements = `INSERT INTO ${table} (${columns.join(', ')}) VALUES\n${valuesString};`;

  fs.writeFileSync(filePath, sqlStatements);
  console.log(`${table} saved to ${filePath}`);
};

export const saveProvincesToSQLFile = (provinces: Province[]) => {
  const columns = ['id', 'code', 'name'];
  const values = provinces.map(({ id, code, name }) => [id, code, name]);

  saveToSQLFile('Province', columns, values, 'Province.sql');
};

export const saveCitiesToSQLFile = (cities: City[]) => {
  const columns = ['id', 'code', 'provinceId', 'name'];
  const values = cities.map(({ id, code, provinceId, name }) => [id, code, provinceId, name]);

  saveToSQLFile('City', columns, values, 'City.sql');
};
