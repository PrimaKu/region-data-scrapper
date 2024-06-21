export class Province {
  id: number;
  code: string;
  name: string;

  constructor({ id, key, name }: { id: number; key: string; name: string }) {
    this.id = id;
    this.code = key;
    this.name = name.replace(/\n/g, ' ');
  }
}
