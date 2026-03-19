import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { useContext } from "react";
import { SalasContext } from "../context/SalasContext";
import SalaCard from "../components/SalaCard";

export default function Home() {
  const router = useRouter();
  const { salas } = useContext(SalasContext);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Salas e Laboratórios</Text>

      {/* Botão adicionar sala */}
      <TouchableOpacity
        style={styles.botao}
        onPress={() => router.push("/novaSala")}
      >
        <Text style={styles.botaoTexto}>+ Adicionar Sala</Text>
      </TouchableOpacity>

      {/* Lista de salas */}
      <FlatList
        data={salas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SalaCard
            sala={item}
            onPress={() =>
              router.push({
                pathname: "/detalhes",
                params: { id: item.id, nome: item.nome },
              })
            }
          />
        )}
      />
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
    fontWeight: "bold",
    marginBottom: 20,
  },
  botao: {
    backgroundColor: "#E1306C",
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
  },
  botaoTexto: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});
