export default class User {
  id: number | null;
  username: string | null;
  fullname: string | null;
  role: string | null;
  store_id: number | null;
  store_name: string | null;
  token: string | undefined;
  refresh_token: string | undefined;

  constructor() {
    this.id = null;
    this.username = null;
    this.fullname = null;
    this.role = null;
    this.store_id = null;
    this.store_name = null;
  }
}
