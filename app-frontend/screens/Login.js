import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { styles } from "../styles/stylesheets";
import ButtonTest from "../components/ButtonTest";

export default function LoginScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Login.</Text>
      <ButtonTest navigation={navigation} screen="Home" />
      <StatusBar style="auto" />
    </View>
  );
}