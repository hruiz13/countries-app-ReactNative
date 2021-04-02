import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import Loading from '../components/Loading'

export default class HomeScreen extends Component {
    render() {
        return (
            <View>
                <Text> Home test </Text>
                {/* <Loading isVisible={true} text="Cargando..." /> */}
            </View>
        )
    }
}

const styles = StyleSheet.create({})
