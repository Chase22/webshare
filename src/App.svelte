<script lang="ts">
  import {ID_PREFIX, PeerState, PeerWrapper} from "./peer";
  import {onMount} from "svelte";
  import ConnectingScreen from "./ConnectingScreen.svelte";
  import SendingScreen from "./SendingScreen.svelte";
  import {type Message, MessageDirection} from "./message";


  export let partnerId: string | null
  let id: string = ""
  let state: PeerState = PeerState.Opening
  let messages: Message[] = []

  const peerWrapper = new PeerWrapper(
    (newState) => {
      state = newState
    },
    (newId) => {
      id = newId
    },
    (data) => {
      messages = [...messages, {data: data, direction: MessageDirection.Incoming}]
    }
  )

  function connect(partnerId: string) {
    if (partnerId !== "") {
      peerWrapper.connect(ID_PREFIX + partnerId)
    }
  }

  function send(event: CustomEvent) {
    const data = event.detail.data;

    if (data !== "") {
      peerWrapper.send(data)
      messages = [...messages, {data: data, direction: MessageDirection.Outgoing}]
    }
  }

  function tryConnecting() {
    if (partnerId !== null && partnerId !== "") {
      if (state === PeerState.Open) {
        connect(partnerId)
      } else {
        setTimeout(tryConnecting, 100)
      }
    }
  }

  function directConnect(event: CustomEvent) {
    connect(event.detail.partnerId)
  }

  onMount(() => {
    setTimeout(() => {
      tryConnecting();
    }, 100)
  })

</script>
<main>
    {#if state === PeerState.Open}
        <ConnectingScreen id={id} on:connect={directConnect}/>
    {:else if (state === PeerState.Connected)}
        <SendingScreen message={messages} on:send={send}/>
    {/if}

</main>

<style>
    main {
        text-align: center;
        padding: 1em;
        max-width: 240px;
        margin: 0 auto;
    }

    h1 {
        color: #ff3e00;
        text-transform: uppercase;
        font-size: 4em;
        font-weight: 100;
    }

    @media (min-width: 640px) {
        main {
            max-width: none;
        }
    }
</style>