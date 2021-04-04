import React from 'react'
import { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Alert, ActivityIndicator } from 'react-native'
import { getCountries } from '../../actions/getCountry'
import Loading from '../../components/Loading'
import { Image } from 'react-native-elements'
import NumberFormat from 'react-number-format';

export default function Country({ navigation, route }) {

    const [pais, setPais] = useState(null)
    const { id, name } = route.params


    useEffect(() => {
        navigation.setOptions({ title: name });
        (async () => {
            const response = await getCountries(id)
            if (response) {
                //console.log(response)
                setPais(response.country)
            } else {
                setPais({})
                Alert.alert("Ocurrió un problema cargando el pais.")
            }
        })()
    }, [])


    if (!pais) {
        return <Loading isVisible={true} text='Cargando...' />
    }

    return (
        <View style={styles.pais}>
            <View style={styles.flag}>
                <Image
                    resizeMode="cover"
                    PlaceholderContent={<ActivityIndicator color="#fff" />}
                    source={{ uri: `https://www.countryflags.io/${pais.code}/shiny/64.png` }}
                    style={styles.imageCountry}
                />
            </View>
            <View style={styles.data}>
                <Text>Codigo del pais: {pais.code}</Text>
                <Text>Continente: {pais.region}</Text>
                <Text>Capital: {pais.capital}</Text>
                <Text>Subregion: {pais.subregion}</Text>
                <Text>Area:<NumberFormat renderText={value => <Text>{value}</Text>} value={pais.area} displayType={'text'} thousandSeparator={true} /> km2</Text>
                <Text>Poblacion:<NumberFormat renderText={value => <Text>{value}</Text>} value={pais.population} displayType={'text'} thousandSeparator={true} /> </Text>
            </View>
            <View style={styles.line} />
            <View>
                <Text style={styles.activities}>Actividades:</Text>
            </View>
            <View>
                {
                    pais.activities?.map(activity => {
                        return (
                            <View style={styles.card} key={activity.id}>
                                <View style={styles.cardTitle}>
                                    <Text style={styles.actTitle}>{activity.name}</Text>
                                </View>
                                <View style={styles.cardBody}>
                                    <Text>Dificultad: {activity.difficulty}/5</Text>
                                    <Text>Duracion: {activity.duration}</Text>
                                    <Text>Temporada: {activity.season}</Text>
                                </View>
                            </View>
                        )
                    })
                }
                {
                    pais.activities?.length === 0 &&
                    <View>
                        <Text style={styles.empty}>El país no contiene actividades registradas.</Text>
                    </View>
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    activities: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    actTitle: {
        fontSize: 16,
        alignSelf: 'center',
    },
    card: {
        width: '80%',
        alignSelf: 'center',
        //padding: 10,
        margin: 5,
        borderRadius: 15,
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: '#4E6151',
    },
    cardBody: {
        padding: 10,
    },
    cardTitle: {
        backgroundColor: '#d4e2d5',
        padding: 10,
        width: '100%',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderBottomWidth: 2,
        borderColor: '#4E6151',
    },
    data: {
        alignSelf: 'center',
    },
    empty: {
        padding: 20,
        fontSize: 16
    },
    flag: {
        alignSelf: 'center',
        backgroundColor: 'rgba(240, 240, 240, 0.7)',
        //borderStyle: 'solid',
        //borderWidth: 2,
        //borderColor: '#275DAD',
        borderRadius: 15,
        //backgroundColor: 'red',
        padding: 15,
        margin: 5,
    },
    imageCountry: {
        width: 100,
        height: 100,
    },
    line: {
        marginTop: 20,
        marginBottom: 15,
        borderColor: '#4E6151',
        borderBottomWidth: 1,
    },
    pais: {
        backgroundColor: '#EDF7F3',
        minHeight: '100%'
    }
})
