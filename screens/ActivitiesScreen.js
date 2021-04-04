import React, { useCallback, useState } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import Loading from '../components/Loading'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { getActivities } from '../actions/getActivities'
import ListActivities from '../components/activities/ListActivities'

export default function ActividadesScreen() {
    const [startActivities, setStartActivities] = useState(0)
    const [activities, setActivities] = useState([])
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation();
    useFocusEffect(
        useCallback(() => {
            async function fetchData() {
                setLoading(true)
                const respuesta = await getActivities()
                if (respuesta.statusResponse) {
                    setStartActivities(startActivities + 10)
                    setActivities(respuesta.activities[0].activities)
                    console.log(respuesta)
                }
                setLoading(false)
            }
            fetchData()
        }, [])
    )

    return (
        <View style={styles.home}>
            {
                activities.length > 0 ? (
                    <ListActivities activities={activities} navigation={navigation} />
                ) : (
                    <View style={styles.notFoundView}>
                        <Text style={styles.notFoundText}>No hay paises registrados.</Text>
                    </View>
                )
            }
            { loading && <Loading isVisible={true} text="Cargando paises..." />}
        </View>
    )
}

const styles = StyleSheet.create({
    home: {
        backgroundColor: '#EDF7F3',
        minHeight: '100%'
    },
    notFoundView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    notFoundText: {
        fontSize: 18,
        fontWeight: 'bold'
    }
})
