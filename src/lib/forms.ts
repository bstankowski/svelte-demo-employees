import { fail, type HttpError } from '@sveltejs/kit';
import type { Employee } from './types';

export const getEmployeeDetailsFromFormData = (data: FormData) => {
	return {
		first_name: data.get('first_name'),
		last_name: data.get('last_name'),
		email: data.get('email'),
		phone: data.get('phone'),
		gender: data.get('gender'),
		age: data.get('age') ? Number(data.get('age')) : undefined,
		job_title: data.get('job_title'),
		years_of_experience: Number(data.get('years_of_experience')),
		salary: Number(data.get('salary')),
		department: data.get('department')
	} as Omit<Employee, '_id'>;
};

export const handleFailedFormAction = (error: unknown) => {
	const err = error as HttpError;

	return fail(err.status, {
		error: err.body?.message
	});
};
