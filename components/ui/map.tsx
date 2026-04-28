import React from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import MapView, { Marker, Polyline, UrlTile } from 'react-native-maps';

import { Colors } from '@/constants/Colors';
import { Radius } from '@/constants/Spacing';

export type LatLngExpression = readonly [number, number];

interface MapProps {
  center: LatLngExpression;
  zoom?: number;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  interactive?: boolean;
}

interface MapTileLayerProps {
  urlTemplate?: string;
  tileSize?: number;
  shouldReplaceMapContent?: boolean;
}

interface MapMarkerProps {
  coordinate: LatLngExpression;
  title?: string;
  description?: string;
  children?: React.ReactNode;
}

interface MapPolylineProps {
  coordinates: LatLngExpression[];
  strokeColor?: string;
  strokeWidth?: number;
  lineDashPattern?: number[];
}

const DEFAULT_ZOOM = 13;

function zoomToDelta(zoom: number) {
  const longitudeDelta = 360 / Math.pow(2, zoom);
  const latitudeDelta = longitudeDelta;

  return { latitudeDelta, longitudeDelta };
}

export function Map({
  center,
  zoom = DEFAULT_ZOOM,
  style,
  children,
  interactive = false,
}: MapProps) {
  const [latitude, longitude] = center;
  const delta = zoomToDelta(zoom);

  return (
    <View style={[styles.wrapper, style]}>
      <MapView
        style={StyleSheet.absoluteFill}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: delta.latitudeDelta,
          longitudeDelta: delta.longitudeDelta,
        }}
        scrollEnabled={interactive}
        zoomEnabled={interactive}
        rotateEnabled={false}
        pitchEnabled={false}
        toolbarEnabled={false}
        showsCompass={false}
        showsScale={false}
        showsBuildings={false}
        showsTraffic={false}
      >
        {children}
      </MapView>

      <View pointerEvents="none" style={styles.overlay} />
    </View>
  );
}

export function MapTileLayer({
  urlTemplate = 'https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
  tileSize = 256,
  shouldReplaceMapContent = true,
}: MapTileLayerProps) {
  return (
    <UrlTile
      urlTemplate={urlTemplate}
      tileSize={tileSize}
      maximumZ={19}
      shouldReplaceMapContent={shouldReplaceMapContent}
    />
  );
}

export function MapMarker({
  coordinate,
  title,
  description,
  children,
}: MapMarkerProps) {
  const [latitude, longitude] = coordinate;

  return (
    <Marker
      coordinate={{ latitude, longitude }}
      title={title}
      description={description}
      tracksViewChanges={false}
    >
      {children}
    </Marker>
  );
}

export function MapPolyline({
  coordinates,
  strokeColor = Colors.primary,
  strokeWidth = 4,
  lineDashPattern,
}: MapPolylineProps) {
  return (
    <Polyline
      coordinates={coordinates.map(([latitude, longitude]) => ({ latitude, longitude }))}
      strokeColor={strokeColor}
      strokeWidth={strokeWidth}
      lineDashPattern={lineDashPattern}
    />
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: Radius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.lg,
    backgroundColor: 'transparent',
  },
});
