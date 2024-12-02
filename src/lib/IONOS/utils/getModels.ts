import prompts from '$lib/IONOS/configs/ionosPromptSuggestions.json';

/**
 * Select the models from the array.
 *
 * @param {Array} array of something
 * @param {Number} maxPicks max number of picks
 */
export default (): Array<any> => {
	const models = new Map();

	for (const { model, modelName } of prompts ) {
		models.set(model, modelName);
	}

	return [...models.entries().map(([model, modelName]) => ([model, modelName]))];
}
