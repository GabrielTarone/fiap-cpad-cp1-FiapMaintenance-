import { View, Text, StyleSheet } from "react-native";

export default function ProblemaItem({ texto }) {
  return (
    <View style={styles.item}>
      <Text style={styles.texto}>⚠️ {texto}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#1a1a1a",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  texto: { color: "#fff" },
});
