import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useContext, useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SalasContext } from "../context/SalasContext";

export default function Reportar() {
  const [descricao, setDescricao] = useState("");
  const [computador, setComputador] = useState("");
  const [midiaUri, setMidiaUri] = useState(null);
  const [midiaTipo, setMidiaTipo] = useState(null);
  const [urgencia, setUrgencia] = useState("alta");
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { adicionarProblema } = useContext(SalasContext);

  function abrirOpcoesMidia() {
    Alert.alert("Adicionar mídia", "Escolha uma opção", [
      {
        text: "Tirar foto",
        onPress: tirarFoto,
      },
      {
        text: "Gravar vídeo",
        onPress: gravarVideo,
      },
      {
        text: "Escolher da galeria",
        onPress: selecionarMidia,
      },
      {
        text: "Cancelar",
        style: "cancel",
      },
    ]);
  }

  async function selecionarMidia() {
    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      quality: 1,
    });

    if (!resultado.canceled) {
      const arquivo = resultado.assets[0];

      setMidiaUri(arquivo.uri);
      setMidiaTipo(arquivo.type);
    }
  }

  async function tirarFoto() {
    const permissao = await ImagePicker.requestCameraPermissionsAsync();

    if (!permissao.granted) {
      Alert.alert(
        "Permissão necessária",
        "Permita o acesso à câmera para tirar fotos.",
      );
      return;
    }

    const resultado = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (!resultado.canceled) {
      const arquivo = resultado.assets[0];

      setMidiaUri(arquivo.uri);
      setMidiaTipo(arquivo.type);
    }
  }

  async function gravarVideo() {
    const permissao = await ImagePicker.requestCameraPermissionsAsync();

    if (!permissao.granted) {
      Alert.alert(
        "Permissão necessária",
        "Permita o acesso à câmera para gravar vídeos.",
      );
      return;
    }

    const resultado = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: false,
      quality: 1,
      videoMaxDuration: 30,
    });

    if (!resultado.canceled) {
      const arquivo = resultado.assets[0];

      setMidiaUri(arquivo.uri);
      setMidiaTipo(arquivo.type);
    }
  }

  function adicionarProblemaHandler() {
    if (!descricao.trim() || !computador.trim()) return;

    const novoProblema = {
      computador,
      descricao,
      urgencia,
      midiaUri,
      midiaTipo,
      status: "pendente",
      data: new Date().toISOString(),
    };

    adicionarProblema(id, novoProblema);

    // Limpar campos
    setDescricao("");
    setComputador("");
    setMidiaUri(null);
    setMidiaTipo(null);
    router.back();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Novo Problema</Text>

      {/* Campo computador */}
      <TextInput
        style={styles.input}
        placeholder="Número do computador (ex: PC-12)"
        placeholderTextColor="#aaa"
        value={computador}
        onChangeText={setComputador}
      />

      {/* Campo descrição */}
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Descreva o problema"
        placeholderTextColor="#aaa"
        value={descricao}
        onChangeText={setDescricao}
        multiline
      />

      {/* Botão anexar */}
      <TouchableOpacity style={styles.botaoAnexo} onPress={abrirOpcoesMidia}>
        <Text style={styles.botaoTexto}>Adicionar mídia</Text>
      </TouchableOpacity>

      {midiaUri && midiaTipo === "image" && (
        <Image source={{ uri: midiaUri }} style={styles.previewImagem} />
      )}

      {midiaUri && midiaTipo === "video" && (
        <Text style={styles.anexoTexto}>Vídeo anexado com sucesso</Text>
      )}

      {/* Urgência */}
      <Text style={styles.label}>Urgência:</Text>

      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.opcao, urgencia === "alta" && styles.selecionadoAlta]}
          onPress={() => setUrgencia("alta")}
        >
          <Text style={styles.texto}>Alta</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.opcao,
            urgencia === "media" && styles.selecionadoMedia,
          ]}
          onPress={() => setUrgencia("media")}
        >
          <Text style={styles.texto}>Média</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.opcao,
            urgencia === "baixa" && styles.selecionadoBaixa,
          ]}
          onPress={() => setUrgencia("baixa")}
        >
          <Text style={styles.texto}>Baixa</Text>
        </TouchableOpacity>
      </View>

      {/* Botão */}
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
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  textArea: { height: 100, textAlignVertical: "top" },
  label: {
    color: "#fff",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  opcao: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 8,
    alignItems: "center",
  },
  selecionadoAlta: {
    backgroundColor: "#ff4d4d",
  },
  selecionadoMedia: {
    backgroundColor: "#ffaa00",
  },
  selecionadoBaixa: {
    backgroundColor: "#2ecc71",
  },
  texto: {
    color: "#fff",
  },
  botao: {
    backgroundColor: "#E1306C",
    padding: 15,
    borderRadius: 10,
  },
  botaoTexto: { color: "#fff", textAlign: "center", fontWeight: "bold" },
  botaoAnexo: {
    backgroundColor: "#333",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  previewImagem: {
    width: "100%",
    height: 180,
    borderRadius: 10,
    marginBottom: 20,
  },
  anexoTexto: {
    color: "#2ecc71",
    marginBottom: 20,
    fontWeight: "bold",
  },
});
