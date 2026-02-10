import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AllocationScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Allocation</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
  },
});

export default AllocationScreen;
