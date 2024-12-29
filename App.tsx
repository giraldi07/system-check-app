import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { BatteryService } from './src/services/BatteryService';
import { DeviceService } from './src/services/DeviceService';
import { DiagnosticState, MemoryInfo } from './src/types/diagnostics';

const batteryService = new BatteryService();
const deviceService = new DeviceService();

// Example for handling missing 'available' property

export default function App() {
  const [diagnostics, setDiagnostics] = useState<DiagnosticState>({
    battery: null,
    memory: { total: 0, free: 0, used: 0, available: 0 }, // Set default value for available
    storage: null,
    network: null,
    system: null,
    cpu: null,
    graphics: null,
    performance: null,
    security: null,
    device: null,
    isLoading: false,
    error: null,
  });

  const runDiagnostics = async () => {
    setDiagnostics({ ...diagnostics, isLoading: true });
    try {
      const [battery, device] = await Promise.all([
        batteryService.getBatteryInfo(),
        deviceService.getDeviceInfo(),
      ]);
  
      // Using type assertion for `memory`
      const memory = device.memory as MemoryInfo;
  
      setDiagnostics({
        battery,
        device: {
          model: device.model || '',
          brand: device.brand || '',
          osVersion: device.osVersion || '',
          memory: memory ? {
            ...memory,
            available: memory.available || 0,  // Ensure available is defined
          } : { total: 0, free: 0, used: 0, available: 0 },
        },
        memory: memory ? {
          ...memory,
          available: memory.available || 0,  // Handle the available property
        } : { total: 0, free: 0, used: 0, available: 0 },
        storage: null,
        network: null,
        system: null,
        cpu: null,
        graphics: null,
        performance: null,
        security: null,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setDiagnostics({
        ...diagnostics,
        isLoading: false,
        error: error.message,
      });
    }
  };
  


  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Device Diagnostics</Text>

        <TouchableOpacity style={styles.button} onPress={runDiagnostics}>
          <Text style={styles.buttonText}>Run Diagnostics</Text>
        </TouchableOpacity>

        {diagnostics.battery && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Battery</Text>
            <Text>Level: {diagnostics.battery.level}%</Text>
            <Text>Status: {diagnostics.battery.state}</Text>
          </View>
        )}

        {diagnostics.device && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Device Info</Text>
            <Text>Model: {diagnostics.device.model}</Text>
            <Text>Brand: {diagnostics.device.brand}</Text>
            <Text>OS Version: {diagnostics.device.osVersion}</Text>
            <Text>Total Memory: {diagnostics.device.memory?.total} MB</Text>
            <Text>Free Memory: {diagnostics.device.memory?.free} MB</Text>
            <Text>Available Memory: {diagnostics.device.memory?.available} MB</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  card: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
});
