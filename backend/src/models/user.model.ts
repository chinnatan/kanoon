export class UserModel {
  id: number;
  username: string;
  fullname:string;
  role: string;
  store_id: number;
  store_name:string;
  token: string | undefined;
  refresh_token: string | undefined;
  exp: any;
  iat: any;

  constructor(id: number, username: string, fullname:string, role: string, store_id: number, store_name:string) {
    this.id = id;
    this.username = username;
    this.fullname = fullname;
    this.role = role;
    this.store_id = store_id;
    this.store_name = store_name;
  }
}
