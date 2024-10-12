import { useEffect, useRef } from 'react';

import { AppState } from 'react-native';

interface UseAppStateChangeProps {
  /**
   * Called when app comes to foreground
   * @docs https://reactnative.dev/docs/0.73/appstate#app-states
   */
  onAppForeground?: () => void;

  /**
   * Called when app goes to background
   * @docs https://reactnative.dev/docs/0.73/appstate#app-states
   */
  onAppBackground?: () => void;

  /**
   * Called when app becomes inactive
   * @docs https://reactnative.dev/docs/0.73/appstate#app-states
   */
  onAppInactive?: () => void;
}

export const useAppStateChange = ({
  onAppForeground,
  onAppBackground,
  onAppInactive,
}: UseAppStateChangeProps) => {
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (appState.current !== 'active' && nextAppState === 'active') {
        onAppForeground?.();
        appState.current = nextAppState;
        return;
      }

      if (appState.current !== 'background' && nextAppState === 'background') {
        onAppBackground?.();
        appState.current = nextAppState;
        return;
      }

      if (appState.current !== 'inactive' && nextAppState === 'inactive') {
        onAppInactive?.();
        appState.current = nextAppState;
      }
    });

    return () => subscription.remove();
  }, [onAppForeground, onAppBackground, onAppInactive]);
};
