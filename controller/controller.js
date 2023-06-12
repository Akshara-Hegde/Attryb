const { Inventory } = require("@mui/icons-material");
const OEM = require("../Models/OEM");
const Cars = require("../Models/inventory");

const getOEMS = async (req, res) => {
  try {
    const searchTerm = req.params.search;
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
    res.json(ans);
  } catch (err) {
    console.log(err);
  }
};

const numberOfManufacturers = async (req, res) => {
  try {
    const count = await OEM.distinct("manufacturer").length;
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
    console.log(car);
    return res.status(201).json(car);
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
    console.log(req.body);
    if (!car) {
      console.log("id not valid");
      return res.send("invalid id");
    }
    // const updatedCarData = JSON.parse(req.body.item);
    const updatedCarData = req.body
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

module.exports = {
  view,
  viewSingle,
  getOEMS,
  deleteCar,
  edit,
  numberOfManufacturers,
  add,
};
