import { ScrollView, View, Text, Pressable, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { togetherStyles as s } from '../../styles/together.styles';
import { colors, spacing, radius, type } from '../../styles/theme';

// Live triad from uccny.org/together. Descriptions are placeholders — the site
// provides no per-pillar copy. Replace with real text when available.
const PILLARS = [
  { name: 'Love', color: colors.til.love, body: 'Transforming lives through the welcome and belonging at the heart of the gospel.' },
  { name: 'Community', color: colors.til.community, body: 'Support and education for clergy and lay leaders across the Conference.' },
  { name: 'Connection', color: colors.til.connection, body: 'Helping congregations build innovative, collaborative ministry together.' },
];

export default function Together() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.cream }} edges={['top']}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Pride bar — the website's signature element */}
        <View style={s.prideBar}>
          {colors.pride.map((c) => (
            <View key={c} style={[s.prideSeg, { backgroundColor: c }]} />
          ))}
        </View>

        <View style={s.hero}>
          <Text style={s.eyebrow}>· UCCNY ·</Text>
          <Text style={s.title}>Together in Love</Text>
          <Text style={s.lead}>
            A Conference-wide initiative to transform lives through the power of
            Love, Community, and Connection — providing support and education for
            our clergy and lay leaders, and helping congregations develop
            innovative, collaborative ministry.
          </Text>
        </View>

        {/* Three pillars */}
        <View style={{ paddingHorizontal: spacing.md, marginTop: spacing.md }}>
          {PILLARS.map((p) => (
            <View
              key={p.name}
              style={{
                flexDirection: 'row',
                backgroundColor: colors.card,
                borderRadius: radius.md,
                borderWidth: 1,
                borderColor: colors.line,
                marginBottom: spacing.sm,
                overflow: 'hidden',
              }}
            >
              <View style={{ width: 6, backgroundColor: p.color }} />
              <View style={{ flex: 1, padding: spacing.md }}>
                <Text style={{ fontSize: type.sizes.section, color: colors.ink, ...type.heading }}>
                  {p.name}
                </Text>
                <Text style={{ fontSize: type.sizes.body, color: colors.inkSoft, marginTop: 4, lineHeight: 22 }}>
                  {p.body}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Open & Affirming — navy section, mirrors the site */}
        <View style={[s.card, { backgroundColor: colors.navy, borderColor: colors.navy }]}>
          <Text style={[s.cardTitle, { color: colors.white }]}>What "Open & Affirming" means</Text>
          <Text style={[s.cardBody, { color: 'rgba(255,255,255,0.85)' }]}>
            An Open & Affirming congregation makes a public covenant to welcome
            people of every sexual orientation and gender identity into full
            participation — membership, leadership, marriage, and ministry.
          </Text>
        </View>

        {/* Donate / Pledge CTA */}
        <View style={{ paddingHorizontal: spacing.md }}>
          <Pressable style={s.cta} onPress={() => Linking.openURL('https://www.aplos.com/aws/give/NewYorkConferenceUCC/TIL')}>
            <Text style={s.ctaText}>Donate to Together in Love</Text>
          </Pressable>
          <Pressable
            style={[s.cta, { backgroundColor: colors.til.rose, marginTop: spacing.sm }]}
            onPress={() => Linking.openURL('https://www.shelbygiving.com/App/Form/036023fe-5ad8-4d75-8049-c3dbce22c327')}
          >
            <Text style={[s.ctaText, { color: colors.white }]}>Take the Pledge</Text>
          </Pressable>
        </View>

        <View style={s.quote}>
          <Text style={s.quoteText}>
            "Never place a period where God has placed a comma."
          </Text>
          <Text style={s.quoteAttr}>— UCC Motto · God is still speaking</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
