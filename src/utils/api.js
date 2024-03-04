export async function fetchFn (endpoint){
    const response = await  fetch(endpoint);  
    return response.json();
}

export async function fetchAllPokemon ({pageParam}){
    const response = await  fetch(pageParam || 'https://pokeapi.co/api/v2/pokemon/');  
    return response.json();
}

