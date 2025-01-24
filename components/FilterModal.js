import React, { useState, useEffect } from "react";
import {
  Modal,
  Animated,
  TouchableOpacity,
  StyleSheet,
  Text,
  Dimensions,
  View,
  Button,
} from "react-native";

const { height } = Dimensions.get("window");

const FilterModal = ({ visible, onClose, onSortChange }) => {
  const [slideAnimation] = useState(new Animated.Value(height)); 

  useEffect(() => {
    if (visible) {
      openModal();
    } else {
      closeModal();
    }
  }, [visible]);

  const openModal = () => {
    Animated.spring(slideAnimation, {
      toValue: 0,
      friction: 10,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(slideAnimation, {
      toValue: height,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose} // Ensures Android back button also closes the modal
    >
      <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onClose}>
        <Animated.View
          style={[styles.modalContent, { transform: [{ translateY: slideAnimation }] }]}
        >
          <Text style={styles.text}>Filter Options</Text>

          <Button title="Sort by Expiration Date" onPress={() => onSortChange("expDate")} />
          <Button title="Sort by Category" onPress={() => onSortChange("category")} />
          <Button title="Sort by Name" onPress={() => onSortChange("name")} />

          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    marginBottom: 15,
  },
  closeButton: {
    marginTop: 15,
    padding: 10,
    backgroundColor: "#ff4444",
    borderRadius: 5,
  },
  closeText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default FilterModal;