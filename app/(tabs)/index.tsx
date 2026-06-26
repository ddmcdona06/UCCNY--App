import { ScrollView, View, Text, Pressable, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { homeStyles as s } from '../../styles/home.styles';
import { global } from '../../styles/global';
import { colors } from '../../styles/theme';
import { GridCard } from '../../components/GridCard';

// Each tile maps to a section of uccny.org. `route` navigates in-app;
// `external` opens the website for pages we haven't rebuilt natively.
const TILES: {
  title: string;
  subtitle: string;
  accent: string;
  route?: string;
  external?: string;
}[] = [
  { title: 'Together in Love', subtitle: 'Open & Affirming', accent: colors.til.rose, route: '/together' },
  { title: 'Calendar', subtitle: 'Events & trainings', accent: colors.navy, route: '/calendar' },
  { title: 'Who Are We', subtitle: 'Faith & staff', accent: colors.gold, external: 'https://uccny.org/about' },
  { title: 'Resources', subtitle: 'Training & justice', accent: colors.navy, external: 'https://uccny.org/resources' },
  { title: 'Search & Call', subtitle: 'Ministers & churches', accent: colors.gold, external: 'https://uccny.org/search-and-call' },
  { title: 'NY School of Ministry', subtitle: 'NYSOM', accent: colors.navy, external: 'https://uccny.org/sample-page/nysom' },
];

export default function Home() {
  const open = (t: (typeof TILES)[number]) => {
    if (t.route) router.push(t.route as any);
    else if (t.external) Linking.openURL(t.external);
  };

  return (
    <SafeAreaView style={global.screen} edges={['top']}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={s.hero}>
          <Text style={s.heroEyebrow}>New York Conference · UCC</Text>
          <Text style={s.heroTitle}>No matter who you are, you are welcome here.</Text>
          <Text style={s.heroSub}>
            A 2,000-year-old faith that never stops growing. Every person, every
            part of life's journey — no checklist, no exceptions.
          </Text>
        </View>

        <View style={s.grid}>
          {/* Featured event spans full width */}
          <View style={s.wideCell}>
            <Pressable
              style={s.feature}
              onPress={() => Linking.openURL('https://uccny.org/annualmeeting')}
            >
              <View style={s.featureScrim}>
                <Text style={s.featureEyebrow}>Featured</Text>
                <Text style={s.featureTitle}>Annual Meeting 2026</Text>
              </View>
            </Pressable>
          </View>

          {TILES.map((t) => (
            <View key={t.title} style={s.cell}>
              <GridCard title={t.title} subtitle={t.subtitle} accent={t.accent} onPress={() => open(t)} />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
