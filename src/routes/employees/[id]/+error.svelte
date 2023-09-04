<script>
	import Message from '$components/Message.svelte';
</script>

<Message type="error">
	<p slot="children">
		Employee not found. <a href="/employees/add">Add one</a> or
		<a href="/">go back to the homepage</a>.
	</p>
</Message>
