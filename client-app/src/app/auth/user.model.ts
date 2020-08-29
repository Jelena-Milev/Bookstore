export class User {
  constructor(
    public userId: string,
    public role: string,
    private _token: string,
    public tokenExpirationDate: Date
  ) {}

  // we need token getter because it's private field
  get token() {
    if(!this.tokenExpirationDate || this.tokenExpirationDate <= new Date()){
      return null;
    }
    return this._token;
  }
}
