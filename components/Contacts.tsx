import { useEffect, useRef } from "react";
import { SectionList, StatusBar, StyleSheet, Text, View } from "react-native";

const DATA = [
  {
    title: "A",
    data: ["Pizza", "Burger", "Risotto"],
  },
  {
    title: "B",
    data: ["French Fries", "Onion Rings", "Fried Shrimps"],
  },
  {
    title: "C",
    data: ["Water", "Coke", "Beer"],
  },
  {
    title: "D",
    data: ["Cheese Cake", "Ice Cream"],
  },
  {
    title: "E",
    data: ["Pizza", "Burger", "Risotto"],
  },
  {
    title: "F",
    data: ["French Fries", "Onion Rings", "Fried Shrimps"],
  },
  {
    title: "G",
    data: ["Water", "Coke", "Beer"],
  },
  {
    title: "H",
    data: ["Cheese Cake", "Ice Cream"],
  },
];

export default function Contacts({ idx }: { idx: number }) {
  const secRef = useRef<SectionList | null>(null);

  const onScroll = ({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      if (viewableItems.length > 0) {
        console.log(viewableItems[0]?.section.title);
      }
    }
  };

  useEffect(() => {
    console.log(idx);
    secRef.current?.scrollToLocation({
      itemIndex: 1,
      sectionIndex: idx,
    });
  }, [idx]);

  return (
    <SectionList
      ref={secRef}
      sections={DATA}
      keyExtractor={(item, index) => item + index}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={styles.title}>{item}</Text>
        </View>
      )}
      renderSectionHeader={({ section: { title } }) => (
        <Text style={styles.header}>{title}</Text>
      )}
      onViewableItemsChanged={onScroll}
      //   viewabilityConfig={{
      //     itemVisiblePercentThreshold: 50,
      //   }}
      onScrollToIndexFailed={() => {}}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: 32,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
  },
});
