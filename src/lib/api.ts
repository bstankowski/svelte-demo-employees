import { ObjectId } from 'mongodb';
import { error } from '@sveltejs/kit';
import { employees as db } from '$db/employees';
import type { Employee } from '$lib/types';
import { messages } from '$lib/messages';
import { handleFailedFormAction } from '$lib/forms';

const getAllEmployees = async () => {
	const data = await db
		.find(
			{},
			{
				projection: {
					// Return all fields except the following:
					email: false,
					phone: false,
					gender: false,
					years_of_experience: false
				}
			}
		)
		.toArray();

	return data.map((item) => ({
		...item,
		// Svelte's server `load` function must return data serializable by `devalue`, and Mongo's `ObjectId` is not.
		_id: item._id.toString()
	}));
};

const getEmployee = async (id: number) => {
	const employee = await db.findOne({
		_id: new ObjectId(id)
	});

	if (employee) {
		return {
			...employee,
			_id: employee._id.toString()
		};
	} else {
		throw error(404, messages.employeeNotFound);
	}
};

const createEmployee = async (newEmployeeData: Omit<Employee, '_id'>) => {
	try {
		const response = await db.insertOne(newEmployeeData as Employee);
		return response.insertedId.toString();
	} catch (err) {
		return handleFailedFormAction(err);
	}
};

const updateEmployee = async (id: Employee['_id'], updates: Omit<Employee, '_id'>) => {
	try {
		const { acknowledged, modifiedCount } = await db.updateOne(
			{ _id: new ObjectId(id) },
			{ $set: { ...updates } }
		);

		if (acknowledged && !modifiedCount) {
			throw error(404, messages.employeeNotFound);
		}
	} catch (err) {
		return handleFailedFormAction(err);
	}

	return { _id: id, ...updates };
};

const deleteEmployee = async (id: Employee['_id']) => {
	try {
		const { acknowledged, deletedCount } = await db.deleteOne({
			_id: new ObjectId(id)
		});

		if (acknowledged && !deletedCount) {
			throw error(404, messages.employeeNotFound);
		}
	} catch (err) {
		return handleFailedFormAction(err);
	}

	return id;
};

export { createEmployee, deleteEmployee, getAllEmployees, getEmployee, updateEmployee };
