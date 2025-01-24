import React from "react";
import { View, Text, Button } from "react-native";
import IconFilter from "./IconFilter";

const FoodList = ({ foods, onDelete }) => {
  if (foods.length === 0) {
    return (
      <View>
        <Text>No foods found.</Text>
        <Text>Start Adding your items!</Text>
      </View>
    );
  }
  return (
    <View>
      {foods.map((food, index) => (
        <View key={index}>
          <Text>{food.name}</Text>
          <IconFilter category={food.category}/>
          <Text>Exp. Date: {food.expDate.toDateString()}</Text>
          <Button title="Delete" onPress={() => onDelete(index)} />
        </View>
      ))}
    </View>
  );
};

//const styles = StyleSheet.create({});

export default FoodList;
