<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import { prompts, init } from '$lib/IONOS/stores/prompts';
	import { selectPrompt } from '$lib/IONOS/services/prompt';
	import Scroller from './Scroller.svelte';

	const mapper = ({ id, promptDisplayName }) => ({ id, text: promptDisplayName });

	$: mapped = $prompts.map(mapper);

	onMount(async () => {
		await init();
	});
</script>

<div>
	<Scroller
		on:click={(id) => selectPrompt(id)}
		items={mapped}
	/>
</div>
