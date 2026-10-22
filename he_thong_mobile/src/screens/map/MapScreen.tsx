import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import MapView, { Circle, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import ScreenHeader from '../../components/ScreenHeader';
import Button from '../../components/Button';
import StateView from '../../components/StateView';
import { gpsApi } from '../../api/endpoints';
import { useLang } from '../../context/LangContext';
import { DEFAULT_REGION } from '../../config/env';
import { GpsZone, NearbyResult } from '../../types';
import { speak, stopSpeaking } from '../../utils/speech';
import { colors } from '../../theme';

type Coord = { latitude: number; longitude: number };

export default function MapScreen({ navigation }: any) {
  const { lang } = useLang();
  const mapRef = useRef<MapView>(null);
  const spokenZone = useRef<number | null>(null);

  const [zones, setZones] = useState<GpsZone[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [permission, setPermission] = useState<'pending' | 'granted' | 'denied'>('pending');
  const [position, setPosition] = useState<Coord | null>(null);
  const [simulate, setSimulate] = useState(false);
  const [nearby, setNearby] = useState<NearbyResult | null>(null);
  const [autoPlay, setAutoPlay] = useState(false);

  // Tai cac vung GPS tu backend
  const loadZones = () => gpsApi.list().then((z) => setZones(z ?? [])).catch((e) => setError(e.message));
  useEffect(() => { loadZones(); }, []);

  // Theo doi vi tri that cua nguoi dung
  useEffect(() => {
    let sub: Location.LocationSubscription | undefined;
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') { setPermission('denied'); return; }
      setPermission('granted');
      sub = await Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, distanceInterval: 1 },
        (loc) => setPosition({ latitude: loc.coords.latitude, longitude: loc.coords.longitude }),
      );
    })();
    return () => sub?.remove();
  }, []);

  // Che do mo phong: dat vi tri vao giua vung GPS dau tien de kiem tra du lieu ngay trong nha
  const effective = simulate && zones[0] ? { latitude: zones[0].latitude, longitude: zones[0].longitude } : position;

  // Moi lan vi tri doi, hoi backend xem da vao vung nao chua
  useEffect(() => {
    if (!effective) return;
    gpsApi.nearby(effective.latitude, effective.longitude, lang)
      .then((r) => setNearby(r))
      .catch((e) => setError(e.message));
  }, [effective?.latitude, effective?.longitude, lang]); // eslint-disable-line

  // Tu phat thuyet minh mot lan khi vua vao vung
  useEffect(() => {
    if (!nearby) { spokenZone.current = null; return; }
    if (autoPlay && spokenZone.current !== nearby.zone.id) {
      spokenZone.current = nearby.zone.id;
      const a = nearby.animal;
      const text = a.narration ?? [a.name, a.description].filter(Boolean).join('. ');
      if (text) speak(text, a.lang);
    }
  }, [nearby?.zone.id, autoPlay]); // eslint-disable-line

  useEffect(() => () => stopSpeaking(), []);

  const initial = zones[0] ? { ...DEFAULT_REGION, latitude: zones[0].latitude, longitude: zones[0].longitude } : DEFAULT_REGION;

  return (
    <View style={styles.screen}>
      <ScreenHeader />
      <View style={styles.titleRow}>
        <Text style={styles.title}>Bản đồ</Text>
        <Text style={styles.gps}>{simulate ? 'GPS mô phỏng' : permission === 'granted' ? 'GPS thật' : 'Chưa có GPS'}</Text>
      </View>

      <MapView ref={mapRef} style={styles.map} initialRegion={initial} showsUserLocation={permission === 'granted'} key={zones.length}>
        {zones.map((z) => (
          <React.Fragment key={z.id}>
            <Circle center={z} radius={z.radiusM} strokeColor={colors.primary} fillColor="rgba(35,92,69,0.2)" />
            <Marker coordinate={z} title={z.animal.name} description={z.animal.zone?.name} />
          </React.Fragment>
        ))}
        {simulate && effective && <Marker coordinate={effective} title="Vị trí mô phỏng" pinColor="blue" />}
      </MapView>

      <View style={styles.panel}>
        {permission === 'denied' && <Text style={styles.warn}>Quyền vị trí bị từ chối. Dùng "GPS mô phỏng" bên dưới để thử.</Text>}
        <StateView error={error} onRetry={() => { setError(null); loadZones(); }} />
        {nearby ? (
          <View>
            <Text style={styles.near}>Bạn ở gần {nearby.animal.name} · {nearby.distanceM.toFixed(1)} m</Text>
            <Text style={styles.zone}>{nearby.animal.zoneName} · {nearby.animal.className}</Text>
            <View style={styles.actions}>
              <Button title="Xem thông tin" variant="outline" style={{ flex: 1 }}
                onPress={() => navigation.navigate('Animals', { screen: 'AnimalDetail', params: { id: nearby.animal.id } })} />
              <Button title="Nghe thuyết minh" style={{ flex: 1 }}
                onPress={() => navigation.navigate('Animals', { screen: 'AnimalDetail', params: { id: nearby.animal.id, autoPlay: true } })} />
            </View>
          </View>
        ) : <Text style={styles.muted}>Chưa vào vùng động vật nào ({zones.length} vùng đang hoạt động).</Text>}

        <View style={styles.switchRow}><Text style={styles.switchText}>GPS mô phỏng (vào vùng đầu tiên)</Text><Switch value={simulate} onValueChange={setSimulate} /></View>
        <View style={styles.switchRow}><Text style={styles.switchText}>Tự phát thuyết minh</Text><Switch value={autoPlay} onValueChange={setAutoPlay} /></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', paddingHorizontal: 24, paddingBottom: 8 },
  title: { fontSize: 28, fontWeight: '800', color: colors.primaryDark },
  gps: { color: colors.primary, fontSize: 12 },
  map: { flex: 1 },
  panel: { padding: 16, backgroundColor: colors.bg },
  near: { fontSize: 18, fontWeight: '700', color: colors.primaryDark },
  zone: { color: colors.primary, marginTop: 4, marginBottom: 12 },
  actions: { flexDirection: 'row', gap: 12 },
  muted: { color: colors.muted },
  warn: { color: colors.danger, marginBottom: 8 },
  switchRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
  switchText: { color: colors.text, fontSize: 15 },
});
