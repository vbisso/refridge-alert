import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, Button, StyleSheet } from "react-native";
import FoodForm from "../components/FoodForm";
import FoodList from "../components/FoodList";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = () => {
  const [foods, setFoods] = useState([]);
  const [sortBy, setSortBy] = useState("expDate");

  useEffect(() => {
    loadFoods();
  }, []);

  useEffect(() => {
    setFoods((prevFoods) => sortFoods(prevFoods, sortBy));
  }, [sortBy]);

  const sortFoods = (foods, criterion) => {
    return [...foods].sort((a, b) => {
      if (criterion === "expDate") {
        return new Date(a.expDate) - new Date(b.expDate);
      } else if (criterion === "category") {
        return a.category.localeCompare(b.category);
      } else if (criterion === "name") {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });
  };

  const loadFoods = async () => {
    const storedFoods = await AsyncStorage.getItem("foods");
    if (storedFoods) {
      const foodsWithDates = JSON.parse(storedFoods).map((food) => ({
        ...food,
        expDate: new Date(food.expDate),
      }));
      setFoods(sortFoods(foodsWithDates, "expDate"));
    } else {
      console.log("No foods stored.");
    }
  };

  const saveFoods = async (food) => {
    const newFoods = sortFoods([...foods, { ...food, expDate: new Date(food.expDate) }], sortBy);
    setFoods(newFoods);
    await AsyncStorage.setItem("foods", JSON.stringify(newFoods));
  };

  const onDelete = async (index) => {
    const newFoods = foods.filter((_, i) => i !== index);
    setFoods(newFoods);
    await AsyncStorage.setItem("foods", JSON.stringify(newFoods));
  };

  return (
    <View style={styles.container}>
      {/* Sorting Buttons */}
      <View style={styles.sortContainer}>
        <Text style={styles.sortText}>Sort Foods By:</Text>
        <Button
          title="Expiration Date"
          onPress={() => setSortBy("expDate")}
        />
        <Button
          title="Category"
          onPress={() => setSortBy("category")}
        />
        <Button
          title="Name"
          onPress={() => setSortBy("name")}
        />
      </View>

      {/* Food Form */}
      <FoodForm onSave={saveFoods} />

      {/* Scrollable Food List */}
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <FoodList foods={foods} onDelete={onDelete} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    paddingTop: 0, // Add padding at the top for spacing
  },
  scrollView: {
    flex: 1, 
  },
  scrollContent: {
    flexGrow: 1, 
  },
  sortContainer: {
    padding: 20, // More spacing
    backgroundColor: "#f8f8f8",
    borderTopWidth: 1,
    borderColor: "#ddd",
    height: 140, // Adjusted height for buttons
    justifyContent: "center", // Center content vertically
  },
  sortText: {
    fontSize: 20, // Bigger label text
    fontWeight: "bold", 
    marginBottom: 0, 
  },
});

export default HomeScreen;
