import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import {ILoginForm} from './App';

interface ILoginPage {
  onSubmit: (value: ILoginForm) => void;
}
const LoginPage = ({onSubmit}: ILoginPage) => {
  const [userId, setUserId] = useState('top');
  const [apiRegion, setApiRegion] = useState('sg');
  const [apiKey, setApiKey] = useState(
    'b3babb0b3a89f4341d31dc1a01091edcd70f8de7b23d697f',
  );

  const handleLogin = () => {
    // Perform login logic here
    console.log('Login button pressed');
    console.log('Userid:', userId);
    console.log('API Endpoint:', apiRegion);
    console.log('API Key:', apiKey);
    onSubmit &&
      onSubmit({userId: userId, apiRegion: apiRegion, apiKey: apiKey});
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('./amity-logo-banner.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>React Native UIkit</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Userid</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your Userid"
          onChangeText={text => setUserId(text)}
          value={userId}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>API Endpoint</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your API Region"
          onChangeText={text => setApiRegion(text)}
          value={apiRegion}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>API Key</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your API Key"
          onChangeText={text => setApiKey(text)}
          value={apiKey}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#06be8b',
  },
  inputContainer: {
    width: '80%',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
  },
  button: {
    width: '80%',
    height: 40,
    backgroundColor: '#06be8b',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginPage;
