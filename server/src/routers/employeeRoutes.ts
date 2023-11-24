import express from "express";
const employeeRouter = express();

import {
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../controller/employeeController";


employeeRouter.get('/', getEmployee);
employeeRouter.post('/', createEmployee);
employeeRouter.put('/:id', updateEmployee);
employeeRouter.delete('/:id', deleteEmployee);

export default employeeRouter;