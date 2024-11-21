<script lang="ts">
	import Bolt from '$lib/components/icons/Bolt.svelte';
	import { onMount, getContext, createEventDispatcher } from 'svelte';

	const i18n = getContext('i18n');
	const dispatch = createEventDispatcher();

	export let suggestionPrompts = [];
	export let className = '';

	let prompts = [];

	$: prompts = (suggestionPrompts ?? [])
		.reduce((acc, current) => [...acc, ...[current]], [])
		.sort(() => Math.random() - 0.5);
</script>

<div class="flex flex-row flex-wrap items-start justify-center max-h-full {className}">
	{#each prompts as prompt, promptIdx}
		<button
			class="flex flex-0 shrink-0 basis-64 justify-between px-2 py-1 m-1 text-sm rounded-2xl border bg-transparent hover:bg-black/5 dark:hover:bg-white/5 transition group"
			on:click={() => {
				dispatch('select', prompt.content);
			}}
		>
			<div class="flex flex-col text-left">
				{#if prompt.title && prompt.title[0] !== ''}
					<div
						class="text-xs dark:text-gray-300 dark:group-hover:text-gray-200 transition line-clamp-1"
					>
						{prompt.title[0]}
					</div>
				{:else}
					<div
						class="text-xs dark:text-gray-300 dark:group-hover:text-gray-200 transition line-clamp-1"
					>
						{prompt.content}
					</div>
				{/if}
			</div>
		</button>
	{/each}
</div>
