<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import type { ScrollerItem } from './scrollerItem.d.ts';
	import Carousel from 'svelte-carousel'

	const itemWidth: number = 450;

	const dispatch = createEventDispatcher();

	export const tickSpeed: number = 100;
	export let items: ScrollerItem[] = [];

	let carousel: Carousel = null;
	let width: number = 0;
	let inside: boolean = false;

	// Round up to ensure we render one item that's visible ever so slighly
	// Add two to have one space item at the left and one at the right
	$: count = Math.ceil(width / itemWidth) + 2;
	$: toShowCount = Math.ceil(width / itemWidth) + 2;
	$: console.log(width, itemWidth, toShowCount, inside, carousel);
</script>

<div
	on:mouseenter={() => carousel.pause()}
	on:mouseleave={() => carousel.resume()}
	bind:clientWidth={width}>
	<Carousel
		bind:this={carousel}
		particlesToShow={toShowCount}
		autoplayDuration={0}
		duration={5000}
		infinite
		autoplay
		timingFunction="linear"
		dots={false}
		arrows={false}
		swiping={false}
	>
			{#each items as { id, text }}
				<button
					class="fw-60 m-2 py-4 px-2 bg-white max-w-64 text-sm"
					data-id={id}
					on:click={() => {
						dispatch('click', id);
					}}
				>
					{text} →
				</button>
			{/each}
	</Carousel>
</div>

<style>
	button {
		width: 200px;
	}
</style>
