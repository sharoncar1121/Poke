import { ActivityIndicator } from "react-native"
import { useQuery } from "@tanstack/react-query"
import { fetchFn } from "../utils/api";
import {useNavigation} from '@react-navigation/native'
import {Box, Heading, Image, Text, HStack, Stack, Pressable, center, Center, AspectRatio } from 'native-base'

export function PokemonCard({url, name}){
    const { isLoading, error, data } = useQuery({
        queryKey: ['pokemon', name],
        queryFn: () => fetchFn(url)
      });

      const navigation = useNavigation()
    if(isLoading) return <ActivityIndicator size={"large"}/>
    if(!data || error) return null
    return (
    
   <Pressable 
   flex={1}
   m="1.5"
   p="4"
    onPress={()=> navigation.navigate('Detalles',{name})} >
    <Center>
        <AspectRatio ratio={1} width="80%">
        <Image
        source={{
            uri: data.sprites.other['official-artwork'].front_default
        }}
        alt="image"
        />
        </AspectRatio>
    </Center>
    <HStack justifyContent="space-between" mb={2}>
    <Heading textTransform="capitalize" >{data.name}</Heading> 
        <Text>#{data.order}</Text>
    </HStack>
    <HStack>
        {data.types.map(type => (
            <Box
            key={type.type.name} px="2" mr="1">
                {type.type.name}
            </Box>
        ))}
    </HStack>
   </Pressable>
   
    )
}


