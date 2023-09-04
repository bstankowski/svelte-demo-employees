import type { ObjectId } from 'mongodb';

export interface Employee {
	_id: string | ObjectId;
	first_name: string | null | undefined;
	last_name: string | null | undefined;
	email: string | null | undefined;
	phone: string | null | undefined;
	gender: string | null | undefined;
	age: number | null | undefined;
	job_title: string | null | undefined;
	years_of_experience: number | null | undefined;
	salary: number | null | undefined;
	department: string | null | undefined;
}
