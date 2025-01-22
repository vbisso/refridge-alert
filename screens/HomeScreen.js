import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import FoodForm from "../components/FoodForm";
import FoodList from "../components/FoodList";
import FoodModal from "../components/FoodModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Svg, { Path } from "react-native-svg";

const HomeScreen = () => {
  const [foods, setFoods] = useState([]);
  const [modalVisible, setModalVisible] = useState(false); // state to control the visibility of the food form modal

  useEffect(() => {
    loadFoods();
  }, []);

  //loads foods from async storage
  const loadFoods = async () => {
    const storedFoods = await AsyncStorage.getItem("foods");

    if (storedFoods) {
      const foodsWithDates = JSON.parse(storedFoods).map((food) => ({
        ...food,
        expDate: new Date(food.expDate), // Convert string to Date object
      }));
      //console.log("Foods loaded:", foodsWithDates);
      setFoods(foodsWithDates);
    } else {
      console.log("No foods stored.");
    }
  };

  //saving foods to local storage
  const saveFoods = async (food) => {
    //console.log(food);
    const newFoods = [...foods, food]; //adds the new food to the existing array of foods
    setFoods(newFoods); //sets the state of the component to the new array of foods
    await AsyncStorage.setItem("foods", JSON.stringify(newFoods)); //saves the new array of foods to the local storage
    setModalVisible(false);
  };

  const onDelete = async (index) => {
    const newFoods = foods.filter((_, i) => i !== index);
    setFoods(newFoods);
    await AsyncStorage.setItem("foods", JSON.stringify(newFoods));
  };

  return (
    <View style={style.container}>
      <View style={style.FoodList}>
        <Text>Home Screen</Text>
        <FoodList foods={foods} onDelete={onDelete} />
      </View>

      <View style={style.footerContainer}>
        <View style={style.footer}>
          <TouchableOpacity
            //onPress={() => setModalVisible(true)}
            style={{
              paddingVertical: 10,
              paddingHorizontal: 5,
              borderRadius: 10,
              width: 50,
            }}
          >
            <Text
              style={{
                fontSize: 30,
              }}
            >
              ⚙️
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={{
              backgroundColor: "white",
              paddingVertical: 10,
              paddingHorizontal: 5,
              borderRadius: 10,
              width: 50,
            }}
          >
            <Text
              style={{
                color: "black",
                fontSize: 30,
                textAlign: "center",
              }}
            >
              +
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            //onPress={() => setModalVisible(true)}
            style={{
              backgroundColor: "#5cb85c",
              paddingVertical: 10,
              paddingHorizontal: 5,
              borderRadius: 10,
              width: 50,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 30,
              }}
            >
              🔎
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <FoodModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={saveFoods}
      />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    height: "100%",
  },
  FoodList: {
    padding: 15,
  },
  footerContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  footer: {
    //backgroundColor: "blue",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    bottom: 0,
    backgroundColor: "#5cb85c",
    paddingTop: 15,
    paddingBottom: 30,
  },
});

export default HomeScreen;
