import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Image, SectionList, StyleSheet, Text, View } from "react-native";

interface Data {
  title: string;
  data: string[];
}

interface ContactProps {
  data: Data[];
  panning: boolean;
  onSectionChange: (newIdx: number) => void;
}

export interface ContactRef {
  scrollToSection: (idx: number) => void;
}

export default forwardRef<ContactRef, ContactProps>(function Contacts(
  { onSectionChange, panning, data },
  ref
) {
  const [highlightHeader, setHighlightHeader] = useState(false);

  const secRef = useRef<SectionList | null>(null);

  const onScroll = ({ viewableItems }: any) => {
    if (viewableItems.length > 0 && !panning) {
      if (viewableItems.length > 0) {
        const idx = data.findIndex(
          (d) => d.title === viewableItems[0]?.section.title
        );

        onSectionChange(idx);
      }
    }
  };

  const ItemSeparator = () => {
    return <View style={styles.separator} />;
  };

  useImperativeHandle(ref, () => {
    return {
      scrollToSection(sectionIndex: number) {
        secRef.current?.scrollToLocation({
          itemIndex: 1,
          sectionIndex,
          animated: false,
        });
      },
    };
  });

  useEffect(() => {
    setHighlightHeader(panning);
  }, [panning]);

  return (
    <SectionList
      ref={secRef}
      sections={data}
      style={styles.container}
      keyExtractor={(item, index) => item + index}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Image
            style={styles.tinyLogo}
            source={require("../assets/images/tiny_logo.png")}
          />
          <Text style={styles.title}>{item}</Text>
        </View>
      )}
      renderSectionHeader={({ section: { title } }) =>
        title !== "*" ? (
          <View style={styles.headerWrapper}>
            <Text style={styles.header}>{title}</Text>
          </View>
        ) : null
      }
      onViewableItemsChanged={onScroll}
      onScrollToIndexFailed={() => {}}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={ItemSeparator}
      renderSectionFooter={() => <View style={styles.sectionFooter} />}
    />
  );
});

const styles = StyleSheet.create({
  container: {
    paddingLeft: 16,
  },
  item: {
    // backgroundColor: "#f9c2ff",
    // padding: 20,
    marginVertical: 4,
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  header: {
    fontSize: 14,
    fontWeight: "500",
    color: "#737373",
    backgroundColor: "#fff",
    paddingTop: 10,
    paddingBottom: 10,
  },
  title: {
    fontSize: 18,
  },
  tinyLogo: {
    width: 40,
    height: 40,
  },
  separator: {
    height: 1,
    backgroundColor: "#ededed",
    marginLeft: 52,
  },
  sectionFooter: {
    height: 1,
    backgroundColor: "#ededed",
    marginTop: 10,
    marginBottom: 20,
  },
  headerWrapper: {
    // borderBottomWidth: 1,
  },
});
