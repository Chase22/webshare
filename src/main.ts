import App from './App.svelte';


const urlParams = new URLSearchParams(window.location.search);
const partnerId = urlParams.get('partnerId');

const app = new App({
	target: document.body,
	props: {
		partnerId: partnerId
	}
});

export default app;