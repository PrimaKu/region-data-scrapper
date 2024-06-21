export class Base {
  removeNewLine(str: string) {
    return str.replace(/\n/g, ' ');
  }

  titleCase(str: string, whitelist?: string[]) {
    return str
      .split(' ')
      .map((word) => {
        if (whitelist && whitelist.includes(word)) {
          return word;
        }
        return word[0].toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(' ');
  }
}
