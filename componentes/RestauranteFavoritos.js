import { useContext } from 'react';
import FavoritesContext from '../contextos/FavContext';

const Favoritos = () => {

    const { favorites, addFavorite, removeFavorite } = useContext(FavoritesContext);

  const handleAddFavorite = (item) => {
    addFavorite(item);
  };

  const handleRemoveFavorite = (item) => {
    removeFavorite(item);
  };

  return (
    iconName = focused ? 'star' : 'star-outline'
  );
    
};
export default Favoritos;