import React, { useState } from 'react';
import { View, Text, SectionList, TouchableOpacity, Image } from 'react-native';
import { external } from '../../style/external.css';
import { commonStyles } from '../../style/commonStyle.css';
import { ChevronForward } from '../../utils/icon';
import IMAGE_CONFIG from '../../config/imageConfig';
import appColors from '../../themes/appColors';

const DrawerCategoryContent = ({ content, onItemPress }) => {
 
		const [activeContent, setActiveContent] = useState(null);
	
	return (
		<View style={[external.fx_1]}>
			<SectionList
				sections={content}
				keyExtractor={(item, index) => item + index}
				renderSectionHeader={({ section: { content, title } }) => {
					 const isActive = content.CategoryCode === activeContent;
					return (
					<View style={[commonStyles.DcontentRow, { backgroundColor: isActive ? '#00439914' : 'transparent' }]}>
						<TouchableOpacity
							onPress={() => {
								onItemPress(content);
								setActiveContent(content.CategoryCode); 
							}}
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
								<Text style={[commonStyles.DTitle,{color:isActive ? appColors.primary : appColors.textColorBlack, }]}>{title}</Text>
							</View>

							<ChevronForward color={isActive ? appColors.primary : appColors.textColorBlack}/>
						</TouchableOpacity>
					</View>
				);
				}}
			/>
		</View>
	);
};

export default DrawerCategoryContent;