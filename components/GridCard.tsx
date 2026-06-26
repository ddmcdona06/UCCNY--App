import React from 'react';
import { Text, Pressable, View, Image, ImageSourcePropType } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { homeStyles as s } from '../styles/home.styles';

type Props = {
  title: string;
  subtitle?: string;
  accent: string;                 // accent strip + icon disc tint fallback
  image?: ImageSourcePropType;    // require('...') OR { uri: 'https://...' }
  icon?: string;                  // Ionicons name shown over the header
  onPress: () => void;
};

/** Home grid tile: header (image + centered icon) → accent strip → title/subtitle. */
export function GridCard({ title, subtitle, accent, image, icon, onPress }: Props) {
  return (
    <Pressable
      style={({ pressed }) => [s.tile, pressed && { opacity: 0.85 }]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={title}
    >
      <View style={s.tileHeader}>
        {image ? (
          <Image source={image} style={s.tileImage} resizeMode="cover" />
        ) : (
          <View style={[s.tileImage, { backgroundColor: accent }]} />
        )}
        {icon ? (
          <View style={s.tileIconDisc}>
            <Ionicons name={icon as any} size={22} color="#fff" />
          </View>
        ) : null}
      </View>
      <View style={[s.tileAccentBar, { backgroundColor: accent }]} />
      <View style={s.tileBody}>
        <Text style={s.tileTitle}>{title}</Text>
        {subtitle ? <Text style={s.tileSub}>{subtitle}</Text> : null}
      </View>
    </Pressable>
  );
}