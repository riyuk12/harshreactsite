import { useState, useCallback } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const containerStyle = {
	width: "100%",
	height: "100%",
};

const center = {
	lat: 26.137485,
	lng: 91.824573,
};

function Map({ className }) {
	const { isLoaded } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey: "AIzaSyD5PKdUF_C_bdpefWnX4xcVwVfOYczgSXA",
	});

	const [map, setMap] = useState(null);

	const onLoad = useCallback(function callback(map) {
		const bounds = new window.google.maps.LatLngBounds(center);
		map.fitBounds(bounds);
		setMap(map);
	}, []);

	const onUnmount = useCallback(function callback(map) {
		setMap(null);
	}, []);

	return isLoaded ? (
		<p className={className}>
			<GoogleMap
				mapContainerStyle={containerStyle}
				center={center}
				zoom={10}
				onLoad={onLoad}
				onUnmount={onUnmount}
			>
				<Marker position={center} />
			</GoogleMap>
		</p>
	) : (
		<></>
	);
}

export default Map;
