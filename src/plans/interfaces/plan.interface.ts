import { Document } from 'mongoose';

export interface Plan extends Document {
  name: string;
  price: number;
  features: string[];
  annualCover: number;
}
