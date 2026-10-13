import { Text, TextInput, View } from "react-native";
import { Colors } from "../styles/stylesheets";

export default function Input({
    label,
    placeholder,
    value,
    onChangeText,
    secureTextEntry = false,
    keyboardType = 'default',
}) {
    return (
        <View style={{
            width: '100%',
            gap: 6,
        }}>
            {label && <Text style={{
                fontSize: 14,
                fontWeight: '600',
                color: Colors.colorPrimary.color,
            }} >{label}</Text>}

            <TextInput
                style={{
                    height: 60,
                    borderWidth: 1,
                    borderColor: Colors.colorSoilLight.color,
                    borderRadius: 8,
                    paddingHorizontal: 12,
                    fontSize: 16,
                    color: Colors.colorPrimaryDark.color,
                    backgroundColor: '#FFFFFF',
                }}
                placeholderTextColor={Colors.colorSoilLight.color}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
            />
        </View>
    );
}