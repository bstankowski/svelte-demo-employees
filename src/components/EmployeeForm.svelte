<script lang="ts">
	import { Input, Label } from 'flowbite-svelte';
	import { enhance } from '$app/forms';
	import type { Employee } from '$lib/types';
	import type { SubmitFunction } from '@sveltejs/kit';

	export let id: string;
	export let action: string;
	export let enhanceCallback: SubmitFunction<
		Record<string, unknown> | undefined,
		Record<string, unknown> | undefined
	> = () => undefined;

	export let data: Employee | undefined = undefined;
</script>

<form {id} {action} method="POST" use:enhance={enhanceCallback}>
	<div class="grid gap-6 mb-6 md:grid-cols-2">
		<input type="hidden" name="id" value={data?._id} />
		<div>
			<Label for="first_name" class="mb-2">First name</Label>
			<Input type="text" id="first_name" name="first_name" value={data?.first_name} />
		</div>
		<div>
			<Label for="last_name" class="mb-2">Last name</Label>
			<Input type="text" id="last_name" name="last_name" value={data?.last_name} required />
		</div>
		<div>
			<Label for="age" class="mb-2">Age</Label>
			<Input type="number" id="age" name="age" value={data?.age} />
		</div>
		<div>
			<Label for="department" class="mb-2">Department</Label>
			<Input type="text" id="department" name="department" value={data?.department} />
		</div>
		<div>
			<Label for="job_title" class="mb-2">Job Title</Label>
			<Input type="text" id="job_title" name="job_title" value={data?.job_title} />
		</div>
		<div>
			<Label for="email" class="mb-2">Email</Label>
			<Input type="email" id="email" name="email" value={data?.email} />
		</div>
		<div>
			<Label for="phone" class="mb-2">Phone number</Label>
			<Input type="tel" id="phone" name="phone" value={data?.phone} />
		</div>
		<div>
			<Label for="salary" class="mb-2">Salary (USD)</Label>
			<Input type="number" id="salary" name="salary" value={data?.salary} />
		</div>
	</div>

	<slot name="form-message" />
	<slot name="footer" />
</form>
