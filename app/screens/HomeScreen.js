import { View, Text, ScrollView, Image, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { BellIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import Categories from '../components/categories';
import axios from 'axios';
import Recipes from '../components/recipes';

export default function HomeScreen() {
    const [categories, setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState('Beef');
    const [meals, setMeals] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCategories();
        getRecipes();
    }, []);

    const handleChangeCategory = category => {
        getRecipes(category);
        setActiveCategory(category);
        setMeals([]);

    }

    const getCategories = async () => {
        try {
            const response = await axios.get('https://themealdb.com/api/json/v1/1/categories.php');
            if (response && response.data) {
                setCategories(response.data.categories);  // Ensure the response structure is correct
            }
        } catch (error) {
            console.log('Error', error.message);
        } finally {
            setLoading(false);
        }
    };

    const getRecipes = async (category = "Beef") => {
        try {
            const response = await axios.get(`https://themealdb.com/api/json/v1/1/filter.php?c=${category}`);
            //console.log('Got Recipes:', response.data)

            if (response && response.data) {
                setMeals(response.data.meals);  // Ensure the response structure is correct
            }
        } catch (error) {
            console.log('Error', error.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center">
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-white">
            <StatusBar style='dark' />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ padding: hp(2) }}
                className="space-y-6 pt-9"
            >
                {/* Avatar and Bell icon */}
                <View className="justify-between flex-row items-center mb-2">
                    <Image source={require('../assets/Avatar.png')} style={{ width: hp(5), height: hp(5.5) }} />
                    <BellIcon size={hp(4)} color="gray" />
                </View>
                <View>
                    <Text style={{ fontSize: hp(1.7) }} className="text-neutral-600">Hello, Faisal</Text>
                    <Text style={{ fontSize: hp(3.8) }} className="font-semibold text-neutral-600">Make your own food,</Text>
                    <Text style={{ fontSize: hp(3.8) }} className="font-semibold text-neutral-600">stay at <Text className="text-amber-400">home</Text></Text>
                </View>
                {/* Search Bar */}
                <View className="flex-row items-center mx-4 rounded-full bg-black/5 p-[6px]">
                    <TextInput
                        placeholder='Search any recipe'
                        placeholderTextColor={'gray'}
                        style={{ fontSize: hp(1.7) }}
                        className="flex-1 text-base mb-1 pl-3 tracking-wider"
                    />
                    <View className="bg-white rounded-full p-3">
                        <MagnifyingGlassIcon size={hp(2.5)} strokeWidth={3} color="gray" />
                    </View>
                </View>
                {/* Categories */}

                <Categories categories={categories} activeCategory={activeCategory} handleChangeCategory={handleChangeCategory} />

                {/* Recipes */}
                <View>
                    <Recipes meals={meals} categories={categories} />
                </View>
            </ScrollView>
        </View>
    );
}
