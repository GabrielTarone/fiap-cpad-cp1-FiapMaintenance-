import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useState, useContext } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SalasContext } from "../context/SalasContext";

export default function Reportar() {
  const [texto, setTexto] = useState("");
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { adicionarProblema } = useContext(SalasContext);

  function adicionarProblemaHandler() {
    if (!texto.trim()) return;

    adicionarProblema(id, texto);
    router.back();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Novo Problema</Text>

      <TextInput
        style={styles.input}
        placeholder="Descreva o problema"
        placeholderTextColor="#aaa"
        value={texto}
        onChangeText={setTexto}
      />

      <TouchableOpacity style={styles.botao} onPress={adicionarProblemaHandler}>
        <Text style={styles.botaoTexto}>Enviar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#0a0a0a" },
  titulo: { color: "#fff", fontSize: 22, marginBottom: 20 },
  input: {
    backgroundColor: "#1a1a1a",
    color: "#fff",
    padding: 10,
    borderRadius: 8,
  },
  botao: {
    backgroundColor: "#E1306C",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  botaoTexto: { color: "#fff", textAlign: "center" },
});
