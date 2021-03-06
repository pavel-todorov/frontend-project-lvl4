import React from 'react';
import { useLocation } from 'react-router-dom';

export default function NotFound() {
  const location = useLocation();

  return (
    <div>
      No match for
      <code>{location.pathname}</code>
    </div>
  );
}
