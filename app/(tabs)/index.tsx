import { ScrollView, View, Text, Pressable, Linking, Image } from 'react-native';
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
  image: any;
  icon: string;
  route?: string;
  external?: string;
}[] = [
  { title: 'Together in Love', subtitle: 'Love, Community, & Connection', accent: colors.til.rose, icon: 'heart', image: require('../../assets/cards/together.jpg'), route: '/together' },
  { title: 'Calendar', subtitle: 'Events & Trainings', accent: colors.gold, icon: 'calendar', image: require('../../assets/cards/calendar.jpg'), route: '/calendar' },
  { title: 'Who Are We', subtitle: 'Faith & Staff', accent: colors.til.community, icon: 'people', image: require('../../assets/cards/who.jpg'), external: 'https://uccny.org/about' },
  { title: 'Resources', subtitle: 'Training & Justice', accent: colors.til.connection, icon: 'book', image: require('../../assets/cards/resources.jpg'), external: 'https://uccny.org/resources' },
  { title: 'Search & Call', subtitle: 'Ministers & Churches', accent: '#4F46E5', icon: 'search', image: require('../../assets/cards/search.jpg'), external: 'https://uccny.org/search-and-call' },
  { title: 'NY School of Ministry', subtitle: 'NYSOM', accent: colors.til.love, icon: 'school', image: require('../../assets/cards/nysom.jpg'), external: 'https://uccny.org/sample-page/nysom' },
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
          {/* Featured event — the Annual Meeting banner */}
          <View style={s.wideCell}>
            <Pressable
              style={s.feature}
              onPress={() => Linking.openURL('https://uccny.org/annualmeeting')}
              accessibilityRole="button"
              accessibilityLabel="Annual Meeting: Revive and Resist, Silver Bay YMCA, Lake George"
            >
              <Image
                source={require('../../assets/cards/annual-meeting.png')}
                style={s.featureImage}
                resizeMode="cover"
              />
              <View style={s.featureOverlay}>
                <Text style={s.featureEyebrow}>Featured</Text>
              </View>
            </Pressable>
          </View>

          {TILES.map((t) => (
            <View key={t.title} style={s.cell}>
              <GridCard title={t.title} subtitle={t.subtitle} accent={t.accent} image={t.image} icon={t.icon} onPress={() => open(t)} />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}