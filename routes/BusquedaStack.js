import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import SearchScreen from '../screens/SearchScreen'
import CountrySearch from '../screens/search/CountrySearch'

const Stack = createStackNavigator()

export default function BusquedaStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='Search'
                component={SearchScreen}
                options={{ title: 'Buscar' }}
            />
            <Stack.Screen
                name='countrySearch'
                component={CountrySearch}
                options={{ title: 'Buscando' }}
            />
        </Stack.Navigator>
    )
}
