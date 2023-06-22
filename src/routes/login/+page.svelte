<script>
    import dbhelper from "../../components/dbhelper"

    let username = ''
    let password = ''

    const submit = async () => {
        try {
            const authenticated = await dbhelper.login({username, password})
            
            if (authenticated) {
                alert(`Welcome back, ${username}!`)
                location.href = `/chats/${username}`
                return
            }

            alert("Incorrect username and/or password.")

        } catch (e) {
            console.log({error: e})
        }
    }
</script>

<div class="container">
    <h4 class="mt-5">Log in to start messaging</h4>
    <form on:submit|preventDefault={submit}>
        <input class="form-control mt-3" type="text" placeholder="Username" bind:value={username}/>
        <input class="form-control mt-3" type="password" placeholder="Password" bind:value={password}/>
        <button class="btn btn-primary mt-3" type="submit">Log In</button>
        <a class="btn btn-primary mt-3" href="/">Register</a>
    </form>
</div>

<style>
</style>