import React from 'react';
import { Text, Pressable, View } from 'react-native';
import { homeStyles as s } from '../styles/home.styles';

type Props = {
  title: string;
  subtitle?: string;
  accent: string;       // colored bar at top of tile
  onPress: () => void;
};

/** A single square tile in the home grid. Mirrors a section of the website. */
export function GridCard({ title, subtitle, accent, onPress }: Props) {
  return (
    <Pressable
      style={({ pressed }) => [s.tile, pressed && { opacity: 0.85 }]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={title}
    >
      <View style={[s.tileAccentBar, { backgroundColor: accent }]} />
      <View style={s.tileBody}>
        <Text style={s.tileTitle}>{title}</Text>
        {subtitle ? <Text style={s.tileSub}>{subtitle}</Text> : null}
      </View>
    </Pressable>
  );
}
