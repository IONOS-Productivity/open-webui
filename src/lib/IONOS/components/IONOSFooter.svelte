<script lang="ts">
	import { getContext } from 'svelte';

	const currentYear = new Date().getFullYear();
	const i18n = getContext('i18n');
</script>

<footer class="z-50">
	<div class="footer-right"></div>
	<div id="copyright">
		<p>© {currentYear} IONOS SE</p>
	</div>
	<div class="footer-left">
		<a href="https://www.ionos.de/impressum" target="_blank">
			{$i18n.t('Imprint')}
		</a>
		<a href="https://www.ionos.de/terms-gtc/terms-privacy" target="_blank">
			{$i18n.t('Privacy Policy')}
		</a>
		<a href="https://www.ionos.de/terms-gtc/terms" target="_blank">
			{$i18n.t('Terms and Conditions')}
		</a>
	</div>
</footer>

<style>
	@import './ionos-variables.css';
	footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: var(--ion-background-color);
		height: 64px;
		padding: 0 24px;
		position: fixed;
		bottom: 0;
		width: 100%;
	}

	.footer-left {
		display: flex;
		align-items: center;
		gap: 16px;
	}

	a {
		color: var(--ion-text-color);
	}

	a:hover {
		text-decoration: underline;
	}

	#copyright {
		color: var(--ion-text-color);
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
	}
</style>
