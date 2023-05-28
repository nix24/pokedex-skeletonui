<script lang="ts">
	//all typings work, its just for paginator at bottom
	//@ts-nocheck
	import type { Pokemon, PaginationSettings } from '$lib/types';
	import { Avatar, Paginator } from '@skeletonlabs/skeleton';
	import {typeColors} from '$lib/stores';
	export let data: { props: { pokemon: Pokemon } };
	let pokemon = data?.props?.pokemon;

	const stats = [
		{ name: 'hp', value: pokemon.stats[0].base_stat },
		{ name: 'attack', value: pokemon.stats[1].base_stat },
		{ name: 'defense', value: pokemon.stats[2].base_stat },
		{ name: 'special attack', value: pokemon.stats[3].base_stat },
		{ name: 'special defense', value: pokemon.stats[4].base_stat },
		{ name: 'speed', value: pokemon.stats[5].base_stat }
	];

	
	let currentPage = 0;
	let movesPerPage = 10;

	let page: PaginationSettings = {
		offset: currentPage,
		limit: movesPerPage,
		size: pokemon.moves?.length,
		amounts: [5, 10, 15, 20]
	};

	let paginatedMoves: { move: { name: string } }[] = [];
	$: {
		if (pokemon.moves) {
			paginatedMoves = pokemon.moves.slice(
				page.offset * page.limit,
				(page.offset + 1) * page.limit
			);
		}
	}
</script>

<div class="container mx-auto">
	{#if pokemon}
		<div
			class="card border border-surface-700 max-w-xl mx-auto mt-10 shadow-md rounded-lg overflow-hidden"
		>
			<header class="card-header p-4 bg-surface-500 text-center font-bold text-lg">
				{pokemon.name}
			</header>
			<Avatar
				class="w-64 h-64 mx-auto mt-4"
				src={pokemon.image}
				alt={pokemon.name}
				rounded="rounded-xl"
			/>
			<footer class="p-4 card-footer flex justify-center">
				{#each pokemon.types || [] as type (type)}
					<span
					class={`text-xl font-extrabold m-1 rounded-md px-2 py-1  ${typeColors[type.toLowerCase()]}`}
					>{type}</span
					>
				{/each}
			</footer>
			<div class="p-4">
				<h2 class="text-lg font-bold">Abilities</h2>
				<div class="flex flex-wrap">
					{#each pokemon.abilities || [] as ability (ability)}
						<span
							class="font-semibold m-1 bg-primary-100 text-primary-900 rounded-md px-2 py-1 text-sm"
							>{ability}</span
						>
					{/each}
				</div>
			</div>
			<div class="p-4">
				<h2 class="text-lg font-bold">Stats</h2>
				{#each stats as stat (stat)}
					<div class="flex justify-between mt-2">
						<span class="text-surface-400 font-bold">{stat.name}</span>
						<span class="text-surface-400 font-bold">{stat.value}</span>
					</div>
					<div class="relative w-full h-2 bg-surface-400 rounded-full">
						{#if stat.name === 'hp'}
							<div
								class="absolute top-0 left-0 h-full bg-rose-500 rounded-full"
								style="width: {(stat.value / 255) * 100}%"
							/>
						{:else if stat.name === 'attack'}
							<div
								class="absolute top-0 left-0 h-full bg-pink-700 rounded-full"
								style="width: {(stat.value / 255) * 100}%"
							/>
						{:else if stat.name === 'defense'}
							<div
								class="absolute top-0 left-0 h-full bg-blue-700 rounded-full"
								style="width: {(stat.value / 255) * 100}%"
							/>
						{:else if stat.name === 'special attack'}
							<div
								class="absolute top-0 left-0 h-full bg-pink-400 rounded-full"
								style="width: {(stat.value / 255) * 100}%"
							/>
						{:else if stat.name === 'special defense'}
							<div
								class="absolute top-0 left-0 h-full bg-blue-500 rounded-full"
								style="width: {(stat.value / 255) * 100}%"
							/>
						{:else if stat.name === 'speed'}
							<div
								class="absolute top-0 left-0 h-full bg-green-300 rounded-full"
								style="width: {(stat.value / 255) * 100}%"
							/>
						{/if}
					</div>
				{/each}
			</div>

			<div class="p-4">
				<h2 class="text-lg font-bold">Moves</h2>
				<ul class="list-disc list-inside">
					{#each paginatedMoves as move (move)}
						<li class="m-1 bg-surface-200 text-surface-900 rounded-md px-2 py-1 text-sm font-bold">
							{move}
						</li>
					{/each}
				</ul>
				<Paginator bind:settings={page} />
			</div>
		</div>
	{/if}
</div>
