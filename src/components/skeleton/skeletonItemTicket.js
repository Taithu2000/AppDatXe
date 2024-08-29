import React from 'react';
import {View} from 'react-native';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';

const SkeletonTicket = () => {
  return (
    <View style={{width: '100%', flex: 1}}>
      {Array(4)
        .fill()
        .map((_, index) => {
          return (
            <SkeletonContent
              key={index}
              containerStyle={{
                width: '90%',
                alignSelf: 'center',
                backgroundColor: '#FFFFFF',
                borderRadius: 20,
                height: 140,
                padding: 20,
                borderWidth: 1,
                borderColor: '#CCCCCC',
                margin: 15,
              }}
              animationDirection="horizontalLeft"
              layout={[
                {
                  key: 'header',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  children: [
                    {key: 'title1', width: '30%', height: 15, marginBottom: 10},
                    {key: 'title2', width: '30%', height: 15, marginBottom: 10},
                  ],
                },
                {
                  key: 'body',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  children: [
                    {key: 'body1', width: '40%', height: 20, marginBottom: 10},
                    {key: 'body2', width: '40%', height: 20, marginBottom: 10},
                  ],
                },

                {
                  key: 'content',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  children: [
                    {
                      key: 'content1',
                      width: '35%',
                      height: 12,
                      marginBottom: 10,
                    },
                    {
                      key: 'content2',
                      width: '35%',
                      height: 12,
                      marginBottom: 10,
                    },
                  ],
                },

                {
                  key: 'footer',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  children: [
                    {
                      key: 'footer1',
                      width: '40%',
                      height: 12,
                      marginBottom: 10,
                    },
                    {
                      key: 'footer2',
                      width: '40%',
                      height: 12,
                      marginBottom: 10,
                    },
                  ],
                },
              ]}
              isLoading={true}
            />
          );
        })}
    </View>
  );
};
export default SkeletonTicket;
