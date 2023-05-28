import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const StarRating = ({ rating }) => {
  const filledStars = Math.floor(rating); // Número de estrellas llenas
  const remainingStars = 5 - filledStars; // Número de estrellas vacías

  return (
    <View style={styles.container}>
      {/* Estrellas llenas */}
      {Array(filledStars).fill(
        <Icon name="star" size={20} color="gold" />
      )}

      {/* Estrellas vacías */}
      {Array(remainingStars).fill(
        <Icon name="star" size={20} color="gray" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginLeft: 5,
    marginTop: -8
  },
});

export default StarRating;
