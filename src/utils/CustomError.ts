class CustomError extends Error {
  private _status: number;
  
  constructor(status: number, message: string) {
    super(message);
    this._status = status;
  }

  public get status() {
    return this._status;
  }
}

export default CustomError;