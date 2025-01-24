import React, { useState } from "react";
import {
  Modal,
  Animated,
  TouchableOpacity,
  StyleSheet,
  Text,
  Dimensions,
  View,
} from "react-native";
import FoodForm from "./FoodForm";

const { height } = Dimensions.get("window");

const FoodModal = ({ visible, onClose, onSave }) => {
  const [slideAnimation] = useState(new Animated.Value(1000)); // starts off-screen
  const [isModalVisible, setIsModalVisible] = useState(visible);

  const openModal = () => {
    Animated.spring(slideAnimation, {
      toValue: 0,
      friction: 10,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    setIsModalVisible(false); //closing modal (includes the blurred background)
    Animated.spring(slideAnimation, {
      toValue: 1000,
      friction: 0,
      tension: 0,
      useNativeDriver: true,
    }).start(() => {
      onClose();
    });
  };

  //open modal when visible changes
  React.useEffect(() => {
    if (visible) {
      setIsModalVisible(true);
      openModal();
    }
  }, [visible]);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={closeModal}
    >
      <TouchableOpacity style={styles.overlay} activeOpacity={1}>
        <Animated.View
          style={[
            styles.modalContent,
            {
              height: height * 0.8,
              transform: [{ translateY: slideAnimation }],
              bottom: 0,
              position: "absolute",
            },
          ]}
        >
          <FoodForm onSave={onSave} onClose={closeModal} />
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "100%",
    backgroundColor: "white",
    padding: 20,
    alignItems: "center",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
});

export default FoodModal;
