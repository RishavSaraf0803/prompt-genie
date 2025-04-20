import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import InputBox from '../../components/InputBox';    // Adjust based on your project structure
import OutputBox from '../../components/OutputBox';

const API_KEY = "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"; // 🛑 Put your real OpenRouter API key here

const generatePrompt = async (userInput: string): Promise<string> => {
  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://your-app.com/', // optional
        'X-Title': 'Prompt Generator App'
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-pro-preview-03-25",
        messages: [
          { role: "system", content: "You are an expert prompt engineer." },
          { role: "user", content: `Create a great prompt based on: ${userInput}` }
        ]
      })
    });

    if (!response.ok) {
      throw new Error('Failed to fetch from LLM API');
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const HomeScreen = () => {
  const [userInput, setUserInput] = useState<string>('');
  const [generatedPrompt, setGeneratedPrompt] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleGenerate = async () => {
    if (!userInput.trim()) {
      Alert.alert('Input required', 'Please enter a topic first.');
      return;
    }
    try {
      setLoading(true);
      const prompt = await generatePrompt(userInput);
      setGeneratedPrompt(prompt);
    } catch (error) {
      Alert.alert('Error', 'Something went wrong while generating the prompt.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Prompt Generator</Text>

      <InputBox
        userInput={userInput}
        setUserInput={setUserInput}
        handleGenerate={handleGenerate}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#007bff" style={styles.loader} />
      ) : (
        <OutputBox generatedPrompt={generatedPrompt} />
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  loader: { marginTop: 20 }
});
