import React from 'react';
import { View, Text, SectionList, TouchableOpacity, Image } from 'react-native';
import { external } from '../../style/external.css';
import { commonStyles } from '../../style/commonStyle.css';
import { ChevronForward } from '../../utils/icon';
import IMAGE_CONFIG from '../../config/imageConfig';

const DrawerMenuContent = ({ content, onItemPress }) => {

	return (
		<View>
			<SectionList
				sections={content}
				keyExtractor={(item, index) => item + index}
				renderSectionHeader={({ section: { content, title, icon } }) => (

					<View style={commonStyles.DcontentRow}>
						<TouchableOpacity
							onPress={() => onItemPress(content)}
							style={[
								external.fd_row,
								external.ai_center,
								external.jc_between,
								external.width_100
							]}>

							<View style={[external.fd_row, external.ai_center, external.fx_1]}>
								<View style={commonStyles.DIconContainer}>
									<Image
										source={{ uri: `${IMAGE_CONFIG.BASE_URL}${content.ImagePath}` }}
										style={commonStyles.DIcon}
									/>
									<View style={commonStyles.DIconLayer}></View>
								</View>
								<Text style={commonStyles.DTitle}>{title}</Text>
							</View>

							<ChevronForward />
						</TouchableOpacity>
					</View>
				)}
			/>
		</View>
	);
};

export default DrawerMenuContent;