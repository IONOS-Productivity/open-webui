<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { ScrollerItem } from './scrollerItem.d.ts';

	const dispatcher = createEventDispatcher();

	// Pixels per second
	const speed = 25;

	export let direction = 'left';
	export let items;

	let el;

	$: scrollWidth = el?.scrollWidth;
	$: fullWidth = scrollWidth / 2;
	$: duration = fullWidth / speed;
</script>

<div
	class="full-width overflow-hidden position-relative my-2"
	on:mouseenter={() => { el.style.animationPlayState = 'paused'; }}
	on:mouseleave={() => { el.style.animationPlayState = 'running'; }}
	>
	<div
		bind:this={el}
		class="flex will-change-transform whitespace-nowrap {direction === 'left' ? 'slide-left' : 'slide-right'}"
		style:animation-duration={`${duration}s`}
		style:width={`${fullWidth * 2}px`}
	>
		{#each items as { id, text }}
			<span
				on:click={() => { dispatcher('click', id); }}
				data-id={id}
				class="grow-0 shrink-0 basis-auto text-sm bg-gray-100 text-wrap h-20 mx-2 p-4 last:p-0 cursor-pointer"
			>{ text }</span>
		{/each}
		{#each items as { id, text }}
			<span
				on:click={() => { dispatcher('click', id); }}
				data-id={id}
				class="grow-0 shrink-0 basis-auto text-sm bg-gray-100 text-wrap h-20 mx-2 p-4 last:p-0 cursor-pointer"
			>{ text }</span>
		{/each}
	</div>
</div>

<style>
.slide-left {
    animation: slide-left linear infinite;
}

.slide-right {
    animation: slide-right linear infinite;
}

span {
	width: 280px;
}

@keyframes slide-left {
    0% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(-50%);
    }
}

@keyframes slide-right {
    0% {
        transform: translateX(-50%);
    }
    100% {
        transform: translateX(0);
    }
}
</style>
