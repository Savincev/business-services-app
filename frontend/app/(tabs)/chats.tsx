/*
    Screen with list of contacts
*/

import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  Keyboard,
  Dimensions,
} from 'react-native';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { Image } from 'expo-image';
import { useNavigation } from '@react-navigation/native';
import filter from 'lodash.filter';
import { useState, useEffect } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import SeparatorComponent from '../../components/Separator';
import {
  storeContacts,
  storeCompanies,
  storeDepartments,
  sortContacts,
} from '../../store/contactsSlice';

const Contacts = () => {
  const dispatch = useAppDispatch();
  const allContacts = useAppSelector((state) => state.contacts.allContacts);
  const sortedContacts = useAppSelector((state) => state.contacts.sortedContacts);
  const filteredContacts = useAppSelector((state) => state.contacts.filteredContacts);
  const allCompanies = useAppSelector((state) => state.contacts.allCompanies);

  const [error, setError] = useState(null)
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    setLoading(true);
    fetchCompanies();
    fetchDepartments();
    fetchContacts();
  }, [filteredContacts])

  const onRefresh = () => {
    setRefreshing(true);
    fetchCompanies();
    fetchDepartments();
    fetchContacts();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const fetchDepartments = async () => {
    try {
      const response = await fetch(process.env.EXPO_PUBLIC_IP_ADRESS + ":8000/api/departments");
      const jsonData = await response.json();
      dispatch(storeDepartments(jsonData));
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }

  const fetchCompanies = async () => {
    try {
      const response = await fetch(process.env.EXPO_PUBLIC_IP_ADRESS + ":8000/api/companies");
      const jsonData = await response.json();
      dispatch(storeCompanies(jsonData));
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  }

  const fetchContacts = async () => {
    try {
      const response = await fetch(process.env.EXPO_PUBLIC_IP_ADRESS + ":8000/api/contacts");
      const jsonData = await response.json();
      if (filteredContacts.length > 0) {
        dispatch(storeContacts(filteredContacts));
        dispatch(sortContacts(filteredContacts));
      }
      else {
        dispatch(storeContacts(jsonData));
        dispatch(sortContacts(jsonData));
      }
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }

  const handleSearch = (query: string) => {
    setQuery(query);
    const filteredData = filter(allContacts, (user) => {
      return contains(user, query);
    });
    dispatch(sortContacts(filteredData));
  }

  type contactType = {
    name: string,
    company: string,
    department: string,
    revenue: number,
    city: string
  }

  const contains = ({ name, company, department, city }: contactType, query: string) => {
    if (name.includes(query) ||

      // doesn't work 

      // company.includes(query) || 
      // department.includes(query) ||

      city.includes(query)) {
      return true;
    } else {
      return false;
    }
  }

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }

  if (error) {
    return (
      <ScrollView refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }>
        <View style={{ marginTop: 20, alignItems: 'center' }}
        >
          <Text>
            Please check your internet connection
          </Text>
        </View>

      </ScrollView>
    );
  }

  return (
    <Pressable style={styles.container} onPress={Keyboard.dismiss}>
      <FlatList
        ItemSeparatorComponent={() => (
          <View style={{ backgroundColor: '#eee', height: 1, width: '82%', alignSelf: 'flex-end' }} />
        )}
        data={sortedContacts}
        style={styles.items}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        ListHeaderComponent={
          <View>
            <Text style={styles.title}>Чаты</Text>
            <View style={styles.header}>
              <View style={styles.search}>
                <Ionicons
                  name="ios-search"
                  size={18}
                  color="#8e8e8e"
                />
                <TextInput
                  style={{ width: "100%", paddingHorizontal: 5, fontSize: 16 }}
                  placeholder='Search'
                  placeholderTextColor="#8e8e8e"
                  clearButtonMode='always'
                  autoCorrect={false}
                  value={query}
                  onChangeText={(query) => handleSearch(query)}
                />
              </View>
              <Pressable onPress={() => navigation.navigate('filters')}>
                <Ionicons
                  name='ios-filter'
                  size={16}
                  color="#027bfc"
                />
              </Pressable>
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <Pressable
            onPress={() => {
              navigation.navigate('chat', {
                name: item.name,
                company: allCompanies.find(i => i.id === item.company_id).title,
              })
            }}
            style={styles.itemContainer}>
            <Image style={styles.itemImage} source={'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fzultimate.com%2Fwp-content%2Fuploads%2F2019%2F12%2Fdefault-profile.png&f=1&nofb=1&ipt=80ebd8f0a944ca70c7c35d19626e7b18d12ddb312667129d47e8a6039945a91e&ipo=images'} />
            <View style={{ gap: 4 }}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemCompany}>{allCompanies.find(i => i.id === item.company_id).title}</Text>
            </View>
          </Pressable>
        )}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    paddingHorizontal: 20,
    fontSize: 36,
    fontWeight: 'bold',
    marginTop: Dimensions.get('screen').width - 280,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 20,
  },
  items: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'flex-end',
  },
  search: {
    width: '90%',
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 20,
    paddingLeft: 8,
    borderRadius: 10,
    color: 'black',
    backgroundColor: '#eee',
  },
  itemContainer: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 20,
    gap: 10,
  },
  itemImage: {
    width: 45,
    height: 45,
    borderRadius: 30,
  },
  itemName: {
    fontSize: 20,
  },
  itemCompany: {
    fontSize: 15,
    opacity: .7,
  },
});

export default Contacts;