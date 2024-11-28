<script lang="ts">
	import { getContext, createEventDispatcher } from 'svelte';
	import prompts from '$lib/IONOS/configs/ionosPromptSuggestions.json'

	const dispatch = createEventDispatcher();

	export let className = '';
</script>

<div class="flex flex-wrap justify-center {className}">
	{#each prompts as prompt, promptIdx}
	<div class="m-1 flex flex-col flex-wrap shrink-0 basis-52 h-50">
		<input
			id={"model-" + promptIdx}
			name="model"
			type="radio"
			on:click={() => {
				dispatch('select', { prompt: prompt.content, model: prompt.model, modelName: prompt.modelName });
			}}
		/>
		<label for={"model-" + promptIdx} class="flex flex-col items-center h-full content px-3 py-2 rounded-xl bg-transparent border-2 border-gray-200 hover:bg-black/5 hover:text-ionos dark:hover:bg-white/5 transition">
			<div class="flex-1 text-center text-base">{prompt.description}</div>
			<div class="flex-1 text-center text-sm mt-2">{prompt.detail}</div>
			<div class="image shrink-1 w-10 h-10 m-4 masked bg-gray-700" style={`mask-image: url(${prompt.iconUrl})`} />
		</label>
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
</style>
