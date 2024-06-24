import * as mongoose from 'mongoose';

export const PetSchema = new mongoose.Schema({
  pet: String,
  name: String,
  race: String,
  birthDate: Date,
  clientId: String,
});
