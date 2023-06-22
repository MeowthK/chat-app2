<script>
    import { onMount } from "svelte"
    import Pusher from "pusher-js"

	const usernames = [ "Ronzerwa", "BookJean", "Twitternage", "Plugbital", "Booklith", "ChooseYes", "Bufferix", "Mystor", "UnowBobo", "SimplyMc", "Skatech", "EatInstant", "HopeNotice", "Atergibb", "Clarette", "Dyhoodno", "Chiriya", "Lummotm", "Munewman", "FallsFan", "Camopaq", "Novasse", "Paradorld", "Broadcastar", "FireNeat", "ManiakChick", "LastingTman", "Shadefi", "RelaxZest", "FreeMax", "Darity", "Gametros", "ThereActually", "MidnightCyber", "Softpany", "Attabra" ]

	export let username = usernames[parseInt(Math.random() * (usernames.length - 1) + "")]
	let chat = ''
	/**
     * @type {any[]}
     */
	let chats = []

	onMount(() => {
		// Enable pusher logging - don't include this in production
		Pusher.logToConsole = true;

		const pusher = new Pusher('3549143eed17ea1061f5', {
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
		
		await fetch("http://localhost:4000/api/chats", {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				username, chat
			})
		})

		chat = ''
	}

</script>

<main>
	<div class="container mt-2">
		<h6 class="mt-2 mb-2">{username}</h6>
		<div>
			{#each chats as chat_inner}
				<div class="card mt-1 mb-1 p-3">
					<h6 class="card-title">{chat_inner.username}</h6>
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