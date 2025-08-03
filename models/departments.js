const mongoose = require("mongoose");

const Departments = new mongoose.Schema(
  {
    department_name: {
      type: String,
      required: true,
      unique: true,
      maxlength: 100,
    },
    department_code: {
      type: String,
      required: true,
      unique: true,
      maxlength: 10,
    },
    description: {
      type: String,
    },
    head_of_department: {
      type: String,
      maxlength: 100,
    },
    office_location: {
      type: String,
      maxlength: 100,
    },
    phone: {
      type: String,
      maxlength: 20,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

module.exports = mongoose.model("Departments", Departments);
