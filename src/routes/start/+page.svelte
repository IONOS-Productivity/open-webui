<script lang="ts">

/**
 * Landing page for IONOS GPT public demo.
 *
 * This page should be served as a resource from /start.
 *
 * The user should be redirected to this page if they do not have an
 * internal session yet.
 *
 * The user would then load a new resource as part of the Open WebUI SPA so
 * that a transparent sign-in mechanism can run.
 *
 * The router should avoid loading Open WebUI API resources like
 * authentication and Websockets.
 */

import { getContext } from 'svelte';
import { config } from '$lib/stores';

import Greeting from '$lib/components/chat/Greeting.svelte';
import Suggestions from '$lib/IONOS/components/Suggestions.svelte';
import ModelSelector from '$lib/IONOS/components/ModelSelector.svelte';
import Textarea from '$lib/components/common/Textarea.svelte';
import Trailer from '$lib/IONOS/components/Trailer.svelte';
import SendMessageButton from '$lib/IONOS/components/SendMessageButton.svelte';

const i18n = getContext('i18n');

const defautModel = "copywriter";

const pauseBeforeSubmit = 1000; // ms

let prompt = '';
let model = defautModel;
let modelName = null;

let promptTextarea;

function submit(promptToStart: string, modelNameForStart: string) {
	// Pass prompt and model securely via sessionStorage and start chat by
	// *hard* page load, deliberately circumventing the push state API
	sessionStorage.selectedModels = JSON.stringify([modelNameForStart]);
	sessionStorage.ionosGptDemoPrompt = promptToStart;

	window.location = `/auth`;
}

function typePrompt(text, onDone: null) {
	let cancelled = false;
	let chars = text.split('');

	prompt = '';

	const animate = () => {
		if (cancelled) {
			console.log("# Cancel");
			prompt = '';
			return;
		}

		if (chars.length === 0) {
			if (typeof onDone === "function") {
				onDone();
			}

			return;
		} else {
			requestAnimationFrame(animate);
		}

		const char = chars[0];
		chars = chars.slice(1);

		prompt += char;
	}

	requestAnimationFrame(animate);

	return () => { cancelled = true };
}

let cancelTyping = () => { };

function selectSuggestion({ detail: { prompt: selectedPrompt, model: selectedModel, modelName: selectedModelName } }) {
	cancelTyping();
	cancelTyping = typePrompt(selectedPrompt, () => {
		setTimeout(() => submit(prompt, model), pauseBeforeSubmit);
	});
}
</script>

<div class="overflow-auto w-full h-full flex flex-col items-center">
	<Greeting />

	<h1 class="my-2 text-center text-lg mb-5 mt-5">{$i18n.t('Choose the AI assistant that suits you.', { ns: "ionos" })}</h1>

	<ModelSelector
		bind:model={model}
		bind:modelName={modelName}
	/>

	<form
		on:submit|preventDefault={(e) => submit(prompt, model)}
		class="flex items-center min-w-96 h-fit my-4 border rounded-xl"
		>

		<Textarea
			bind:this={promptTextarea}
			bind:value={prompt}
			disabled={model === null}
			placeholder={$i18n.t('Send a message to {{modelName}}', { ns: "ionos", modelName })}
			className="w-full rounded-lg p-3 text-sm dark:text-gray-300 dark:bg-gray-850 outline-none resize-none h-full bg-transparent"
		/>


		<SendMessageButton
			class="p-0 mx-2 flex w-8 group/button"
			disabled={model === null}
		/>
	</form>

	<h1 class="my-2 text-center text-lg mb-0 mt-5">{$i18n.t('... or let yourself inspire by these examples how our assistants can support your work', { ns: "ionos" })}</h1>

	<div class="w-3/5 py-5">
		<Suggestions
			model={model}
			on:select={selectSuggestion}
		/>
	</div>


	<Trailer />
</div>
