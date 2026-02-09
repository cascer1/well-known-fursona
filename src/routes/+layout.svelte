<script>
	import '../app.css';
</script>

<svelte:head>
	<title>Fursona Lookup</title>
	<link
		rel="icon"
		href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🏳️‍🌈</text></svg>"
	/>
</svelte:head>

<div class="bg-white dark:bg-slate-800">
	<slot />
</div>

<style>
	@reference "tailwindcss";
	:global(html) {
		background-color: white;
	}
	@media (prefers-color-scheme: dark) {
		:global(html) {
			background-color: theme(colors.slate.800);
		}
	}
</style>
