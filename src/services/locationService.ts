export interface Location {
  id?: string;
  name: string;
  address: string;
  city: string;
  district?: string;  // Added for precise Indian locations
  state?: string;
  country: string;
  postalCode?: string;  // Added for international support
  latitude?: number;
  longitude?: number;
  type: 'home' | 'work' | 'cafe' | 'library' | 'coworking' | 'park' | 'other';
  description?: string;
  isPublic: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface MeetupRequest {
  id?: string;
  sessionId: string;
  requesterId: string;
  recipientId: string;
  proposedLocation?: Location;
  message?: string;
  proposedTime: string;
  status: 'pending' | 'accepted' | 'declined' | 'cancelled';
  createdAt?: string;
}

export class LocationService {
  private static readonly GEOCODING_API_KEY = 'your-geocoding-api-key'; // Replace with actual API key
  private static readonly PRIMARY_COUNTRY = 'India';
  private static readonly PRIMARY_COUNTRY_CODE = 'IN';

  // International country data for expanded support
  private static readonly COUNTRY_DATA: Record<string, { 
    code: string; 
    defaultCoords: { lat: number; lng: number };
    addressFormat: string[];
  }> = {
    'india': { 
      code: 'IN', 
      defaultCoords: { lat: 20.5937, lng: 78.9629 },
      addressFormat: ['name', 'address', 'district', 'city', 'state', 'country', 'postalCode']
    },
    'united states': { 
      code: 'US', 
      defaultCoords: { lat: 39.8283, lng: -98.5795 },
      addressFormat: ['name', 'address', 'city', 'state', 'postalCode', 'country']
    },
    'united kingdom': { 
      code: 'GB', 
      defaultCoords: { lat: 55.3781, lng: -3.4360 },
      addressFormat: ['name', 'address', 'city', 'state', 'postalCode', 'country']
    },
    'canada': { 
      code: 'CA', 
      defaultCoords: { lat: 56.1304, lng: -106.3468 },
      addressFormat: ['name', 'address', 'city', 'state', 'postalCode', 'country']
    },
    'australia': { 
      code: 'AU', 
      defaultCoords: { lat: -25.2744, lng: 133.7751 },
      addressFormat: ['name', 'address', 'city', 'state', 'postalCode', 'country']
    },
    'singapore': { 
      code: 'SG', 
      defaultCoords: { lat: 1.3521, lng: 103.8198 },
      addressFormat: ['name', 'address', 'city', 'postalCode', 'country']
    },
    'germany': { 
      code: 'DE', 
      defaultCoords: { lat: 51.1657, lng: 10.4515 },
      addressFormat: ['name', 'address', 'postalCode', 'city', 'country']
    },
    'france': { 
      code: 'FR', 
      defaultCoords: { lat: 46.2276, lng: 2.2137 },
      addressFormat: ['name', 'address', 'postalCode', 'city', 'country']
    },
    'japan': { 
      code: 'JP', 
      defaultCoords: { lat: 36.2048, lng: 138.2529 },
      addressFormat: ['name', 'address', 'city', 'state', 'postalCode', 'country']
    },
    'china': { 
      code: 'CN', 
      defaultCoords: { lat: 35.8617, lng: 104.1954 },
      addressFormat: ['name', 'address', 'district', 'city', 'state', 'country', 'postalCode']
    }
  };

  // Get user's current location (India-focused)
  static async getCurrentLocation(): Promise<{
    latitude: number;
    longitude: number;
    accuracy: number;
  }> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        // If geolocation is not supported, default to central India
        resolve({
          latitude: 20.5937,
          longitude: 78.9629,
          accuracy: 1000
        });
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy
          });
        },
        (error) => {
          // On error, fallback to central India location
          console.warn(`Geolocation error: ${error.message}. Using India as primary location.`);
          resolve({
            latitude: 20.5937, // Central India
            longitude: 78.9629,
            accuracy: 10000
          });
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes
        }
      );
    });
  }

  // Geocode address to coordinates with international support and Indian district precision
  static async geocodeAddress(address: string): Promise<{
    latitude: number;
    longitude: number;
    formattedAddress: string;
  }> {
    try {
      // Detect country from address
      const detectedCountry = this.detectCountryFromAddress(address);
      const countryData = this.COUNTRY_DATA[detectedCountry.toLowerCase()] || this.COUNTRY_DATA[this.PRIMARY_COUNTRY.toLowerCase()];

      // Enhanced Indian cities database with district information for precision
      const indianCitiesWithDistricts: Record<string, { 
        lat: number; 
        lng: number; 
        state: string; 
        district: string;
        aliases?: string[];
      }> = {
        // Major Metro Cities with Districts
        'mumbai': { lat: 19.0760, lng: 72.8777, state: 'Maharashtra', district: 'Mumbai City', aliases: ['bombay'] },
        'delhi': { lat: 28.7041, lng: 77.1025, state: 'Delhi', district: 'Central Delhi', aliases: ['new delhi'] },
        'new delhi': { lat: 28.6139, lng: 77.2090, state: 'Delhi', district: 'New Delhi' },
        'bengaluru': { lat: 12.9716, lng: 77.5946, state: 'Karnataka', district: 'Bangalore Urban', aliases: ['bangalore'] },
        'bangalore': { lat: 12.9716, lng: 77.5946, state: 'Karnataka', district: 'Bangalore Urban' },
        'kolkata': { lat: 22.5726, lng: 88.3639, state: 'West Bengal', district: 'Kolkata', aliases: ['calcutta'] },
        'chennai': { lat: 13.0827, lng: 80.2707, state: 'Tamil Nadu', district: 'Chennai', aliases: ['madras'] },
        'hyderabad': { lat: 17.3850, lng: 78.4867, state: 'Telangana', district: 'Hyderabad' },
        
        // Other Major Cities with Districts
        'pune': { lat: 18.5204, lng: 73.8567, state: 'Maharashtra', district: 'Pune' },
        'ahmedabad': { lat: 23.0225, lng: 72.5714, state: 'Gujarat', district: 'Ahmedabad' },
        'jaipur': { lat: 26.9124, lng: 75.7873, state: 'Rajasthan', district: 'Jaipur' },
        'surat': { lat: 21.1702, lng: 72.8311, state: 'Gujarat', district: 'Surat' },
        'lucknow': { lat: 26.8467, lng: 80.9462, state: 'Uttar Pradesh', district: 'Lucknow' },
        'kanpur': { lat: 26.4499, lng: 80.3319, state: 'Uttar Pradesh', district: 'Kanpur Nagar' },
        'nagpur': { lat: 21.1458, lng: 79.0882, state: 'Maharashtra', district: 'Nagpur' },
        'indore': { lat: 22.7196, lng: 75.8577, state: 'Madhya Pradesh', district: 'Indore' },
        'thane': { lat: 19.2183, lng: 72.9781, state: 'Maharashtra', district: 'Thane' },
        'bhopal': { lat: 23.2599, lng: 77.4126, state: 'Madhya Pradesh', district: 'Bhopal' },
        'visakhapatnam': { lat: 17.6868, lng: 83.2185, state: 'Andhra Pradesh', district: 'Visakhapatnam' },
        'pimpri chinchwad': { lat: 18.6298, lng: 73.7997, state: 'Maharashtra', district: 'Pune' },
        'patna': { lat: 25.5941, lng: 85.1376, state: 'Bihar', district: 'Patna' },
        'vadodara': { lat: 22.3072, lng: 73.1812, state: 'Gujarat', district: 'Vadodara' },
        'ghaziabad': { lat: 28.6692, lng: 77.4538, state: 'Uttar Pradesh', district: 'Ghaziabad' },
        'ludhiana': { lat: 30.9010, lng: 75.8573, state: 'Punjab', district: 'Ludhiana' },
        'agra': { lat: 27.1767, lng: 78.0081, state: 'Uttar Pradesh', district: 'Agra' },
        'nashik': { lat: 19.9975, lng: 73.7898, state: 'Maharashtra', district: 'Nashik' },
        'faridabad': { lat: 28.4089, lng: 77.3178, state: 'Haryana', district: 'Faridabad' },
        'meerut': { lat: 28.9845, lng: 77.7064, state: 'Uttar Pradesh', district: 'Meerut' },
        'rajkot': { lat: 22.3039, lng: 70.8022, state: 'Gujarat', district: 'Rajkot' },
        'kalyan dombivli': { lat: 19.2437, lng: 73.1355, state: 'Maharashtra', district: 'Thane' },
        'vasai virar': { lat: 19.4412, lng: 72.8397, state: 'Maharashtra', district: 'Palghar' },
        'varanasi': { lat: 25.3176, lng: 82.9739, state: 'Uttar Pradesh', district: 'Varanasi' },
        'srinagar': { lat: 34.0837, lng: 74.7973, state: 'Jammu and Kashmir', district: 'Srinagar' },
        'aurangabad': { lat: 19.8762, lng: 75.3433, state: 'Maharashtra', district: 'Aurangabad' },
        'dhanbad': { lat: 23.7957, lng: 86.4304, state: 'Jharkhand', district: 'Dhanbad' },
        'amritsar': { lat: 31.6340, lng: 74.8723, state: 'Punjab', district: 'Amritsar' },
        'navi mumbai': { lat: 19.0330, lng: 73.0297, state: 'Maharashtra', district: 'Raigad' },
        'allahabad': { lat: 25.4358, lng: 81.8463, state: 'Uttar Pradesh', district: 'Prayagraj', aliases: ['prayagraj'] },
        'prayagraj': { lat: 25.4358, lng: 81.8463, state: 'Uttar Pradesh', district: 'Prayagraj' },
        'ranchi': { lat: 23.3441, lng: 85.3096, state: 'Jharkhand', district: 'Ranchi' },
        'howrah': { lat: 22.5958, lng: 88.2636, state: 'West Bengal', district: 'Howrah' },
        'coimbatore': { lat: 11.0168, lng: 76.9558, state: 'Tamil Nadu', district: 'Coimbatore' },
        'jabalpur': { lat: 23.1815, lng: 79.9864, state: 'Madhya Pradesh', district: 'Jabalpur' },
        'gwalior': { lat: 26.2183, lng: 78.1828, state: 'Madhya Pradesh', district: 'Gwalior' },
        'vijayawada': { lat: 16.5062, lng: 80.6480, state: 'Andhra Pradesh', district: 'Krishna' },
        'jodhpur': { lat: 26.2389, lng: 73.0243, state: 'Rajasthan', district: 'Jodhpur' },
        'madurai': { lat: 9.9252, lng: 78.1198, state: 'Tamil Nadu', district: 'Madurai' },
        'raipur': { lat: 21.2514, lng: 81.6296, state: 'Chhattisgarh', district: 'Raipur' },
        'kota': { lat: 25.2138, lng: 75.8648, state: 'Rajasthan', district: 'Kota' },
        'guwahati': { lat: 26.1445, lng: 91.7362, state: 'Assam', district: 'Kamrup Metropolitan' },
        'chandigarh': { lat: 30.7333, lng: 76.7794, state: 'Chandigarh', district: 'Chandigarh' },
        'solapur': { lat: 17.6599, lng: 75.9064, state: 'Maharashtra', district: 'Solapur' },
        'hubli dharwad': { lat: 15.3647, lng: 75.1240, state: 'Karnataka', district: 'Dharwad' },
        'bareilly': { lat: 28.3670, lng: 79.4304, state: 'Uttar Pradesh', district: 'Bareilly' },
        'moradabad': { lat: 28.8386, lng: 78.7733, state: 'Uttar Pradesh', district: 'Moradabad' },
        'mysore': { lat: 12.2958, lng: 76.6394, state: 'Karnataka', district: 'Mysuru', aliases: ['mysuru'] },
        'mysuru': { lat: 12.2958, lng: 76.6394, state: 'Karnataka', district: 'Mysuru' },
        'tiruppur': { lat: 11.1085, lng: 77.3411, state: 'Tamil Nadu', district: 'Tiruppur' },
        'gurgaon': { lat: 28.4595, lng: 77.0266, state: 'Haryana', district: 'Gurugram', aliases: ['gurugram'] },
        'gurugram': { lat: 28.4595, lng: 77.0266, state: 'Haryana', district: 'Gurugram' },
        'aligarh': { lat: 27.8974, lng: 78.0880, state: 'Uttar Pradesh', district: 'Aligarh' },
        'jalandhar': { lat: 31.3260, lng: 75.5762, state: 'Punjab', district: 'Jalandhar' },
        'bhubaneswar': { lat: 20.2961, lng: 85.8245, state: 'Odisha', district: 'Khordha' },
        'salem': { lat: 11.6643, lng: 78.1460, state: 'Tamil Nadu', district: 'Salem' },
        'warangal': { lat: 17.9689, lng: 79.5941, state: 'Telangana', district: 'Warangal Urban' },
        'guntur': { lat: 16.3067, lng: 80.4365, state: 'Andhra Pradesh', district: 'Guntur' },
        'bhiwandi': { lat: 19.3002, lng: 73.0685, state: 'Maharashtra', district: 'Thane' },
        'saharanpur': { lat: 29.9680, lng: 77.5552, state: 'Uttar Pradesh', district: 'Saharanpur' },
        'gorakhpur': { lat: 26.7606, lng: 83.3732, state: 'Uttar Pradesh', district: 'Gorakhpur' },
        'bikaner': { lat: 28.0229, lng: 73.3119, state: 'Rajasthan', district: 'Bikaner' },
        'amravati': { lat: 20.9374, lng: 77.7796, state: 'Maharashtra', district: 'Amravati' },
        'noida': { lat: 28.5355, lng: 77.3910, state: 'Uttar Pradesh', district: 'Gautam Buddha Nagar' },
        'jamshedpur': { lat: 22.8046, lng: 86.2029, state: 'Jharkhand', district: 'East Singhbhum' },
        'bhilai': { lat: 21.1938, lng: 81.3509, state: 'Chhattisgarh', district: 'Durg' },
        'cuttack': { lat: 20.4625, lng: 85.8828, state: 'Odisha', district: 'Cuttack' },
        'firozabad': { lat: 27.1592, lng: 78.3957, state: 'Uttar Pradesh', district: 'Firozabad' },
        'kochi': { lat: 9.9312, lng: 76.2673, state: 'Kerala', district: 'Ernakulam', aliases: ['cochin'] },
        'cochin': { lat: 9.9312, lng: 76.2673, state: 'Kerala', district: 'Ernakulam' },
        'bhavnagar': { lat: 21.7645, lng: 72.1519, state: 'Gujarat', district: 'Bhavnagar' },
        'dehradun': { lat: 30.3165, lng: 78.0322, state: 'Uttarakhand', district: 'Dehradun' },
        'durgapur': { lat: 23.5204, lng: 87.3119, state: 'West Bengal', district: 'Paschim Bardhaman' },
        'asansol': { lat: 23.6739, lng: 86.9524, state: 'West Bengal', district: 'Paschim Bardhaman' },
        'rourkela': { lat: 22.2604, lng: 84.8536, state: 'Odisha', district: 'Sundargarh' },
        'nanded': { lat: 19.1383, lng: 77.3210, state: 'Maharashtra', district: 'Nanded' },
        'kolhapur': { lat: 16.7050, lng: 74.2433, state: 'Maharashtra', district: 'Kolhapur' },
        'ajmer': { lat: 26.4499, lng: 74.6399, state: 'Rajasthan', district: 'Ajmer' },
        'akola': { lat: 20.7002, lng: 77.0082, state: 'Maharashtra', district: 'Akola' },
        'gulbarga': { lat: 17.3297, lng: 76.8343, state: 'Karnataka', district: 'Kalaburagi' },
        'jamnagar': { lat: 22.4707, lng: 70.0577, state: 'Gujarat', district: 'Jamnagar' },
        'ujjain': { lat: 23.1765, lng: 75.7885, state: 'Madhya Pradesh', district: 'Ujjain' },
        'loni': { lat: 28.7353, lng: 77.2865, state: 'Uttar Pradesh', district: 'Ghaziabad' },
        'siliguri': { lat: 26.7271, lng: 88.3953, state: 'West Bengal', district: 'Darjeeling' },
        'jhansi': { lat: 25.4484, lng: 78.5685, state: 'Uttar Pradesh', district: 'Jhansi' },
        'ulhasnagar': { lat: 19.2215, lng: 73.1645, state: 'Maharashtra', district: 'Thane' },
        'jammu': { lat: 32.7266, lng: 74.8570, state: 'Jammu and Kashmir', district: 'Jammu' },
        'sangli miraj kupwad': { lat: 16.8524, lng: 74.5815, state: 'Maharashtra', district: 'Sangli' },
        'mangalore': { lat: 12.9141, lng: 74.8560, state: 'Karnataka', district: 'Dakshina Kannada' },
        'erode': { lat: 11.3410, lng: 77.7172, state: 'Tamil Nadu', district: 'Erode' },
        'belgaum': { lat: 15.8497, lng: 74.4977, state: 'Karnataka', district: 'Belagavi' },
        'ambattur': { lat: 13.1143, lng: 80.1548, state: 'Tamil Nadu', district: 'Chennai' },
        'tirunelveli': { lat: 8.7139, lng: 77.7567, state: 'Tamil Nadu', district: 'Tirunelveli' },
        'malegaon': { lat: 20.5579, lng: 74.5287, state: 'Maharashtra', district: 'Nashik' },
        'gaya': { lat: 24.7914, lng: 85.0002, state: 'Bihar', district: 'Gaya' },
        'jalgaon': { lat: 21.0077, lng: 75.5626, state: 'Maharashtra', district: 'Jalgaon' },
        'udaipur': { lat: 24.5710, lng: 73.6914, state: 'Rajasthan', district: 'Udaipur' },
        'maheshtala': { lat: 22.5093, lng: 88.2476, state: 'West Bengal', district: 'South 24 Parganas' }
      };

      const normalizedAddress = address.toLowerCase();
      
      // If detected country is India, try precise Indian city/district matching
      if (detectedCountry.toLowerCase() === this.PRIMARY_COUNTRY.toLowerCase()) {
        // First try direct city match
        let exactMatch = Object.keys(indianCitiesWithDistricts).find(city => 
          normalizedAddress.includes(city)
        );

        // Also check aliases
        if (!exactMatch) {
          exactMatch = Object.keys(indianCitiesWithDistricts).find(city => {
            const cityData = indianCitiesWithDistricts[city];
            return cityData.aliases?.some(alias => normalizedAddress.includes(alias));
          });
        }

        if (exactMatch) {
          const location = indianCitiesWithDistricts[exactMatch];
          return {
            latitude: location.lat,
            longitude: location.lng,
            formattedAddress: `${address}, ${location.district}, ${location.state}, ${this.PRIMARY_COUNTRY}`
          };
        }

        // Try to extract state for fallback
        const indianStates: Record<string, { lat: number; lng: number }> = {
          'maharashtra': { lat: 19.7515, lng: 75.7139 },
          'karnataka': { lat: 15.3173, lng: 75.7139 },
          'tamil nadu': { lat: 11.1271, lng: 78.6569 },
          'uttar pradesh': { lat: 26.8467, lng: 80.9462 },
          'gujarat': { lat: 22.2587, lng: 71.1924 },
          'rajasthan': { lat: 27.0238, lng: 74.2179 },
          'west bengal': { lat: 22.9868, lng: 87.8550 },
          'madhya pradesh': { lat: 22.9734, lng: 78.6569 },
          'telangana': { lat: 18.1124, lng: 79.0193 },
          'andhra pradesh': { lat: 15.9129, lng: 79.7400 },
          'kerala': { lat: 10.8505, lng: 76.2711 },
          'punjab': { lat: 31.1471, lng: 75.3412 },
          'haryana': { lat: 29.0588, lng: 76.0856 },
          'bihar': { lat: 25.0961, lng: 85.3131 },
          'jharkhand': { lat: 23.6102, lng: 85.2799 },
          'assam': { lat: 26.2006, lng: 92.9376 },
          'odisha': { lat: 20.9517, lng: 85.0985 },
          'chhattisgarh': { lat: 21.2787, lng: 81.8661 },
          'himachal pradesh': { lat: 31.1048, lng: 77.1734 },
          'uttarakhand': { lat: 30.0668, lng: 79.0193 },
          'delhi': { lat: 28.7041, lng: 77.1025 }
        };

        const stateMatch = Object.keys(indianStates).find(state => 
          normalizedAddress.includes(state)
        );

        if (stateMatch) {
          const location = indianStates[stateMatch];
          return {
            latitude: location.lat,
            longitude: location.lng,
            formattedAddress: `${address}, ${stateMatch.charAt(0).toUpperCase() + stateMatch.slice(1)}, ${this.PRIMARY_COUNTRY}`
          };
        }
      }

      // For international addresses or unmatched Indian addresses
      // Use country's default coordinates
      return {
        latitude: countryData.defaultCoords.lat,
        longitude: countryData.defaultCoords.lng,
        formattedAddress: `${address}, ${detectedCountry}`
      };
    } catch (error) {
      // Ultimate fallback to primary country
      const primaryCountryData = this.COUNTRY_DATA[this.PRIMARY_COUNTRY.toLowerCase()];
      return {
        latitude: primaryCountryData.defaultCoords.lat,
        longitude: primaryCountryData.defaultCoords.lng,
        formattedAddress: `${address}, ${this.PRIMARY_COUNTRY}`
      };
    }
  }

  // Detect country from address string
  private static detectCountryFromAddress(address: string): string {
    const normalizedAddress = address.toLowerCase();
    
    // Check for explicit country mentions
    for (const [country] of Object.entries(this.COUNTRY_DATA)) {
      if (normalizedAddress.includes(country)) {
        return country === 'united states' ? 'United States' : 
               country === 'united kingdom' ? 'United Kingdom' :
               country.charAt(0).toUpperCase() + country.slice(1);
      }
    }

    // Check for country codes
    if (normalizedAddress.includes('usa') || normalizedAddress.includes('us ')) {
      return 'United States';
    }
    if (normalizedAddress.includes('uk ') || normalizedAddress.includes('gb ')) {
      return 'United Kingdom';
    }
    if (normalizedAddress.includes('aus') || normalizedAddress.includes('au ')) {
      return 'Australia';
    }
    if (normalizedAddress.includes('can') || normalizedAddress.includes('ca ')) {
      return 'Canada';
    }

    // Check for common Indian terms/cities to confirm it's India
    const indianIndicators = [
      'india', 'bharat', 'delhi', 'mumbai', 'bangalore', 'chennai', 'kolkata', 'hyderabad',
      'maharashtra', 'karnataka', 'tamil nadu', 'gujarat', 'rajasthan', 'uttar pradesh',
      'pincode', 'pin code', 'nagar', 'ganj', 'pur', 'gram', 'tehsil', 'district'
    ];

    const hasIndianIndicator = indianIndicators.some(indicator => 
      normalizedAddress.includes(indicator)
    );

    if (hasIndianIndicator) {
      return this.PRIMARY_COUNTRY;
    }

    // Default to primary country (India)
    return this.PRIMARY_COUNTRY;
  }

  // Calculate distance between two points
  static calculateDistance(
    lat1: number, 
    lng1: number, 
    lat2: number, 
    lng2: number
  ): number {
    const R = 6371; // Earth's radius in kilometers
    const dLat = this.toRadians(lat2 - lat1);
    const dLng = this.toRadians(lng2 - lng1);
    
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
  }

  private static toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  // Find suggested meetup locations based on both users' locations (India as primary)
  static async findMidpointLocations(
    userLocation1: { latitude: number; longitude: number },
    userLocation2: { latitude: number; longitude: number }
  ): Promise<Location[]> {
    // Calculate midpoint
    const midLat = (userLocation1.latitude + userLocation2.latitude) / 2;
    const midLng = (userLocation1.longitude + userLocation2.longitude) / 2;

    // Determine the city/region based on midpoint coordinates (international support)
    let cityName = "Central Location";
    let stateName = this.PRIMARY_COUNTRY;
    let districtName = "";
    
    // Enhanced region detection for major Indian metropolitan areas with districts
    if (midLat >= 18.5 && midLat <= 19.5 && midLng >= 72.5 && midLng <= 73.5) {
      cityName = "Mumbai";
      stateName = "Maharashtra";
      districtName = "Mumbai City";
    } else if (midLat >= 28.4 && midLat <= 28.9 && midLng >= 76.8 && midLng <= 77.5) {
      cityName = "Delhi";
      stateName = "Delhi";
      districtName = "Central Delhi";
    } else if (midLat >= 12.8 && midLat <= 13.2 && midLng >= 77.4 && midLng <= 77.8) {
      cityName = "Bangalore";
      stateName = "Karnataka";
      districtName = "Bangalore Urban";
    } else if (midLat >= 17.2 && midLat <= 17.6 && midLng >= 78.2 && midLng <= 78.8) {
      cityName = "Hyderabad";
      stateName = "Telangana";
      districtName = "Hyderabad";
    } else if (midLat >= 12.8 && midLat <= 13.2 && midLng >= 80.1 && midLng <= 80.4) {
      cityName = "Chennai";
      stateName = "Tamil Nadu";
      districtName = "Chennai";
    } else if (midLat >= 22.4 && midLat <= 22.8 && midLng >= 88.2 && midLng <= 88.5) {
      cityName = "Kolkata";
      stateName = "West Bengal";
      districtName = "Kolkata";
    } else if (midLat >= 18.4 && midLat <= 18.7 && midLng >= 73.7 && midLng <= 74.0) {
      cityName = "Pune";
      stateName = "Maharashtra";
      districtName = "Pune";
    }

    // Enhanced suggested locations with international support and Indian district precision
    const suggestions: Location[] = [
      {
        name: `${cityName} Central Library`,
        address: `MG Road, ${cityName}`,
        city: cityName,
        district: districtName || undefined,
        state: stateName,
        country: this.PRIMARY_COUNTRY,
        type: "library",
        latitude: midLat + 0.002,
        longitude: midLng + 0.002,
        description: "Public library with study areas and free WiFi",
        isPublic: true
      },
      {
        name: `Cafe Coffee Day - ${cityName}`,
        address: `Commercial Street, ${cityName}`,
        city: cityName,
        district: districtName || undefined,
        state: stateName,
        country: this.PRIMARY_COUNTRY,
        type: "cafe",
        latitude: midLat - 0.001,
        longitude: midLng + 0.003,
        description: "Popular coffee chain with comfortable seating",
        isPublic: true
      },
      {
        name: `${cityName} Co-working Hub`,
        address: `IT Park, ${cityName}`,
        city: cityName,
        district: districtName || undefined,
        state: stateName,
        country: this.PRIMARY_COUNTRY,
        type: "coworking",
        latitude: midLat + 0.003,
        longitude: midLng - 0.001,
        description: "Modern co-working space with meeting rooms",
        isPublic: true
      },
      {
        name: `${cityName} City Park`,
        address: `Park Street, ${cityName}`,
        city: cityName,
        district: districtName || undefined,
        state: stateName,
        country: this.PRIMARY_COUNTRY,
        type: "park",
        latitude: midLat - 0.002,
        longitude: midLng - 0.003,
        description: "Beautiful public park with benches and greenery",
        isPublic: true
      },
      {
        name: `Starbucks ${cityName}`,
        address: `Mall Road, ${cityName}`,
        city: cityName,
        district: districtName || undefined,
        state: stateName,
        country: this.PRIMARY_COUNTRY,
        type: "cafe",
        latitude: midLat + 0.001,
        longitude: midLng - 0.002,
        description: "International coffee chain with WiFi",
        isPublic: true
      },
      {
        name: `${cityName} Public Library`,
        address: `Gandhi Nagar, ${cityName}`,
        city: cityName,
        district: districtName || undefined,
        state: stateName,
        country: this.PRIMARY_COUNTRY,
        type: "library",
        latitude: midLat - 0.003,
        longitude: midLng + 0.001,
        description: "Well-equipped library with quiet study spaces",
        isPublic: true
      }
    ];

    return suggestions;
  }

  // Get popular public locations in a city (India-focused)
  static async getPopularLocations(city: string): Promise<Location[]> {
    // Indian popular locations based on city
    const indianPopularLocations: Record<string, Location[]> = {
      'mumbai': [
        {
          name: "British Council Library",
          address: "A Wing, 901, 9th Floor, Platina, C-59, Bandra Kurla Complex",
          city: "Mumbai",
          district: "Mumbai City",
          state: "Maharashtra",
          country: "India",
          type: "library",
          latitude: 19.0596,
          longitude: 72.8656,
          description: "Well-equipped library with study areas",
          isPublic: true
        },
        {
          name: "Starbucks Bandra",
          address: "Phoenix Mills, Lower Parel",
          city: "Mumbai",
          district: "Mumbai City",
          state: "Maharashtra",
          country: "India",
          type: "cafe",
          latitude: 19.0144,
          longitude: 72.8317,
          description: "Popular coffee spot with WiFi",
          isPublic: true
        },
        {
          name: "WeWork BKC",
          address: "Bandra Kurla Complex",
          city: "Mumbai",
          district: "Mumbai City",
          state: "Maharashtra",
          country: "India",
          type: "coworking",
          latitude: 19.0728,
          longitude: 72.8826,
          description: "Professional co-working space",
          isPublic: true
        },
        {
          name: "Shivaji Park",
          address: "Dadar West",
          city: "Mumbai",
          district: "Mumbai City",
          state: "Maharashtra",
          country: "India",
          type: "park",
          latitude: 19.0297,
          longitude: 72.8397,
          description: "Large public park with seating areas",
          isPublic: true
        }
      ],
      'bangalore': [
        {
          name: "State Central Library",
          address: "Cubbon Park, Kasturba Road",
          city: "Bangalore",
          district: "Bangalore Urban",
          state: "Karnataka",
          country: "India",
          type: "library",
          latitude: 12.9762,
          longitude: 77.5993,
          description: "Historic library in Cubbon Park",
          isPublic: true
        },
        {
          name: "Cafe Coffee Day Forum",
          address: "Forum Mall, Koramangala",
          city: "Bangalore",
          district: "Bangalore Urban",
          state: "Karnataka",
          country: "India",
          type: "cafe",
          latitude: 12.9279,
          longitude: 77.6271,
          description: "Coffee shop in popular mall",
          isPublic: true
        },
        {
          name: "91springboard Koramangala",
          address: "Koramangala 6th Block",
          city: "Bangalore",
          district: "Bangalore Urban",
          state: "Karnataka",
          country: "India",
          type: "coworking",
          latitude: 12.9352,
          longitude: 77.6245,
          description: "Vibrant co-working community",
          isPublic: true
        },
        {
          name: "Cubbon Park",
          address: "Kasturba Road",
          city: "Bangalore",
          district: "Bangalore Urban",
          state: "Karnataka",
          country: "India",
          type: "park",
          latitude: 12.9698,
          longitude: 77.5906,
          description: "Green lung of the city with peaceful walkways",
          isPublic: true
        }
      ],
      'delhi': [
        {
          name: "Delhi Public Library",
          address: "SP Mukherjee Marg, Old Delhi",
          city: "Delhi",
          district: "Central Delhi",
          state: "Delhi",
          country: "India",
          type: "library",
          latitude: 28.6517,
          longitude: 77.2219,
          description: "Main public library with extensive collection",
          isPublic: true
        },
        {
          name: "Starbucks Connaught Place",
          address: "Connaught Place",
          city: "Delhi",
          district: "Central Delhi",
          state: "Delhi",
          country: "India",
          type: "cafe",
          latitude: 28.6315,
          longitude: 77.2167,
          description: "Central location coffee shop",
          isPublic: true
        },
        {
          name: "WeWork Connaught Place",
          address: "Connaught Place",
          city: "Delhi",
          district: "Central Delhi",
          state: "Delhi",
          country: "India",
          type: "coworking",
          latitude: 28.6289,
          longitude: 77.2065,
          description: "Premium co-working space",
          isPublic: true
        },
        {
          name: "India Gate Lawns",
          address: "Rajpath",
          city: "Delhi",
          district: "Central Delhi",
          state: "Delhi",
          country: "India",
          type: "park",
          latitude: 28.6129,
          longitude: 77.2295,
          description: "Iconic landmark with open spaces",
          isPublic: true
        }
      ]
    };

    // Return city-specific locations or default Indian locations
    if (indianPopularLocations[city.toLowerCase()]) {
      return indianPopularLocations[city.toLowerCase()];
    }

    // Default popular location types for any city with international and district support
    const defaultLocations: Location[] = [
      {
        name: `${city} Central Library`,
        address: `Main Road, ${city}`,
        city: city,
        state: this.PRIMARY_COUNTRY === 'India' ? this.PRIMARY_COUNTRY : undefined,
        country: this.PRIMARY_COUNTRY,
        type: "library",
        description: "Public library with study areas",
        isPublic: true
      },
      {
        name: `Cafe Coffee Day ${city}`,
        address: `Commercial Area, ${city}`,
        city: city,
        state: this.PRIMARY_COUNTRY === 'India' ? this.PRIMARY_COUNTRY : undefined,
        country: this.PRIMARY_COUNTRY,
        type: "cafe",
        description: "Popular coffee chain",
        isPublic: true
      },
      {
        name: `${city} Co-working Space`,
        address: `Business District, ${city}`,
        city: city,
        state: this.PRIMARY_COUNTRY === 'India' ? this.PRIMARY_COUNTRY : undefined,
        country: this.PRIMARY_COUNTRY,
        type: "coworking",
        description: "Professional workspace",
        isPublic: true
      },
      {
        name: `${city} Public Park`,
        address: `Park Road, ${city}`,
        city: city,
        state: this.PRIMARY_COUNTRY === 'India' ? this.PRIMARY_COUNTRY : undefined,
        country: this.PRIMARY_COUNTRY,
        type: "park",
        description: "Public park with seating",
        isPublic: true
      },
      {
        name: `McDonald's ${city}`,
        address: `Mall Road, ${city}`,
        city: city,
        state: this.PRIMARY_COUNTRY === 'India' ? this.PRIMARY_COUNTRY : undefined,
        country: this.PRIMARY_COUNTRY,
        type: "cafe",
        description: "Fast food restaurant with seating",
        isPublic: true
      }
    ];

    return defaultLocations;
  }

  // Format location for display with international and district support
  static formatLocationDisplay(location: Location): string {
    const parts = [
      location.name,
      location.address,
      location.district,
      location.city,
      location.state,
      location.country
    ].filter(part => part && part.trim() !== '');
    
    return parts.join(', ');
  }

  // Get Google Maps URL for location with enhanced international support
  static getMapUrl(location: Location): string {
    if (location.latitude && location.longitude) {
      // Use Google Maps with specific zoom level appropriate for the location type
      const zoomLevel = location.country === 'India' ? 16 : 15;
      return `https://www.google.com/maps?q=${location.latitude},${location.longitude}&z=${zoomLevel}`;
    }
    
    // Format address for better international location search with district precision
    const addressParts = [
      location.name,
      location.address,
      location.district,
      location.city,
      location.state,
      location.country,
      location.postalCode
    ].filter(part => part && part.trim() !== '');
    
    const formattedAddress = addressParts.join(', ');
    const encodedAddress = encodeURIComponent(formattedAddress);
    
    return `https://www.google.com/maps/search/${encodedAddress}`;
  }

  // Get directions URL between two locations with enhanced international support
  static getDirectionsUrl(from: Location, to: Location): string {
    // Format addresses for better international location routing with district precision
    const formatLocationForDirections = (loc: Location): string => {
      const parts = [
        loc.name,
        loc.address,
        loc.district,
        loc.city,
        loc.state,
        loc.country,
        loc.postalCode
      ].filter(part => part && part.trim() !== '');
      
      return parts.join(', ');
    };

    const fromAddr = encodeURIComponent(formatLocationForDirections(from));
    const toAddr = encodeURIComponent(formatLocationForDirections(to));
    
    return `https://www.google.com/maps/dir/${fromAddr}/${toAddr}`;
  }
}
