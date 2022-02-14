import { ObjectId } from 'mongodb';

export abstract class Collection {
  public _id: ObjectId | null = new ObjectId();
}
