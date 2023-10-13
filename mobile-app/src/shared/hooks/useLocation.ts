import * as Location from "expo-location";
import { useEffect, useState } from "react";

const useLocation = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setIsAllowed(false);
        return;
      }
      setIsAllowed(true);

      let lastKnownLocation = await Location.getLastKnownPositionAsync({});
      setLocation(lastKnownLocation);
      setIsLoading(false);
    })();
  }, []);

  return {
    location,
    isLoading,
    isAllowed,
  };
};

export default useLocation;
