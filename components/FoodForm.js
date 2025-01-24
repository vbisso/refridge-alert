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
      <TextInput
        style={styles.nameInput}
        onChangeText={setName}
        value={name}
        placeholder="Item Name"
        placeholderTextColor={"gray"}
      />
      <TextInput
        onChangeText={setCategory}
        value={category}
        placeholder="Category"
      />
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

      <View style={styles.buttonsContainer}>
        <Button title="Save" onPress={handleSave} />
        <Button title="Cancel" onPress={handleCancel} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  nameInput: {
    borderColor: "gray",
    borderWidth: 0.2,
    borderRadius: 8,
    paddingHorizontal: 80,
    paddingVertical: 15,
    marginBottom: 20,
  },
  datePicker: {
    display: "flex",
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 20,
  },
  datePickerText: {
    alignSelf: "center",
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "50%",
  },
});

export default FoodForm;
