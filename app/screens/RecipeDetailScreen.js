import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ChevronLeftIcon, ClockIcon, FireIcon } from 'react-native-heroicons/outline';
import { HeartIcon, UsersIcon, Square3Stack3DIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Loading from '../components/loading';
import YoutubeIframe from 'react-native-youtube-iframe';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';



export default function RecipeDetailScreen(props) {
    const item = props.route.params;
    const [isFavorite, setIsFavorite] = useState(false);
    const navigation = useNavigation();
    const [meal, setMeal] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getMealData(item.idMeal);
    }, [item.idMeal]);

    const getMealData = async (id) => {
        try {
            const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
            if (response && response.data) {
                setMeal(response.data.meals[0]);
            }
        } catch (error) {
            console.log('Error', error.message);
        } finally {
            setLoading(false);
        }
    };

    const ingrdientsIndexes = (meal) => {
        let indexes = [];
        for (let i = 1; i <= 20; i++) {
            if (meal[`strIngredient${i}`]) {
                indexes.push(i);
            }
        }
        return indexes;
    };

    const getYoutubeVideoId = url => {
        const regex = /[?&]v=([^&]+)/;
        const match = url.match(regex);
        if (match && match[1]) {
            return match[1];
        }
        return null;
    }

    return (
        <ScrollView
            className="bg-white flex-1"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 30 }}
        >
            <StatusBar style={"light"} />
            {/* Recipe Image */}
            <View className="flex-row justify-center">
                <Image source={{ uri: item.strMealThumb }}
                    style={{ width: wp(98), height: hp(50), borderRadius: 40, marginTop: 4 }}
                    sharedTransitionTag={item.strMeal}
                />
            </View>
            {/* Back Button */}
            <Animated.View entering={FadeIn.delay(200).duration(1000)} className="w-full absolute flex-row justify-between items-center pt-14">
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    className="p-2 rounded-full ml-4 bg-white">
                    <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="#fbbf24" />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setIsFavorite(!isFavorite)}
                    className="p-2 rounded-full mr-4 bg-white">
                    <HeartIcon size={hp(3.5)} strokeWidth={4.5} color={isFavorite ? "red" : "gray"} />
                </TouchableOpacity>
            </Animated.View>

            {/* Meal Description */}
            {
                loading ? (
                    <Loading size="large" className="mt-16" />
                ) : (
                    meal && (
                        <View className="px-4 flex justify-between space-y-4 pt-8" >
                            <Animated.View entering={FadeInDown.duration(800).damping(12)} className="space-y-2">
                                <Text style={{ fontSize: hp(3) }} className="font-bold flex-1 text text-neutral-700">
                                    {meal.strMeal}
                                </Text>
                                <Text style={{ fontSize: hp(2) }} className="font-medium flex-1 text text-neutral-500">
                                    {meal.strArea}
                                </Text>
                            </Animated.View>
                            <Animated.View entering={FadeInDown.delay(150).duration(1000).damping(12)} className="flex-row justify-around">
                                <View className="flex rounded-full bg-amber-300 p-2">
                                    <View style={{ height: hp(6.5), width: hp(6.5) }} className="flex bg-white items-center justify-center rounded-full">
                                        <ClockIcon size={hp(4)} strokeWidth={2.5} color="gray" />
                                    </View>
                                    <View className="flex items-center py-2">
                                        <Text style={{ fontSize: hp(1.3) }} className="font-bold text-neutral-700">
                                            35
                                        </Text>
                                        <Text style={{ fontSize: hp(1.3) }} className="font-bold text-neutral-700">
                                            Mins
                                        </Text>
                                    </View>
                                </View>
                                <View className="flex rounded-full bg-amber-300 p-2">
                                    <View style={{ height: hp(6.5), width: hp(6.5) }} className="flex bg-white items-center justify-center rounded-full">
                                        <UsersIcon size={hp(4)} strokeWidth={2.5} color="gray" />
                                    </View>
                                    <View className="flex items-center py-2">
                                        <Text style={{ fontSize: hp(1.3) }} className="font-bold text-neutral-700">
                                            03
                                        </Text>
                                        <Text style={{ fontSize: hp(1.3) }} className="font-bold text-neutral-700">
                                            Servings
                                        </Text>
                                    </View>
                                </View>
                                <View className="flex rounded-full bg-amber-300 p-2">
                                    <View style={{ height: hp(6.5), width: hp(6.5) }} className="flex bg-white items-center justify-center rounded-full">
                                        <FireIcon size={hp(4)} strokeWidth={2.5} color="gray" />
                                    </View>
                                    <View className="flex items-center py-2">
                                        <Text style={{ fontSize: hp(1.3) }} className="font-bold text-neutral-700">
                                            103
                                        </Text>
                                        <Text style={{ fontSize: hp(1.3) }} className="font-bold text-neutral-700">
                                            Cal
                                        </Text>
                                    </View>
                                </View>
                                <View className="flex rounded-full bg-amber-300 p-2">
                                    <View style={{ height: hp(6.5), width: hp(6.5) }} className="flex bg-white items-center justify-center rounded-full">
                                        <Square3Stack3DIcon size={hp(4)} strokeWidth={2.5} color="gray" />
                                    </View>
                                    <View className="flex items-center py-2">
                                        <Text style={{ fontSize: hp(1.3) }} className="font-bold text-neutral-700">
                                            Easy To
                                        </Text>
                                        <Text style={{ fontSize: hp(1.3) }} className="font-bold text-neutral-700">
                                            Cook
                                        </Text>
                                    </View>
                                </View>
                            </Animated.View>
                            {/* Ingredients */}
                            <Animated.View entering={FadeInDown.delay(1500).duration(1000).damping(12)} className="space-y-4">
                                <Text style={{ fontSize: hp(2.5) }} className="font-bold flex-1 text-neutral-700">
                                    Ingredients
                                </Text>
                                <View className="space-y-2 ml-3">
                                    {
                                        ingrdientsIndexes(meal).map(i => (
                                            <View key={i} className="flex-row space-x-4">
                                                <View
                                                    style={{ height: hp(1.5), width: hp(1.5) }}
                                                    className="bg-amber-300 rounded-full" />
                                                <Text style={{ fontSize: hp(1.7) }} className="text-neutral-700">
                                                    <Text className="font-bold">{meal[`strMeasure${i}`]} </Text> - {meal[`strIngredient${i}`]}
                                                </Text>
                                            </View>
                                        ))
                                    }
                                </View>
                                <View className="space-y-4">
                                    <Text style={{ fontSize: hp(2.5) }} className="font-bold flex-1 text-neutral-700">Instructions</Text>
                                    <Text style={{ fontSize: hp(1.6) }}>{meal[`strInstructions`]}</Text>
                                    <View>
                                        <Text style={{ fontSize: hp(2.5) }} className="font-bold flex-1 text-neutral-700">Recipe Video</Text>


                                        <YoutubeIframe
                                            videoId={getYoutubeVideoId(meal.strYoutube)}
                                            height={hp(35)}

                                        />

                                    </View>
                                </View>

                            </Animated.View>
                        </View>
                    )
                )

            }
        </ScrollView>
    );
}
