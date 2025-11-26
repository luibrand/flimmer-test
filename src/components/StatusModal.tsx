// src/components/StatusModal.tsx

import React, { useState, useEffect } from 'react';
import { Modal, View, StyleSheet } from 'react-native';
import { UploadScreen } from '../screens/UploadScreen';
import { SuccessScreen } from '../screens/SuccessScreen';

interface StatusModalProps {
  visible: boolean;
  onBackToVideos: () => void;
  onDoAgain: () => void;
}

export const StatusModal: React.FC<StatusModalProps> = ({
  visible,
  onBackToVideos,
  onDoAgain,
}) => {
  const [status, setStatus] = useState<'uploading' | 'success'>('uploading');

  // Reset to uploading when modal opens
  useEffect(() => {
    if (visible) {
      setStatus('uploading');
    }
  }, [visible]);

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        {status === 'uploading' ? (
          <UploadScreen onComplete={() => setStatus('success')} />
        ) : (
          <SuccessScreen
            onBackToVideos={onBackToVideos}
            onDoAgain={onDoAgain}
          />
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
});


