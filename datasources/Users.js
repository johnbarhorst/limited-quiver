import { MongoDataSource } from 'apollo-datasource-mongodb';

export default class Users extends MongoDataSource {
  getByID(id) {
    return this.findOneById(id);
  }
}