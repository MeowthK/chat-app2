<script>
    import { onMount } from "svelte"
    import Pusher from "pusher-js"

	export let data

	// TODO: Must store these sensitive data somewhere...
	const pusherKey = "3549143eed17ea1061f5"
	const chatAPIURL = "http://localhost:4000/api/chats"
	
	let username = data.slug? data.slug : 'Anonymous'
	let chat = ''
	/**
     * @type {any[]}
     */
	let chats = []

	onMount(() => {
		// Enable pusher logging - don't include this in production
		Pusher.logToConsole = true;

		const pusher = new Pusher(pusherKey, {
			cluster: 'ap1'
		})

		const channel = pusher.subscribe('chat-channel')
			channel.bind('chat', (/** @type {any} */ data) => {
				chats = [...chats, data]
		})
	})

	const submit = async () => {

		if (username.trim().length === 0 || chat.trim().length === 0)
			return
		
		console.log({username})
		
		await fetch(chatAPIURL, {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				username, chat, timestamp: Date.now()
			})
		})

		chat = ''
	}
</script>

<main>
	<div class="container mt-2">
		<h6 class="mt-2 mb-2">History</h6>
		<div>
			{#each chats as chat_inner}
				<div class="card mt-1 mb-1 p-3">
					<h6 class="card-title">{chat_inner.username} @ <i>{new Date(chat_inner.timestamp).toLocaleString()}</i></h6>
					<p class="card-text">{chat_inner.chat}</p>
				</div>
			{/each}
		</div>
		<form class="d-flex" on:submit|preventDefault={submit}>
			<input class="form-control flex-grow-1 me-1" placeholder="Write message" bind:value={chat}/>
			<button class="btn btn-primary" type="submit">Send</button>
		</form>
	</div>
</main>

<style>
</style>