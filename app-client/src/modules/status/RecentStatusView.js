import React from 'react';
import {Text, View, FlatList} from 'react-native';
import RecentStatusItem from '../status/RecentStatusItem';
import _Divider from '../../components/_Divider';
import MyStatusView from './MyStatusView';

const RecentStatusView = ({navigation, statusData}) => {
  return (
    <View>
      <FlatList
        data={statusData}
        keyExtractor={(item, index) => index.toString()}
        // ItemSeparatorComponent={() => {
        //   return <_Divider />;
        // }}
        renderItem={({item}) => {
          return (
            <MyStatusView
              navigation={navigation}
              statusData={item}
              isUser={false}
              isBorder
            />
          );
        }}
      />
    </View>
  );
};

export default RecentStatusView;
