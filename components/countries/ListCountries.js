import React from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Image } from 'react-native-elements'

export default function ListCountries({ countries, navigation, handleLoadMore, refreshing }) {
    return (
        <View>
            <FlatList
                data={countries}
                keyExtractor={(item, index) => index.toString()}
                onEndReachedThreshold={0.4}
                onEndReached={handleLoadMore}

                renderItem={(country) => (
                    <Country country={country} navigation={navigation} />
                )}
            />
        </View>
    )
}

function Country({ country, navigation }) {
    const { id, name, flag, region, code } = country.item

    const goCountry = () => {
        navigation.navigate('country', { id, name })
    }

    return (
        <TouchableOpacity onPress={goCountry}>
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
        marginTop: 15,
        fontWeight: 'bold'
    },
    countryRegion: {
        paddingTop: 2,
        color: 'grey'
    }

})
