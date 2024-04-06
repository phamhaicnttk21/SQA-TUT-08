import { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { fetchPizzaSizes, fetchPizzaToppings, storeOrder } from '../firebase/http';

export default function PizzaOrder() {
    const [sizes, setSizes] = useState([]);
    const [toppings, setToppings] = useState([]);
    const [choosingToppings, setChoosingToppings] = useState(false);
    const [pizzaDetails, setPizzaDetails] = useState({
        price: 0,
        topping: '',
        size: '',
    });
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        async function getSizes() {
            try {
                const fetchedPizzaSizes = await fetchPizzaSizes();
                setSizes(fetchedPizzaSizes);
            } catch (error) {
                setError('Could not fetch sizes!');
            }
        }

        getSizes();
    }, []);

    async function renderToppingsHandler(item) {
        setPizzaDetails({ ...pizzaDetails, size: item.name, price: pizzaDetails.price + item.price });
        try {
            const fetchedPizzaToppings = await fetchPizzaToppings();
            setToppings(fetchedPizzaToppings);
            setChoosingToppings(true);
        } catch (error) {
            setError('Could not fetch toppings!');
        }
    }

    function chooseToppingshandler(item) {
        setPizzaDetails({ ...pizzaDetails, topping: item.name, price: pizzaDetails.price + item.price });
    }

    function resetHandler() {
        setChoosingToppings(false);
        setPizzaDetails({
            price: 0,
            topping: '',
            size: '',
        });
        setSubmitted(false);
        setError('')
    }

    function submitHandler() {
        storeOrder(pizzaDetails);
        if (pizzaDetails.size && pizzaDetails.topping) setSubmitted(true);
    }

    function renderSizes({ item }) {
        return (
            <TouchableOpacity style={styles.itemContainer} onPress={() => renderToppingsHandler(item)}>
                <Text style={styles.name}>{item.id}</Text>
                <Text>${item.price}</Text>
            </TouchableOpacity>
        );
    }

    function renderToppings({ item }) {
        return (
            <TouchableOpacity style={styles.itemContainer} onPress={() => chooseToppingshandler(item)}>
                <Text style={styles.name}>{item.id}</Text>
                <Text>${item.price}</Text>
            </TouchableOpacity>
        );
    }

    if (!submitted) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>{error}</Text>
                <FlatList
                    data={!choosingToppings ? sizes : toppings}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={!choosingToppings ? renderSizes : renderToppings}
                />
                <Button onPress={submitHandler} title="Submit" />
                <Button title="Choose Again" onPress={resetHandler} />
            </View>
        );
    } else {
        return (
            <View style={styles.container}>
                <Text style={styles.name}>Order Successfully Placed</Text>
                <Text>Size: {pizzaDetails.size}</Text>
                <Text>Topping: {pizzaDetails.topping}</Text>
                <Text>Price: ${pizzaDetails.price}</Text>
                <Button title="Choose Again" onPress={resetHandler} />
            </View>
        );
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 50,
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        width: '100%',
    },
    name: {
        fontWeight: 'bold',
        fontSize: 18,
    },
});
