import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function SalaCard({ sala, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.nome}>{sala.nome}</Text>
      <Text style={styles.problemas}>Problemas: {sala.problemas}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1a1a1a",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  nome: { color: "#fff", fontSize: 18 },
  problemas: { color: "#E1306C" },
});
