const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");
const Student = require("../models/students");
const Program = require("../models/programs");
const Semester = require("../models/semesters");

mongoose
  .connect("mongodb://localhost:27017/university", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ Connection error:", err));

const genders = ["Male", "Female"];

async function createStudents() {
  try {
    const programs = await Program.find();
    const semesters = await Semester.find();

    if (!programs.length || !semesters.length)
      throw new Error("Programs or Semesters not found");

    for (let i = 0; i < 30; i++) {
      const gender = faker.helpers.arrayElement(genders);
      const program = faker.helpers.arrayElement(programs);
      const semester = faker.helpers.arrayElement(semesters);

      const student = new Student({
        first_name: faker.person.firstName(
          gender === "Male" ? "male" : "female"
        ),
        last_name: faker.person.lastName(),
        date_of_birth: faker.date.between({
          from: "2000-01-01",
          to: "2006-12-31",
        }),
        gender,
        email: faker.internet.email(),
        phone: faker.phone.number(),
        address: faker.address.streetAddress(),
        city: faker.address.city(),
        state: faker.address.state(),
        zip_code: faker.address.zipCode(),
        country: faker.address.country(),
        enrollment_date: faker.date.past({ years: 2 }),
        graduation_date: faker.date.future({ years: 2 }),
        status: faker.helpers.arrayElement([
          "Active",
          "Graduated",
          "Suspended",
        ]),
        photo_path: faker.image.avatar(),
        program_id: program._id,
        semester_id: semester._id,
      });

      await student.save();
      console.log(
        `✅ Student ${i + 1} added: ${student.first_name} ${student.last_name}`
      );
    }

    console.log("🎉 All 30 students created.");
    process.exit();
  } catch (err) {
    console.error("❌ Error:", err);
    process.exit(1);
  }
}

createStudents();
