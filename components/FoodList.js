import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import IconFilter from "./IconFilter";

const FoodList = ({ foods, onDelete }) => {
  if (foods.length === 0) {
    return (
      <View>
        <Text style={styles.text}>No foods found.</Text>
        <Text style={styles.text}>Start Adding your items!</Text>
      </View>
    );
  }
  return (
    <View>
      <Text style={[{ marginBottom: 15 }, styles.text]}>Your Foods</Text>
      {foods.map((food, index) => (
        <View style={styles.itemContainer} key={index}>
          <IconFilter category={food.category} />

          <View style={styles.itemTextContainer}>
            <Text style={styles.itemText}>{food.name}</Text>
            <Text style={styles.itemText}>
              Exp. Date: {food.expDate.toDateString()}
            </Text>
          </View>
          <View>
            <Button title="Delete" onPress={() => onDelete(index)} />
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    textAlign: "center",
    paddingTop: 10,
  },
  itemText: {
    fontSize: 17,
  },
  itemContainer: {
    borderWidth: 0.5,
    borderColor: "grey",

    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    flex: 1,
    flexDirection: "row",
    alignSelf: "center",
    //justifyContent: "space-around",
  },
  itemTextContainer: {
    //flex: 1,
    marginLeft: 10,
    marginRight: 10,
    alignItems: "flex-start",
    //borderWidth: 1,
  },
});

export default FoodList;
