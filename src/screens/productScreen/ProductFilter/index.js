import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import styles from './style.css'
import IconBackground from '../../../commonComponents/iconBackGround';
import { PgaeInfo, SwapVert } from '../../../utils/icon';
import { external } from '../../../style/external.css';

const FilterBar = ({ onPress }) => {

	const items = [
		{ id: 1, label: "Filter", icon: <PgaeInfo width={20} height={20} /> },
		{ id: 2, label: "Sort", icon: <SwapVert width={20} height={20} /> },
		// { id: 3, label: "Department" },
		// { id: 4, label: "Brand" },
		// { id: 5, label: "Price" },
	];

	return (
		<View style={styles.container}>
			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={styles.scrollContainer}
			>
				{items.map((item) => (
					<TouchableOpacity
						key={item.id}
						style={styles.filterButton}
						onPress={() => onPress(item)}
						activeOpacity={1}
					>
						{item.icon && (
							<View style={[external.mr_5]}>
								{item.icon}
							</View>

							// <IconBackground value={item.icon} />
						)}
						<Text style={styles.filterText}>{item.label}</Text>
					</TouchableOpacity>
				))}
			</ScrollView>
		</View>
	);
};

export default FilterBar;
