import React from 'react';
import { Text, Pressable, View, Image, ImageSourcePropType } from 'react-native';
import { homeStyles as s } from '../styles/home.styles';

type Props = {
  title: string;
  subtitle?: string;
  accent: string;                 // colored strip under the image / fallback fill
  image?: ImageSourcePropType;    // require('...') OR { uri: 'https://...' }
  onPress: () => void;
};

/** A tile in the home grid: image header + accent strip + title/subtitle.
 *  If no image is supplied, the header falls back to a solid accent block. */
export function GridCard({ title, subtitle, accent, image, onPress }: Props) {
  return (
    <Pressable
      style={({ pressed }) => [s.tile, pressed && { opacity: 0.85 }]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={title}
    >
      {image ? (
        <Image source={image} style={s.tileImage} resizeMode="cover" />
      ) : (
        <View style={[s.tileImage, { backgroundColor: accent }]} />
      )}
      <View style={[s.tileAccentBar, { backgroundColor: accent }]} />
      <View style={s.tileBody}>
        <Text style={s.tileTitle}>{title}</Text>
        {subtitle ? <Text style={s.tileSub}>{subtitle}</Text> : null}
      </View>
    </Pressable>
  );
}