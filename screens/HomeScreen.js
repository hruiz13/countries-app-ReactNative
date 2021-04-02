import React, { useCallback, useState } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import Loading from '../components/Loading'
import { useFocusEffect } from '@react-navigation/native'
import { getCountries } from '../actions/getCountries'
import ListCountries from '../components/countries/ListCountries'

export default function HomeScreen() {
    const [startCountries, setStartCountries] = useState(null)
    const [countries, setCountries] = useState([])
    const [loading, setLoading] = useState(false)

    //console.log("Paises: ", countries)

    useFocusEffect(
        useCallback(() => {
            async function fetchData() {
                setLoading(true)
                const respuesta = await getCountries({ offset: 0 })
                // console.log(respuesta.countries[0].paises)
                // console.log("NUEVO2")
                if (respuesta.statusResponse) {
                    setStartCountries(respuesta.startCountries)
                    setCountries(respuesta.countries[0].paises)
                }
                setLoading(false)
            }
            fetchData()
        }, [])
    )

    return (
        <View>
            {
                countries.length > 0 ? (
                    <ListCountries countries={countries} navigation="" />
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
