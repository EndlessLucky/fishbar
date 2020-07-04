export class PhoneNumber {
  country: string;
  area: string;
  prefix: string;
  line: string;

  // format phone numbers as E.164
  get e164(): string {
    const num = this.country + this.area + this.prefix + this.line;
    return `+${num}`;
  }
}
