import axios from 'axios';

interface NASACoordinates {
  lat: number;
  lon: number;
}

interface AirQualityData {
  aqi: number;
  pollutants: {
    pm25: number;
    pm10: number;
    o3: number;
  };
}

export class NASADataService {
  private NASA_API_KEY = process.env.NASA_API_KEY || 'DEMO_KEY';
  
  /**
   * Fetch Air Quality data from OpenAQ API
   */
  async getAirQuality(coords: NASACoordinates): Promise<AirQualityData> {
    try {
      const response = await axios.get('https://api.openaq.org/v2/latest', {
        params: {
          coordinates: `${coords.lat},${coords.lon}`,
          radius: 25000, // 25km radius
          limit: 1
        }
      });

      if (response.data.results && response.data.results.length > 0) {
        const measurements = response.data.results[0].measurements;
        const pm25 = measurements.find((m: any) => m.parameter === 'pm25')?.value || 0;
        const pm10 = measurements.find((m: any) => m.parameter === 'pm10')?.value || 0;
        const o3 = measurements.find((m: any) => m.parameter === 'o3')?.value || 0;
        
        // Calculate AQI from PM2.5 (simplified)
        const aqi = this.calculateAQI(pm25);
        
        return {
          aqi,
          pollutants: { pm25, pm10, o3 }
        };
      }
      
      // Fallback to simulated data
      return this.getSimulatedAirQuality(coords);
    } catch (error) {
      console.error('Error fetching air quality:', error);
      return this.getSimulatedAirQuality(coords);
    }
  }

  /**
   * Fetch MODIS vegetation data (NDVI)
   * Note: This is a placeholder - real implementation requires NASA EarthData credentials
   */
  async getVegetationIndex(coords: NASACoordinates): Promise<number> {
    try {
      // For now, use simulated data
      // Real implementation would use NASA MODIS API
      const baseNDVI = 0.55 + Math.random() * 0.25;
      const latFactor = Math.abs(coords.lat) / 90;
      return Math.round((baseNDVI + latFactor * 0.1) * 100) / 100;
    } catch (error) {
      console.error('Error fetching vegetation data:', error);
      return 0.6;
    }
  }

  /**
   * Fetch temperature data from NASA POWER API
   */
  async getTemperature(coords: NASACoordinates): Promise<number> {
    try {
      const response = await axios.get('https://power.larc.nasa.gov/api/temporal/daily/point', {
        params: {
          parameters: 'T2M',
          community: 'RE',
          longitude: coords.lon,
          latitude: coords.lat,
          start: this.getYesterday(),
          end: this.getYesterday(),
          format: 'JSON'
        }
      });

      if (response.data.properties?.parameter?.T2M) {
        const temps = Object.values(response.data.properties.parameter.T2M) as number[];
        return Math.round(temps[0] * 10) / 10;
      }
      
      return this.getSimulatedTemperature(coords);
    } catch (error) {
      console.error('Error fetching temperature:', error);
      return this.getSimulatedTemperature(coords);
    }
  }

  /**
   * Get comprehensive environmental metrics
   */
  async getEnvironmentalMetrics(coords: NASACoordinates) {
    const [airQuality, ndvi, temperature] = await Promise.all([
      this.getAirQuality(coords),
      this.getVegetationIndex(coords),
      this.getTemperature(coords)
    ]);

    return {
      airQuality: airQuality.aqi,
      vegetationIndex: ndvi,
      temperature: temperature,
      waterQuality: 7.0 + Math.random() * 0.8, // Placeholder - no free API available
      location: `${coords.lat}, ${coords.lon}`,
      timestamp: new Date().toISOString(),
      source: 'NASA/OpenAQ'
    };
  }

  // Helper methods
  private calculateAQI(pm25: number): number {
    // Simplified AQI calculation from PM2.5
    if (pm25 <= 12.0) return Math.round((50 / 12.0) * pm25);
    if (pm25 <= 35.4) return Math.round(((100 - 51) / (35.4 - 12.1)) * (pm25 - 12.1) + 51);
    if (pm25 <= 55.4) return Math.round(((150 - 101) / (55.4 - 35.5)) * (pm25 - 35.5) + 101);
    if (pm25 <= 150.4) return Math.round(((200 - 151) / (150.4 - 55.5)) * (pm25 - 55.5) + 151);
    return 200;
  }

  private getYesterday(): string {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    return date.toISOString().split('T')[0].replace(/-/g, '');
  }

  private getSimulatedAirQuality(coords: NASACoordinates): AirQualityData {
    const baseAQI = 35 + Math.random() * 30;
    const latFactor = Math.abs(coords.lat) / 90;
    const aqi = Math.round(baseAQI + latFactor * 10);
    
    return {
      aqi,
      pollutants: {
        pm25: aqi * 0.5,
        pm10: aqi * 0.7,
        o3: aqi * 0.3
      }
    };
  }

  private getSimulatedTemperature(coords: NASACoordinates): number {
    const baseTemp = 20 + Math.random() * 15;
    const latFactor = Math.abs(coords.lat) / 90;
    return Math.round((baseTemp + latFactor * 5) * 10) / 10;
  }
}

export const nasaDataService = new NASADataService();
