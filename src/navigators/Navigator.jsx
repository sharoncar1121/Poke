import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "../screens/Home";
import { Detail } from "../screens/Detail";
import { Search } from "../screens/Search";
import { TouchableOpacity } from "react-native";
import {MaterialIcons} from '@expo/vector-icons'

const Stack  = createNativeStackNavigator();

export function MainNavigator (){
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home}
                options= {({navigation}) => ({ 
                    headerRight: () =>(
                        <TouchableOpacity onPress={()=> navigation.navigate('Busqueda')}>
                            <MaterialIcons name="search" color="black" size={32}/>
                        </TouchableOpacity>
                    )
                })}
            />
            <Stack.Screen name="Detalles" component={Detail}/>
            <Stack.Group screenOptions={{presentation: 'modal'}}>
            <Stack.Screen name="Busqueda" component={Search}/>
            </Stack.Group>
        </Stack.Navigator>
    )
}