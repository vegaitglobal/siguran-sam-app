export interface Contact {
  name?: string;
  number: string;
  id?: string;
}

export interface Country {
  name: string;
  callingNumber: string;
  flag: string;
  code: string;
}

export interface DeviceLocation {
  longitude: number;
  latitude: number;
  altitude?: number;
  country?: string;
  city?: string;
  street?: string;
  streetNumber?: string;
  accuracy?: string;
  timestamp: string;
}
