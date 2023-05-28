<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-modern.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import { search } from '$lib/stores';
	//import pokeui.svg from static folder
	import pokeui from '$lib/assets/pokeui.svg';
</script>

<AppShell regionPage="relative" slotPageHeader="sticky top-0 z-10">
	<svelte:fragment slot="header">
		<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
			<svelte:fragment slot="lead">
				<!--use primary color for svg-->
				<a href="/" class="flex items-center">
					<img
						src={pokeui}
						alt="PokeUI"
						class="w-12 h-12 "
					/>
				</a>
			</svelte:fragment>
			<!--pokeui-->
			<p class="text-2xl font-bold text-center">PokeUI</p>
			<!--seach bar goes here-->
			<svelte:fragment slot="trail">
				<input type="text" bind:value={$search} placeholder="Search Pokemon" class="input p-2" />
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Router Slot -->
	<slot />
	<!-- ---- / ---- -->
</AppShell>
