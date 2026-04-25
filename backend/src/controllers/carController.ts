import { Request, Response } from "express";
import Car from "../models/Car";
import { AuthRequest } from "../middleware/authMiddleware";

export async function createCar(req: AuthRequest, res: Response) {
  try {
    const {
      title,
      brand,
      model,
      year,
      price,
      mileage,
      fuel,
      transmission,
      engine,
      power,
      color,
      wheldrive,
      description,
      images,
      status,
      featured,
    } = req.body;

    if (
      !title ||
      !brand ||
      !model ||
      !year ||
      !price ||
      !mileage ||
      !fuel ||
      !transmission ||
      !engine ||
      !power ||
      !color ||
      !wheldrive ||
      !description
    ) {
      return res.status(400).json({
        message: "Completează toate câmpurile obligatorii",
      });
    }

    const newCar = await Car.create({
      title,
      brand,
      model,
      year,
      price,
      mileage,
      fuel,
      transmission,
      engine,
      power,
      color,
      wheldrive,
      description,
      images: images || [],
      status: status || "available",
      featured: featured || false,
    });

    return res.status(201).json({
      message: "Mașina a fost adăugată cu succes",
      car: newCar,
    });
  } catch (error) {
    console.error("Eroare createCar:", error);
    return res.status(500).json({
      message: "Eroare server la adăugarea mașinii",
    });
  }
}

export async function getCars(req: Request, res: Response) {
  try {
    const search = String(req.query.search || "").trim();

    let filter: any = {};

    if (search) {
      const words = search.split(" ").filter(Boolean);

      filter.$and = words.map((word) => ({
        $or: [
          { title: { $regex: word, $options: "i" } },
          { brand: { $regex: word, $options: "i" } },
          { model: { $regex: word, $options: "i" } },
          { fuel: { $regex: word, $options: "i" } },
          { transmission: { $regex: word, $options: "i" } },
          { color: { $regex: word, $options: "i" } },
          { traction: { $regex: word, $options: "i" } },
          ...(isNaN(Number(word)) ? [] : [{ year: Number(word) }]),
        ],
      }));
    }

    const cars = await Car.find(filter).sort({ createdAt: -1 });

    return res.status(200).json(cars);
  } catch (error) {
    return res.status(500).json({
      message: "Eroare la încărcarea mașinilor",
    });
  }
}

export async function getCarById(req: Request, res: Response) {
  try {
    const car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).json({
        message: "Mașina nu a fost găsită",
      });
    }

    return res.status(200).json(car);
  } catch (error) {
    console.error("Eroare getCarById:", error);
    return res.status(500).json({
      message: "Eroare server la încărcarea mașinii",
    });
  }
}

export async function updateCar(req: AuthRequest, res: Response) {
  try {
    const updatedCar = await Car.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedCar) {
      return res.status(404).json({
        message: "Mașina nu a fost găsită",
      });
    }

    return res.status(200).json({
      message: "Mașina a fost actualizată",
      car: updatedCar,
    });
  } catch (error) {
    console.error("Eroare updateCar:", error);
    return res.status(500).json({
      message: "Eroare server la actualizarea mașinii",
    });
  }
}

export async function deleteCar(req: AuthRequest, res: Response) {
  try {
    const deletedCar = await Car.findByIdAndDelete(req.params.id);

    if (!deletedCar) {
      return res.status(404).json({
        message: "Mașina nu a fost găsită",
      });
    }

    return res.status(200).json({
      message: "Mașina a fost ștearsă",
    });
  } catch (error) {
    console.error("Eroare deleteCar:", error);
    return res.status(500).json({
      message: "Eroare server la ștergerea mașinii",
    });
  }
}

export async function getCarStats(req: Request, res: Response) {
  try {
    const cars = await Car.find().sort({ createdAt: -1 });

    const total = cars.length;
    const available = cars.filter((car) => car.status === "available").length;
    const reserved = cars.filter((car) => car.status === "reserved").length;
    const sold = cars.filter((car) => car.status === "sold").length;

    const recentCars = cars.slice(0, 5);

    return res.status(200).json({
      total,
      available,
      reserved,
      sold,
      recentCars,
    });
  } catch (error) {
    console.error("Eroare getCarStats:", error);
    return res.status(500).json({
      message: "Eroare server la încărcarea statisticilor",
    });
  }
}
