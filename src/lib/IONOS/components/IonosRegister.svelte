<script lang="ts">
	import { Dialog } from 'bits-ui';
	import { getContext } from 'svelte';

	const i18n = getContext('i18n');

	export let dialogOpen = false;

	let mailInput: string;

	$: isButtonDisabled = !mailInput || mailInput.trim().length === 0;
	$: registrationSent = false;

	$: if (!dialogOpen) resetFeedbackDialog();

	async function sendRegistration() {
		registrationSent = true;
		await new Promise((resolve) => setTimeout(resolve, 2000));
	}

	function resetFeedbackDialog() {
		registrationSent = false;
		mailInput = '';
		isButtonDisabled = true;
	}
</script>

<Dialog.Portal>
	<Dialog.Overlay class="fixed inset-0 z-50 bg-black/80" />
	<Dialog.Content
		class="bg-[var(--ion-background-color)] exos-sheet fixed left-[50%] top-[50%] z-50 w-full max-w-[94%] translate-x-[-50%] translate-y-[-50%]  p-5 shadow-popover outline-none sm:max-w-[700px] md:w-full"
	>
		<Dialog.Close class="exos-sheet__close"></Dialog.Close>
		{#if !registrationSent}
			<Dialog.Title>
				<h1 class="exos-card__headline">{$i18n.t('Bleiben Sie informiert...', { ns: 'ionos' })}</h1>
			</Dialog.Title>
			<Dialog.Description class="exos-paragraph">
				<p>
					{$i18n.t(
						'We are still working on it and will keep you up to date when there is news. Just give us your email address',
						{ ns: 'ionos' }
					)}
				</p>
			</Dialog.Description>
			<div class="exos-card__content">
				<label class="exos-label" for="email">Email</label>
				<span class="exos-input-text-group">
					<span class="exos-input-text-group__icon exos-input-text-group__icon--mail"></span>
					<input
						type="email"
						class="exos-input-text"
						id="email"
						bind:value={mailInput}
						placeholder={$i18n.t('Email address', { ns: 'ionos' })}
					/>
				</span>
			</div>
			<div class="exos-sheet__footer exos-sheet__footer--align-right">
				<button
					class="exos-button exos-button--primary {isButtonDisabled ? 'exos-button--disabled' : ''}"
					disabled={isButtonDisabled}
					on:click={() => {
						registrationSent = true;
					}}
				>
					{$i18n.t('Send')}
				</button>
			</div>
		{:else}
			{#await sendRegistration()}
				<section class="exos-sheet__section">
					<ul class="exos-stripe exos-stripe--align-center">
						<li class="exos-stripe__item">
							<div
								class="exos-loading-spin exos-loading-spin--bright exos-loading-spin--small"
							></div>
						</li>
						<li class="exos-stripe__item">
							<p class="exos-paragraph exos-paragraph--cropped exos-paragraph--align-center">
								{$i18n.t('Saving email address', { ns: 'ionos' })}
							</p>
						</li>
					</ul>
				</section>
			{:then}
				<Dialog.Title>
					<h1 class="exos-card__headline">{$i18n.t('Vielen Dank!', { ns: 'ionos' })}</h1>
				</Dialog.Title>
				<div class="exos-message exos-message--success">
					<section class="exos-message__section">
						<h4 class="exos-headline exos-headline--sub exos-headline--success">
							{$i18n.t('The e-mail address has been saved', { ns: 'ionos' })}
						</h4>
					</section>
				</div>
				<div class="exos-sheet__footer exos-sheet__footer--align-right">
					<Dialog.Close class="exos-sheet__footer exos-sheet__footer--align-right">
						<button type="button" class="exos-button exos-button--primary">
							{$i18n.t('Close')}
						</button>
					</Dialog.Close>
				</div>
			{:catch}
				<Dialog.Title>
					<h1 class="exos-card__headline">
						{$i18n.t('Something went wrong', { ns: 'ionos' })}
					</h1>
				</Dialog.Title>
				<div class="exos-message exos-message--critical">
					<section class="exos-message__section">
						<h4 class="exos-headline exos-headline--sub exos-headline--critical">
							{$i18n.t('Your e-mail address could not be saved', { ns: 'ionos' })}
						</h4>
					</section>
				</div>
				<div class="exos-sheet__footer exos-sheet__footer--align-right">
					<Dialog.Close class="exos-sheet__footer exos-sheet__footer--align-right">
						<button
							type="button"
							class="exos-button exos-button--primary"
							on:click={resetFeedbackDialog}
						>
							{$i18n.t('Back')}
						</button>
					</Dialog.Close>
				</div>
			{/await}
		{/if}
	</Dialog.Content>
</Dialog.Portal>
