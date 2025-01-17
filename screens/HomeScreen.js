import React, { useState, useEffect } from "react";
import { ScrollView, View, Text } from "react-native";
import FoodForm from "../components/FoodForm";
import FoodList from "../components/FoodList";

import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = () => {
  const [foods, setFoods] = useState([]);
  //console.log(foods);

  useEffect(() => {
    loadFoods();
    //console.log("HomeScreen is loading???");
  }, []);

  //loads foods from async storage
  const loadFoods = async () => {
    const storedFoods = await AsyncStorage.getItem("foods");

    if (storedFoods) {
      const foodsWithDates = JSON.parse(storedFoods).map((food) => ({
        ...food,
        expDate: new Date(food.expDate), // Convert string to Date object
      }));
      console.log("Foods loaded:", foodsWithDates);
      setFoods(foodsWithDates);
    } else {
      console.log("No foods stored.");
    }
  };

  //saving foods to local storage
  const saveFoods = async (food) => {
    const newFoods = [...foods, food]; //adds the new food to the existing array of foods
    setFoods(newFoods); //sets the state of the component to the new array of foods
    await AsyncStorage.setItem("foods", JSON.stringify(newFoods)); //saves the new array of foods to the local storage
  };

  const onDelete = async (index) => {
    const newFoods = foods.filter((_, i) => i !== index);
    setFoods(newFoods);
    await AsyncStorage.setItem("foods", JSON.stringify(newFoods));
  };

  return (
    <ScrollView>
      <Text>Home Screen</Text>
      <FoodForm onSave={saveFoods} />
      <FoodList foods={foods} onDelete={onDelete} />
    </ScrollView>
  );
};

export default HomeScreen;
