import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface InputBoxProps {
  userInput: string;
  setUserInput: (text: string) => void;
  handleGenerate: () => void;
}

export default function InputBox({ userInput, setUserInput, handleGenerate }: InputBoxProps) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter a topic to generate a prompt..."
        placeholderTextColor="#999"
        value={userInput}
        onChangeText={setUserInput}
        multiline={true}
        numberOfLines={4}
        textAlignVertical="top"
      />

      <TouchableOpacity style={styles.button} onPress={handleGenerate}>
        <Text style={styles.buttonText}>Generate Prompt</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    minHeight: 80,
    color: '#333',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
