export class Base {
  removeNewLine(str: string) {
    return str.replace(/\n/g, ' ');
  }

  titleCase(str: string) {
    return str
      .toLowerCase()
      .split(' ')
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(' ');
  }

  formatName(name: string) {
    return this.titleCase(this.removeNewLine(name));
  }
}
