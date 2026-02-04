'use client';

import { useEffect, useRef } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Style, Circle, Fill, Stroke, Text } from 'ol/style';
import Overlay from 'ol/Overlay';
import 'ol/ol.css';

export default function OpenLayersMap({
    center = [107.6191, -6.9175], // [lng, lat] - Bandung
    zoom = 13,
    markers = [],
    height = '500px',
    onMarkerClick = null
}) {
    const mapRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const popupRef = useRef(null);
    const popupCloserRef = useRef(null);
    const overlayRef = useRef(null);
    const vectorLayerRef = useRef(null);
    const onMarkerClickRef = useRef(onMarkerClick);

    // Update click handler ref when it changes
    useEffect(() => {
        onMarkerClickRef.current = onMarkerClick;
    }, [onMarkerClick]);

    // Initialize map ONCE
    useEffect(() => {
        if (!mapRef.current || mapInstanceRef.current) return;

        // Create popup overlay
        const overlay = new Overlay({
            element: popupRef.current,
            autoPan: {
                animation: { duration: 250 }
            }
        });
        overlayRef.current = overlay;

        // Initialize map
        const map = new Map({
            target: mapRef.current,
            layers: [
                new TileLayer({
                    source: new OSM()
                })
            ],
            overlays: [overlay],
            view: new View({
                center: fromLonLat(center),
                zoom: zoom
            })
        });

        mapInstanceRef.current = map;

        // Popup closer handler
        if (popupCloserRef.current) {
            popupCloserRef.current.onclick = () => {
                overlay.setPosition(undefined);
                popupCloserRef.current.blur();
                return false;
            };
        }

        return () => {
            map.setTarget(undefined);
            mapInstanceRef.current = null;
        };
    }, []); // Only run once!

    // Update markers separately
    useEffect(() => {
        const map = mapInstanceRef.current;
        if (!map) return;

        // Remove old vector layer if exists
        if (vectorLayerRef.current) {
            map.removeLayer(vectorLayerRef.current);
        }

        // Add new markers
        if (markers.length > 0) {
            const features = markers.map(marker => {
                const feature = new Feature({
                    geometry: new Point(fromLonLat([marker.lng, marker.lat])),
                    data: marker
                });

                // Custom marker style
                feature.setStyle(new Style({
                    image: new Circle({
                        radius: 10,
                        fill: new Fill({ color: '#10b981' }),
                        stroke: new Stroke({ color: '#fff', width: 3 })
                    }),
                    text: new Text({
                        text: marker.label || '',
                        offsetY: -25,
                        font: '14px sans-serif',
                        fill: new Fill({ color: '#1f2937' }),
                        stroke: new Stroke({ color: '#fff', width: 3 }),
                        backgroundFill: new Fill({ color: 'rgba(255, 255, 255, 0.9)' }),
                        padding: [2, 4, 2, 4]
                    })
                }));

                return feature;
            });

            const vectorSource = new VectorSource({ features });
            const vectorLayer = new VectorLayer({ source: vectorSource });
            map.addLayer(vectorLayer);
            vectorLayerRef.current = vectorLayer;
        }
    }, [markers]);

    // Handle map clicks (set once, use ref for callback)
    useEffect(() => {
        const map = mapInstanceRef.current;
        const overlay = overlayRef.current;
        if (!map || !overlay) return;

        const handleClick = (evt) => {
            const feature = map.forEachFeatureAtPixel(evt.pixel, (f) => f);

            if (feature) {
                const coords = feature.getGeometry().getCoordinates();
                const data = feature.get('data');

                // Call custom click handler if provided
                if (onMarkerClickRef.current) {
                    onMarkerClickRef.current(data);
                }

                // Show popup if popup content exists
                if (data.popup && popupRef.current) {
                    const popupContent = popupRef.current.querySelector('.popup-content');
                    if (popupContent) {
                        popupContent.innerHTML = data.popup;
                    }
                    overlay.setPosition(coords);
                }
            } else {
                overlay.setPosition(undefined);
            }
        };

        const handlePointerMove = (evt) => {
            const pixel = map.getEventPixel(evt.originalEvent);
            const hit = map.hasFeatureAtPixel(pixel);
            map.getTarget().style.cursor = hit ? 'pointer' : '';
        };

        map.on('click', handleClick);
        map.on('pointermove', handlePointerMove);

        return () => {
            map.un('click', handleClick);
            map.un('pointermove', handlePointerMove);
        };
    }, []); // Only set up listeners once!

    return (
        <div className="relative w-full" style={{ height }}>
            <div ref={mapRef} className="w-full h-full rounded-xl overflow-hidden border border-gray-200" />

            {/* Popup overlay */}
            <div
                ref={popupRef}
                className="ol-popup bg-white rounded-lg shadow-lg border border-gray-200 min-w-[200px]"
                style={{ display: 'none' }}
            >
                <button
                    ref={popupCloserRef}
                    className="ol-popup-closer absolute top-2 right-2 text-gray-400 hover:text-gray-600 cursor-pointer bg-transparent border-none text-xl leading-none"
                    aria-label="Close"
                >
                    ×
                </button>
                <div className="popup-content p-4 pt-6"></div>
            </div>
        </div>
    );
}
