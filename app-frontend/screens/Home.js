import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import ThemedStyles from "../styles/stylesheets";
import BackButtonTest from "../components/BackButtonTest";
import Popup from "../components/Modal";
import { useState } from "react";
import BasicButton from "../components/BasicButton";

export default function HomeScreen({ navigation }) {
  const styles = ThemedStyles();
  const [popupVisible, setPopupVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Text>AgroSlot.</Text>
      <BackButtonTest navigation={navigation} />
      <BasicButton
        title="show popup"
        onPress={() => setPopupVisible(true)}
      >

      </BasicButton>

      <Popup
        visible={popupVisible}
        onClose={() => setPopupVisible(false)}
      >
        <Text style={styles.title}>
          Eu sou um exemplo de como usar o modal
        </Text>

        <Text style={styles.description}>
          :D
        </Text>

        <BasicButton
          title="close"
          onPress={() => setPopupVisible(false)}
        />
      </Popup>
      <StatusBar style="auto" />
    </View>
  );
}