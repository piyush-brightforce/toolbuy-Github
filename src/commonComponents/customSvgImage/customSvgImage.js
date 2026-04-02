
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
const SvgFromUrl = ({ uri, width = 80, height = 80 }) => {
  const [svgXml, setSvgXml] = useState(null);
 
 
  useEffect(() => {
    const loadSvg = async () => {
      try {
        const response = await fetch(uri);
        let svgText = await response.text();

        // 🔥 FIX COLOR ISSUES

        // Remove XML & DOCTYPE
        svgText = svgText.replace(/<\?xml.*?\?>/, '');
        svgText = svgText.replace(/<!DOCTYPE.*?>/, '');

        // Remove <style> tags (RN can't use CSS styles)
        svgText = svgText.replace(/<style[\s\S]*?<\/style>/gi, '');

        // Replace "currentColor" with a default color
        svgText = svgText.replace(/currentColor/g, '#000000');

        // Remove class attributes (styles won’t apply anyway)
        svgText = svgText.replace(/class=".*?"/g, '');

        setSvgXml(svgText);
      } catch (error) {
        console.error('SVG Load Error:', error);
      }
    };

    loadSvg();
  }, [uri]);
 
  if (!svgXml) {
 
    return (
      <View style={{ width, height, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
    
  }
 
  return <SvgXml xml={svgXml} width={width} height={height} />;
};

export default SvgFromUrl;