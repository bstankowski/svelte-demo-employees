import db from '$db/mongo';
import type { Employee } from '$lib/types';

export const employees = db.collection<Employee>('employees');
