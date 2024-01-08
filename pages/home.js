import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import io from 'socket.io-client'; // Import Socket.io client library

const Home = () => {
  const [activeSection, setActiveSection] = useState('requests');
  const [statusImageSource, setStatusImageSource] = useState([]);
  const [instaIds, setInstaIds] = useState([]);
  const [adCount, setAdCount] = useState(10);

  const handleIncrement = () => {
    const updatedCount = adCount + 1;
    if (updatedCount <= 20) {
      setAdCount(updatedCount);
    }
  };

  const handleDecrement = () => {
    const updatedCount = adCount - 1;
    if (updatedCount >= 0) {
      setAdCount(updatedCount);
    }
  };

  useEffect(() => {
    // Fetch InstaId data when the component mounts
    fetchInstaIds();

    // Connect to Socket.io server
    const socket = io('https://gulak-app.onrender.com');

    // Listen for real-time updates
    socket.on('newData', newData => {
      setInstaIds(prevData => [
        ...prevData,
        {...newData, statusImageSource: require('../assests/close.png')},
      ]);
    });

    return () => {
      // Disconnect from the Socket.io server when the component unmounts
      socket.disconnect();
    };
  }, []);

  const fetchInstaIds = async () => {
    try {
      const response = await fetch('https://gulak-app.onrender.com/urls');
      const data = await response.json();
      const instaIdsWithStatus = data.map(item => ({
        ...item,
        statusImageSource: require('../assests/close.png'),
      }));

      setInstaIds(instaIdsWithStatus);
    } catch (error) {
      console.error('Error fetching InstaIds:', error);
    }
  };

  const handleStatusChange = index => {
    // Update the statusImageSource for the specific item at the given index
    setInstaIds(prevData => {
      const newData = [...prevData];
      newData[index].statusImageSource = require('../assests/check.png');
      return newData;
    });
  };

  const extractNameFromUrl = url => {
    const parts = url.split('/');
    return parts[parts.length - 1];
  };

  return (
    <LinearGradient
      style={styles.radialGradient}
      colors={['#FD5', '#FD5', '#FF543E', '#DD4282', '#C837AB']}
      start={{x: -0.0814, y: 1.1461}}
      end={{x: 0.7, y: 0.8127}}>
      <ScrollView>
        <View style={{flex: 1}}>
          <Text
            style={{
              fontSize: 30,
              color: 'white',
              textAlign: 'center',
              marginTop: 20,
            }}>
            Gulak - Admin
          </Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginTop: 30,
            }}>
            <TouchableOpacity onPress={() => setActiveSection('requests')}>
              <View
                style={[
                  styles.tabButton,
                  activeSection === 'requests' && styles.activeTab,
                ]}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: hp(2.3),
                    color: activeSection === 'requests' ? 'black' : 'white',
                    fontWeight: 'bold',
                  }}>
                  Requests
                </Text>
              </View>
            </TouchableOpacity>
            <View style={styles.line} />
            <TouchableOpacity onPress={() => setActiveSection('settings')}>
              <View
                style={[
                  styles.tabButton,
                  activeSection === 'settings' && styles.activeTab,
                ]}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: hp(2.3),
                    color: activeSection === 'settings' ? 'black' : 'white',
                    fontWeight: 'bold',
                  }}>
                  Ad Settings
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          {activeSection === 'requests' && (
            <View style={{marginHorizontal: wp(5)}}>
              <View style={styles.tableRow}>
                <Text style={styles.tableHeading}>InstaId</Text>
                <Text style={styles.tableHeading}>Requests</Text>
                <Text style={styles.tableHeading}>Status</Text>
              </View>

              {instaIds.map((instaId, index) => (
                <View key={instaId._id || index} style={styles.tableRow}>
                  <TouchableOpacity
                    onPress={() =>
                      Linking.openURL(
                        `https://www.instagram.com/${instaId.url}`,
                      )
                    }>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={styles.tableData}>
                      {extractNameFromUrl(instaId.url)}
                    </Text>
                  </TouchableOpacity>
                  <Text style={[styles.tableData, {color: 'black'}]}>
                    1k followers
                  </Text>
                  <TouchableOpacity onPress={() => handleStatusChange(index)}>
                    <Image
                      style={styles.statusImage}
                      source={instaId.statusImageSource}
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}

          {activeSection === 'settings' && (
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  gap: 10,
                  padding: 15,
                  backgroundColor: 'white',
                  marginTop: 20,
                  justifyContent: 'center',
                  borderRadius: 10,
                }}>
                <Text style={{color: 'black', fontSize: hp(2.5)}}>
                  Treasure Game Ads Frequency
                </Text>
                <TouchableOpacity onPress={handleDecrement}>
                  <Image source={require('../assests/minus.png')} />
                </TouchableOpacity>
                <Text style={{color: 'black', fontSize: hp(2.5)}}>
                  {adCount}
                </Text>
                <TouchableOpacity onPress={handleIncrement}>
                  <Image source={require('../assests/plus.png')} />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  radialGradient: {
    flex: 1,
  },
  tabButton: {
    width: wp(40),
    height: wp(10),
    justifyContent: 'center',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  activeTab: {
    backgroundColor: '#FFE046',
  },
  line: {
    height: 3,
    width: wp(86.5),
    backgroundColor: '#FFE046',
    position: 'absolute',
    marginTop: 40,
    left: wp(7), // Adjust the left position based on the tab width
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: hp(1),
    paddingVertical: hp(1),
    paddingHorizontal: wp(2),
    backgroundColor: 'white',
    borderRadius: 10,
  },
  tableHeading: {
    flex: 1,
    fontSize: hp(2),
    fontWeight: 'bold',
    color: 'rgba(223, 67, 126, 1)',
    textAlign: 'center',
  },
  tableData: {
    flex: 1,
    fontSize: hp(2),
    color: 'blue',
    textAlign: 'center',
    alignSelf: 'center',
    maxWidth: wp(20),
  },
  statusImage: {
    width: wp(10),
    height: wp(10),
    resizeMode: 'contain',
  },
});

export default Home;
