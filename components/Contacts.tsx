import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import {
  Image,
  SectionList,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

const DATA = [
  {
    title: "A",
    data: [
      "A-Lin",
      "Aaron Smith",
      "Adam Lambert",
      "Adele",
      "Akon",
      "Alan Walker",
      "Avicii",
      "Avril Lavigne",
      "安七炫",
      "阿杜",
      "阿牛",
    ],
  },
  {
    title: "B",
    data: [
      "BEYOND",
      "Backstreet Boys",
      "Bandari",
      "Beyonce",
      "Blue",
      "Bruno Mars",
      "贝乐虎儿歌",
    ],
  },
  {
    title: "C",
    data: [
      "Camila Cabello",
      "Celine Dion",
      "Coldplay",
      "蔡依林",
      "蔡琴",
      "陈奕迅",
      "陈百强F s",
    ],
  },
  {
    title: "D",
    data: ["Daniel Powter", "Darin", "刀郎", "窦唯", "迪克牛仔", "邓丽君"],
  },
  {
    title: "E",
    data: ["Eagles", "Ed Sheeran", "Eminem", "Ellie Goulding"],
  },
  {
    title: "F",
    data: [
      "Fall Out Boy",
      "Fitz and The Tantrums",
      "Fool's Garden",
      "凤凰传奇",
      "方大同",
    ],
  },
  {
    title: "G",
    data: ["G.E.M. 邓紫棋", "GALA", "Groove Coverage", "Greyson Chance"],
  },
  {
    title: "H",
    data: ["Hawk Nelson", "黄龄", "黑豹乐队"],
  },
  {
    title: "J",
    data: [
      "James Blunt",
      "Jason Mraz",
      "Jay-Z",
      "Jessie J",
      "Justin Bieber",
      "Justin Timberlake",
      "金志文",
      "金莎",
    ],
  },
  {
    title: "L",
    data: [
      "Lady Gaga",
      "Linkin Park",
      "刘德华",
      "李克勤",
      "李宗盛",
      "李荣浩",
      "李贞贤",
      "林俊杰",
      "梁静茹",
      "老狼",
    ],
  },
  {
    title: "M",
    data: [
      "M2M",
      "MC HotDog",
      "Mark Ronson",
      "Maroon 5",
      "Michael Jackson",
      "Michael Learns To Rock",
      "Miley Cyrus",
    ],
  },
  {
    title: "O",
    data: ["One Direction", "OneRepublic"],
  },
  {
    title: "P",
    data: ["P!NK", "PSY", "朴树", "潘玮柏"],
  },
  {
    title: "Q",
    data: ["Queen", "齐秦"],
  },
  {
    title: "R",
    data: [
      "Rachel Platten",
      "Rag'N'Bone Man",
      "Redfoo",
      "Richard Clayderman",
      "Rihanna",
      "任贤齐",
      "任素汐",
    ],
  },
  {
    title: "S",
    data: [
      "S.H.E",
      "Sam Smith",
      "Sarah Brightman",
      "Selena Gomez",
      "Shawn Mendes",
      "Sia",
      "Sweetbox",
      "水木年华",
      "Taylor Swift",
    ],
  },
  {
    title: "T",
    data: ["Timbaland", "Tobu", "腾格尔", "谭咏麟", "陶喆"],
  },
];

interface ContactProps {
  onSectionChange: (newIdx: number) => void;
}

export interface ContactRef {
  scrollToSection: (idx: number) => void;
}

export default forwardRef<ContactRef, ContactProps>(function Contacts(
  { onSectionChange },
  ref
) {
  const secRef = useRef<SectionList | null>(null);

  const onScroll = ({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      if (viewableItems.length > 0) {
        console.log(viewableItems[0]?.section.title);

        const idx = DATA.findIndex(
          (data) => data.title === viewableItems[0]?.section.title
        );

        console.log(idx);
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

  return (
    <SectionList
      ref={secRef}
      sections={DATA}
      style={styles.container}
      keyExtractor={(item, index) => item + index}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Image
            style={styles.tinyLogo}
            source={{
              uri: "https://reactnative.dev/img/tiny_logo.png",
            }}
          />
          <Text style={styles.title}>{item}</Text>
        </View>
      )}
      renderSectionHeader={({ section: { title } }) => (
        <View style={styles.headerWrapper}>
          <Text style={styles.header}>{title}</Text>
        </View>
      )}
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
    // marginVertical: 8,
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
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
    fontSize: 24,
  },
  tinyLogo: {
    width: 40,
    height: 40,
  },
  separator: {
    height: 1,
    backgroundColor: "#ededed",
    marginLeft: 60,
  },
  sectionFooter: {
    height: 1,
    backgroundColor: "#ededed",
    marginTop: 10,
    marginBottom: 30,
  },
  headerWrapper: {
    // borderBottomWidth: 1,
  },
});
