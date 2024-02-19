import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Image,
  StatusBar,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
} from "react-native";
import { ButtonBlue, ButtonRed } from "./components/Buttons";
import * as ImagePicker from "expo-image-picker";
import * as Contacts from "expo-contacts";
import DateTimePicker from '@react-native-community/datetimepicker';

const ImageScreen = () => {
  const [prestamos, setPrestamos] = useState([])
  const [image, setImage] = useState("https://via.placeholder.com/200");
  const [contacts, setContacts] = useState(undefined);
  const [selectedName, setSelectedName] = useState(null); // Estado para almacenar el nombre selecciona
  const [hora, setHora] = useState(new Date())
  const [selectedContactId, setSelectedContactId] = useState(null);
  const [hayFoto, setHayFoto] = useState(false)
  const [phone, setPhone] = useState("")
  const [date, setDate] = useState(new Date())
  const [showPickerDate, setShowPickerDate] = useState(false)
  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();

      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [
            Contacts.Fields.ID,
            Contacts.Fields.Name,
            Contacts.Fields.LastName,
            Contacts.Fields.PhoneNumbers,
          ],
        });

        if (data.length > 0) {
          setContacts(data);

          // console.log("soy tel:", contact.phoneNumbers[0].number);
          // console.log("soy el nombre: ",contact.name);
        }
      }
    })();
  }, []);//  carga la base de usuarios que tiene la agenda del equipo
  useEffect(() => {
    console.log(prestamos); // Observa los cambios en el estado prestamos
  }, [prestamos]); // Se ejecutará cada vez que prestamos se actualice

  function prestamo(fechaInicial, user, telefono, foto, fechaDevolucion) {
    this.fechaInicial = fechaInicial;
    this.user = user;
    this.telefono = telefono;
    this.foto = foto;
    this.fechaDevolucion = fechaDevolucion
  }

  const toogleDatepicker = () => {
    setShowPickerDate(!showPickerDate);
   }

  const onChage = ({type}, selectedDate) => {
            if(type == "set"){
              const currenDate = selectedDate
              setDate(currenDate)
              toogleDatepicker()
              setDate(currenDate.toDateString())

            } else {
              toogleDatepicker()
            }
  } 
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const imageNew = result.assets[0].uri
      setImage(imageNew)
      setHayFoto(true)
    }
  };

  const tomarFotografia = async () => {

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    setHayFoto(true)
    } else {
      alert("no elegiste ninguna fotografia")
    }
  };


  function telefono(contact) {

    if(image == "https://via.placeholder.com/200" ){
     alert("primero debes tomar una foto")
     setSelectedName(null)
     return;
    }

    const currentHour = new Date(); // Obtenemos la hora actual aquí
    setHora(currentHour);

    if (contact.phoneNumbers[0].number !== undefined) {
      setSelectedName(contact.name)
      setPhone(contact.phoneNumbers[0].number)
      let prest = new prestamo(hora, contact.name, contact.phoneNumbers[0].number, image, date)
      
      setPrestamos([...prestamos, prest])
      console.log(prest)
     
    } else {
      console.log(
        "el usuario " + contact.name + " no tiene telefono registrado"
      );
    }

  }


  let getContactRows = () => {
    if (contacts !== undefined) {
      return contacts.map((contact, index) => (
        <ButtonBlue
          key={index}
          text={contact.name}
          onPress={() => {
            telefono(contact);
            setSelectedContactId(contact.id)
           // setSelectedName(contact.name); // Al presionar un botón, guardamos el nombre seleccionado
          }}
        />
      ));
    }
  };

  return (
    <View>


      <Text style={{...styles.prestamo}}>PRESTAMOS</Text>

      {/* <ButtonRed text="Seleccionar una Imagen" onPress={pickImage} /> */}

      <Image
        style={{
          alignSelf: "center",
          height: 200,
          width: 200,
        }}
        source={{ uri: image }}
      />

      <ButtonRed text="Tomar Fotografia" onPress={tomarFotografia} />
       <View>

        {showPickerDate && (
          <View>
        <Text style={{...styles.fechaEntrega}}>Fecha de entrega</Text>
        <DateTimePicker
        mode="date"
        display="spinner"
        value={date}
        onChange={onChage}
        />
          </View>
        )}

        {!showPickerDate && (
          <Pressable
        onPress={toogleDatepicker}>

        <TextInput
          style={{...styles.input}}
          placeholder="tu fecha para reclamo"
          value={date}
          onChangeText={setDate}
          placeholderTextColor="#11182744"
          editable={false}
          />
        </Pressable>
        )}

       </View>

      {/* Mostrar el nombre seleccionado en lugar de los botones */}
      {selectedName ? 
      <ButtonBlue text={contacts.find((contact) => contact.id === selectedContactId).name} />
                     
       : <ScrollView>{getContactRows()}</ScrollView>}
      <StatusBar style="auto" />
    </View>
  );
};
const styles = StyleSheet.create({
prestamo:{
   backgroundColor:"grey",
   fontSize: 20,
   margin: 15,
   textAlign:"center",
   borderRadius: 15,
   padding: 15,
   
},
fechaEntrega:{
   fontSize: 15,
   textAlign:"center",
   margin: 20
},
input:{
  textAlign: "center",
  margin: 10,
  backgroundColor: "orange"
}

})
export default ImageScreen;

