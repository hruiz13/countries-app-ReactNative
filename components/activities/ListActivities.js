import React from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'

export default function ListActivities({ activities, navigation }) {
    return (
        <View>
            <FlatList
                data={activities}
                keyExtractor={(item, index) => index.toString()}

                renderItem={(activity) => (
                    <Activity activity={activity} navigation={navigation} />
                )}
            />
        </View>
    )
}

function Activity({ activity, navigation }) {
    const { DISTINCT } = activity.item

    const goActivity = () => {
        navigation.navigate('countrySearch', { busqueda: DISTINCT, act: true })
    }

    return (
        <TouchableOpacity onPress={goActivity}>
            <View style={styles.viewCountry}>
                <View>
                    <Text style={styles.countryName}>{DISTINCT}</Text>
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
