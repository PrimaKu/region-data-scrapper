import { Base } from "./base";
import { City } from "./city";

export class District extends Base {
  id: number;
  code: string;
  provinceId: number;
  cityId: number;
  name: string;
  city: City;

  constructor({
    id,
    key,
    name,
    city,
  }: {
    id: number;
    key: string;
    name: string;
    city: City;
  }) {
    super();
    this.id = id;
    this.name = this.titleCase(this.removeNewLine(name));
    this.code = `${city.code}${key}`;
    this.provinceId = city.provinceId;
    this.cityId = city.id;
    this.city= city;
  }
}
