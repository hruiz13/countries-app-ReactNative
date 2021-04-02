import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import AddScreen from '../screens/AddScreen'

const Stack = createStackNavigator()

export default function AddStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='Agregar'
                component={AddScreen}
                options={{ title: 'Agregar Actividad' }}
            />
        </Stack.Navigator>
    )
}
