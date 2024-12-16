<script lang="ts">
	import { getContext, createEventDispatcher } from 'svelte';
	import prompts from '$lib/IONOS/configs/ionosPromptSuggestions.json'
	import randomSelection from '$lib/IONOS/utils/randomSelection.ts'

	const dispatch = createEventDispatcher();

	const maxSuggestionsToDisplay = 3;
	let hoveredId = -1;

	// Filter for model
	export let model;
	export let className = '';

	$: suggestionsPerModel = prompts.filter(({ model: currentModel }) => model === currentModel);
	$: promptSelection = randomSelection(suggestionsPerModel, maxSuggestionsToDisplay)
</script>

<div class="flex flex-wrap md:flex-row md:flex-wrap justify-center {className}">
	{#each promptSelection as prompt, promptIdx}
		<div class="exos-card exos-__direct-selection m-1 flex flex-col md:flex-wrap shrink-0 md:basis-52 h-50 w-full md:w-auto"
			class:exos-__direct-selection--hover={hoveredId === promptIdx}
				 on:mouseenter={() => (hoveredId = promptIdx)}
				 on:mouseleave={() => (hoveredId = null)}
		>
			<button
					type="radio"
					class="exos-card__content flex h-full content px-3 py-2"
					on:click={() => {
						dispatch('select', { prompt: prompt.content, model: prompt.model, modelName: prompt.modelName });
					}}
			>
				<section class="exos-card__section">
					<h2 class="exos-card__headline">{prompt.description}</h2>
					<p class="exos-paragraph">{prompt.detail}</p>
				</section>
			</button>
		</div>
	{/each}
</div>

<style>
input {
	display: none;
}
.masked {
	mask-repeat: no-repeat;
	mask-position: center;
}
input:hover .image {
	background-color: var(--ion-brand-color);
}
input:checked + label {
	border: 2px solid var(--ion-brand-color);
}
.exos-card .exos-card__section .exos-card__headline{
	color: var(--interactive-text-color);
	font-size: 14px;
}
.exos-card {
	border: 1px solid var(--hovered-corporate-background-color);
}
</style>
