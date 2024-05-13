import React, {useEffect, useState} from 'react';
import {Text, View, PermissionsAndroid, TouchableOpacity} from 'react-native';
import SoundLevel from 'react-native-sound-level';

const DecibelMeter = () => {
  const [soundLevel, setSoundLevel] = useState(0);

  useEffect(() => {
    const requestMicrophonePermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: 'Microphone Permission',
            message: 'App needs access to your microphone.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        console.log('granted:', granted);
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          startCapturingSoundLevel();
        } else {
          console.warn('Microphone permission denied');
        }
      } catch (err) {
        console.error('Error requesting microphone permission:', err);
      }
    };

    requestMicrophonePermission();

    return () => {
      SoundLevel.stop();
    };
  }, []);

  const startCapturingSoundLevel = async () => {
    SoundLevel.start(500);
    SoundLevel.onNewFrame = (data: any) => {
      console.log('Sound level info', data);
      setSoundLevel(data.value + 160);
    };
  };

  function onStop() {
    SoundLevel.stop();
  }
  function onStart() {
    SoundLevel.start(500);
  }

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: 30, marginBottom: 30}}>
        Sound Level: {soundLevel} dB
      </Text>
      <TouchableOpacity
        onPress={onStart}
        style={{
          backgroundColor: 'green',
          marginBottom: 30,
          padding: 8,
          borderRadius: 8,
        }}>
        <Text style={{fontSize: 30}}>Start Sound Level</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onStop}
        style={{backgroundColor: 'red', padding: 8, borderRadius: 8}}>
        <Text style={{fontSize: 30}}>Stop Sound Level</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DecibelMeter;
