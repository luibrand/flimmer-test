// src/components/StepRow.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

interface StepRowProps {
  number: number;
  text: string;
}

export const StepRow: React.FC<StepRowProps> = ({ number, text }) => {
  return (
    <View style={styles.container}>
      <View style={styles.numberCircle}>
        <Text style={styles.numberText}>{number}</Text>
      </View>
      <Text style={styles.stepText}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  numberCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.surfaceLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  numberText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '600',
  },
  stepText: {
    color: colors.textSecondary,
    fontSize: 15,
    flex: 1,
  },
});

