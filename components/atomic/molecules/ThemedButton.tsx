import { StyleSheet, TouchableOpacity, Text, ActivityIndicator } from "react-native";

interface ThemedButtonProps {
    text: string;
    onPress: () => void;
    spacing?: number;
    sticky?: boolean
    loading?: boolean
}


const ThemedButton = ({text, onPress, spacing, sticky, loading}:ThemedButtonProps ) => {

   const stickyButton = sticky ? 'stickyButton' : 'button'
    return (
<TouchableOpacity onPress={onPress} style={[styles.button, styles[stickyButton],  {top: `${spacing ?? 0}%`}]}>
                    
                    {loading ? <ActivityIndicator size="small" /> :  <Text style={styles.text}>{text}</Text>}
                   
                </TouchableOpacity>

    )

}

const styles = StyleSheet.create({

    button: {
        alignSelf: 'center', backgroundColor: 'black', width: '90%', borderRadius: 10, height: 40, justifyContent: 'center' 
    },
    text: { color: "white", textAlign: 'center' },
    
    stickyButton: {
        position: 'absolute',
        bottom: 0,
        alignSelf: 'center',
        backgroundColor: 'black',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        width: '90%',
        height: 40
      },
})

export default ThemedButton;