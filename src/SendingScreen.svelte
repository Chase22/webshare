<script lang="ts">
  import CopyableTextLabel from "./CopyableTextLabel.svelte";
  import {createEventDispatcher} from "svelte";
  import {type Message, MessageDirection} from "./message";

  export let message: Message[]
  let data: string = ""

  const dispatch = createEventDispatcher();

  function send() {
    dispatch('send', {
      data: data
    })
  }

  function prefix(message: Message) {
    return message.direction === MessageDirection.Incoming ? "received: " : "sent: "
  }
</script>

<div>
    <h1>You are connected</h1>
    <input type="text" bind:value={data}/>
    <button on:click={send}>Connect</button>
    <div class="messages">
        {#each message as msg}
            {prefix(msg)} <CopyableTextLabel text={msg.data}/>
        {/each}
    </div>
</div>

<style>
    .messages {
        display: flex;
        flex-direction: column-reverse;
    }
</style>