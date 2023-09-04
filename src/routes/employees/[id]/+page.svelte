<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import { TrashBinOutline } from 'flowbite-svelte-icons';
	import { enhance } from '$app/forms';
	import type { Employee } from '$lib/types';
	import EmployeeForm from '$components/EmployeeForm.svelte';
	import type { ActionFailure } from '@sveltejs/kit';
	import type { ActionsSuccess } from './$types';
	import Message from '$components/Message.svelte';

	export let data: Employee | undefined;
	export let form: ActionFailure<{ error: string }>['data'] | ActionsSuccess<Record<string, any>>;

	$: message = form?.error || form?.success;
</script>

<EmployeeForm
	id="form-update"
	action="?/update"
	enhanceCallback={() => {
		return async ({ update }) => {
			await update({ reset: false });
		};
	}}
	{data}
/>

<form
	id="form-delete"
	method="POST"
	action="?/delete"
	use:enhance={() => {
		return async ({ result, update }) => {
			await update();

			if (result.type === 'success') {
				history.back();
			}
		};
	}}
>
	<input type="hidden" name="id" value={data?._id} />
</form>

<Message {message} />

<div class="flex justify-between">
	<Button type="submit" form="form-update">Save</Button>

	<Button outline={true} type="submit" form="form-delete" color="red">
		<TrashBinOutline size="xs" class="mr-1" />
		Delete
	</Button>
</div>
