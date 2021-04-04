import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ActivitiesScreen from '../screens/ActivitiesScreen'
import CountrySearch from '../screens/search/CountrySearch'

const Stack = createStackNavigator()

export default function ActividadesStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='listActividades'
                component={ActivitiesScreen}
                options={{ title: 'Lista Actividades' }}
            />
            <Stack.Screen
                name='countrySearch'
                component={CountrySearch}
                options={{ title: 'Buscando' }}
            />
        </Stack.Navigator>
    )
}