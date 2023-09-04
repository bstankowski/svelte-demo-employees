<script lang="ts">
	import { fade } from 'svelte/transition';

	export let type: 'success' | 'error' = 'success';
	export let message: string | undefined = undefined;
</script>

{#if $$slots.children || message}
	<div
		class={`mb-4 text-sm ${type === 'error' ? 'text-red-500' : 'text-green-500'}`}
		in:fade
		out:fade
	>
		{#if message}
			<p>{message}</p>
		{/if}

		<slot name="children" />
	</div>
{/if}
