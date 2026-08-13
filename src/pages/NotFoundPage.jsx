import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { ArrowLeft } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 text-center">
      <h1 className="text-6xl font-black gradient-text mb-2">404</h1>
      <h2 className="text-xl font-bold text-white mb-2">Page Not Found</h2>
      <p className="text-xs text-slate-400 max-w-sm mb-6">
        The route you are trying to access does not exist or has been moved.
      </p>
      <Link to="/dashboard">
        <Button variant="primary" size="md" icon={ArrowLeft}>
          Back to Dashboard
        </Button>
      </Link>
    </div>
  );
};
