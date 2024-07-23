<script lang="ts">
    import SharingQrCode from "./SharingQrCode.svelte";
    import CopyableTextLabel from "./CopyableTextLabel.svelte";
    import {createEventDispatcher} from "svelte";

    export let id: string;

    let partnerId: string;

    const dispatch = createEventDispatcher();

    function connect() {
      dispatch('connect', {
        partnerId: partnerId
      });
    }
</script>

<div>
    <h1>Waiting for Connections</h1>
    <p>Scan the QR Code below or share the link</p>
    <SharingQrCode id={id} />
    <CopyableTextLabel text="{window.location}?partnerId={id}" />
    <h2>Direct Connect</h2>
    <p>You can also enter the partner id below</p>
    <h2>Your ID: {id}</h2>
    <input type="text" bind:value={partnerId}/> <button on:click={connect} >Connect</button>
</div>