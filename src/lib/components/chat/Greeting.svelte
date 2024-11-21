<script lang="ts">
import { getContext } from 'svelte';
import { fade } from 'svelte/transition';

import { user } from '$lib/stores';

const i18n = getContext('i18n');

export let greeting: string | null = null;
</script>

<div class="capitalize text-3xl sm:text-4xl line-clamp-1" in:fade={{ duration: 100 }}>
	{#if greeting}
		{greeting}
	{:else}
		{$i18n.t('Hello, {{name}}', { name: $user.name })}
	{/if}
</div>
