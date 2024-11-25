<script lang="ts">
	import { Dialog } from 'bits-ui';
	import { getContext } from 'svelte';

	const i18n = getContext('i18n');
</script>

<Dialog.Portal>
	<Dialog.Overlay class="fixed inset-0 z-50 bg-black/80" />
	<Dialog.Content
		class="bg-[var(--ion-background-color)] exos-sheet fixed left-[50%] top-[50%] z-50 w-full max-w-[94%] translate-x-[-50%] translate-y-[-50%]  p-5 shadow-popover outline-none sm:max-w-[700px] md:w-full"
	>
		<Dialog.Close class="exos-sheet__close"></Dialog.Close>

		<Dialog.Title>
			<h1 class="exos-card__headline">{$i18n.t('Further information', { ns: 'ionos' })}</h1>
		</Dialog.Title>
	</Dialog.Content>
</Dialog.Portal>
