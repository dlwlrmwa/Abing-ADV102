import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import HTMLView from "react-native-htmlview";

export default function Exercise() {
  const exercises = [
    {
      title: "Exercise 3",
      description:
        "Create login screen<br/>Login screen fields:\n\n<ul><li>Email</li><li>Password</li></ul>",
    },
    {
      title: "Exercise 4",
      description:
        "Create a stopwatch with two buttons:\nOne for Start/Stop and one for Reset.",
    },
    { title: "Exercise 5", description: "Create a register screen and add a title and description to the card in the exercise tab.  \nWhen the card is clicked, it should redirect to the register screen.<ul><li>Image (Image picker when image selected should display the image selected)</li><li>Name (Text Input)</li><li>Email (Text Input)</li><li>Password (Text Input)</li><li>Register (Button)</li></ul>" },
    { title: "Exercise 6", description: "Sample description rendered HTML 6" },
    { title: "Exercise 7", description: "Sample description rendered HTML 7" },
    { title: "Exercise 8", description: "Sample description rendered HTML 8" },
    { title: "Exercise 9", description: "Sample description rendered HTML 9" },
    {
      title: "Exercise 10",
      description: "Sample description rendered HTML 10",
    },
  ];

  const handlePress = (index) => {
    if (index === 0) {
      navigation.navigate("/login");
    } else if (index === 1) {
      navigation.navigate("../Exercise4");
    }
  };

  return (
    <ScrollView style={styles.container}>
      {exercises.map((exercise, index) => (
        <View key={index} style={styles.card}>
          <TouchableOpacity onPress={() => handlePress(index)}>
            <Text style={styles.title}>{exercise.title}</Text>
            <HTMLView value={exercise.description} stylesheet={htmlStyles} />
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f5f5f5",
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

const htmlStyles = StyleSheet.create({
  p: {
    fontSize: 16,
    color: "#333",
    lineHeight: 22,
  },
  ul: {
    marginTop: 5,
    marginBottom: 5,
    paddingLeft: 20,
  },
  li: {
    fontSize: 14,
    color: "#555",
  },
});
