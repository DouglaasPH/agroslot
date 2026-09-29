import { Button } from "react-native"

export default function BackButtonTest({navigation}) {
    return (
        <Button
            title={`Voltar`}
            onPress={() => navigation.goBack()}>
        </Button>
    )
}