import { Base } from './base';

export class Province extends Base {
  id: number;
  code: string;
  name: string;

  constructor({ id, key, name }: { id: number; key: string; name: string }) {
    super();
    this.id = id;
    this.code = key;
    this.name = this.titleCase(this.removeNewLine(name), ['DKI', 'DI']);
  }
}
