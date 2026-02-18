import { api } from './api';

export const disasterService = {
  getAlerts: async () => {
    // Placeholder for fetching disaster alerts from backend API
    return api.get('/alerts');
  },
  getMapData: async () => {
    // Placeholder for fetching map data from backend API
    return api.get('/map-data');
  },
  getStatistics: async () => {
    // Placeholder for fetching disaster statistics
    return api.get('/statistics');
  }
};
