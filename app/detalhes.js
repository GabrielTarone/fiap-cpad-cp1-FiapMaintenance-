import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useContext } from "react";
import { SalasContext } from "../context/SalasContext";
import ProblemaItem from "../components/ProblemaItem";

export default function Detalhes() {
  const { id, nome } = useLocalSearchParams();
  const router = useRouter();
  const { salas } = useContext(SalasContext);

  const sala = salas.find((s) => s.id === id);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{nome}</Text>

      {/* Lista de problemas */}
      {sala?.problemas.length === 0 ? (
        <Text style={styles.semProblemas}>Nenhum problema reportado</Text>
      ) : (
        sala.problemas.map((p, index) => <ProblemaItem key={index} texto={p} />)
      )}

      {/* Botão */}
      <TouchableOpacity
        style={styles.botao}
        onPress={() =>
          router.push({
            pathname: "/reportar",
            params: { id },
          })
        }
      >
        <Text style={styles.botaoTexto}>Reportar Problema</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#0a0a0a" },
  titulo: { color: "#fff", fontSize: 22, marginBottom: 20 },
  semProblemas: {
    color: "#aaa",
    marginBottom: 20,
  },
  botao: {
    backgroundColor: "#E1306C",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  botaoTexto: { color: "#fff", textAlign: "center" },
});
