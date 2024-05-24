import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c23-aed5-3ad53abb28ba",
    title: "A",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fb2d91aa97f63",
    title: "B",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e229d72",
    title: "C",
  },
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb128ba",
    title: "D",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "E",
  },
  {
    id: "58694a0f-3da1-471f-b21d96-145571e29d72",
    title: "F",
  },
];

export default function Sidebar({
  onChange,
}: {
  onChange: (id: number) => void;
}) {
  const [selectedIdx, setSelectedIdx] = useState(0);

  return (
    <View style={styles.container}>
      {DATA.map(({ title, id }, idx) => {
        return (
          <Pressable
            key={id}
            onPress={() => {
              setSelectedIdx(idx);
              onChange(idx);
            }}
          >
            <View
              style={[
                styles.item,
                selectedIdx === idx ? styles.selected : null,
              ]}
            >
              <Text style={styles.title}>{title}</Text>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    paddingHorizontal: 5,
  },
  header: {
    fontSize: 32,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
  },
  container: {
    position: "absolute",
    right: 10,
    top: 0,
    bottom: 0,
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
  },
  sidebar: {},
  selected: {
    backgroundColor: "green",
    borderRadius: 12,
  },
});
