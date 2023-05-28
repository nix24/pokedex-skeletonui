<script lang="ts">
	//importing data from +page.ts
	import type { Pokemon, PaginationSettings } from '$lib/types';
	import { Avatar } from '@skeletonlabs/skeleton';
	import { search } from '$lib//stores';
	import { derived, writable } from 'svelte/store';
	import { typeColors } from '$lib/stores';

	//note: you MUST PUT props: { pokemon: Pokemon[] } in the data object for some reason
	//im heated but do not touch this
	export let data: { props: { pokemon: Pokemon[] } };
	let pokemonList = data.props.pokemon;

	//filtered list based on search input
	const filteredPokemonList = derived(search, ($search) =>
		pokemonList.filter((pokemon) => pokemon.name.includes($search))
	);

	let currentPage = writable(0);
	const pokemonPerPage = 12;

	let totalPages = writable(Math.ceil(pokemonList.length / pokemonPerPage));

	let start = writable(0);
	let end = writable(pokemonPerPage);

	const paginatedList = derived(
		[filteredPokemonList, start, end],
		([$filteredPokemonList, $start, $end]) => $filteredPokemonList.slice($start, $end)
	);

	function goToPage(page: number) {
		let newPage = page;
		if (newPage < 0) {
			newPage = $totalPages - 1;
		} else if (newPage >= $totalPages) {
			newPage = 0;
		}

		currentPage.set(newPage);
		start.set(newPage * pokemonPerPage);
		end.set((newPage + 1) * pokemonPerPage);
	}
</script>

<div class="container mx-auto">
	<!-- Displaying pagination controls -->
	<div class="py-2 flex justify-center">
		<button
			class="btn mx-1 variant-ghost-surface"
			on:click={() => goToPage($currentPage - 1)}
		>
			Previous
		</button>
		<button
			class="btn mx-1 variant-ghost-surface"
			on:click={() => goToPage($currentPage + 1)}
		>
			Next
		</button>
	</div>

	<div class="grid px-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
		<!-- Displaying paginated Pokémon cards -->
		{#each $paginatedList as pokemon, index (index)}
			<!-- Dynamic link -->
			<div class="card card-hover rounded-lg shadow-md">
				<a href={`pokemon/${pokemon.id}`} class="btn">
					<Avatar
						class="w-full h-32 object-cover rounded-lg"
						src={pokemon.image}
						alt={pokemon.name}
					/>
					<!-- Tailwind styles for body -->
					<section class="flex flex-col justify-center items-center">
						<header class="card-title text-xl md:text-lg lg:text-xl font-bold truncate">
							{pokemon.name}
						</header>
						<footer class="card-footer">
							{#each pokemon.types || [] as type (type)}
								<span class={`badge m-2 ${typeColors[type.toLowerCase()]}`}>{type}</span>
							{/each}
						</footer>
					</section>
				</a>
			</div>
		{/each}
	</div>
</div>
