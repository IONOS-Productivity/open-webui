<script lang="ts">
import { getContext } from 'svelte';
import { fade } from 'svelte/transition';

const i18n = getContext('i18n');

export let greeting: string | null = null;
</script>

<div in:fade={{ duration: 100 }}>
	<h1 class="text-2xl text-center  sm:text-3xl font-bold line-clamp-1 text-ionos">{$i18n.t('Welcome at IONOS GPT', { ns: 'ionos' })}</h1>
	<h4 class="text-base line-clamp-1">{$i18n.t('Your first step into the world of AI! Privacy by Design!', { ns: 'ionos' })}</h4>
</div>
