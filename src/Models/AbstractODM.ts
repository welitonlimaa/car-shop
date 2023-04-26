import {
  Model, Schema, models,
  model, isValidObjectId, UpdateQuery,
} from 'mongoose';

abstract class AbstractODM<T> {
  protected model: Model<T>;
  private schema: Schema;
  protected modelName: string;

  constructor(schema: Schema, modelName: string) {
    this.schema = schema;
    this.modelName = modelName;
    this.model = models[this.modelName] || model(modelName, this.schema);
  }

  public async create(data: T): Promise<T> {
    return this.model.create({ ...data });
  }

  public async getAll(): Promise<T[]> {
    const result = await this.model.find({});

    return result;
  }

  public async getById(id: string) {
    if (!isValidObjectId(id)) return { type: 422, message: { message: 'Invalid mongo id' } };

    const result = await this.model.findOne({ _id: id });

    if (!result) return { type: 404, message: { message: `${this.modelName} not found` } };

    return { type: null, message: result };
  }

  public async update(id: string, data: T) {
    if (!isValidObjectId(id)) return { type: 422, message: { message: 'Invalid mongo id' } };

    const updatedData = await this.model.findByIdAndUpdate(
      { _id: id },
      { ...data } as UpdateQuery<T>,
      { new: true },
    );

    if (!updatedData) return { type: 404, message: { message: `${this.modelName} not found` } };

    return { type: null, message: updatedData };
  }
}

export default AbstractODM;