export default class ServerException extends Error {

  status: number;
  
  constructor(message: string, status: number) {
    super(message);
    this.name = "ServerException";
    this.status = status;
  }
}