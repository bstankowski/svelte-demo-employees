<script>
	import { Button, Heading } from 'flowbite-svelte';
	import { AngleLeftSolid } from 'flowbite-svelte-icons';
</script>

<svelte:head>
	<title>Employee Profile | Svelte EMS</title>
</svelte:head>

<header class="flex justify-start mb-4 mt-4 items-center">
	<div class="mr-4">
		<Button class="pl-2 pr-3" color="light" outline on:click={() => window.history.back()}
			><AngleLeftSolid size="xs" class="mr-1" />Back</Button
		>
	</div>

	<Heading customSize="text-2xl font-extrabold text-left">Employee Profile</Heading>
</header>
<slot />
