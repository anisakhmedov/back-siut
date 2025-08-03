const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  date_of_birth: { type: Date, required: true },
  gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
  email: { type: String, unique: true },
  phone: { type: String },
  address: { type: String },
  city: { type: String },
  state: { type: String },
  zip_code: { type: String },
  country: { type: String },
  enrollment_date: { type: Date, required: true },
  graduation_date: { type: Date },
  status: {
    type: String,
    enum: ["Active", "Inactive", "Graduated", "Suspended"],
    default: "Active",
  },
  photo_path: { type: String },

  // 🔗 Привязка к программам
  program_id: {
    type: Schema.Types.ObjectId,
    ref: "Programs",
    required: true,
  },

  // 🔗 Привязка к семестрам
  semester_id: {
    type: Schema.Types.ObjectId,
    ref: "Semesters",
    required: true,
  },

  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Students", StudentSchema);
