import { StyleSheet } from "react-native";

import { View } from "@/components/Themed";
import Contacts from "@/components/Contacts";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";

export default function TabOneScreen() {
  const [selectedSectionIdx, setSelectedSectionIdx] = useState(0);

  const changeIndex = (idx: number) => {
    setSelectedSectionIdx(idx);
  };

  return (
    <View style={styles.container}>
      <Contacts idx={selectedSectionIdx} />
      <Sidebar onChange={changeIndex} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
