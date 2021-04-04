import React, { useState, useEffect } from 'react'
import { Text, StyleSheet, View, Image, SafeAreaView, Alert } from 'react-native'
import { Input, Button } from 'react-native-elements'
import { ScrollView, TouchableHighlight } from 'react-native-gesture-handler'
import MultiSelect from 'react-native-multiple-select';
import { useNavigation } from '@react-navigation/native'

import { Picker } from 'react-native';
import Loading from '../components/Loading';
import { getCountries } from '../helpers/getCountries';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['VirtualizedLists should never be nested inside plain ScrollViews with the same orientation - use another VirtualizedList-backed container instead.']);

const paises = [
    {
        id: '1',
        name: 'Colombia'
    }, {
        id: '2',
        name: 'Argentina'
    }, {
        id: '3',
        name: 'Andorra'
    }
]

export default function AddScreen() {
    const [hor, setHor] = useState(0)
    const [min, setMin] = useState(0)
    const [selectedItems, setSelectedItems] = useState([])
    const [selectedTemporada, setSelectedTemporada] = useState();
    const [nameError, setNameError] = useState('')
    const [diffError, setDiffError] = useState('')
    const [durationError, setDurationError] = useState('')
    const [countriesError, setCountriesError] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [listaPaises, setListaPaises] = useState(paises)

    const [formData, setFormData] = useState({
        name: '',
        difficulty: 0,
        duration: '0:0',
        season: 'Verano',
        countries: []
    });



    const navigation = useNavigation();

    useEffect(() => {
        setIsLoading(false)
        fetch('http://192.168.3.221:4001/countries/list/')
            .then(res => res.json())
            .then(json => {
                setListaPaises(json.paises.map(pais => {
                    pais.id = pais.id.toString()
                    return pais
                }))
            })
            .catch((error) => console.error(error))
            .finally(() => setIsLoading(false));
    }, [])

    const handleChange = (e, type) => {
        setFormData({
            ...formData,
            [type]: e.nativeEvent.text
        })
    }

    const handleHora = (e) => {
        setHor(e.nativeEvent.text)
        setFormData({
            ...formData,
            duration: `${e.nativeEvent.text}:${min}`
        })
    }
    const handleMin = (e) => {
        setMin(e.nativeEvent.text)
        setFormData({
            ...formData,
            duration: `${hor}:${e.nativeEvent.text}`
        })
    }

    const handleInputChange = (value) => {
        setSelectedTemporada(value)
        setFormData({
            ...formData,
            season: value
        })
    }

    const handleDifficulty = (value) => {
        setFormData({
            ...formData,
            difficulty: value
        })
    }
    const onSelectedItemsChange = (itemsSeleccionados) => {
        setSelectedItems(itemsSeleccionados);
        setFormData({
            ...formData,
            countries: itemsSeleccionados
        })

    };

    const handleSubmit = () => {
        setNameError('')
        setDiffError('')
        setDurationError('')
        setCountriesError('')
        if (formData.name === '') {
            setNameError("Debe ingresar una actividad.")
            return
        }
        if (formData.difficulty === 0) {
            setDiffError("Debe seleccionar una dificultad.")
            return
        }
        if (formData.duration === '0:0') {
            setDurationError("Debe seleccionar una duracion.")
            return
        }
        if (formData.countries.length === 0) {
            setCountriesError("Debe seleccionar al menos 1 pais.")
            return
        }

        let enviar = {
            ...formData,
            countries: formData.countries.map(country => {
                country.id = Number(country.id)
                return country
            })
        }

        //console.log(enviar)
        //Post actividades
        fetch('http://192.168.3.221:4001/activity', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(enviar)
        })
            .then(resp => resp.json())
            .then(json => {
                console.log(json)
                if (json.ok) {
                    Alert.alert("Actividad Guardada",
                        "La actividad se ha guardado con exito.",
                        [{
                            text: "OK"
                        }])
                }
            })

        //Clear inputs after send to db
        setFormData({
            name: '',
            difficulty: 0,
            duration: '0:0',
            season: 'Verano',
            countries: []
        })
        //return home nav.
        navigation.navigate('Home')
    }

    return (
        <View style={styles.add}>
            <ScrollView>
                <View style={styles.form}>
                    <Input
                        containerStyle={styles.input}
                        placeholder="Ingrese el nombre de actividad..."
                        onChange={e => handleChange(e, 'name')}
                        errorMessage={nameError}
                        defaultValue={formData.name}
                    />
                    <Text style={styles.campo}>
                        Seleccione dificultad:
                    </Text>
                    <View style={styles.diff}>
                        <TouchableHighlight onPress={() => handleDifficulty(1)} >
                            <Image
                                style={styles.diffImage}
                                source={require('../assets/lightblue.png')}

                            />
                        </TouchableHighlight>
                        <TouchableHighlight onPress={() => handleDifficulty(2)} >
                            <Image
                                style={styles.diffImage}
                                source={require('../assets/blue.png')}

                            />
                        </TouchableHighlight>
                        <TouchableHighlight onPress={() => handleDifficulty(3)} >
                            <Image
                                style={styles.diffImage}
                                source={require('../assets/green.png')}

                            />
                        </TouchableHighlight>
                        <TouchableHighlight onPress={() => handleDifficulty(4)} >
                            <Image
                                style={styles.diffImage}
                                source={require('../assets/yellow.png')}

                            />
                        </TouchableHighlight>
                        <TouchableHighlight onPress={() => handleDifficulty(5)} >
                            <Image
                                style={styles.diffImage}
                                source={require('../assets/red.png')}

                            />
                        </TouchableHighlight>
                    </View>
                    <View style={styles.diff}>
                        <Text style={styles.diffText} onPress={() => handleDifficulty(1)} >Facil</Text>
                        <Text style={styles.diffText} onPress={() => handleDifficulty(2)} >Normal</Text>
                        <Text style={styles.diffText} onPress={() => handleDifficulty(3)} >Dificil</Text>
                        <Text style={styles.diffText} onPress={() => handleDifficulty(4)} >Muy Dificil</Text>
                        <Text style={styles.diffText} onPress={() => handleDifficulty(5)} >Extremo</Text>
                    </View>
                    <View>
                        <Text style={styles.error}>
                            {
                                diffError !== '' ?
                                    diffError : ''
                            }
                        </Text>
                    </View>
                    <View style={styles.time}>
                        <Text style={styles.campo}>Duracion:</Text>
                        <Input
                            containerStyle={styles.inputHour}
                            placeholder="Duracion"
                            keyboardType="numeric"
                            onChange={e => handleHora(e)}
                        />
                        <Text>Horas</Text>
                        <Input
                            containerStyle={styles.inputHour}
                            placeholder="Duracion"
                            keyboardType="numeric"
                            onChange={e => handleMin(e)}
                        />
                        <Text>Minutos</Text>
                    </View>
                    <View>
                        <Text style={styles.error}>
                            {
                                durationError !== '' ?
                                    durationError : ''
                            }
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.campoTemp}>Temporada:</Text>
                        <Picker
                            selectedValue={selectedTemporada}
                            onValueChange={(value) =>
                                handleInputChange(value)
                            }>
                            <Picker.Item label="Verano" value="Verano" />
                            <Picker.Item label="Otoño" value="Otoño" />
                            <Picker.Item label="Invierno" value="Invierno" />
                            <Picker.Item label="Primavera" value="Primavera" />
                        </Picker>
                    </View>
                    <View>
                        <MultiSelect
                            hideTags
                            items={listaPaises}
                            uniqueKey="id"
                            onSelectedItemsChange={onSelectedItemsChange}
                            selectedItems={selectedItems}
                            selectText="Seleccione pais(es)"
                            searchInputPlaceholderText="Buscar Pais..."
                            onChangeInput={(text) => console.log(text)}
                            tagRemoveIconColor="#CCC"
                            tagBorderColor="#CCC"
                            tagTextColor="#CCC"
                            selectedItemTextColor="#CCC"
                            selectedItemIconColor="#CCC"
                            itemTextColor="#000"
                            displayKey="name"
                            searchInputStyle={{ color: '#CCC' }}
                            submitButtonColor="#CCC"
                            submitButtonText="Listo"
                            styleMainWrapper={styles.multiStyle}
                        />
                        <View style={styles.listaPaises}>
                            {
                                selectedItems?.map((element, index) => {
                                    return (
                                        <Text key={index} style={styles.listaPais}>{listaPaises[Number(element) - 1]?.name}</Text>
                                    )

                                })
                            }
                        </View>
                        <View>
                            <Text style={styles.error}>
                                {
                                    countriesError !== '' ?
                                        countriesError : ''
                                }
                            </Text>
                        </View>
                    </View>

                    <Button
                        containerStyle={styles.btnContainer}
                        buttonStyle={styles.btn}
                        title="Guardar"
                        onPress={handleSubmit}

                    />

                </View>
                <Loading isVisible={isLoading} text="Cargando paises" />
            </ScrollView>
        </View>
    )

}

const styles = StyleSheet.create({
    add: {
        backgroundColor: '#EDF7F3',
        minHeight: '100%'
    },
    btn: {
        backgroundColor: '#4E6151',
    },
    btnContainer: {
        marginTop: 20,
        width: '50%',
        alignSelf: 'center'
    },
    campo: {
        marginLeft: 10,
        fontSize: 18
    },
    campoTemp: {
        marginLeft: 10,
        fontSize: 18,
        marginTop: 10
    }, diff: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    diffImage: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        width: 50,
        height: 50,
        resizeMode: 'stretch'
    },
    diffText: {
        marginLeft: 0,
        width: 70,
        textAlign: 'center'

    },
    error: {
        color: 'red',
        marginLeft: 20,
        marginTop: 5,
        fontSize: 12,
    },
    form: {
        marginTop: 30,
    },
    input: {
        marginTop: 10,
        width: '100%'
    },
    inputHour: {
        marginTop: 10,
        width: '25%'
    },
    listaPais: {
        backgroundColor: '#83C9F4',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 3,
        paddingBottom: 3,
        margin: 5,
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: '#275DAD',
        borderRadius: 15
    },
    listaPaises: {
        flexDirection: 'row',
        marginLeft: 5


    },
    multiStyle: {
        marginTop: 20,
    },
    pickerStyle: {
        marginBottom: 50,
        backgroundColor: 'red',
    },
    time: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: -15,
    }
})
