import { Request, Response, NextFunction } from 'express';
import CustomError from '../utils/CustomError';

class ErrorHandler {
  public static handle(
    error: CustomError,
    _req: Request,
    res: Response,
    _next: NextFunction,
  ) {
    return res.status(error.status).json({ message: error.message });
  }
}

export default ErrorHandler;