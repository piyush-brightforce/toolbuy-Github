import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import HomeScreen from '../screens/homeScreen';
import CategoryScreen from '../screens/categoryScreen'; 

import {
	HomeIconG,
	CategoryIconG,
	SearchIconG,
	PersonIconG,
	CartIconG,
	HomeFill,
	CategoryFill,
	ShoppingCartFill
} from '../utils/icon';
import { external } from '../style/external.css';
import LinearGradient from 'react-native-linear-gradient';
import { useValues } from '../../App';
import { fontSizes, windowHeight } from '../themes/appConstant';
import appColors from '../themes/appColors';
import appFonts from '../themes/appFonts';
import { PersonFill } from '../assets/googleIcons/PersonFill';
import SearchingScreen from '../screens/homeScreen/search';
import AddtocartOne from '../screens/addtocartOne';
import MyAccountScreen from '../screens/myAccount';
import OrderDashBoardScreen from '../screens/myAccount/orderDashBordScreen';

const Tab = createBottomTabNavigator();

const tabIconSize = { height: 28, width: 28 };

const createTabIcon = (IconComponent) => ({
	tabBarIcon: () => <IconComponent {...tabIconSize} />,
	activeTabBarIcon: () => <IconComponent {...tabIconSize} color={appColors.primary} />,
});

const CustomTabBar = ({ state, descriptors, navigation }) => {

	const handleTabPress = routeName => {
		navigation.navigate(routeName);
	};

	const { linearColorStyle, textColorStyle, linearColorStyleTwo, viewRTLStyle,t } =
		useValues();
	return (
		<View style={styles.shadowWrapper}>
			<LinearGradient
				start={{ x: 0.0, y: 0.0 }}
				end={{ x: 0.0, y: 1.0 }}
				colors={linearColorStyle}
				style={{
					flexDirection: viewRTLStyle,
					backgroundColor: '#ffffff',
					height: windowHeight(55),
					borderColor: '#E9E9E9',
					elevation: 10,
				}}>
				{state.routes.map((route, index) => {
					const { options } = descriptors[route.key];

					const label =
						options.tabBarLabel !== undefined
							? options.tabBarLabel
							: options.title !== undefined
								? options.title
								: route.name;
					const IconComponent = options.tabBarIcon;
					const ActiveIcon = options.activeTabBarIcon;
					// const isFocused = activeTab === route.name;
					const isFocused = state.index === index;

					const onPress = () => {
						const event = navigation.emit({
							type: 'tabPress',
							target: route.key,
							canPreventDefault: true,
						});

						if (!isFocused && !event.defaultPrevented) {
							handleTabPress(route.name);
						}
					};

					return (
						<TouchableOpacity
							key={route.key}
							onPress={onPress}
							style={[external.fx_1, external.js_center, external.ai_center]}>

							{isFocused && <View style={styles.line} />}

							<View>{isFocused ? <ActiveIcon /> : <IconComponent />}</View>

							<View style={[external.ai_center]}>
								<Text style={[styles.tabTxt, { color: isFocused ? appColors.primary : appColors.textColorBlack, }]}>
									{label}
								</Text>
							</View>
						</TouchableOpacity>
					);
				})}
			</LinearGradient>
		</View>

	);
};

const MyTabs = () => {

	const { linearColorStyle, textColorStyle, linearColorStyleTwo, viewRTLStyle,t } =
		useValues();
	return (
		<Tab.Navigator
			screenOptions={{ headerShown: false }}
			tabBar={props => <CustomTabBar {...props} />}
			tabBarOptions={{
				activeTintColor: appColors.primary,
				inactiveTintColor: appColors.titleText,
			}}>
			<Tab.Screen
				name="HomeScreen"
				component={HomeScreen}
				options={{
					tabBarLabel: `${t('transData.HOME')}`,
					tabBarIcon: () => <HomeIconG {...tabIconSize} />,
					activeTabBarIcon: () => <HomeFill {...tabIconSize} color={appColors.primary} />
				}}
			/> 
			 
			<Tab.Screen
				name="CategoryScreen"
				component={CategoryScreen}
				options={{
					tabBarLabel: `${t('transData.categories')}`,
					tabBarIcon: () => <CategoryIconG {...tabIconSize} />,
					activeTabBarIcon: () => <CategoryFill {...tabIconSize} color={appColors.primary} />,
				}}
			/>
			<Tab.Screen
				name="SearchScreen"
				component={SearchingScreen}
				options={{
					tabBarLabel:`${t('transData.SEARCH')}`,
					...createTabIcon(SearchIconG)
				}}
			/>
			<Tab.Screen
				name="OrderDashBoardScreen"
				component={OrderDashBoardScreen}
				options={{
					tabBarLabel: `${t('transData.MY_ACCOUNT')}`,
					tabBarIcon: () => <PersonIconG {...tabIconSize} />,
					activeTabBarIcon: () => <PersonFill {...tabIconSize} color={appColors.primary} />
				}}
			/>
			<Tab.Screen
				name="AddtocartOne"
				component={AddtocartOne}
				options={{
					tabBarLabel: `${t('transData.CART')}`,
					tabBarIcon: () => <CartIconG {...tabIconSize} />,
					activeTabBarIcon: () => <ShoppingCartFill {...tabIconSize} color={appColors.primary} />
				}}
			/>
		</Tab.Navigator>
	);
};

const styles = StyleSheet.create({

	line: {
		width: '100%',
		height: 3,
		backgroundColor: appColors.primary,
		position: 'absolute',
		top: 0,
		left: 0,
	},
	tabTxt: {
		fontSize: fontSizes.FONT12,
		fontFamily: appFonts.medium,
		textAlign: 'center',
		fontWeight: '500',
		flexShrink: 1,

	},
	shadowWrapper: {
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 6,
	}
});

export default MyTabs;
