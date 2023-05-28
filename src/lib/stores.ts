import { writable } from 'svelte/store';
import type { typeColor } from './types';
//import pokemonlist from the root +page.svelte
//creating store for seach bar functionality
export const search = writable('');
export const typeColors: typeColor = {
    normal: 'bg-gray-300 text-gray-900',
    fire: 'bg-red-500 text-white',
    water: 'bg-blue-500 text-white',
    grass: 'bg-green-500 text-white',
    electric: 'bg-yellow-400 text-gray-900',
    ice: 'bg-blue-200 text-blue-900',
    fighting: 'bg-red-700 text-white',
    poison: 'bg-purple-500 text-white',
    ground: 'bg-yellow-900 text-white',
    flying: 'bg-indigo-400 text-indigo-900',
    psychic: 'bg-pink-500 text-white',
    bug: 'bg-green-400 text-green-900',
    rock: 'bg-yellow-700 text-white',
    ghost: 'bg-purple-700 text-white',
    dark: 'bg-gray-800 text-white',
    dragon: 'bg-indigo-700 text-white',
    steel: 'bg-gray-500 text-white',
    fairy: 'bg-pink-300 text-pink-900'
};

