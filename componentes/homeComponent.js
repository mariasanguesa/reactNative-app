import { View, Text } from 'react-native';

const homeComponent = (props) => {
    return (
        <View style = {{ shadowColor: 'black', shadowOpacity: 0.2, shadowRadius: 2, elevation: 2 }}>
            <Text>{props.nombre}</Text>
        </View >
    )
}
export default homeComponent;