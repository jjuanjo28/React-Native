import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { useState, useEffect } from 'react';
import { RadioButtons } from "react-native-radio-buttons"

export default function App() {

  const [horaA, setHoraA] = useState(0)
  const [horaB, setHoraB] = useState(0)
  const [minutoA, setMinutoA] = useState(0)
  const [minutoB, setMinutoB] = useState(0)
  const [segundoA, setSegundoA] = useState(0)
  const [segundoB, setSegundoB] = useState(0)
  const [resultadoSegundos, setResultadoSegundos] = useState(0)
  const [resultadoMinutos, setResultadoMinutos] = useState(0)
  const [resultadoHoras, setResultadoHoras] = useState(0)

  useEffect(() => {
  setResultadoMinutos(resultadoMinutos)
  }, [resultadoMinutos])
//////////////////////////////////////////////////////////////

const options = [
  "Option 1",
  "Option 2"
];
function setSelectedOption(selectedOption){
  this.setState({
    selectedOption
  });
}
function renderOption(option, selected, onSelect, index){
  const style = selected ? { fontWeight: 'bold'} : {};

  return (
    <TouchableWithoutFeedback onPress={onSelect} key={index}>
      <Text style={style}>{option}</Text>
    </TouchableWithoutFeedback>
  );
}

function renderContainer(optionNodes){
  return <View>{optionNodes}</View>;
}




///////////////////////////////////////////////////////////////
function mostrarResultado() {
  suma()
}

function suma() {
let resultado = parseInt(segundoA) + parseInt(segundoB)
let acumula = 0
while (resultado >= 60) {
  resultado = resultado - 60
  acumula++
  setResultadoSegundos(resultado)
}
 setResultadoMinutos(resultadoMinutos+acumula)
 setResultadoSegundos(resultado)
 let resultadoMin = acumula + parseInt(minutoA) + parseInt(minutoB)
 acumula = 0
 while(resultadoMin >= 60){
  resultadoMin = resultadoMin - 60
  acumula ++
  setResultadoMinutos(resultadoMin)
 }
setResultadoHoras(resultadoHoras+acumula) 
setResultadoMinutos(resultadoMin)

let resultadoHoras = acumula + parseInt(horaA) + parseInt(horaB)
setResultadoHoras(resultadoHoras)


}

function borrarTodo() {
 setHoraA(0)
 setHoraB(0)
 setSegundoA(0)
 setSegundoB(0)
 setMinutoA(0)
 setMinutoB(0)
 setResultadoSegundos(0)
 setResultadoMinutos(0)
 setResultadoHoras(0)
 }

  return (

    
    <View style={styles.container}>
   

   <View style={{margin: 20}}>
      <RadioButtons
        options={ options }
        onSelection={ setSelectedOption.bind(this) }
        selectedOption={this.state.selectedOption }
        renderOption={ renderOption }
        renderContainer={ renderContainer }
      />
      <Text>Selected option: {this.state.selectedOption || 'none'}</Text>
    </View>


    
    <View style={styles.inLine}>
<TextInput
        style={styles.inputNumeros}
        onChangeText={(value)=>setHoraA(value)}
        keyboardType='numeric'
        />
        <Text>Hora</Text>

        <TextInput
        style={styles.inputNumeros}
        onChangeText={(value)=>setMinutoA(value)}
        keyboardType='numeric'
        />
        <Text>Minuto</Text>
        
        <TextInput
        style={styles.inputNumeros}
        onChangeText={(value)=>setSegundoA(value)}
        keyboardType='numeric'
        />
        <Text>Segundo</Text>

    </View>


    <View>
      <Text>Ingrese Calculo</Text>
    </View>

    <View style={styles.inLine}>

<TextInput
        style={styles.inputNumeros}
        onChangeText={(value)=>setHoraB(value)}
        keyboardType='numeric'
        />
        <Text>Hora</Text>
        <TextInput
        style={styles.inputNumeros}
        onChangeText={(value)=>setMinutoB(value)}
        keyboardType='numeric'
        />
        <Text>Minuto</Text>  
 
        <TextInput
        style={styles.inputNumeros}
        onChangeText={(value)=>setSegundoB(value)}
        keyboardType='numeric'
        />
        <Text>Segundo</Text>
    </View>
<View style={styles.inLine}>
<Text>{resultadoHoras}</Text>
<Text> Horas </Text>
<Text>{resultadoMinutos}</Text>
<Text> Minutos </Text>
<Text>{resultadoSegundos}</Text>
<Text> Segundos </Text>
</View>
      <View style={styles.inLine}>
         <Button 
        title='Mostrar Resultado'
        onPress={mostrarResultado}
      />
        <Button 
        title='Borrar Todo'
        onPress={borrarTodo}
      />
      </View>
     
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    width: '80%',
  },
  inputNumeros: {
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    width: '12%',
    
  },
  inLine:{
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
    margin:5,
  }
});
