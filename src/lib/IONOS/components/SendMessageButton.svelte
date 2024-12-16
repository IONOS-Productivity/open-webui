<script lang="ts">
	import PaperPlane from '$lib/components/icons/PaperPlane.svelte';

	export let disabled = false;
</script>

<button {disabled} type="submit" class="{$$restProps.class || ''}">
	<PaperPlane
		className="fill-gray-400 group-disabled/button:fill-gray-400 cursor-pointer group-disabled/button:cursor-default hover:fill-ionos"
	/>
</button>

<style>
	button {
		transition: background-color 0.2s, color 0.2s;
	}

	button:disabled {
		pointer-events: none;
	}
</style>
