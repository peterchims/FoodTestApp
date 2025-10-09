import { Text, View , StyleSheet} from "react-native";

export default function Index() {
  return (
    <View
      style={styles.container}
    >
      <Text>Edit app/index.tsx to edit this screen .</Text>
    <Text style={styles.text}> This is another text </Text>
    
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
  },
  text: {
    color:"red",
    fontSize:30,
    fontWeight:"bold",
    fontFamily:"inter"
  },
  
})