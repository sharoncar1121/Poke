
import { StyleSheet, View, FlatList, SafeAreaView, ActivityIndicator } from 'react-native';
import { PokemonCard } from '../components/PokemonCard';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchAllPokemon } from '../utils/api';

export function Home() {
    const {
        data,
        isLoading,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage
      } = useInfiniteQuery({
        queryKey: ['pokemons'],
        queryFn: fetchAllPokemon,
        getNextPageParam: lastPage => lastPage.next
      });

  const loadMore = () => {
    if(hasNextPage){
        fetchNextPage()
    }
}

if(isLoading) return <ActivityIndicator size={'large'} />
if(!data) return null;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data = {data.pages.flatMap((page)=>  page.results)}
        keyExtractor={item=> item.name}
        renderItem={({item}) => <PokemonCard url={item.url} name={item.name} />}
        onEndReached={loadMore}
        ListFooterComponent={()=> isFetchingNextPage? <ActivityIndicator size={'large'}/> : null}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});