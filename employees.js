const express = require('express');
const router = express.Router();
const Employee = require('../models/employee');

// Create an employee
router.post('/', async (req, res) => {
  const employee = new Employee({
    name: req.body.name,
    position: req.body.position,
    office: req.body.office,
    salary: req.body.salary
  });
  try {
    const savedEmployee = await employee.save();
    res.json(savedEmployee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Read all employees
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Read one employee
router.get('/:id', getEmployee, (req, res) => {
  res.json(res.employee);
});

// Update an employee
router.put('/:id', getEmployee, async (req, res) => {
  if (req.body.name != null) {
    res.employee.name = req.body.name;
  }
  if (req.body.position != null) {
    res.employee.position = req.body.position;
  }
  if (req.body.office != null) {
    res.employee.office = req.body.office;
  }
  if (req.body.salary != null) {
    res.employee.salary = req.body.salary;
  }
  try {
    const updatedEmployee = await res.employee.save();
    res.json(updatedEmployee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an employee
router.delete('/:id', getEmployee, async (req, res) => {
  try {
    await res.employee.remove();
    res.json({ message: 'Deleted Employee' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function to get an employee by ID
async function getEmployee(req, res, next) {
  let employee;
  try {
    employee = await Employee.findById(req.params.id);
    if (employee == null) {
      return res.status(404).json({ message: 'Cannot find employee' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.employee = employee;
  next();
}

module.exports = router;