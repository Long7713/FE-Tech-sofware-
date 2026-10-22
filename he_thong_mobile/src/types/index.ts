export interface Language { id: number; code: string; name: string; active: boolean }
export interface Zone { id: number; name: string; description?: string; status: string }

export interface Animal {
  id: number;
  name: string;
  scientificName?: string;
  kingdom?: string;
  phylum?: string;
  className?: string;
  orderName?: string;
  family?: string;
  genus?: string;
  imageUrl?: string | null;
  status: string;
  zone?: Zone | null;
}

export interface AnimalDetail {
  id: number;
  lang: string;
  name: string;
  scientificName?: string;
  kingdom?: string;
  phylum?: string;
  className?: string;
  orderName?: string;
  family?: string;
  genus?: string;
  imageUrl?: string | null;
  zoneId?: number | null;
  zoneName?: string | null;
  description?: string | null;
  sizeWeight?: string | null;
  lifespan?: string | null;
  behavior?: string | null;
  history?: string | null;
  narration?: string | null;
}

export interface GpsZone {
  id: number;
  latitude: number;
  longitude: number;
  radiusM: number;
  status: string;
  animal: Animal;
}

export interface NearbyResult {
  zone: { id: number; latitude: number; longitude: number; radiusM: number; animalId: number };
  distanceM: number;
  animal: AnimalDetail;
}

export interface UserInfo { id: number; email: string; fullName: string; role: string; preferredLanguage?: string }
export interface AuthResponse { token: string; user: UserInfo }
