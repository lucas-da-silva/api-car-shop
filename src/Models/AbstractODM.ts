import {
  isValidObjectId,
  model,
  Model,
  models,
  Schema,
  UpdateQuery,
} from 'mongoose';
import CustomError from '../utils/CustomError';
import MessageError from '../utils/MessageError';
import HttpStatus from '../utils/HttpStatus';

abstract class AbstractODM<T> {
  protected model: Model<T>;
  protected schema: Schema;
  protected modelName: string;

  constructor(schema: Schema, modelName: string) {
    this.schema = schema;
    this.modelName = modelName;
    this.model = models[this.modelName] || model(this.modelName, this.schema);
  }

  public async create(obj: Partial<T>): Promise<T> {
    return this.model.create({ ...obj });
  }

  public async find(): Promise<T[]> {
    return this.model.find();
  }

  public async findById(id: string): Promise<T | null> {
    this.isValidId(id);
    return this.model.findById(id);
  }

  public async update(_id: string, obj: Partial<T>): Promise<T | null> {
    this.isValidId(_id);
    return this.model.findByIdAndUpdate({ _id }, { ...obj } as UpdateQuery<T>, {
      new: true,
    });
  }

  public async delete(_id: string): Promise<T | null> {
    this.isValidId(_id);
    return this.model.findByIdAndDelete({ _id });
  }

  private isValidId(id: string): void {
    if (!isValidObjectId(id)) {
      throw new CustomError(
        HttpStatus.UNPROCESSABLE_ENTITY,
        MessageError.INVALID_MONGO_ID,
      );
    }
  }
}

export default AbstractODM;
