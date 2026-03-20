// Aba de remover salas

import { useRouter } from "expo-router";
import { useContext, useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SalasContext } from "../context/SalasContext";

export default function RemoverSala() {
  const [nome, setNome] = useState("");
  const router = useRouter();
const { removerSalaPorNome } = useContext(SalasContext);

function removerSalaHandler() {
  if (!nome.trim()) return;

  removerSalaPorNome(nome);
  router.replace("/");
}

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Qual Sala Gostaria de Remover?</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite o nome da sala"
        placeholderTextColor="#aaa"
        value={nome}
        onChangeText={setNome}
      />

      <TouchableOpacity style={styles.botao} onPress={removerSalaHandler}>
        <Text style={styles.botaoTexto}>Remover</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#0a0a0a",
  },
  titulo: {
    color: "#fff",
    fontSize: 22,
    marginBottom: 20,
  },
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
  botaoTexto: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});
