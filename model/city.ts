import type { Province } from './province';

export class City {
  id: number;
  code: string;
  provinceId: number;
  name: string;
  province: Province;

  constructor({
    id,
    key,
    name,
    province,
  }: {
    id: number;
    key: string;
    name: string;
    province: Province;
  }) {
    this.id = id;
    this.name = name.replace(/\n/g, ' ');
    this.code = `${province.code}${key}`;
    this.provinceId = province.id;
    this.province = province;
  }
}
