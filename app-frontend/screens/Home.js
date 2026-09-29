import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { styles } from "../styles/stylesheets";
import ButtonTest from "../components/ButtonTest";
import BackButtonTest from "../components/BackButtonTest";

export default function HomeScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Text>AgroSlot.</Text>
      <BackButtonTest navigation={navigation} />
      <StatusBar style="auto" />
    </View>
  );
}