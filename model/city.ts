import { Base } from './base';
import type { Province } from './province';

export class City extends Base {
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
    super();
    this.id = id;
    this.name = this.formatName(name);
    this.code = `${province.code}${key}`;
    this.provinceId = province.id;
    this.province = province;
  }
}
