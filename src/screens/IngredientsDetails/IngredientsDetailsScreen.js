import React, { useLayoutEffect } from "react";
import { FlatList, Text, View, Image, TouchableHighlight, useWindowDimensions } from "react-native";
import styles from "./styles";
import { getIngredientName, getAllIngredients } from "../../data/MockDataAPI";

export default function IngredientsDetailsScreen(props) {
  const { navigation, route } = props;
  const {height,width} = useWindowDimensions();
  const item = route.params?.ingredients;
  const ingredientsArray = getAllIngredients(item);
  const THIRD_SCREEN = (width - 20) / 3 - 10
  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params?.title,
      headerTitleStyle: {
        fontSize: 16,
      },
    });
  }, []);

  const onPressIngredient = (item) => {
    let name = getIngredientName(item.ingredientId);
    let ingredient = item.ingredientId;
    navigation.navigate("Ingredient", { ingredient, name });
  };

  const renderIngredient = ({ item }) => (
    <TouchableHighlight underlayColor="rgba(73,182,77,0.9)" onPress={() => onPressIngredient(item[0])}>
      <View style={[styles.container,{width:THIRD_SCREEN}]}>
        <Image style={[styles.photo,{width:THIRD_SCREEN}]} source={{ uri: item[0].photo_url }} />
        <Text style={styles.title}>{item[0].name}</Text>
        <Text style={{ color: "grey" }}>{item[1]}</Text>
      </View>
    </TouchableHighlight>
  );

  return (
    <View>
      <FlatList vertical showsVerticalScrollIndicator={false} numColumns={3} data={ingredientsArray} renderItem={renderIngredient} keyExtractor={(item) => `${item.recipeId}`} />
    </View>
  );
}
