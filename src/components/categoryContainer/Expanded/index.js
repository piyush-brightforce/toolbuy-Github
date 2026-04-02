import React, { useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	FlatList,
	Image,
} from "react-native";
import styles from "./style.css";
import IMAGE_CONFIG from "../../../config/imageConfig";
import { external } from "../../../style/external.css";
import { ChevronForward } from "../../../assets/googleIcons/ChevronForward";

const ExpandedContainer = ({ item, isExpanded, onPress, onhandlePressItem }) => {

	return (
		<View style={styles.container}>
			<View style={isExpanded && styles.activeBar}>
				{/* HEADER */}
				<View style={styles.contentRow}>
					<TouchableOpacity
						onPress={onPress}
						style={[
							external.fd_row,
							external.ai_center,
							external.jc_between,
							external.width_100,
							isExpanded && styles.activeBorder
						]}>

						<View style={[external.fd_row, external.ai_center, external.fx_1]}>
							<View style={styles.iconContainer}>
								<Image
									source={{ uri: `${IMAGE_CONFIG.BASE_URL}${item.ImagePath}` }}
									style={styles.icon}
								/>
								<View style={styles.iconLayer}></View>
							</View>
							<Text style={styles.title}>{item.CategoryName}</Text>
						</View>

						<ChevronForward style={isExpanded && styles.activeIcon} />
					</TouchableOpacity>
				</View>

				{/* SUBCATEGORIES */}
				{isExpanded && (
					<FlatList
						data={item.ProductTypeLists}
						nestedScrollEnabled={true}
						keyExtractor={(item) => item.FilterId}
						style={[external.ph_8, external.mt_8, external.ml_5]}
						renderItem={({ item }) => (
							<TouchableOpacity
								onPress={() => onhandlePressItem(item)}
								style={[
									external.fd_row,
									external.ai_center,
									external.jc_between,
									external.width_100,
									external.pv_10,
								]}>

								<View style={[external.fd_row, external.ai_center, external.fx_1]}>
									<View style={styles.iconContainer}>
										<Image
											source={{ uri: `${IMAGE_CONFIG.BASE_URL}${item.ImagePath}` }}
											style={styles.icon}
										/>
										<View style={styles.iconLayer}></View>
									</View>
									<Text style={styles.title}>{item.FilterValue}</Text>
								</View>
								<ChevronForward />
							</TouchableOpacity>
						)}
					/>
				)}
			</View>
		</View>
	);
};

export default ExpandedContainer;