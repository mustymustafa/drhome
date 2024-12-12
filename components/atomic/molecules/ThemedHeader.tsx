import { StyleSheet } from "react-native"
import { ThemedView } from "../atoms/ThemedView"
import { ThemedText } from "../atoms/ThemedText"



const ThemedHeader = () => {

return (
    <ThemedView style={styles.container}>
<ThemedText style={styles.text} type="subtitle">Dr Home Aesthetics</ThemedText>
    </ThemedView>
)

}

const styles = StyleSheet.create({
    container: {
       top: 0,
        height: 120,
        backgroundColor: 'black',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    text: {

        color: "white"
    }
})

export default ThemedHeader