import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { Button, Input } from 'react-native-elements';
import { Picker } from 'react-native';

export default function SearchScreen() {
    const navigation = useNavigation();

    const [buscar, setBuscar] = useState('')
    const [buscarError, setBuscarError] = useState('')
    const [selectedContinente, setSelectedContinente] = useState('')
    const [continenteError, setContinenteError] = useState('')

    const handleChange = (e) => {
        setBuscar(e.nativeEvent.text)
    }

    const handleSubmit = () => {
        setBuscarError('')
        if (buscar === '') {
            setBuscarError('Debe ingresar una ciudad')
            return
        }
        navigation.navigate('countrySearch', { busqueda: buscar })
    }

    const handleSubmitContinente = () => {
        setContinenteError('')
        if (selectedContinente === '') {
            setContinenteError('Debe seleccionar un continente')
            return
        }
        navigation.navigate('countrySearch', { busqueda: selectedContinente, donde: 'region' })
    }

    const handleSubmitPoblacion = () => {
        navigation.navigate('countrySearch', { order: 'DESC', orderBy: 'population', })
    }
    const handleSubmitPoblacionMen = () => {
        navigation.navigate('countrySearch', { order: 'ASC', orderBy: 'population', })
    }

    const handleInputChange = (value) => {
        setSelectedContinente(value)
    }

    return (
        <View style={styles.search}>
            <Input
                containerStyle={styles.input}
                placeholder="Buscar una ciudad..."
                onChange={handleChange}
                errorMessage={buscarError}
                defaultValue={buscar}
            />
            <Button
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                title="Buscar ciudad"
                onPress={handleSubmit}

            />
            <View style={styles.line}></View>
            <Picker
                selectedValue={selectedContinente}
                onValueChange={(value) =>
                    handleInputChange(value)
                }>
                <Picker.Item label="Asia" value="Asia" />
                <Picker.Item label="Sin continente" value="." />
                <Picker.Item label="Oceania" value="Oceania" />
                <Picker.Item label="Africa" value="Africa" />
                <Picker.Item label="Polar" value="Polar" />
                <Picker.Item label="Europe" value="Europe" />
                <Picker.Item label="Americas" value="Americas" />
            </Picker>
            <Button
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                title="Buscar por continente"
                onPress={handleSubmitContinente}

            />
            <View style={styles.line}></View>
            <View>
                <Button
                    containerStyle={styles.btnContainer}
                    buttonStyle={styles.btn}
                    title="Ver paises con mas poblacion."
                    onPress={handleSubmitPoblacion}

                />
            </View>
            <View style={styles.line}></View>
            <View>
                <Button
                    containerStyle={styles.btnContainer}
                    buttonStyle={styles.btn}
                    title="Ver paises con menos poblacion."
                    onPress={handleSubmitPoblacionMen}

                />
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    btn: {
        backgroundColor: '#4E6151',
    },
    btnContainer: {
        width: '50%',
        alignSelf: 'center'
    },
    input: {
        marginTop: 10,
        width: '100%'
    },
    line: {
        marginTop: 20,
        marginBottom: 15,
        borderColor: '#4E6151',
        borderBottomWidth: 1,
    },
    search: {
        backgroundColor: '#EDF7F3',
        minHeight: '100%'
    }
})
