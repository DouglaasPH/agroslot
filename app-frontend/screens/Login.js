import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import ThemedStyles, { Colors } from "../styles/stylesheets";
import BasicButton from "../components/BasicButton";
import Input from "../components/BasicInput";
import { useState } from "react";
import BasicCard from "../components/BasicCard";
import { validateEmail, validatePassword } from "../common/Validation";

export default function LoginScreen({ navigation }) {
  const styles = ThemedStyles();

  // values
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // states
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  // handle login
  function handleLogin() {
    setEmailError(false);
    setPasswordError(false);

    let validEmail = validateEmail(email);
    let validPassword = validatePassword(password);

    // email check
    if (!validEmail || !validPassword) {
      setEmailError(!validEmail);
      setPasswordError(!validPassword);
    } else {
      setEmailError(false);
      setPasswordError(false);
      setEmail('');
      setPassword('');
      navigation.navigate('Home');
    }

  }

  return (
    <View style={[styles.container, { padding: 5 }]}>
      <BasicCard style={{ width: '85%' }}>
        <Text style={[styles.colorPrimary, { textAlign: 'left', fontSize: 20, fontWeight: 700 }]}>Entrar na conta</Text>

        <Input
          label="Email"
          placeholder="voce@email.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          error={emailError}
          errorMessage="Email inválido"
        />

        <Input
          label="Senha"
          placeholder="********"
          value={password}
          onChangeText={setPassword}
          keyboardType="password"
          error={passwordError}
          secureTextEntry
          errorMessage="Senha inválida"
        />

        <BasicButton onPress={handleLogin} disabled={false} loading={false} title={'Entrar'} />

      </BasicCard>

      <StatusBar style="auto" />
    </View>
  );
}