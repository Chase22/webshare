<script lang="ts">
import QrCode from "@castlenine/svelte-qrcode";

export let id: string;
</script>

<div>
    <QrCode data="{window.location}?partnerId={id}" />
</div>