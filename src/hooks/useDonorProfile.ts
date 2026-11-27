import { useCallback, useEffect, useState } from 'react';
import type { DonorProfile } from '@/schemas/donorProfile';
import { clearDonorProfile, loadDonorProfile, saveDonorProfile } from '@/storage/secureProfile';

export function useDonorProfile() {
  const [profile, setProfile] = useState<DonorProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;
    void loadDonorProfile().then((stored) => {
      if (active) {
        setProfile(stored);
        setIsLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  const save = useCallback(async (next: DonorProfile) => {
    await saveDonorProfile(next);
    setProfile(next);
  }, []);

  const clear = useCallback(async () => {
    await clearDonorProfile();
    setProfile(null);
  }, []);

  return { profile, isLoading, save, clear };
}