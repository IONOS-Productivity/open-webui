<script lang="ts">
	import { getContext, createEventDispatcher } from 'svelte';
	import getModels from '$lib/IONOS/utils/getModels.ts';

	const dispatch = createEventDispatcher();

	export let className = '';
	export let model = null;
	export let modelName = null;

	const models = getModels();

	const modelNameByModel = models.reduce((map, [model, modelName]) => {
		map.set(model, modelName);
		return map;
	}, new Map());

	$: modelName = modelNameByModel.get(model);
</script>

<form class="flex flex-row justify-center {className}">
	{#each models as currentModel, promptIdx}
	<div class="m-1 flex flex-1 w-12 h-12">
		<input
			bind:group={model}
			id={"model-" + promptIdx}
			value={currentModel[0]}
			name="model"
			type="radio"
		/>
		<label for={"model-" + promptIdx} class="inline-block rounded-full overflow-hidden w-12 h-12 border-2 border-transparent hover:bg-black/5 hover:text-ionos dark:hover:bg-white/5 transition">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"/></svg>
		</label>
	</div>
	{/each}
</form>

<p>{modelName}</p>

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
