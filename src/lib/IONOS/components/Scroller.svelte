<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import type { ScrollerItem } from './scrollerItem.d.ts';

	const dispatch = createEventDispatcher();

	export const tickSpeed: number = 100;
	export let items: ScrollerItem[] = [];
</script>

<div class="overflow-hidden">
	<div class="m-4">
		{#each items as { id, text }}
			<button
				class="fw-60 py-4 px-2 bg-white max-w-64 text-sm"
				data-id={id}
				on:click={() => {
					dispatch('click', id);
				}}
			>
				{text} →
			</button>
		{/each}
	</div>
</div>
