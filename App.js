import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Vibration } from 'react-native';
import React, { useState } from 'react';
import { Entypo } from '@expo/vector-icons';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentNumber, setCurrentNumber] = useState('');
  const [lastNumber, setLastNumber] = useState('');

  const buttons = [
    'C', 'DEL', '/', '7', '8', '9', '*',
    '4', '5', '6', '-', '1', '2', '3', '+', '0', '.', '='
  ];

  function calculator() {
    let lastChar = currentNumber[currentNumber.length - 1];
    if (['/', '*', '-', '+', '.'].includes(lastChar)) {
      return; // Prevent invalid operations
    } else {
      let result = eval(currentNumber).toString();
      setCurrentNumber(result);
      setLastNumber(currentNumber + ' = ' + result);
    }
  }

  function handleInput(buttonPressed) {
    if (['+', '-', '*', '/'].includes(buttonPressed)) {
      Vibration.vibrate(35);
      setCurrentNumber(currentNumber + buttonPressed);
      return;
    } else if (buttonPressed === 'DEL') {
      Vibration.vibrate(35);
      setCurrentNumber(currentNumber.substring(0, currentNumber.length - 1));
      return;
    } else if (buttonPressed === 'C') {
      Vibration.vibrate(35);
      setCurrentNumber('');
      setLastNumber('');
      return;
    } else if (buttonPressed === '=') {
      Vibration.vibrate(35);
      calculator();
      return;
    } else {
      Vibration.vibrate(35);
      setCurrentNumber(currentNumber + buttonPressed);
    }
  }

  const styles = StyleSheet.create({
    results: {
      backgroundColor: darkMode ? '#282f3b' : '#f5f5f5',
      maxWidth: '100%',
      minHeight: '35%',
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
    },
    resultText: {
      maxHeight: 45,
      color: '#00b9d6',
      margin: 15,
      fontSize: 35,
    },
    historyText: {
      color: darkMode ? '#8587BB' : '#7c7c7c',
      fontSize: 29,
      marginRight: 10,
      alignSelf: 'flex-end',
    },
    themeButton: {
      alignSelf: 'flex-start',
      bottom: '5%',
      margin: 15,
      backgroundColor: darkMode ? '#7b8884' : '#e5e5e5',
      alignItems: 'center',
      justifyContent: 'center',
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    buttons: {
      width: '100%',
      height: '35%',
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    button: {
      borderColor: darkMode ? '#3f4d5b' : '#e5e5e5',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: '24%',
      minHeight: '54%',
      flex: 2,
    },
    textButton: {
      color: darkMode ? '#b5b7bb' : '#7c7c7c',
      fontSize: 28,
    },
  });

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.results}>
        <TouchableOpacity style={styles.themeButton} onPress={() => setDarkMode(!darkMode)}>
          <Entypo name={darkMode ? 'light-up' : 'moon'} size={24} color={darkMode ? 'white' : 'black'} />
        </TouchableOpacity>
        <Text style={styles.historyText}>{lastNumber}</Text>
        <Text style={styles.resultText}>{currentNumber}</Text>
      </View>
      <View style={styles.buttons}>
        {buttons.map((button) =>
          button === '=' || button === '/' || button === '*' || button === '-' || button === '+' ? (
            <TouchableOpacity
              key={button}
              style={[styles.button, { backgroundColor: '#00b9d6' }]}
              onPress={() => handleInput(button)}
            >
              <Text style={[styles.textButton, { color: 'white', fontSize: 28 }]}>{button}</Text>
            </TouchableOpacity>
          ) : button === 'DEL' || button === 'C' ? (
            <TouchableOpacity
              key={button}
              style={[styles.button, { backgroundColor: darkMode ? '#303946' : '#fff', minWidth: '37%' }]}
              onPress={() => handleInput(button)}
            >
              <Text style={styles.textButton}>{button}</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              key={button}
              style={[styles.button, { backgroundColor: darkMode ? '#303946' : '#fff' }]}
              onPress={() => handleInput(button)}
            >
              <Text style={styles.textButton}>{button}</Text>
            </TouchableOpacity>
          )
        )}
      </View>
    </View>
  );
}
