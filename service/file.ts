import fs from 'fs';
import path from 'path';
import { City } from '../model/city';
import { District } from '../model/district';
import { Province } from '../model/province';

export class FileService {
  private readonly basePath = path.join(__dirname, '../result');

  public saveProvincesToSQLFile(provinces: Province[]) {
    const columns = ['id', 'code', 'name'];
    const values = provinces.map(({ id, code, name }) => [id, code, name]);

    this.saveToSQLFile('provinces', columns, values, 'provinces.sql');
  }

  public saveCitiesToSQLFile(cities: City[]) {
    const columns = ['id', 'code', 'province_id', 'name'];
    const values = cities.map(({ id, code, province, name }) => [id, code, province.id, name]);

    this.saveToSQLFile('cities', columns, values, 'cities.sql');
  }

  public saveDistrictsToSQLFile(districts: District[]) {
    const columns = ['id', 'code', 'city_id', 'name'];
    const values = districts.map(({ id, code, city, name }) => [id, code, city.id, name]);

    this.saveToSQLFile('districts', columns, values, 'districts.sql');
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
