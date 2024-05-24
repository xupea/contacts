import { StyleSheet } from "react-native";

import { View } from "@/components/Themed";
import Contacts, { ContactRef } from "@/components/Contacts";
import Sidebar from "@/components/Sidebar";
import { useRef, useState } from "react";

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
  {
    title: "U",
    data: ["Timbaland", "Tobu", "腾格尔", "谭咏麟", "陶喆"],
  },
  {
    title: "V",
    data: ["Timbaland", "Tobu", "腾格尔", "谭咏麟", "陶喆"],
  },
  {
    title: "W",
    data: ["Timbaland", "Tobu", "腾格尔", "谭咏麟", "陶喆"],
  },
  {
    title: "X",
    data: ["Timbaland", "Tobu", "腾格尔", "谭咏麟", "陶喆"],
  },
  {
    title: "Y",
    data: ["Timbaland", "Tobu", "腾格尔", "谭咏麟", "陶喆"],
  },
  {
    title: "Z",
    data: ["Timbaland", "Tobu", "腾格尔", "谭咏麟", "陶喆"],
  },
  {
    title: "#",
    data: ["Timbaland", "Tobu", "腾格尔", "谭咏麟", "陶喆"],
  },
];

const defaultData = {
  title: "*",
  data: [
    "新的朋友",
    "仅聊天的朋友",
    "群聊",
    "标签",
    "公众号",
    "企业微信联系人",
  ],
};

export default function TabOneScreen() {
  const [panning, setPanning] = useState(false);
  const [selectedSectionIdx, setSelectedSectionIdx] = useState(0);
  const contactRef = useRef<ContactRef | null>(null);

  const changeIndex = (idx: number) => {
    setSelectedSectionIdx(idx);
  };

  const changeIndex2 = (idx: number) => {
    setSelectedSectionIdx(idx);
    contactRef.current?.scrollToSection(idx);
  };

  return (
    <View style={styles.container}>
      <Contacts
        data={[...DATA]}
        panning={panning}
        ref={contactRef}
        onSectionChange={changeIndex}
      />
      <Sidebar
        data={DATA}
        selectedIdx={selectedSectionIdx}
        onSectionChange={changeIndex2}
        onPanning={(p) => setPanning(p)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
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
