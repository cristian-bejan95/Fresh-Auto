import mongoose, { Schema } from "mongoose";

export interface ICar {
  title: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  oldPrice?: number;
  mileage: number;
  fuel: string;
  transmission: string;
  engine: string;
  power: string;
  color: string;
  wheldrive: string;
  description: string;
  images: string[];
  status: "available" | "reserved" | "sold" | "discount";
  featured: boolean;
}

const carSchema = new Schema<ICar>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    brand: {
      type: String,
      required: true,
      trim: true,
    },
    model: {
      type: String,
      required: true,
      trim: true,
    },
    year: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    oldPrice: {
      type: Number,
      default: undefined,
    },
    mileage: {
      type: Number,
      required: true,
    },
    fuel: {
      type: String,
      required: true,
    },
    transmission: {
      type: String,
      required: true,
    },
    engine: {
      type: String,
      required: true,
    },
    power: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    wheldrive: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ["available", "reserved", "sold", "discount"],
      default: "available",
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const Car = mongoose.model<ICar>("Car", carSchema);

export default Car;
