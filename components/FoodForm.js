import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const FoodForm = ({ onSave }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(new Date());

  const handleSave = () => {
    if (name && category) {
      onSave({ name, category, expDate: new Date(date) });
      setName("");
      setCategory("");
    }
  };

  return (
    <View>
      <Text>Name:</Text>
      <TextInput onChangeText={setName} value={name} placeholder="Item Name" />
      <Text>Category:</Text>
      <TextInput
        onChangeText={setCategory}
        value={category}
        placeholder="Category"
      />
      <Text>Expiration Date:</Text>

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
      <Button title="Save" onPress={handleSave} />
    </View>
  );
};

//const styles = StyleSheet.create({});

export default FoodForm;
