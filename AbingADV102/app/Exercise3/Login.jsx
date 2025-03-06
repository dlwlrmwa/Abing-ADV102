import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Login() {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Email:", email);
    console.log("Password:", password);
  };

  const handleGoToExercises = () => {
    console.log("Exercises button pressed!");
    navigation.navigate("Exercises");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.exercisesButton}
        onPress={handleGoToExercises}
      >
        <Text style={styles.exercisesButtonText}>Exercises</Text>
      </TouchableOpacity>

      <View style={styles.loginContent}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  exercisesButton: {
    position: "absolute",
    top: 20,
    left: 20,
    padding: 10,
    backgroundColor: "#3498db",
    borderRadius: 5,
  },
  exercisesButtonText: {
    color: "white",
    fontWeight: "600",
  },
  loginContent: {
    flex: 1,
    padding: 32,
    marginTop: 32,
    justifyContent: "center", // Center content vertically
  },
  title: {
    fontSize: 28,
    marginBottom: 24,
    fontWeight: "700",
    textAlign: "center",
    color: "#333",
  },
  input: {
    height: 55,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 20,
    borderRadius: 8,
    fontSize: 16,
    fontWeight: "500",
    opacity: 0.9,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    width: "80%",
    maxWidth: 400,
    alignSelf: "center",
  },
  button: {
    marginTop: 32,
    borderRadius: 10,
    paddingVertical: 18,
    backgroundColor: "#2980b9",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
    width: "58%",
    maxWidth: 400,
    alignSelf: "center",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 18,
  },
});