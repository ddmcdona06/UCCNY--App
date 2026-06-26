/**
 * events.ts — event data, now wired to the live website.
 *
 * The admin edits events in WordPress (The Events Calendar). This app READS
 * them from the public REST endpoint — confirmed installed on uccny.org
 * (tec-api-version: v1). No authentication needed for public events.
 *
 * Strategy: try the live API; if it fails (offline, or a host/security plugin
 * has disabled the REST route), fall back to the seed list so the calendar
 * never shows up empty.
 */

export type ChurchEvent = {
  id: string;
  title: string;
  start: string;     // ISO 8601
  end?: string;
  location?: string;
  url?: string;
};

const EVENTS_ENDPOINT = 'https://uccny.org/wp-json/tribe/events/v1/events';

// Offline / fallback seed.
const SEED: ChurchEvent[] = [
  { id: 'am26', title: 'Annual Meeting 2026', start: '2026-10-17T09:00:00-04:00', location: 'Syracuse, NY', url: 'https://uccny.org/annualmeeting' },
  { id: 'boundary-jul', title: 'Boundary Training', start: '2026-07-15T13:00:00-04:00', location: 'Online', url: 'https://uccny.org/boundary-training' },
  { id: 'crmt-aug', title: 'Cultural Responsive Ministry Training', start: '2026-08-05T10:00:00-04:00', location: 'Online', url: 'https://uccny.org/crmt' },
];

// TEC returns "YYYY-MM-DD HH:MM:SS". Prefer the UTC field when present.
function toISO(utc?: string, local?: string): string {
  if (utc) return utc.replace(' ', 'T') + 'Z';
  if (local) return local.replace(' ', 'T');
  return new Date().toISOString();
}

export async function getEvents(): Promise<ChurchEvent[]> {
  const today = new Date().toISOString().slice(0, 10); // only upcoming
  try {
    const res = await fetch(`${EVENTS_ENDPOINT}?per_page=50&start_date=${today}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    const events = Array.isArray(json?.events) ? json.events : [];
    if (events.length === 0) return SEED;

    return events
      .map((e: any): ChurchEvent => ({
        id: String(e.id),
        title: typeof e.title === 'string' ? e.title : 'Event',
        start: toISO(e.utc_start_date, e.start_date),
        end: e.utc_end_date || e.end_date ? toISO(e.utc_end_date, e.end_date) : undefined,
        // venue can be an object, an empty array, or absent
        location: e?.venue && !Array.isArray(e.venue) ? e.venue.venue : undefined,
        url: e.url,
      }))
      .sort((a: ChurchEvent, b: ChurchEvent) => +new Date(a.start) - +new Date(b.start));
  } catch {
    return SEED.sort((a, b) => +new Date(a.start) - +new Date(b.start));
  }
}
