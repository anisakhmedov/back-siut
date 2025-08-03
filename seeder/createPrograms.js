const mongoose = require('mongoose');
const Program = require('../models/programs');
const Department = require('../models/departments');

mongoose.connect('mongodb://localhost:27017/university', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Connection error:', err));

async function createPrograms() {
  try {
    const departments = await Department.find({});
    if (departments.length === 0) throw new Error('Нет департаментов');

    const depMap = {};
    departments.forEach(dep => {
      depMap[dep.department_code] = dep._id;
    });

    const programs = [
      {
        program_name: 'Artificial Intelligence',
        program_code: 'AI01',
        department_code: 'TN01',
        degree_level: 'Bachelor',
        total_credits: 240,
        duration_years: 4,
        description: 'Программа по ИИ'
      },
      {
        program_name: 'Cybersecurity',
        program_code: 'CS01',
        department_code: 'SN01',
        degree_level: 'Bachelor',
        total_credits: 240,
        duration_years: 4,
        description: 'Программа по кибербезопасности'
      },
      {
        program_name: 'Graphic Design',
        program_code: 'GD01',
        department_code: 'AF01',
        degree_level: 'Bachelor',
        total_credits: 180,
        duration_years: 3,
        description: 'Программа по дизайну'
      },
      {
        program_name: 'Renewable Energy',
        program_code: 'RE01',
        department_code: 'GP01',
        degree_level: 'Bachelor',
        total_credits: 240,
        duration_years: 4,
        description: 'Энергетика будущего'
      },
      {
        program_name: 'Product Design',
        program_code: 'PD01',
        department_code: 'AF01',
        degree_level: 'Bachelor',
        total_credits: 180,
        duration_years: 3,
        description: 'Промышленный дизайн'
      }
    ];

    for (const prog of programs) {
      const deptId = depMap[prog.department_code];
      if (!deptId) {
        console.log(`Пропущено: ${prog.program_name} — департамент не найден.`);
        continue;
      }

      await Program.create({
        program_name: prog.program_name,
        program_code: prog.program_code,
        department_id: deptId,
        degree_level: prog.degree_level,
        total_credits: prog.total_credits,
        duration_years: prog.duration_years,
        description: prog.description
      });
      console.log(`✅ Добавлено: ${prog.program_name}`);
    }

    console.log('🎉 Программы успешно добавлены.');
    process.exit();
  } catch (err) {
    console.error('❌ Ошибка:', err);
    process.exit(1);
  }
}

createPrograms();