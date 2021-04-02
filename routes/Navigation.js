import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react'
import { Icon } from 'react-native-elements';
import AddStack from './AddStack';
import BusquedaStack from './BusquedaStack';
import InicioStack from './InicioStack';

const Tab = createBottomTabNavigator();


export default function Navigation() {

    const screenOptions = (route, color) => {
        let iconName
        switch (route.name) {
            case 'Home':
                iconName = 'map-legend'
                break;
            case 'Add':
                iconName = 'sign-direction-plus'
                break;
            case 'Search':
                iconName = 'magnify'
                break;

            default:
                break;
        }

        return (
            <Icon
                type="material-community"
                name={iconName}
                size={22}
                color={color}
            />
        )
    }



    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName='Home'
                tabBarOptions={{
                    inactiveTintColor: "#5E8C61",
                    activeTintColor: "#4E6151",
                }}
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ color }) => screenOptions(route, color)
                })}
            >
                <Tab.Screen
                    name="Home"
                    component={InicioStack}
                    options={{ title: 'Inicio' }}
                />
                <Tab.Screen
                    name="Add"
                    component={AddStack}
                    options={{ title: 'Agregar actividad' }}
                />
                <Tab.Screen
                    name="Search"
                    component={BusquedaStack}
                    options={{ title: 'Buscar' }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}
