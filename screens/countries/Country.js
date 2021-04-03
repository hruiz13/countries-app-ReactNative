import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function Country({ navigation, route }) {
    const { id, name } = route.params

    navigation.setOptions({ title: name })
    return (
        <View>
            <Text>Pais! - {name}</Text>
        </View>
    )
}

const styles = StyleSheet.create({})
