import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

import ButtonTest from "../components/ButtonTest";
import ThemedStyles from "../styles/stylesheets";
import BasicButton from "../components/BasicButton";
import Input from "../components/BasicInput";
import { useState } from "react";
import BasicCard from "../components/BasicCard";

export default function LoginScreen({ navigation }) {
  const styles = ThemedStyles();

  // values
  const [email, setEmail] = useState('');

  return (
    <View style={[styles.container, { padding: 5 }]}>
      <BasicCard style={{ width: '85%', gap: 15 }}>
        <Text style={[styles.colorPrimaryDark.color, { textAlign: 'left', fontSize: 18 }]}>Entrar na conta</Text>
        <Input
          label="Email"
          placeholder="voce@email.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <BasicButton onPress={() => navigation.navigate('Home')} disabled={false} loading={false} title={'Entrar'} />

      </BasicCard>

      <StatusBar style="auto" />
    </View>
  );
}