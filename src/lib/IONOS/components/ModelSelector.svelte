<script lang="ts">
	import { getContext, createEventDispatcher } from 'svelte';
	import getModels from '$lib/IONOS/utils/getModels';
	import ModelIcons from './ModelIcons.svelte';

	const dispatch = createEventDispatcher();

	export let model: string | null = null;
	export let modelName = null;

	const models = getModels();

	const modelNameByModel = models.reduce((map, [model, modelName]) => {
		map.set(model, modelName);
		return map;
	}, new Map());

	$: modelName = modelNameByModel.get(model);
</script>

<form class="flex flex-row flex-wrap justify-center {$$restProps.class}">
	{#each models as currentModel, promptIdx}
		<button class="flex flex-1 exos-tile m-3" type="button">
			<input
				bind:group={model}
				id={'model-' + promptIdx}
				value={currentModel[0]}
				name="model"
				type="radio"
			/>
			<label for={'model-' + promptIdx}>
				<ModelIcons class="exos-tile__image" selectedModel={currentModel[0]} />
				<span class="exos-tile__description break-normal"> {currentModel[1]}</span>
			</label>
		</button>
	{/each}
</form>

<p class="exos-tile__label">
	{modelName}
</p>

<style>
	input {
		display: none;
	}
</style>
