import fs from 'fs';
import path from 'path';
import { City } from '../class/city';
import { Province } from '../class/province';

export class FileService {
  private readonly basePath = path.join(__dirname, '../result');

  public saveProvincesToSQLFile(provinces: Province[]) {
    const columns = ['id', 'code', 'name'];
    const values = provinces.map(({ id, code, name }) => [id, code, name]);

    this.saveToSQLFile('Province', columns, values, 'Province.sql');
  }

  public saveCitiesToSQLFile(cities: City[]) {
    const columns = ['id', 'code', 'provinceId', 'name'];
    const values = cities.map(({ id, code, province, name }) => [id, code, province.id, name]);

    this.saveToSQLFile('City', columns, values, 'City.sql');
  }

  private saveToSQLFile(table: string, columns: string[], values: any[][], fileName: string) {
    const filePath = path.join(this.basePath, fileName);
    const valuesString = values
      .map((valueArray) => `(${valueArray.map((value) => `'${value}'`).join(', ')})`)
      .join(',\n');
    const sqlStatements = `INSERT INTO ${table} (${columns.join(', ')}) VALUES\n${valuesString};`;

    fs.writeFileSync(filePath, sqlStatements);
    console.log(`${table} saved to ${filePath}`);
  }
}
