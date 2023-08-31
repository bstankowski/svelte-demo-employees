// /** @type {import('./$types').PageLoad} */

// const API_URL = 'https://api.slingacademy.com/v1/sample-data/files/employees.json';

import { getAllEmployees } from '$lib/api';

export async function load() {
	// const response = await fetch(API_URL);
	// const customers = await response.json();

	// const genders = Object.keys(groupBy(employees, 'gender'));
	// const jobTitles = Object.keys(groupBy(employees, 'job_title'));

	// console.log('genders', genders);
	// console.log('jobTitles', jobTitles);

	return {
		employees: getAllEmployees()
		// genders,
		// jobTitles
	};
}
