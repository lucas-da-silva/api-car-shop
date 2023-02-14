import MessageError from './MessageError';
import HttpStatus from './HttpStatus';

class CustomError extends Error {
  private _status: HttpStatus;
  
  constructor(status: HttpStatus, message: MessageError) {
    super(message);
    this._status = status;
  }

  public get status() {
    return this._status;
  }
}

export default CustomError;