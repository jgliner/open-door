import React, { View } from 'react-native';
import NavigationBar from 'react-native-navbar';
import styles from '../../styles/Shared/sharedStyles.js';

const NavBar = (props) => (
  <View>
    <NavigationBar
      title={{ title: props.title }}
      rightButton={props.rightButton}
      leftButton={props.leftButton}
      style={styles.navBar}
    />
  </View>
);

NavBar.propTypes = {
  title: React.PropTypes.string,
  rightButton: React.PropTypes.object,
  leftButton: React.PropTypes.object,
};

module.exports = NavBar;
