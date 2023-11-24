import { Request, Response } from 'express';
import Employee from '../model/employeeModel';
import { IEmploy } from '../interface/employeeInterface';

export const getEmployee = async (req: Request, res: Response): Promise<void> => {
    try {
        const employee = await Employee.find();
        res.status(200).json( employee )
    } catch (error) {
        throw error
    }
}

export const createEmployee = async (req: Request, res: Response): Promise<void> => {
    try {
        const body = req.body as Pick<IEmploy, 'name' | 'age' | 'salary'>

        const employ: IEmploy = new Employee({
            name: body.name,
            age: body.age,
            salary: body.salary
        })

        const newEmploy: IEmploy = await employ.save()
        const allEmploy: IEmploy[] = await Employee.find()

        res.status(200).json({ msg: 'Employee created', employee: newEmploy, employees: allEmploy })
    } catch (error) {
        throw error
    }
}

export const updateEmployee = async (req: Request, res: Response): Promise<void> => {
    try {
        const { params: { id }, body } = req
        const updateEmploy: IEmploy | null = await Employee.findByIdAndUpdate( 
            { _id: id },
            body
        )
        const allEmployee: IEmploy[] = await Employee.find()
        res.status(200).json({
            msg: 'employee updated',
            employee: updateEmploy,
            employees: allEmployee
        })
    } catch (error) {
        throw error
    }
}

export const deleteEmployee = async (req: Request, res: Response): Promise<void> => {
    try {
        const deletedEmploy: IEmploy | null = await Employee.findByIdAndRemove(
            req.params.id
        )
        const allEmployee: IEmploy[] = await Employee.find()
        res.status(200).json({
            msg: 'employee deleted',
            employee: deletedEmploy,
            employees: allEmployee
        })
    } catch (error) {
        throw error
    }
}