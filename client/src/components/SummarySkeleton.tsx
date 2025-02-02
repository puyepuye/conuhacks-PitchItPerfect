// app/your-page/loading.js
"use client";

import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "@/app/summary/summary.css";
import Image from 'next/image';


const SummarySkeleton: React.FC = () => {
    return (
        <div className="summary-container">
        <h1 className="summary-title">Performance Summary</h1>
    
  
        <div className="summary-box">

        <div className="logo-container">
            <Image src="/icons/pitchlogo.svg" alt="Pitch Logo" width={50} height={50} className="logo"/>
            <span className="logo-text">Pitch</span>
        </div>
      
  
      <div className="toggle-container">
      <div className="toggle">
          <button className="toggle-btn active">Practice</button>
          <button className="toggle-btn">Profile</button>
      </div>
      </div>
  
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <h3 style={{ marginBottom: '1rem' }}>
                <Skeleton width={150} height={25} />
              </h3>
              <Skeleton width={350} height={150} />
            </div>
  
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <h3 style={{ marginBottom: '1rem' }}>
                <Skeleton width={150} height={25} />
              </h3>
              <Skeleton width={200} height={200} />
            </div>
          </div>
  
          <div className="toneYay">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', padding: '8px 16px' }}>
                <Skeleton width={100} height={20} style={{ marginRight: '10px' }} />
                <Skeleton width={50} height={20} />
              </div>
            </div>
          </div>
  
          <div className="metrics-container">
            <div className="metric-item">
              <Skeleton width={150} height={20} />
            </div>
            <div className="metric-value">
              <Skeleton width={50} height={20} />
            </div>
  
            <div className="metric-item">
              <Skeleton width={150} height={20} />
            </div>
            <div className="metric-value">
              <Skeleton width={50} height={20} />
            </div>
          </div>
  
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
            <div className="feedback-container">
              <h3 className="feedback-title">
                <Skeleton width={100} height={25} />
              </h3>
              <div className="feedback-box">
                <Skeleton count={5} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default SummarySkeleton;