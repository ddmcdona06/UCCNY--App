import React from 'react';
import { View, Text } from 'react-native';
import { global } from '../styles/global';

type Props = { eyebrow?: string; title: string };

/** Eyebrow + title + gold rule. Matches the website's section headers. */
export function SectionHeader({ eyebrow, title }: Props) {
  return (
    <View>
      {eyebrow ? <Text style={global.eyebrow}>{eyebrow}</Text> : null}
      <Text style={global.h2}>{title}</Text>
      <View style={global.hr} />
    </View>
  );
}
