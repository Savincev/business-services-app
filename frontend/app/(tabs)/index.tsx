import { Dimensions, StyleSheet } from 'react-native';

import Service from '../../components/Service';
import { ScrollView, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SeparatorComponent from '../../components/Separator';

export default function ServicesScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Сервисы</Text>
      <View style={styles.block}>
        <Service window='/modal' icon="ios-pie-chart-outline" text='Дэшборд' color="#24d366" />
        <SeparatorComponent />
        <Service window='/modal' icon="ios-stats-chart-outline" text='Продажи' color="#fec700" />
        <SeparatorComponent />
        <Service window='/modal' icon="ios-globe-outline" text='Маркетинг' color="#0dac9f" />
        <SeparatorComponent />
        <Service window='/modal' icon="ios-file-tray-full-outline" text='Бухгалтер' color="#007aff" />
        <SeparatorComponent />
        <Service window='/modal' icon="ios-briefcase-outline" text='Юрист' color="#fe3c30" />
        <SeparatorComponent />
        <Service window='/modal' icon="ios-boat-outline" text='Логистика' color="#36a8db" />
        <SeparatorComponent />
        <Service window='/modal' icon="ios-wallet-outline" text='Финансовые услуги' color="#4bd764" />
        <SeparatorComponent />
        <Service window='contacts' icon="ios-chatbubbles-outline" text='Контакты клуба' color="#007aff" />
        <SeparatorComponent />
        <Service window='/modal' icon="ios-analytics-outline" text='Инвестиции' color="#35c759" />
        <SeparatorComponent />
        <Service window='/modal' icon="ios-information-circle-outline" text='Эдвайзеры' color="#ff2c55" />
        <SeparatorComponent />
        <Service window='/modal' icon="ios-people-outline" text='Мероприятия' color="#0dac9f" />
        <SeparatorComponent />
        <Service window='/modal' icon="ios-airplane-outline" text='Трансферы' color="#36a8db" />
        <SeparatorComponent />
        <Service window='/modal' icon="ios-business-outline" text='Бизнес залы' color="#007aff" />
      </View>
      {/* <Service window='/modal' icon='pie-chart' text='Дэшборд' />
      <Service window='/modal' icon='line-chart' text='Продажи' />
      <Service window='/modal' icon='shopping-cart' text='Маркетинг' />
      <Service window='/modal' icon='money' text='Бухгалтер' />
      <Service window='/modal' icon='legal' text='Юрист' />
      <Service window='/modal' icon='truck' text='Логистика' />
      <Service window='/modal' icon='credit-card' text='Фин. услуги' />
      <Service window='/contacts' icon='id-card-o' text='Контакты' />
      <Service window='/modal' icon='bar-chart' text='Инвестиции' />
      <Service window='/modal' icon='group' text='Эдвайзеры' />
      <Service window='/modal' icon='calendar' text='Мероприятия' />
      <Service window='/modal' icon='plane' text='Трансферы' />
      <Service window='/modal' icon='suitcase' text='Бизнес залы' /> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f2f6',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: Dimensions.get('screen').width - 280,
  },
  block: {
    width: '100%',
    paddingVertical: 10,
    gap: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
});
