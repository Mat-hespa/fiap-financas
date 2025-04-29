// app/(home)/home/loading.tsx
import React from 'react';

export default function HomeLoading() {
  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
      <div className="text-center">
        <div className="spinner-border text-success" role="status" style={{ width: '3rem', height: '3rem' }}>
          <span className="visually-hidden">Carregando...</span>
        </div>
        <p className="mt-3">Carregando seus dados financeiros...</p>
      </div>
    </div>
  );
}