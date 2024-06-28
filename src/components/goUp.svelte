<script>
	import Fa from 'svelte-fa';
    import {
		faAngleUp
	} from '@fortawesome/free-solid-svg-icons';
    import {fly} from 'svelte/transition'

    import {onMount, onDestroy} from 'svelte'

    export let content = 'body';

    let up = 0;

    function reportScroll() {
        const h = document.documentElement, 
          b = document.querySelector(content),
          st = 'scrollTop',
          sh = 'scrollHeight';
    
    const percent = (h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight) * 100;
        up = percent
    // console.log(percent)
    }

    onMount(()=>{
        reportScroll();
        window.addEventListener('scroll', reportScroll)

        return ()=>{

            window.removeEventListener('scroll', reportScroll)
        }
    })

    // onDestroy(()=>{
    // })

    const scrollto = ()=>{
    window.scrollTo({
  top: 0,
  behavior: "smooth",
});}

</script>

{#if up > 15}
    
<button transition:fly={{x:10}} on:click={scrollto} class="fixed bottom-4 right-4 bg-sky-400 text-primary p-1 rounded font-bold border-2 border-primary">
  <Fa icon={faAngleUp}/>
</button>

{/if}