import { getAllEmployees } from '$lib/api';

export function load() {
	return {
		employees: getAllEmployees()
	};
}
