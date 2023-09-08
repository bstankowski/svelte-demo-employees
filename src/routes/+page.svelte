<script lang="ts">
	import type { Snapshot, PageData } from './$types';
	import {
		TableBody,
		TableBodyCell as Td,
		TableBodyRow as Tr,
		TableHead,
		TableHeadCell as Th,
		TableSearch
	} from 'flowbite-svelte';
	import { goto } from '$app/navigation';

	export let data: PageData;
	let searchTerm = '';

	// Snapshot stores the searchTerm when user navigates away from this page and back
	export const snapshot: Snapshot<string> = {
		capture: () => searchTerm,
		restore: (value: string) => (searchTerm = value)
	};

	$: filteredEmployees = data.employees.filter((item) => {
		const itemValues = Object.values(item).join();
		return itemValues.toLowerCase().includes(searchTerm.toLowerCase());
	});
</script>

<h2 class="visually-hidden">All Employees</h2>
<TableSearch placeholder="Search" hoverable={true} bind:inputValue={searchTerm} classInput={"pl-10"}>
	<TableHead>
		<Th>Full Name</Th>
		<Th>Age</Th>
		<Th>Department</Th>
		<Th>Job Title</Th>
		<Th>Salary (USD)</Th>
	</TableHead>
	<TableBody>
		{#each filteredEmployees as employee}
			<Tr on:click={() => goto(`/employees/${employee._id}`)} class="cursor-pointer">
				<Td>
					<a href={`/employees/${employee._id}`} class="text-black">
						{employee.first_name}
						{employee.last_name}</a
					>
				</Td>
				<Td>{#if employee.age}{employee.age}{/if}</Td>
				<Td>{employee.department}</Td>
				<Td>{employee.job_title}</Td>
				<Td>{#if employee.salary}{employee.salary}{/if}</Td>
			</Tr>
		{/each}
	</TableBody>
</TableSearch>
