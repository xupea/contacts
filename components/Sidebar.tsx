import { useEffect, useRef, useState } from "react";
import { PanResponder, StyleSheet, Text, View } from "react-native";

import * as Haptics from "expo-haptics";

interface Tooltip {
  idx: number;
}

interface Data {
  title: string;
}

interface SidebarProps {
  data: Data[];
  selectedIdx: number;
  onSectionChange: (id: number) => void;
}

export default function Sidebar({
  selectedIdx,
  onSectionChange,
  data,
}: SidebarProps) {
  const [tooltip, setTooltip] = useState<Tooltip | null>(null);

  const panningRef = useRef(false);

  const containerPageYRef = useRef(0);
  const containerHeightRef = useRef(0);

  const selectedIdxRef = useRef(selectedIdx);

  const containerRef = useRef<View | null>(null);

  const panResponder = useRef(
    PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        // The gesture has started. Show visual feedback so the user knows
        // what is happening!
        // gestureState.d{x,y} will be set to zero now
        panningRef.current = true;
      },
      onPanResponderMove: (evt, gestureState) => {
        // The most recent move distance is gestureState.move{X,Y}
        // The accumulated gesture distance since becoming responder is
        // gestureState.d{x,y}
        const currentY = evt.nativeEvent.pageY;
        const containerY = containerPageYRef.current;
        const containerHeight = containerHeightRef.current;

        if (currentY < containerY) {
          onSectionChange(0);

          setTooltip({
            idx: 0,
          });
        } else if (currentY > containerY + containerHeight) {
          onSectionChange(data.length - 1);

          setTooltip({
            idx: data.length - 1,
          });
        } else {
          const newIdx = Math.floor((currentY - containerY) / 24);

          if (selectedIdxRef.current !== newIdx) {
            onSectionChange(newIdx);

            setTooltip({
              idx: Math.floor((currentY - containerY) / 24),
            });
          }
        }
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        setTooltip(null);
        panningRef.current = false;
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelled
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      },
    })
  ).current;

  useEffect(() => {
    if (panningRef.current) {
      Haptics.impactAsync();
    }
  }, [selectedIdx]);

  return (
    <View style={styles.container}>
      <View
        {...panResponder.panHandlers}
        onLayout={(event) => {
          if (containerRef.current) {
            containerRef.current.measure(
              (x, y, width, height, pageX, pageY) => {
                containerPageYRef.current = pageY;
                containerHeightRef.current = height;
              }
            );
          }
        }}
        ref={containerRef}
      >
        {data.map(({ title }, idx) => {
          return (
            <View
              style={[
                styles.item,
                selectedIdx === idx ? styles.selected : null,
              ]}
              key={title}
            >
              <Text
                style={[
                  styles.title,
                  selectedIdx === idx ? styles.textSelected : null,
                ]}
              >
                {title}
              </Text>
              {tooltip && tooltip.idx === idx && (
                <View style={styles.tooltip}>
                  <Text style={styles.tooltipText}>
                    {data[tooltip.idx]?.title}
                  </Text>
                </View>
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    paddingHorizontal: 5,
    position: "relative",
  },
  title: {
    fontSize: 20,
    textAlign: "center",
  },
  container: {
    position: "absolute",
    right: 2,
    top: 0,
    bottom: 0,
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
  },
  sidebar: {},
  selected: {
    backgroundColor: "#57be6a",
    borderRadius: 12,
  },
  textSelected: {
    color: "#ffffff",
  },
  tooltip: {
    position: "absolute",
    right: 60,
    top: -8,
    backgroundColor: "#c9c9c9",

    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    transform: [{ rotateZ: "-45deg" }],
  },
  tooltipText: {
    fontSize: 32,
    textAlign: "center",
    transform: [{ rotateZ: "45deg" }],
    color: "#ffffff",
    fontWeight: "bold",
  },
});
