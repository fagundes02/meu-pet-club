import * as mongoose from 'mongoose';

export const PlanSchema = new mongoose.Schema({
  name: String,
  price: Number,
  features: [String],
  annualCover: Number,
});