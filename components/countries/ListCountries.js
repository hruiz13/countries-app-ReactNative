import React from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Image } from 'react-native-elements'

export default function ListCountries({ countries, navigation }) {
    // console.log(countries)
    // console.log("Solo paises")
    return (
        <View>
            <FlatList
                data={countries}
                keyExtractor={(item, index) => index.toString()}
                renderItem={(country) => (
                    <Country country={country} navigation={navigation} />
                )}
            />
        </View>
    )
}

function Country({ country, navigation }) {
    const { id, name, flag, region, code } = country.item
    //console.log("ACA ", country)
    // console.log("End")
    return (
        <TouchableOpacity>
            <View style={styles.viewCountry}>
                <View style={styles.viewCountryImage}>
                    <Image
                        resizeMode="cover"
                        PlaceholderContent={<ActivityIndicator color="#fff" />}
                        source={{ uri: `https://www.countryflags.io/${code}/shiny/64.png` }}
                        style={styles.imageCountry}
                    />

                </View>
                <View>
                    <Text style={styles.countryName}>{name}</Text>
                    <Text style={styles.countryRegion}>{region}</Text>
                    <Text style={styles.countryRegion}>{code}</Text>
                    {/* <Text style={styles.countryRegion}>{code}</Text> */}
                </View>
            </View>
        </TouchableOpacity>
    )

}

const styles = StyleSheet.create({
    viewCountry: {
        flexDirection: 'row',
        margin: 10
    },
    viewCountryImage: {
        marginRight: 15
    },
    imageCountry: {
        width: 90,
        height: 90,
    },
    countryName: {
        fontWeight: 'bold'
    },
    countryRegion: {
        paddingTop: 2,
        color: 'grey'
    }

})
