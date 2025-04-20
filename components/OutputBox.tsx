import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

interface OutputBoxProps {
  generatedPrompt: string;
}

export default function OutputBox({ generatedPrompt }: OutputBoxProps) {
  const handleCopy = () => {
    if (generatedPrompt) {
      Alert.alert('Copied!', 'Prompt copied to clipboard.');
    }
  };

  if (!generatedPrompt) {
    return (
      <View style={styles.emptyBox}>
        <Text style={styles.emptyText}>Your generated prompt will appear here...</Text>
      </View>
    );
  }

  return (
    <View style={styles.outputContainer}>
      <Text style={styles.promptText}>{generatedPrompt}</Text>

      <TouchableOpacity style={styles.copyButton} onPress={handleCopy} activeOpacity={0.8}>
        <Text style={styles.copyButtonText}>Copy Prompt</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  outputContainer: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    marginTop: 20,
  },
  promptText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 12,
  },
  copyButton: {
    backgroundColor: '#28a745',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  copyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyBox: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  emptyText: {
    color: '#aaa',
    fontSize: 16,
  },
});

