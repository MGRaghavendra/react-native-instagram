import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Divider } from "react-native-elements/dist/divider/Divider";
import bottomTabIcons from "../../data/Bottom-Icons";
const Bottomtab = () => {
  const [active, setactive] = React.useState("Home");
  const Icon = ({ inactive, name }) => {
    return (
      <TouchableOpacity onPress={() => setactive(name)}>
        <Image
          source={{ uri: inactive }}
          style={[
            { height: 30, width: 30 },
            name === "Profile" && { borderRadius: 50 },
          ]}
        />
      </TouchableOpacity>
    );
  };
  return (
    <View>
      <Divider orientation="vertical" width={1} />
      <View style={styles.Container}>
        {bottomTabIcons.map((item, index) => (
          <Icon
            inactive={active === item.name ? item.active : item.inactive}
            key={index}
            name={item.name}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingTop: 7,
  },
});

export default Bottomtab;
