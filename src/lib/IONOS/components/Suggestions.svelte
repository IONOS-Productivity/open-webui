<script lang="ts">
	import { getContext, createEventDispatcher } from 'svelte';
	import prompts from '$lib/IONOS/configs/ionosPromptSuggestions.json'

	const dispatch = createEventDispatcher();

	export let className = '';
</script>

<div class="flex flex-wrap justify-center {className}">
	{#each prompts as prompt, promptIdx}
		<button
			class="flex flex-col shrink-0 basis-64 w-52 justify-between items-center px-3 py-2 rounded-xl bg-transparent border m-1 hover:bg-black/5 hover:text-ionos dark:hover:bg-white/5 transition group"
			on:click={() => {
				dispatch('select', { prompt: prompt.content, model: prompt.model });
			}}
		>
			<div class="flex-1 basis-10 text-base">{prompt.description}</div>
			<div class="flex-1 basis-10 text-sm">{prompt.detail}</div>
			<img class="w-32 h-10 m-4" src={prompt.iconUrl} />
		</button>
	{/each}
</div>
