import { fail, redirect } from '@sveltejs/kit';
import { createEmployee } from '$lib/api';
import { getEmployeeDetailsFromFormData } from '$lib/forms.js';
import type { Actions } from './$types';

export const actions = {
	create: async ({ request }) => {
		// Simulate a slow request
		// TODO Delete this, it's just for testing.
		await new Promise((resolve) => setTimeout(resolve, 1000));

		const data = await request.formData();
		const employeeData = getEmployeeDetailsFromFormData(data);

		// This is not a complete validation, just checking two of the required fields for testing
		if (!employeeData.first_name || !employeeData.last_name || !employeeData.email) {
			return fail(400, {
				error: 'Employee name and email are required'
			});
		}

		const newEmployeeId = await createEmployee(employeeData);

		throw redirect(303, `/employees/${newEmployeeId}`);
	}
} satisfies Actions;
