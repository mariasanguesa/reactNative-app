import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Button, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';

const ReviewForm = () => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);


  const handleSelectImage = async () => {
    try {
        await requestPermission();
        const result = await ImagePicker.launchImageLibraryAsync();
      
      // Aquí puedes manejar la imagen seleccionada, como guardar la URI en el estado del componente
      // o enviarla al servidor para su procesamiento.
      
      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
        console.log(result.assets[0].uri);
      } else {
        console.log('Selección de imagen cancelada');
      }
    } catch (error) {
      console.error('Error al acceder a la galería de imágenes:', error);
    }
  };

  const requestPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
        return;
    }
  };

  const handleRatingPress = (selectedRating) => {
    setRating(selectedRating);
  };

  const handleSubmitReview = () => {
    // Aquí puedes realizar alguna acción con la puntuación y el texto de la reseña
    console.log('Puntuación:', rating);
    console.log('Reseña:', reviewText);

    // Limpia el estado después de enviar la reseña
    setRating(0);
    setReviewText('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Agregar Reseña</Text>

      {/* Puntuación */}
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingText}>Tu puntuación:</Text>
        <View style={styles.starsContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity
              key={star}
              onPress={() => handleRatingPress(star)}
              style={styles.starButton}
            >
              <Icon
                name={star <= rating ? 'star' : 'star-o'}
                size={30}
                color={star <= rating ? 'gold' : 'gray'}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Texto de la reseña */}
      <Text style={styles.label}>Reseña:</Text>
      <TextInput
        style={styles.input}
        placeholder="Escribe tu reseña"
        value={reviewText}
        onChangeText={setReviewText}
        multiline
      />
      {selectedImage && (
         <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
      )}

        <Button title="Seleccionar imagen" onPress={handleSelectImage} />

      {/* Botón de enviar */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmitReview}
        disabled={rating === 0 || reviewText === ''}
      >
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
    marginTop: 15
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  ratingContainer: {
    marginBottom: 20,
  },
  ratingText: {
    fontSize: 16,
    marginBottom: 10,
  },
  starsContainer: {
    flexDirection: 'row',
  },
  starButton: {
    marginRight: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    minHeight: 100,
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedImage: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
});

export default ReviewForm;
