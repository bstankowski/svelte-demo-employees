<script lang="ts">
	import {
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		TableSearch
	} from 'flowbite-svelte';
	import { goto } from '$app/navigation';
	import type { Snapshot } from './$types';

	export let data;

	let searchTerm = '';

	export const snapshot: Snapshot<string> = {
		capture: () => searchTerm,
		restore: (value: string) => (searchTerm = value)
	};

	$: employees = data.employees.filter((item) => {
		const itemValues = Object.values(item).join();
		return itemValues.toLowerCase().includes(searchTerm);
	});
</script>

<div>
	<TableSearch placeholder="Search" hoverable={true} bind:inputValue={searchTerm}>
		<TableHead>
			<TableHeadCell>id</TableHeadCell>
			<TableHeadCell>Full Name</TableHeadCell>
			<TableHeadCell>Age</TableHeadCell>
			<TableHeadCell>Department</TableHeadCell>
			<TableHeadCell>Job Title</TableHeadCell>
			<TableHeadCell>Salary (USD)</TableHeadCell>
		</TableHead>
		<TableBody>
			{#each employees as employee}
				<TableBodyRow on:click={() => goto(`/employees/${employee.id}`)}>
					<TableBodyCell>
						{employee.id}
					</TableBodyCell>
					<TableBodyCell>
						{employee.first_name}
						{employee.last_name}
					</TableBodyCell>
					<TableBodyCell>
						{employee.age}
					</TableBodyCell>
					<TableBodyCell>
						{employee.department}
					</TableBodyCell>
					<TableBodyCell>
						{employee.job_title}
					</TableBodyCell>
					<TableBodyCell>
						{employee.salary}
					</TableBodyCell>
				</TableBodyRow>
			{/each}
		</TableBody>
	</TableSearch>
</div>
