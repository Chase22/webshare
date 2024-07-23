<script lang="ts">
  export let text: string

  async function writeClipboardText(text:string) {
    try {
      await navigator.clipboard.writeText(text);
    } catch (error: any) {
      console.error(error.message);
    }
  }

  function copyClick() {
    return writeClipboardText(text);
  }
</script>

<div>
    <span>{text}</span>
    <button on:click={copyClick}><img alt="copy" src="images/content-copy.svg"></button>
</div>

<style>
    div {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    button {
        background-color: transparent;
        border: none;
        cursor: pointer;
        padding: 12px 16px;
    }
    span {
        height: 40px;
        text-align: center;
    }
</style>