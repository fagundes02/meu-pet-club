import { Document } from 'mongoose';

export interface Pet extends Document {
  pet: String;
  race: String;
  name: String,
  birthDate: Date,
  clientId: String,
}