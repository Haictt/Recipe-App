import React, { useLayoutEffect } from "react";
import { FlatList, Text, View, TouchableHighlight, Image, useWindowDimensions } from "react-native";
import styles from "./styles";
import { recipes } from "../../data/dataArrays";
import MenuImage from "../../components/MenuImage/MenuImage";
import { getCategoryName } from "../../data/MockDataAPI";

export default function HomeScreen(props) {
  const { height, width } = useWindowDimensions();
  const { navigation } = props;
  const HALF_SCREEN = (width - (2 + 1) * 20) / 2

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <MenuImage
          onPress={() => {
            navigation.openDrawer();
          }}
        />
      ),
      headerRight: () => <View />,
    });
  }, []);

  const onPressRecipe = (item) => {
    navigation.navigate("Recipe", { item });
  };

  const renderRecipes = ({ item }) => (
    <TouchableHighlight underlayColor="rgba(73,182,77,0.9)" onPress={() => onPressRecipe(item)}>
      <View style={[styles.container, {width:HALF_SCREEN}]}>
        <Image style={[styles.photo,{width:HALF_SCREEN}]} source={{ uri: item.photo_url }} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.category}>{getCategoryName(item.categoryId)}</Text>
      </View>
    </TouchableHighlight>
  );

  return (
    <View>
      <FlatList vertical showsVerticalScrollIndicator={false} numColumns={2} data={recipes} renderItem={renderRecipes} keyExtractor={(item) => `${item.recipeId}`} />
    </View>
  );
}
