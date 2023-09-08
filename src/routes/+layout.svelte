<script>
	import '../app.postcss';
	import './styles.css';

	import { page } from '$app/stores';
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
	$: activeUrl = $page.url.pathname;
</script>

<svelte:head>
	<title>Svelte EMS</title>
</svelte:head>

<div class="app">
	<main>
		<Navbar color="none" class="md:px-0" let:hidden let:toggle>
			<NavBrand href="/">
				<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
					>Svelte EMS</span
				>
			</NavBrand>
			<NavHamburger on:click={toggle} />
			<NavUl {activeUrl} {hidden}>
				<NavLi href="/">Home</NavLi>
				<NavLi href="/employees/add">Add</NavLi>
				<NavLi href="/stats">Stats</NavLi>
			</NavUl>
		</Navbar>

		<slot />
	</main>
</div>
