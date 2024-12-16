<svelte:head>
	<title>IONOS GPT</title>
</svelte:head>

<content class="flex flex-col">
	<slot />
</content>

<style>
	content {
		display: flex;
		flex-direction: column;
		height: calc(100vh - 64px);
	}
</style>
