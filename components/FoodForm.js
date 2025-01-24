import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const FoodForm = ({ onSave, onClose }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(new Date());

  const handleSave = () => {
    if (name && category) {
      onSave({ name, category, expDate: new Date(date) });
      setName("");
      setCategory("");
      onClose();
    }
  };
  const handleCancel = () => {
    onClose();
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputsContainer}>
        <Text style={styles.text}>Add Food Item</Text>
        <TextInput
          style={styles.nameInput}
          onChangeText={setName}
          value={name}
          placeholder="Item Name"
          placeholderTextColor={"gray"}
        />

        <View style={styles.container2}>
          <Text style={styles.text}>Category: {category || "None"}</Text>
          <View style={styles.gridContainer}>
            <Button title="Fruit" onPress={() => setCategory("Fruit")} />
            <Button
              title="Vegetable"
              onPress={() => setCategory("Vegetable")}
            />
            <Button title="Grain" onPress={() => setCategory("Grain")} />
            <Button title="Meat" onPress={() => setCategory("Meat")} />
            <Button title="Juice" onPress={() => setCategory("Juice")} />
            <Button title="Dairy" onPress={() => setCategory("Dairy")} />
            <Button title="Sweet" onPress={() => setCategory("Sweet")} />
          </View>
        </View>

        <View style={styles.datePicker}>
          <Text style={styles.datePickerText}>Exp Date:</Text>
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              if (selectedDate) {
                setDate(selectedDate);
              }
            }}
          />
        </View>
      </View>

      <View style={styles.buttonFixPosition}>
        <View style={styles.buttonsContainer}>
          <Button title="Save" onPress={handleSave} />
          <Button title="Cancel" onPress={handleCancel} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container2: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: "450",
    marginBottom: 10,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
  },

  container: {
    flex: 1,
    justifyContent: "center",
  },
  inputsContainer: {
    flexDirection: "column",
    alignItems: "center",
    height: "60%",
    paddingBottom: 20,
  },
  nameInput: {
    borderColor: "gray",
    borderWidth: 0.2,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginBottom: 20,
    width: 500,
    maxWidth: "70%",
    textAlign: "center",
  },
  datePicker: {
    //display: "flex",
    //flexDirection: "row",
    marginTop: 20,
    marginBottom: 20,
  },
  datePickerText: {
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "450",
    marginBottom: 10,
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  buttonFixPosition: {
    position: "absolute",
    bottom: 25,
    width: "100%",
  },
});

export default FoodForm;
