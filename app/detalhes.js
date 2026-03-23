// Mostra os detalhes da sala

import { useLocalSearchParams, useRouter } from "expo-router";
import { useContext } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ProblemaItem from "../components/ProblemaItem";
import { SalasContext } from "../context/SalasContext";

export default function Detalhes() {
  const { id, nome } = useLocalSearchParams();
  const router = useRouter();
  const { salas, finalizarProblema } = useContext(SalasContext);

  const sala = salas.find((s) => s.id === id);

  // Ordenar por urgência (alta primeiro)
  const problemasOrdenados = sala?.problemas
    ? [...sala.problemas].sort((a, b) =>
      a.urgencia === "alta" && b.urgencia !== "alta" ? -1 : 1,
    )
    : [];

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{nome}</Text>

      {/* Lista de problemas */}
      {problemasOrdenados.length === 0 ? (
        <Text style={styles.semProblemas}>Nenhum problema reportado</Text>
      ) : (

        //Antes 
        /*problemasOrdenados.map((p, index) => (
          <View key={index}>
            <ProblemaItem problema={p} />
          </View>
        ))*/
        problemasOrdenados.map((p, index) => (
          <View key={index}>
            <ProblemaItem problema={p} />
            {p.status !== "finalizado" && (
              <TouchableOpacity
                style={styles.botaoFinalizar}
                onPress={() => {
                  finalizarProblema(id, p.computador);
                  Alert.alert(
                    "Sucesso",
                    "Problema finalizado com sucesso!",
                    [{ text: "OK", onPress: () => router.replace("/") }]
                  );
                }}
              >
                <Text style={styles.botaoTexto}>Finalizar -- {p.computador}</Text>
              </TouchableOpacity>
            )}
          </View>
        ))
      )}

      {/* Botão cadastrar Problema */}
      <TouchableOpacity
        style={styles.botao}
        onPress={() =>
          router.push({
            pathname: "/reportar",
            params: { id },
          })
        }
      >
        <Text style={styles.botaoTexto}>Cadastrar Problema</Text>
      </TouchableOpacity>

      {/* Botão remover problema */}
      <TouchableOpacity
        style={styles.botao}
        onPress={() =>
          router.push({
            pathname: "/removeProblema",
            params: { id },
          })
        }
      >
        <Text style={styles.botaoTexto}>Remover Problema</Text>
      </TouchableOpacity>

      {/* Botão voltar para Home */}
      <TouchableOpacity
        style={styles.botao}
        onPress={() => router.replace("/")}
      >
        <Text style={styles.botaoTexto}>Voltar para Home</Text>
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
  botaoSecundario: {
    backgroundColor: "#333",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  botaoTexto: { color: "#fff", textAlign: "center", fontWeight: "bold" },

  botaoFinalizar: {
    backgroundColor: "#E1306C",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
});
