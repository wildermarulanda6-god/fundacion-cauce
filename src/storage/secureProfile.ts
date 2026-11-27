import * as SecureStore from 'expo-secure-store';
import { donorProfileSchema } from '@/schemas/donorProfile';
import type { DonorProfile } from '@/schemas/donorProfile';

const PROFILE_KEY = 'cauce.donorProfile';

export async function loadDonorProfile(): Promise<DonorProfile | null> {
  try {
    const raw = await SecureStore.getItemAsync(PROFILE_KEY);
    if (raw === null) {
      return null;
    }
    return donorProfileSchema.parse(JSON.parse(raw));
  } catch {
    return null;
  }
}

export async function saveDonorProfile(profile: DonorProfile): Promise<void> {
  await SecureStore.setItemAsync(PROFILE_KEY, JSON.stringify(profile));
}

export async function clearDonorProfile(): Promise<void> {
  await SecureStore.deleteItemAsync(PROFILE_KEY);
}