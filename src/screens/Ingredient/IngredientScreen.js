import React, { useLayoutEffect } from "react";
import { FlatList, ScrollView, Text, View, Image, TouchableHighlight, useWindowDimensions } from "react-native";
import styles from "./styles";
import { getIngredientUrl, getRecipesByIngredient, getCategoryName } from "../../data/MockDataAPI";

export default function IngredientScreen(props) {
  const { navigation, route } = props;
  const { height, width } = useWindowDimensions();
  const ingredientId = route.params?.ingredient;
  const ingredientUrl = getIngredientUrl(ingredientId);
  const ingredientName = route.params?.name;
  const HALF_SCREEN = (width - (2 + 1) * 20) / 2
  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params?.name,
    });
  }, []);

  const onPressRecipe = (item) => {
    navigation.navigate("Recipe", { item });
  };

  const renderRecipes = ({ item }) => (
    <TouchableHighlight underlayColor="rgba(73,182,77,0.9)" onPress={() => onPressRecipe(item)}>
      <TouchableHighlight underlayColor="rgba(73,182,77,0.9)" onPress={() => onPressRecipe(item)}>
        <View style={[styles.container,{width:HALF_SCREEN}]}>
          <Image style={[styles.photo,{width:HALF_SCREEN}]} source={{ uri: item.photo_url }} />
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.category}>{getCategoryName(item.categoryId)}</Text>
        </View>
      </TouchableHighlight>
    </TouchableHighlight>
  );

  return (
    <ScrollView style={styles.mainContainer}>
      <View style={{ borderBottomWidth: 0.4, marginBottom: 10, borderBottomColor: "grey" }}>
        <Image style={styles.photoIngredient} source={{ uri: "" + ingredientUrl }} />
      </View>
      <Text style={styles.ingredientInfo}>Recipes with {ingredientName}:</Text>
      <View>
        <FlatList vertical showsVerticalScrollIndicator={false} numColumns={2} data={getRecipesByIngredient(ingredientId)} renderItem={renderRecipes} keyExtractor={(item) => `${item.recipeId}`} />
      </View>
    </ScrollView>
  );
}
