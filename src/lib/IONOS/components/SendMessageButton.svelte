<script lang="ts">
	import Tooltip from '$lib/components/common/Tooltip.svelte';
	import { getContext } from 'svelte';
	const i18n = getContext('i18n');

	export let disabled = false;
</script>

<div class={$$restProps.class || ''}>
	<Tooltip content={$i18n.t('Send message')}>
		<button
			id="send-message-button"
			class="{prompt !== ''
				? 'exos-button exos-button--primary exos-button--large-icon-only'
				: 'text-white bg-gray-200 dark:text-gray-900 dark:bg-gray-700 disabled'} transition rounded-full p-1.5 m-0.5 self-center"
			type="submit"
			{disabled}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 16 16"
				fill="currentColor"
				class="size-6"
			>
				<path
					fill-rule="evenodd"
					d="M8 14a.75.75 0 0 1-.75-.75V4.56L4.03 7.78a.75.75 0 0 1-1.06-1.06l4.5-4.5a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1-1.06 1.06L8.75 4.56v8.69A.75.75 0 0 1 8 14Z"
					clip-rule="evenodd"
				/>
			</svg>
		</button>
	</Tooltip>
</div>

<style>
	button {
		transition:
			background-color 0.2s,
			color 0.2s;
	}

	button:disabled {
		pointer-events: none;
	}
</style>
