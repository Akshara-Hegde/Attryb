const { Inventory } = require("@mui/icons-material");
const OEM = require("../Models/OEM");
const Cars = require("../Models/inventory");

const getOEMS = async (req, res) => {
  try {
    const searchTerm = req.query.query || "";
    console.log(searchTerm);
    const paint = req.query.paint ? req.query.paint : "";
    const price = req.query.price;

    const ans = await OEM.find({
      $or: [
        { manufacturer: { $regex: searchTerm, $options: "i" } },
        { model: { $regex: searchTerm, $options: "i" } },
        { year: { $regex: searchTerm, $options: "i" } },
      ],
    });
    console.log(ans)
    res.json(ans);
  } catch (err) {
    console.log(err);
  }
};

const numberOfManufacturers = async (req, res) => {
  try {
    const count = await OEM.count();
    console.log(count)
    res.json({ count });
  } catch (error) {
    console.error("Error retrieving the number of OEM models:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

const view = async (req, res) => {
  try {
    const search = req.query.query || "";
    console.log(req.query.query);
    const car = await Cars
      .find
      //   {
      //   $or: [
      //     { company: { $regex: search, $options: "i" } },
      //     { name: { $regex: search, $options: "i" } },
      //     { year: { $regex: search, $options: "i" } },
      //   ],
      // }
      ();

    if (!car) {
      return res.send("No data found");
    }
    // console.log(car);
    const role = req.user.role;
    const response = { car, role };
    return res.status(201).json(response);
  } catch (err) {
    console.log(err);
  }
};

const viewSingle = async (req, res) => {
  try {
    const id = req.params.id;
    const car = await Cars.findById(id);
    if (!car) {
      return res.send("invalid request");
    }
    res.json(car);
  } catch (err) {
    console.log(err);
  }
};

const add = async (req, res) => {
  try {
    const {
      odometer,
      scratches,
      paint,

      accidents,
      previous_owners,
      registration_place,
      price,
      photo,
    } = req.body;
    const car = await Cars.create({
      odometer,
      scratches,
      paint,

      accidents,
      previous_owners,
      registration_place,
      price,
      photo,
    });
    res.status(200).json(car);
  } catch (err) {
    console.log(err);
  }
};

const edit = async (req, res) => {
  try {
    const id = req.params.id;
    const car = await Cars.findById(id);
    console.log(req.body.item);
    if (!car) {
      console.log("id not valid");
      return res.send("invalid id");
    }
    // const updatedCarData = JSON.parse(req.body.item);
    const updatedCarData = JSON.parse(req.body.item);
    const vehicle = await Cars.findByIdAndUpdate(id, updatedCarData, {
      new: true,
    });
    console.log(vehicle);
    res.status(200).json(vehicle);
  } catch (err) {
    console.log(err);
  }
};

const deleteCar = async (req, res) => {
  try {
    const id = req.params.id;
    const car = await Cars.findById(id);
    if (!car) {
      return res.send("invalid request");
    }
    await Cars.findByIdAndDelete(id);
    res.send("Deleted Succesfully");
  } catch (err) {
    console.log(err);
  }
};

// const records = [
//   {
//     manufacturer: "Honda",
//     model: "BRV",
//     year: "2022",
//     price: "1000000",
//     colors: ["Red", "Blue"],
//     mileage: "15",
//     power: "100BHP",
//     top_speed: "150kmph",
//   },
//   {
//     manufacturer: "Honda",
//     model: "CRV",
//     year: "2022",
//     price: "1200000",
//     colors: ["Red", "Green"],
//     mileage: "15",
//     power: "110BHP",
//     top_speed: "170kmph",
//   },
//   {
//     manufacturer: "Honda",
//     model: "Ciaz",
//     year: "2023",
//     price: "150000",
//     colors: ["Black", "Silver"],
//     mileage: "30",
//     power: "180bhp",
//     top_speed: "140kmph",
//   },
//   {
//     manufacturer: "Maruti Suzuki",
//     model: "Swift",
//     year: "2022",
//     price: "120000",
//     colors: ["Green", "Yellow"],
//     mileage: "17",
//     power: "220BHP",
//     top_speed: "160kmph",
//   },
//   {
//     manufacturer: "Renault",
//     model: "Duster",
//     year: "2022",
//     price: "820000",
//     colors: ["Green", "Black"],
//     mileage: "17",
//     power: "120BHP",
//     top_speed: "190kmph",
//   },
//   {
//     manufacturer: "Skoda",
//     model: "Rapid",
//     year: "2020",
//     price: "700000",
//     colors: ["White", "Black"],
//     mileage: "17",
//     power: "140BHP",
//     top_speed: "150kmph",
//   },
//   {
//     manufacturer: "Audi",
//     model: "A3",
//     year: "2019",
//     price: "1820000",
//     colors: ["Red", "Black"],
//     mileage: "17",
//     power: "220BHP",
//     top_speed: "210kmph",
//   },
//   {
//     manufacturer: "BMW",
//     model: "x7",
//     year: "2016",
//     price: "1220000",
//     colors: ["Green", "White"],
//     mileage: "10",
//     power: "280BHP",
//     top_speed: "230kmph",
//   },
//   {
//     manufacturer: "Kia",
//     model: "Sonnet",
//     year: "2020",
//     price: "820000",
//     colors: ["White", "Red"],
//     mileage: "17",
//     power: "100BHP",
//     top_speed: "130kmph",
//   },
  // ...
//];

//  OEM.insertMany(records)
//   .then(() => {
//     console.log("inserted");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

module.exports = {
  view,
  viewSingle,
  getOEMS,
  deleteCar,
  edit,
  numberOfManufacturers,
  add,
};
