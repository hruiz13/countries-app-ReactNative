import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import SearchScreen from '../screens/SearchScreen'

const Stack = createStackNavigator()

export default function BusquedaStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='Search'
                component={SearchScreen}
                options={{ title: 'Buscar' }}
            />
        </Stack.Navigator>
    )
}
