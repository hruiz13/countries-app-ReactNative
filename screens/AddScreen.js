import React, { useState } from 'react'
import { Text, StyleSheet, View, Image, SafeAreaView } from 'react-native'
import { Input, Button } from 'react-native-elements'
import { ScrollView, TouchableHighlight } from 'react-native-gesture-handler'
import MultiSelect from 'react-native-multiple-select';

import { Picker } from 'react-native';


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

    const [formData, setFormData] = useState({
        name: '',
        difficulty: 0,
        duration: '0:0',
        season: 'Verano',
        countries: []
    });

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

        console.log(formData)
    }

    return (
        <SafeAreaView style={styles.add}>
            <View style={styles.form}>
                <Input
                    containerStyle={styles.input}
                    placeholder="Ingrese el nombre de actividad..."
                    onChange={e => handleChange(e, 'name')}
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
                    <Text style={styles.diffText} onPress={() => handleDifficulty(5)} >Extremo</Text></View>
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
                    <Text style={styles.campo}>Temporada:</Text>


                    <Picker
                        selectedValue={selectedTemporada}
                        onValueChange={(itemValue) =>
                            setSelectedTemporada(itemValue)
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
                        items={paises}
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
                    {
                        selectedItems?.map((element, index) => {
                            return (
                                <View>
                                    <Text>{element}</Text>
                                </View>
                            )

                        })
                    }
                </View>

                <Button
                    containerStyle={styles.btnContainer}
                    buttonStyle={styles.btn}
                    title="Guardar"
                    onPress={handleSubmit}

                />

            </View>
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    add: {
        backgroundColor: '#EDF7F3',
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
    }
})
