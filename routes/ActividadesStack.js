import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ActivitiesScreen from '../screens/ActivitiesScreen'

const Stack = createStackNavigator()

export default function ActividadesStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='listActividades'
                component={ActivitiesScreen}
                options={{ title: 'Lista Actividades' }}
            />
        </Stack.Navigator>
    )
}