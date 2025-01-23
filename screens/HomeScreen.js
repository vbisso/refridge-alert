import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Button, ScrollView } from "react-native";
import FoodForm from "../components/FoodForm";
import FoodList from "../components/FoodList";
import FoodModal from "../components/FoodModal";
import FilterModal from "../components/FilterModal";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = () => {
  const [foods, setFoods] = useState([]);
  const [sortBy, setSortBy] = useState("expDate");
  const [modalVisible, setModalVisible] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [sortCriteria, setSortCriteria] = useState(null);

  useEffect(() => {
    loadFoods();
  }, []);

  useEffect(() => {
    setFoods((prevFoods) => sortFoods([...prevFoods], sortBy));
  }, [sortBy]);

  const handleSortChange = (criterion) => {
    console.log("Sorting by:", criterion);
    setSortBy(criterion);  // Update sorting criteria
    setIsFilterVisible(false); // Close the modal after selecting
  };

  const sortFoods = (foods, criterion) => {
    return foods.sort((a, b) => {
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
    try {
      const storedFoods = await AsyncStorage.getItem("foods");
      if (storedFoods) {
        const foodsWithDates = JSON.parse(storedFoods).map((food) => ({
          ...food,
          expDate: new Date(food.expDate),
        }));
        setFoods(sortFoods(foodsWithDates, sortBy));
      }
    } catch (error) {
      console.error("Error loading foods:", error);
    }
  };

  const saveFoods = async (food) => {
    try {
      const newFoods = [...foods, { ...food, expDate: new Date(food.expDate) }];
      setFoods(sortFoods(newFoods, sortBy));
      await AsyncStorage.setItem("foods", JSON.stringify(newFoods));
      setModalVisible(false);
    } catch (error) {
      console.error("Error saving food:", error);
    }
  };

  const onDelete = async (index) => {
    try {
      const newFoods = foods.filter((_, i) => i !== index);
      setFoods(newFoods);
      await AsyncStorage.setItem("foods", JSON.stringify(newFoods));
    } catch (error) {
      console.error("Error deleting food:", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* <View style={styles.sortContainer}>
        <Text style={styles.sortText}>Sort Foods By:</Text>
        <View style={styles.buttonContainer}>
          <Button title="Expiration Date" onPress={() => setSortBy("expDate")} />
          <Button title="Category" onPress={() => setSortBy("category")} />
          <Button title="Name" onPress={() => setSortBy("name")} />
        </View>
      </View> */}

      <ScrollView style={styles.foodList}>
        <Text>Home Screen</Text>
        
        <FoodList foods={foods} onDelete={onDelete} />
      </ScrollView>

      <View style={styles.footerContainer}>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.iconButton}>
            <Text style={styles.iconText}>⚙️</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.addButton}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity onPress={() => setFilterModalVisible(true)} style={styles.searchButton}>
            <Text style={styles.iconText}>🔎</Text>
            <Button title="Open Filter" onPress={() => setIsFilterVisible(true)} />

          </TouchableOpacity> */}
          <TouchableOpacity onPress={() => setIsFilterVisible(true)} style={styles.searchButton}>
            <Text style={styles.iconText}>🔎</Text> 
          </TouchableOpacity>
        </View>
      </View>

      <FoodModal visible={modalVisible} onClose={() => setModalVisible(false)} onSave={saveFoods} />
      <FilterModal 
        visible={isFilterVisible} 
        onClose={() => setIsFilterVisible(false)} 
        onSortChange={handleSortChange} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  foodList: {
    padding: 15,
  },
  sortContainer: {
    padding: 20,
    backgroundColor: "#f8f8f8",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    height: 140,
    justifyContent: "center",
  },
  sortText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  footerContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#5cb85c",
    paddingTop: 15,
    paddingBottom: 30,
  },
  iconButton: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 10,
    width: 50,
  },
  iconText: {
    fontSize: 30,
    textAlign: "center",
  },
  addButton: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 10,
    width: 50,
  },
  addButtonText: {
    color: "black",
    fontSize: 30,
    textAlign: "center",
  },
  searchButton: {
    backgroundColor: "#5cb85c",
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 10,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
