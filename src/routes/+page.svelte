<script>
    import dbhelper from '../components/dbhelper'

    let username = ''
    let password = ''

    const submit = async () => {
        try {
            await dbhelper.register({username, password})
            
            alert("Successfully registered! Please log in to continue.")
            location.href = '/login'
        } catch (e) {
            console.log({error: e})
        }
    }

</script>

<div class="container">
    <h4 class="mt-5">Register to start messaging</h4>
    <form on:submit|preventDefault={submit}>
        <input class="form-control mt-3" type="text" placeholder="Username" bind:value={username}/>
        <input class="form-control mt-3" type="password" placeholder="Password" bind:value={password}/>
        <input class="form-control mt-3" type="password" placeholder="Confirm Password"/>
        <button class="btn btn-primary mt-3" type="submit">Register</button>
        <a class="btn btn-primary mt-3" href="/login">Already have an account?</a>
    </form>
</div>

<style>
</style>