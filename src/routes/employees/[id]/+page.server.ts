import { deleteEmployee, getEmployee, updateEmployee } from '$lib/api';
import { getEmployeeDetailsFromFormData } from '$lib/forms.js';
import { messages } from '$lib/messages.js';
import type { Actions } from './$types';
import type { Employee } from '$lib/types';

export function load({ params }: { params: { id: number } }) {
	return getEmployee(params.id);
}

export const actions = {
	update: async ({ request }) => {
		const data = await request.formData();
		const updates = getEmployeeDetailsFromFormData(data);
		await updateEmployee(data.get('id') as Employee['_id'], updates);

		return {
			success: messages.employeeUpdated
		};
	},

	delete: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id');
		const deletedId = await deleteEmployee(String(id));

		if (deletedId) {
			return deletedId.toString();
		}
	}
} satisfies Actions;
