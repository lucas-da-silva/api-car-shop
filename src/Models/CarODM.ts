import { Schema, isValidObjectId } from 'mongoose';
import AbstractODM from './AbstractODM';
import ICar from '../Interfaces/ICar';
import CustomError from '../utils/CustomError';

class CarODM extends AbstractODM<ICar> {
  constructor() {
    const schema = new Schema<ICar>({
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      status: { type: Boolean, required: false, default: false },
      buyValue: { type: Number, required: true },
      doorsQty: { type: Number, required: true },
      seatsQty: { type: Number, required: true },
    });
    super(schema, 'Car');
  }

  public async create(car: ICar): Promise<ICar> {
    return this.model.create({ ...car });
  }

  public async find(): Promise<ICar[]> {
    return this.model.find();
  }

  public async findById(id: string): Promise<ICar | null> {
    if (!isValidObjectId(id)) throw new CustomError(422, 'Invalid mongo id');
    return this.model.findById(id);
  }
}

export default CarODM;