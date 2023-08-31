import type { Employee } from '../types/types';
import data from '$lib/employees.json';

const getAllEmployees = (): Employee[] => {
	const employees: Employee[] = data;
	return employees;
};

const getEmployee = (id: number): Employee | undefined => {
	console.log('id', id, data[0]);
	const employee: Employee | undefined = data.find((item) => item.id === Number(id));

	if (employee) {
		return employee;
	}
};

const createEmployee = (newEmployeeData: Employee) => {
	const newEmployee = { ...newEmployeeData, id: data.length };
	data.push(newEmployee);
	return newEmployee;
};

const updateEmployee = (id: number, updates: Partial<Employee>) => {
	let employee: Employee | undefined = data.find((item) => item.id === id);

	if (employee) {
		employee = Object.assign(employee, updates);
	}

	return employee;
};

const deleteEmployee = (id: number) => {
	return id;
};

export { getAllEmployees, getEmployee, createEmployee, updateEmployee, deleteEmployee };
