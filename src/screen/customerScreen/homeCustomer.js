import React, {
  Component,
  useState,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {MyStatusBar} from '../../components/myStatusBar';
import {useSelector, useDispatch} from 'react-redux';
import FindTrip from '../../components/findTrip';
import {customStyles} from '../../constants/customStyles';
import {
  selectStartPoint,
  selectEndPoint,
  selectDateAction,
} from '../../redux/actions/locationAction';
import {useFocusEffect} from '@react-navigation/native';
import {myColor} from '../../constants/myColor';
import RotateLoading from '../../components/loading/rotateLoading';

const {width: screenWith} = Dimensions.get('window');

const HomeCustomer = ({navigation}) => {
  const user = useSelector(state => state.user);

  const {startLocation, endLocation, departure_date} = useSelector(
    state => state.location,
  );
  const dispatch = useDispatch();
  const stepCarouselContainer = useRef();
  const [currentIndexContainer, setCurrentIndexContainer] = useState(0);

  const [imageList, setImageList] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const stepCarousel = useRef();
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);

  useEffect(() => {
    const dataImage = [
      {
        image: require('../../assets/images/banner1.png'),
        title: 'Nghỉ lễ 2/9 nên đi đâu chơi?',
        url: 'https://vexere.com/vi-VN/bai-viet/dia-diem-du-lich-le-2-9',
      },
      {
        image: require('../../assets/images/banner2.png'),
        title: 'Lịch nghỉ lễ 2/9/2024',
        url: 'https://vexere.com/vi-VN/bai-viet/lich-nghi-le-2-9',
      },
      {
        image: require('../../assets/images/banner3.jpg'),
        title: 'Du lịch Vũng Tàu',
        url: 'https://vexere.com/vi-VN/bai-viet/ve-xe-le-2-9',
      },

      {
        image: require('../../assets/images/banner4.jpg'),
        title:
          'Giảm đến 100K khi thanh toán dịch vụ xe khách bằng Thẻ Tín dụng HDSAISON',
        url: 'https://vexere.com/vi-VN/bai-viet/uu-dai-the-tin-dung-hdsaison',
      },
      {
        image: require('../../assets/images/banner5.png'),
        title: 'Du lịch Vũng Tàu',
        url: 'https://vexere.com/vi-VN/bai-viet/du-lich-vung-tau',
      },
    ];
    setImageList(dataImage);
  }, []);

  //---------------------------------------------hiển thị bottom tab---------------------------------------------
  useFocusEffect(
    useCallback(() => {
      const parent = navigation.getParent();
      parent?.setOptions({tabBarStyle: customStyles.bottomTab});
    }, [navigation]),
  );

  //--------------------------------------------Chạy banner ảnh--------------------------------------------

  useEffect(() => {
    if (imageList.length > 0) {
      let index = 0;

      setInterval(() => {
        setIsAutoScrolling(false);
        setCurrentImageIndex(prevIndex => {
          index = prevIndex + 1;
          if (index >= imageList.length) {
            index = 0;
          }

          return index;
        });

        stepCarousel.current.scrollTo({
          x: index * screenWith,
          y: 0,
          animated: true,
        });

        setTimeout(() => {
          setIsAutoScrolling(true);
        }, 300);
      }, 5000);
    }
  }, [imageList]);
  const handleScrollBanner = e => {
    if (isAutoScrolling) {
      let imageIndex = 0;

      if (!e) {
        return;
      }
      const {nativeEvent} = e;
      if (nativeEvent && nativeEvent.contentOffset) {
        const currentOffset = nativeEvent.contentOffset.x;

        if (currentOffset > 0) {
          imageIndex = Math.round(currentOffset / screenWith);

          setCurrentImageIndex(imageIndex);
        }
      }
    }
  };

  const handleScrollContainer = e => {
    let index = 0;

    if (!e) {
      return;
    }
    const {nativeEvent} = e;
    if (nativeEvent && nativeEvent.contentOffset) {
      const currentOffset = nativeEvent.contentOffset.y;

      if (currentOffset > 0) {
        index = 1 - (250 - currentOffset) / 250;

        setCurrentIndexContainer(index);
      }
    }
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FAFAFA'}}>
      <MyStatusBar />
      <Image
        source={require('../../assets/images/anh-voi.jpg')}
        style={styles.imgWelcome}
      />
      <View
        style={[
          styles.containerBlur,
          {
            backgroundColor: `rgba(250,250,250,${currentIndexContainer})`,
          },
        ]}></View>
      <ScrollView
        ref={stepCarouselContainer}
        onScroll={handleScrollContainer}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}>
        <View style={styles.viewWelcome}>
          <Text style={styles.textTitle}>Xin chào {user.name}</Text>
          <Text style={{color: '#000', fontSize: 18}}>
            Hãy bắt đầu chuyến hành trình ngay nào!
          </Text>
        </View>
        <View style={{width: '100%', marginTop: 35}}>
          <FindTrip
            startLocation={startLocation}
            setStartLocation={item => dispatch(selectStartPoint(item))}
            endLocation={endLocation}
            setEndLocation={item => dispatch(selectEndPoint(item))}
            date={departure_date}
            setDate={date => dispatch(selectDateAction(date))}
            onPress={() => {
              navigation.navigate('TripList_Cus');
            }}
          />
        </View>
        <View style={{width: '100%'}}>
          <Text style={[styles.textTitle, {padding: '5%'}]}>Tin tức</Text>
          <ScrollView
            horizontal
            scrollEventThrottle={16}
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScrollBanner}
            ref={stepCarousel}>
            {imageList.map((e, index) => (
              <View style={styles.banner} key={index}>
                <TouchableOpacity
                  style={styles.btnBanner}
                  onPress={() => {
                    navigation.navigate('NewsScreen', {url: e.url});
                  }}>
                  <Image
                    source={e.image}
                    resizeMode="stretch"
                    style={styles.imgBanner}
                  />
                  <Text style={styles.titleBanner}>
                    {e.title.length < 60
                      ? e.title
                      : e.title.slice(0, 60) + '...'}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
          <View style={styles.containerCircle}>
            {imageList.map((e, index) => {
              return (
                <View
                  key={index}
                  style={[
                    styles.circleBanner,
                    {
                      backgroundColor:
                        index == currentImageIndex
                          ? myColor.buttonColor
                          : '#CCCCCC',
                    },
                  ]}
                />
              );
            })}
          </View>
        </View>

        <View
          style={{
            height: 100,
          }}></View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  imgWelcome: {
    width: '100%',
    height: 250,
    resizeMode: 'stretch',
    position: 'absolute',
    zIndex: -2,
  },
  containerBlur: {
    width: '100%',
    height: 250,
    resizeMode: 'stretch',
    position: 'absolute',
    zIndex: -1,
    backgroundColor: 'rgba(255, 255, 255,0)',
  },

  viewWelcome: {
    width: '90%',
    marginTop: 75,
    height: 75,
    alignSelf: 'center',
  },
  textTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
  },
  banner: {
    width: screenWith,
    height: 300,
    alignItems: 'center',
  },
  btnBanner: {
    width: '90%',
    height: 250,
    borderRadius: 15,
    elevation: 5,
    backgroundColor: '#FAFAFA',
  },
  imgBanner: {
    width: '100%',
    height: 180,
    resizeMode: 'stretch',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  titleBanner: {
    fontSize: 20,
    color: '#000000',
    padding: 10,
  },

  containerCircle: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
  circleBanner: {
    width: 10,
    height: 10,
    borderRadius: 10,
    margin: 5,
  },
});

export default HomeCustomer;
