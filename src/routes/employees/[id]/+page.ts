import { error } from '@sveltejs/kit';
import { getEmployee } from '$lib/api';

export const load = ({ params }: { params: { id: number } }) => {
	const employee = getEmployee(params.id);

	if (employee) {
		return employee;
	}

	throw error(404, 'Employee not found');
};
