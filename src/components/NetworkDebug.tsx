import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

const NetworkDebug = () => {
  const [debugInfo, setDebugInfo] = useState({
    location: '',
    supabaseUrl: '',
    supabaseKey: '',
    connection: 'testing...'
  });

  useEffect(() => {
    const checkConnection = async () => {
      try {
        // Get location info
        const location = window.location.href;
        
        // Get environment variables
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
        const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY ? 'loaded' : 'missing';
        
        // Test Supabase connection
        const { data, error } = await supabase.auth.getSession();
        const connection = error ? `Error: ${error.message}` : 'Connected successfully';
        
        setDebugInfo({
          location,
          supabaseUrl: supabaseUrl || 'missing',
          supabaseKey,
          connection
        });
      } catch (err) {
        setDebugInfo(prev => ({
          ...prev,
          connection: `Error: ${err instanceof Error ? err.message : 'Unknown error'}`
        }));
      }
    };

    checkConnection();
  }, []);

  return (
    <div className="fixed bottom-4 left-4 bg-black text-white p-4 rounded-lg text-xs font-mono max-w-md z-[9999]">
      <div className="text-green-400 font-bold mb-2">Network Debug Info:</div>
      <div><strong>Location:</strong> {debugInfo.location}</div>
      <div><strong>Supabase URL:</strong> {debugInfo.supabaseUrl}</div>
      <div><strong>Supabase Key:</strong> {debugInfo.supabaseKey}</div>
      <div><strong>Connection:</strong> {debugInfo.connection}</div>
    </div>
  );
};

export default NetworkDebug;
