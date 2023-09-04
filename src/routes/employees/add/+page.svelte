<script>
	import { Button, Heading, Spinner } from 'flowbite-svelte';
	import Message from '$components/Message.svelte';
	import EmployeeForm from '$components/EmployeeForm.svelte';

	export let form; // Available only after form submission
	export let isBusy = false;
</script>

<header class="flex justify-start">
	<div class="mr-4">
		<Button size="sm" outline={true} on:click={() => history.back()}>Back</Button>
	</div>

	<Heading customSize="text-3xl font-extrabold text-left mb-8">Add an Employee</Heading>
</header>

<EmployeeForm
	data={undefined}
	id="form-create"
	action="?/create"
	enhanceCallback={() => {
		isBusy = true;
		return async ({ update }) => {
			update();
			isBusy = false;
		};
	}}
>
	<Message type="error" message={form?.error} slot="form-message" />

	<div class="flex justify-between" slot="footer">
		<Button type="submit" disabled={isBusy}>
			{#if isBusy}
				<Spinner size="4" color="white" class="mr-2" />
				Saving…
			{:else}
				Save
			{/if}
		</Button>
	</div>
</EmployeeForm>
