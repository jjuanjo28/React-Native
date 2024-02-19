import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';


export default function App() {
 

function meApretaron() {
  console.log("me apretaron!!!")
}
  return (
    <View style={styles.container}>
      <Text>Desde casa </Text>
      <Button title='Soy un Boton!!!' onPress={meApretaron}></Button>
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
});
