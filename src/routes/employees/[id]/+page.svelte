<script lang="ts">
	import { Input, Label, Helper, Button, Checkbox, A } from 'flowbite-svelte';
	import type { Employee } from '../../../types/types';

	export let data: Employee | undefined;

	const handleSubmit = (e) => {
		console.log('handleSubmit', e.target);
	};
</script>

<form on:submit={handleSubmit}>
	<div class="grid gap-6 mb-6 md:grid-cols-2">
		<div>
			<Label for="first_name" class="mb-2">First name</Label>
			<Input type="text" id="first_name" value={data?.first_name} required />
		</div>
		<div>
			<Label for="last_name" class="mb-2">Last name</Label>
			<Input type="text" id="last_name" value={data?.last_name} required />
		</div>
		<div class="mb-6">
			<Label for="age" class="mb-2">Age</Label>
			<Input type="number" id="age" value={data?.age} required />
		</div>
		<div class="mb-6">
			<Label for="gender" class="mb-2">Gender</Label>
			<Input type="text" id="gender" value={data?.gender} required />
		</div>
		<div>
			<Label for="department" class="mb-2">Department</Label>
			<Input type="text" id="department" value={data?.department} required />
		</div>
		<div>
			<Label for="job_title" class="mb-2">Job Title</Label>
			<Input type="text" id="job_title" value={data?.job_title} required />
		</div>
		<div>
			<Label for="salary" class="mb-2">Salary (USD)</Label>
			<Input type="number" id="salary" value={data?.salary} required />
		</div>
		<div>
			<Label for="phone" class="mb-2">Phone number</Label>
			<Input type="tel" id="phone" value={data?.phone} required />
		</div>
		<div class="mb-6">
			<Label for="email" class="mb-2">Email</Label>
			<Input type="email" id="email" value={data?.email} required />
		</div>
	</div>

	<Button type="submit">Save</Button>
</form>
