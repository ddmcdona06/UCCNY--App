import { ScrollView, View, Text, Pressable, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { global } from '../../styles/global';
import { SectionHeader } from '../../components/SectionHeader';
import { colors, spacing, radius } from '../../styles/theme';

const LINKS: { label: string; url: string }[] = [
  { label: 'Who Are We', url: 'https://uccny.org/about' },
  { label: 'Statement of Faith', url: 'https://uccny.org/about/statement-of-faith' },
  { label: 'Associations & Regions', url: 'https://uccny.org/resources/regions' },
  { label: 'Resources', url: 'https://uccny.org/resources' },
  { label: 'NY School of Ministry', url: 'https://uccny.org/sample-page/nysom' },
  { label: 'Search & Call', url: 'https://uccny.org/search-and-call' },
  { label: 'Annual Meeting', url: 'https://uccny.org/annualmeeting' },
  { label: 'Donate', url: 'https://uccny.org/donate' },
  { label: 'Contact', url: 'https://uccny.org/about' },
];

export default function More() {
  return (
    <SafeAreaView style={global.screen} edges={['top']}>
      <ScrollView contentContainerStyle={global.content}>
        <SectionHeader eyebrow="New York Conference · UCC" title="More" />
        <View style={{ marginTop: spacing.sm }}>
          {LINKS.map((l) => (
            <Pressable
              key={l.label}
              onPress={() => Linking.openURL(l.url)}
              style={({ pressed }) => [
                {
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: colors.card,
                  borderWidth: 1,
                  borderColor: colors.line,
                  borderRadius: radius.md,
                  paddingVertical: spacing.md,
                  paddingHorizontal: spacing.md,
                  marginBottom: spacing.sm,
                },
                pressed && { opacity: 0.85 },
              ]}
            >
              <Text style={[global.body, { color: colors.ink }]}>{l.label}</Text>
              <Ionicons name="chevron-forward" size={18} color={colors.inkFaint} />
            </Pressable>
          ))}
        </View>
        <Text style={[global.body, { fontSize: 13, color: colors.inkFaint, marginTop: spacing.md }]}>
          PO Box 487, Syracuse, NY 13209 · © 2026 UCCNY
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
