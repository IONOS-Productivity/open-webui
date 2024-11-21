<script lang="ts">
import { getContext } from 'svelte';
const i18n = getContext('i18n');
</script>

<div class="flex flex-col">
	<p class="text-sm self-center w-3/5 my-3">{$i18n.t("By sending messages to IONOS GPT, you agree to our terms and conditions and confirm that you have read our privacy policy.", { ns: "ionos" })}</p>
</div>
