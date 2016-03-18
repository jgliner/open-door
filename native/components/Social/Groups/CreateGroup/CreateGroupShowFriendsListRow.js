import React, { Text, View } from 'react-native';
import styles from '../../../../styles/Feed/feedStyles.js';

const CreateGroupShowFriendsListRow = (rowText) => (
  <View>
    <View style={styles.listEntryView}>
      <Text style={styles.group}>
        {rowText}
      </Text>
    </View>
  </View>
);

module.exports = CreateGroupShowFriendsListRow;