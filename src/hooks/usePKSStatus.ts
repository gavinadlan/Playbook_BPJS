import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { PKS } from '@/types/api';

export type PKSStatus = 'loading' | 'no_submission' | 'PENDING' | 'APPROVED' | 'REJECTED';

export const usePKSStatus = () => {
  const { user } = useAuth();
  const [pksData, setPksData] = useState<PKS[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPKSData = async () => {
      if (!user?.id) {
        setLoading(false);
        return;
      }
      
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:3001/api/pks?userId=${user.id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setPksData(data);
        } else {
          setError('Gagal mengambil data PKS');
        }
      } catch (error) {
        console.error('Error fetching PKS data:', error);
        setError('Terjadi kesalahan saat mengambil data PKS');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchPKSData();
    } else {
      setLoading(false);
    }
  }, [user]);

  const getPKSStatus = (): PKSStatus => {
    if (loading) return 'loading';
    if (pksData.length === 0) return 'no_submission';
    
    // Ambil PKS terbaru (yang terakhir diajukan)
    const latestPKS = pksData.sort((a, b) => 
      new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
    )[0];
    
    return latestPKS.status;
  };

  const latestPKS = pksData.length > 0 
    ? pksData.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())[0]
    : null;

  return {
    pksData,
    loading,
    error,
    status: getPKSStatus(),
    latestPKS,
    refetch: () => {
      setLoading(true);
      setError(null);
      // Trigger re-fetch by updating user dependency
    }
  };
}; 