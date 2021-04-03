import React, { useCallback, useState } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import Loading from '../components/Loading'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { getCountries } from '../actions/getCountries'
import ListCountries from '../components/countries/ListCountries'

export default function HomeScreen() {
    const [startCountries, setStartCountries] = useState(0)
    const [countries, setCountries] = useState([])
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation();
    useFocusEffect(
        useCallback(() => {
            async function fetchData() {
                setLoading(true)
                const respuesta = await getCountries({ offset: startCountries })
                if (respuesta.statusResponse) {
                    setStartCountries(startCountries + 10)
                    setCountries(respuesta.countries[0].paises)
                }
                setLoading(false)
            }
            fetchData()
        }, [])
    )

    const handleLoadMore = async () => {
        if (!startCountries) {
            return
        }
        setLoading(true)
        const respuesta = await getCountries({ offset: startCountries })
        if (respuesta.statusResponse) {
            setStartCountries(startCountries + 10)
            setCountries([...countries, ...respuesta.countries[0].paises])
        }
        setLoading(false)
    }

    return (
        <View style={styles.home}>
            {
                countries.length > 0 ? (
                    <ListCountries countries={countries} navigation={navigation} handleLoadMore={handleLoadMore} />
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
