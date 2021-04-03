import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../screens/HomeScreen'
import Country from '../screens/countries/Country'

const Stack = createStackNavigator()

export default function InicioStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='Home'
                component={HomeScreen}
                options={{ title: 'The Country Tips' }}
            />
            <Stack.Screen
                name='country'
                component={Country}
            />
        </Stack.Navigator>
    )
}
