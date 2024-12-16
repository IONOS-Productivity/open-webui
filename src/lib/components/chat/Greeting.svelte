<script lang="ts">
	import { getContext } from 'svelte';
	import { fade } from 'svelte/transition';

	const i18n = getContext('i18n');

	export let greeting: string | null = null;
</script>

<div in:fade={{ duration: 100 }}>
	<h1 class="text-center exos-page-header sm:text-3xl line-clamp-1">
		{$i18n.t('Welcome at IONOS GPT', { ns: 'ionos' })}
	</h1>
</div>

<style>
	h1 {
		background-color: var(--primary-background-color);
	}
</style>
