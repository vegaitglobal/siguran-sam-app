import { ContactListWidget } from '@/shared/components';
import Label from '@/shared/components/label';
import React, { useState } from 'react';
import { Pressable, PressableProps, Text, View } from 'react-native';
import {
  NavigationState,
  Route,
  SceneMap,
  SceneRendererProps,
  TabView,
} from 'react-native-tab-view';
import { styles } from './contacts-screen-tabs.style';
import { MessageWidget } from './message-widget';

const ContactsRoute = () => (
  <View style={styles.routeWrapper}>
    <Label style={styles.routeLabel}>Vaši sigurnosni kontakti</Label>
    <ContactListWidget />
  </View>
);

const MessageRoute = () => (
  <View style={styles.routeWrapper}>
    <Label style={styles.routeLabel}>Vaša sigurnosna poruka</Label>
    {/* TODO check from env inf MessageWidget should be disabled */}
    <MessageWidget readOnly />
  </View>
);

const routes: Route[] = [
  { key: 'contacts', title: 'KONTAKTI' },
  { key: 'messages', title: 'PORUKA' },
];

export const ContactsScreenTabs = () => {
  const [index, setIndex] = useState(0);

  return (
    <View style={styles.wrapper}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={SceneMap({
          contacts: ContactsRoute,
          messages: MessageRoute,
        })}
        onIndexChange={setIndex}
        renderTabBar={(props) => <TabBar onTabChange={setIndex} {...props} />}
        lazy
      />
    </View>
  );
};

type TabBarProps = SceneRendererProps & {
  navigationState: NavigationState<Route>;
  onTabChange: (i: number) => void;
};

const TabBar = ({ navigationState: { routes, index }, onTabChange }: TabBarProps) => {
  return (
    <View style={styles.tabBarWrapper}>
      <View style={styles.tabBar}>
        {routes.map(({ key, title }, i) => (
          <TabBarItem
            key={key}
            title={title}
            selected={i === index}
            onPress={() => onTabChange(i)}
          />
        ))}
      </View>
    </View>
  );
};

interface TabBarItemProps extends PressableProps {
  selected?: boolean;
  title?: string;
}

const TabBarItem = ({ title, selected, ...props }: TabBarItemProps) => {
  const calcStyle = (style: Record<string, unknown>) => [style, selected && styles.selected];
  return (
    <Pressable style={calcStyle(styles.tabBarItem)} {...props}>
      <Text style={calcStyle(styles.tabBarItemText)}>{title}</Text>
    </Pressable>
  );
};
