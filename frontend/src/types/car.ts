export type Car = {
  _id?: string;
  title: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuel: string;
  transmission: string;
  engine: string;
  power: string;
  color: string;
  description: string;
  images: string[];
  status: "available" | "reserved" | "sold";
  featured: boolean;
};
