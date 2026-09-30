import { Button } from "react-native"

export default function ButtonTest({navigation, screen}) {
    return (
        <Button
            title={`Ir para ${screen}`}
            onPress={() => navigation.navigate(screen)}>
        </Button>
    )
}