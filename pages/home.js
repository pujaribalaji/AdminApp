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
// import {SvgXml} from 'react-native-svg';
import io from 'socket.io-client'; // Import Socket.io client library

const Home = () => {
  const [activeSection, setActiveSection] = useState('requests');
  const [instaIds, setInstaIds] = useState([]);
  const [adCount, setAdCount] = useState(10);

  //   const close = `<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
  // <path d="M20.425 11.6525C20.545 11.5405 20.6419 11.406 20.71 11.2567C20.7781 11.1073 20.8161 10.9459 20.8218 10.7819C20.8276 10.6178 20.8009 10.4542 20.7435 10.3004C20.686 10.1467 20.5988 10.0057 20.4868 9.88563C20.3749 9.76555 20.2404 9.6687 20.091 9.6006C19.9416 9.53251 19.7803 9.4945 19.6162 9.48876C19.4521 9.48301 19.2885 9.50964 19.1348 9.56712C18.981 9.62459 18.84 9.7118 18.72 9.82375L15.0625 13.2338L11.6525 9.575C11.4243 9.34131 11.1137 9.2062 10.7872 9.19858C10.4607 9.19097 10.1441 9.31145 9.90533 9.53426C9.66652 9.75706 9.5244 10.0645 9.50937 10.3907C9.49435 10.717 9.60762 11.0362 9.82495 11.28L13.235 14.9375L9.5762 18.3475C9.45188 18.4583 9.35096 18.5929 9.27937 18.7432C9.20777 18.8936 9.16694 19.0567 9.15928 19.2231C9.15162 19.3895 9.17728 19.5557 9.23476 19.712C9.29223 19.8683 9.38036 20.0115 9.49397 20.1333C9.60758 20.2551 9.74438 20.3529 9.89633 20.4211C10.0483 20.4893 10.2123 20.5264 10.3788 20.5303C10.5453 20.5341 10.7109 20.5047 10.8659 20.4437C11.0208 20.3827 11.162 20.2913 11.2812 20.175L14.9387 16.7663L18.3487 20.4238C18.4588 20.5504 18.5933 20.6535 18.7441 20.7271C18.8949 20.8006 19.059 20.843 19.2266 20.8518C19.3941 20.8606 19.5617 20.8355 19.7194 20.7781C19.8771 20.7208 20.0216 20.6322 20.1443 20.5178C20.2671 20.4034 20.3655 20.2654 20.4338 20.1122C20.502 19.9589 20.5388 19.7934 20.5417 19.6257C20.5447 19.4579 20.5139 19.2913 20.4511 19.1357C20.3883 18.9801 20.2948 18.8387 20.1762 18.72L16.7675 15.0625L20.425 11.6525Z" fill="#E8486B" stroke="white" stroke-width="0.5"/>
  // <path fill-rule="evenodd" clip-rule="evenodd" d="M1.25 15C1.25 7.40625 7.40625 1.25 15 1.25C22.5938 1.25 28.75 7.40625 28.75 15C28.75 22.5938 22.5938 28.75 15 28.75C7.40625 28.75 1.25 22.5938 1.25 15ZM15 26.25C13.5226 26.25 12.0597 25.959 10.6948 25.3936C9.3299 24.8283 8.08971 23.9996 7.04505 22.955C6.00039 21.9103 5.17172 20.6701 4.60636 19.3052C4.04099 17.9403 3.75 16.4774 3.75 15C3.75 13.5226 4.04099 12.0597 4.60636 10.6948C5.17172 9.3299 6.00039 8.08971 7.04505 7.04505C8.08971 6.00039 9.3299 5.17172 10.6948 4.60636C12.0597 4.04099 13.5226 3.75 15 3.75C17.9837 3.75 20.8452 4.93526 22.955 7.04505C25.0647 9.15483 26.25 12.0163 26.25 15C26.25 17.9837 25.0647 20.8452 22.955 22.955C20.8452 25.0647 17.9837 26.25 15 26.25Z" fill="#E8486B" stroke="white" stroke-width="0.5"/>
  // </svg>
  // `;

  //   const check = `<svg width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
  // <path d="M26.968 12.0492C26.5262 11.5875 26.0691 11.1117 25.8969 10.6934C25.7375 10.3102 25.7281 9.675 25.7188 9.05977C25.7012 7.91602 25.6824 6.61992 24.7812 5.71875C23.8801 4.81758 22.584 4.79883 21.4402 4.78125C20.825 4.77187 20.1898 4.7625 19.8066 4.60312C19.3895 4.43086 18.9125 3.97383 18.4508 3.53203C17.6422 2.75508 16.7234 1.875 15.5 1.875C14.2766 1.875 13.359 2.75508 12.5492 3.53203C12.0875 3.97383 11.6117 4.43086 11.1934 4.60312C10.8125 4.7625 10.175 4.77187 9.55977 4.78125C8.41602 4.79883 7.11992 4.81758 6.21875 5.71875C5.31758 6.61992 5.30469 7.91602 5.28125 9.05977C5.27187 9.675 5.2625 10.3102 5.10312 10.6934C4.93086 11.1105 4.47383 11.5875 4.03203 12.0492C3.25508 12.8578 2.375 13.7766 2.375 15C2.375 16.2234 3.25508 17.141 4.03203 17.9508C4.47383 18.4125 4.93086 18.8883 5.10312 19.3066C5.2625 19.6898 5.27187 20.325 5.28125 20.9402C5.29883 22.084 5.31758 23.3801 6.21875 24.2812C7.11992 25.1824 8.41602 25.2012 9.55977 25.2188C10.175 25.2281 10.8102 25.2375 11.1934 25.3969C11.6105 25.5691 12.0875 26.0262 12.5492 26.468C13.3578 27.2449 14.2766 28.125 15.5 28.125C16.7234 28.125 17.641 27.2449 18.4508 26.468C18.9125 26.0262 19.3883 25.5691 19.8066 25.3969C20.1898 25.2375 20.825 25.2281 21.4402 25.2188C22.584 25.2012 23.8801 25.1824 24.7812 24.2812C25.6824 23.3801 25.7012 22.084 25.7188 20.9402C25.7281 20.325 25.7375 19.6898 25.8969 19.3066C26.0691 18.8895 26.5262 18.4125 26.968 17.9508C27.7449 17.1422 28.625 16.2234 28.625 15C28.625 13.7766 27.7449 12.859 26.968 12.0492ZM25.6145 16.6535C25.0531 17.2395 24.4719 17.8453 24.1637 18.5895C23.8684 19.3043 23.8555 20.1211 23.8438 20.9121C23.832 21.7324 23.8191 22.5914 23.4547 22.9547C23.0902 23.318 22.2371 23.332 21.4121 23.3438C20.6211 23.3555 19.8043 23.3684 19.0895 23.6637C18.3453 23.9719 17.7395 24.5531 17.1535 25.1145C16.5676 25.6758 15.9688 26.25 15.5 26.25C15.0312 26.25 14.4277 25.6734 13.8465 25.1145C13.2652 24.5555 12.6547 23.9719 11.9105 23.6637C11.1957 23.3684 10.3789 23.3555 9.58789 23.3438C8.76758 23.332 7.90859 23.3191 7.54531 22.9547C7.18203 22.5902 7.16797 21.7371 7.15625 20.9121C7.14453 20.1211 7.13164 19.3043 6.83633 18.5895C6.52812 17.8453 5.94687 17.2395 5.38555 16.6535C4.82422 16.0676 4.25 15.4688 4.25 15C4.25 14.5312 4.82656 13.9277 5.38555 13.3465C5.94453 12.7652 6.52812 12.1547 6.83633 11.4105C7.13164 10.6957 7.14453 9.87891 7.15625 9.08789C7.16797 8.26758 7.18086 7.40859 7.54531 7.04531C7.90977 6.68203 8.76289 6.66797 9.58789 6.65625C10.3789 6.64453 11.1957 6.63164 11.9105 6.33633C12.6547 6.02812 13.2605 5.44687 13.8465 4.88555C14.4324 4.32422 15.0312 3.75 15.5 3.75C15.9688 3.75 16.5723 4.32656 17.1535 4.88555C17.7348 5.44453 18.3453 6.02812 19.0895 6.33633C19.8043 6.63164 20.6211 6.64453 21.4121 6.65625C22.2324 6.66797 23.0914 6.68086 23.4547 7.04531C23.818 7.40977 23.832 8.26289 23.8438 9.08789C23.8555 9.87891 23.8684 10.6957 24.1637 11.4105C24.4719 12.1547 25.0531 12.7605 25.6145 13.3465C26.1758 13.9324 26.75 14.5312 26.75 15C26.75 15.4688 26.1734 16.0723 25.6145 16.6535ZM20.8508 11.5242C20.9379 11.6113 21.0071 11.7147 21.0543 11.8285C21.1015 11.9423 21.1257 12.0643 21.1257 12.1875C21.1257 12.3107 21.1015 12.4327 21.0543 12.5465C21.0071 12.6603 20.9379 12.7637 20.8508 12.8508L14.2883 19.4133C14.2012 19.5004 14.0978 19.5696 13.984 19.6168C13.8702 19.664 13.7482 19.6882 13.625 19.6882C13.5018 19.6882 13.3798 19.664 13.266 19.6168C13.1522 19.5696 13.0488 19.5004 12.9617 19.4133L10.1492 16.6008C9.97331 16.4249 9.87448 16.1863 9.87448 15.9375C9.87448 15.6887 9.97331 15.4501 10.1492 15.2742C10.3251 15.0983 10.5637 14.9995 10.8125 14.9995C11.0613 14.9995 11.2999 15.0983 11.4758 15.2742L13.625 17.4246L19.5242 11.5242C19.6113 11.4371 19.7147 11.3679 19.8285 11.3207C19.9423 11.2735 20.0643 11.2493 20.1875 11.2493C20.3107 11.2493 20.4327 11.2735 20.5465 11.3207C20.6603 11.3679 20.7637 11.4371 20.8508 11.5242Z" fill="#60AF11"/>
  // </svg>
  // `;

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
    setInstaIds(prevData => {
      const newData = [...prevData];
      const currentStatus = newData[index].statusImageSource;

      // Check the current status and update accordingly
      newData[index].statusImageSource =
        currentStatus === require('../assests/close.png')
          ? require('../assests/check.png')
          : require('../assests/close.png');

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
            <View
              style={{
                marginHorizontal: wp(5),
                padding: 'auto',
                backgroundColor: 'white',
                borderRadius: 10,
                marginTop: 20,
              }}>
              <View style={styles.tableContainer}>
                <View style={styles.tableRow}>
                  <Text style={styles.tableHeading}>InstaId</Text>
                  <Text style={styles.tableHeading}>Requests</Text>
                  <Text style={styles.tableHeading}>Status</Text>
                </View>

                {instaIds &&
                  instaIds.map((instaId, index) => (
                    <View key={instaId._id || index} style={styles.tableRow}>
                      <TouchableOpacity
                        onPress={() =>
                          Linking.openURL(
                            `instagram://user?username=${extractNameFromUrl(
                              instaId.url,
                            )}`,
                          )
                        }>
                        <Text
                          numberOfLines={1}
                          ellipsizeMode="tail"
                          style={[
                            styles.tableData,
                            styles.centerVertical,
                            {alignSelf: 'center', flex: 1},
                          ]}>
                          {extractNameFromUrl(instaId.url)}
                        </Text>
                      </TouchableOpacity>
                      <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={[styles.tableData, {color: 'black', flex: 1}]}>
                        1k followers
                      </Text>
                      <TouchableOpacity
                        onPress={() => handleStatusChange(index)}>
                        <Image
                          style={styles.statusImage}
                          source={instaId.statusImageSource}
                        />
                      </TouchableOpacity>
                    </View>
                  ))}
              </View>
            </View>
          )}

          {activeSection === 'settings' && (
            <View style={{justifyContent: 'center', alignSelf: 'center'}}>
              <View
                style={{
                  flexDirection: 'row',
                  gap: 10,
                  backgroundColor: 'white',
                  padding: 10,
                  alignSelf: 'center',
                  marginTop: 20,
                  justifyContent: 'center',
                  borderRadius: 10,
                }}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: hp(2),
                    justifyContent: 'center',
                    alignSelf: 'center',
                  }}>
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
    gap: 20,
    marginTop: 20,
  },
  tableHeading: {
    flex: 1,
    fontSize: hp(2),
    fontWeight: 'bold',
    color: 'rgba(223, 67, 126, 1)',
    textAlign: 'center',
    justifyContent: 'center',
  },
  tableData: {
    flex: 1,
    fontSize: hp(2),
    color: 'blue',
    alignSelf: 'center',
    maxWidth: wp(20),
    justifyContent: 'center',
    marginLeft: 20,
  },
  statusImage: {
    width: wp(10),
    height: wp(10),
    resizeMode: 'contain',
    marginLeft: 50,
  },
  centerVertical: {
    lineHeight: hp(4), // Adjust the line height to center vertically
  },
  tableContainer: {
    marginHorizontal: wp(5),
    padding: 'auto',
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 20,
  },
});

export default Home;
