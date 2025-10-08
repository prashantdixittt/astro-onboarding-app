import React, { useState } from 'react';
import './App.css';
import BasicInfoForm from './components/BasicInfoForm';
import MCQTest from './components/MCQTest';
import KnowledgeTest from './components/KnowledgeTest';
import CommunicationTest from './components/CommunicationTest';
import Results from './components/Results';

function App() {
  const [currentStep, setCurrentStep] = useState('start'); // start, basicInfo, mcq, knowledge, communication, results
  const [basicInfo, setBasicInfo] = useState(null);
  const [mcqResults, setMcqResults] = useState(null);
  const [knowledgeResults, setKnowledgeResults] = useState(null);
  const [communicationResults, setCommunicationResults] = useState(null);

  const startAssessment = () => {
    setCurrentStep('basicInfo');
  };

  const handleBasicInfoComplete = (info) => {
    setBasicInfo(info);
    setCurrentStep('mcq');
  };

  const handleMCQComplete = (results) => {
    setMcqResults(results.mcqResults);
    setCurrentStep('knowledge');
  };

  const handleKnowledgeComplete = (results) => {
    setKnowledgeResults(results);
    setCurrentStep('communication');
  };

  const handleCommunicationComplete = (results) => {
    setCommunicationResults(results);
    setCurrentStep('results');
  };

  const restartAssessment = () => {
    setCurrentStep('start');
    setBasicInfo(null);
    setMcqResults(null);
    setKnowledgeResults(null);
    setCommunicationResults(null);
  };

  const renderStartScreen = () => (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh',
      textAlign: 'center',
      padding: '20px'
    }}>
      <h1 style={{ marginBottom: '20px', color: '#2196f3' }}>
        🔮 Astrologer Assessment Platform
      </h1>
      <p style={{ fontSize: '18px', marginBottom: '30px', maxWidth: '600px', lineHeight: '1.6' }}>
        Welcome to the comprehensive astrologer evaluation system. This assessment will test your 
        astrological knowledge and communication skills through two main components:
      </p>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: '20px', 
        marginBottom: '40px',
        maxWidth: '800px'
      }}>
        <div style={{ 
          border: '1px solid #ddd', 
          borderRadius: '8px', 
          padding: '20px',
          backgroundColor: '#f9f9f9'
        }}>
          <h3 style={{ color: '#4caf50', marginBottom: '15px' }}>📚 Knowledge Test</h3>
          <p style={{ fontSize: '14px', lineHeight: '1.5' }}>
            Answer astrological questions and get scored on accuracy, relevance, 
            and proper use of terminology. Supports both English and Hindi.
          </p>
        </div>
        
        <div style={{ 
          border: '1px solid #ddd', 
          borderRadius: '8px', 
          padding: '20px',
          backgroundColor: '#f9f9f9'
        }}>
          <h3 style={{ color: '#ff5722', marginBottom: '15px' }}>🎤 Communication Test</h3>
          <p style={{ fontSize: '14px', lineHeight: '1.5' }}>
            Record your voice response to a client scenario and get evaluated on 
            clarity, confidence, empathy, and professional communication.
          </p>
        </div>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3>Complete Assessment Flow:</h3>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span style={{ padding: '6px 12px', backgroundColor: '#9c27b0', color: 'white', borderRadius: '15px', fontSize: '14px' }}>
            Basic Info
          </span>
          <span>→</span>
          <span style={{ padding: '6px 12px', backgroundColor: '#ff9800', color: 'white', borderRadius: '15px', fontSize: '14px' }}>
            MCQ Test
          </span>
          <span>→</span>
          <span style={{ padding: '6px 12px', backgroundColor: '#2196f3', color: 'white', borderRadius: '15px', fontSize: '14px' }}>
            Knowledge Test
          </span>
          <span>→</span>
          <span style={{ padding: '6px 12px', backgroundColor: '#ff5722', color: 'white', borderRadius: '15px', fontSize: '14px' }}>
            Communication Test
          </span>
          <span>→</span>
          <span style={{ padding: '6px 12px', backgroundColor: '#4caf50', color: 'white', borderRadius: '15px', fontSize: '14px' }}>
            Results
          </span>
        </div>
      </div>

      <button
        onClick={startAssessment}
        style={{
          backgroundColor: '#4caf50',
          color: 'white',
          padding: '15px 30px',
          border: 'none',
          borderRadius: '25px',
          fontSize: '18px',
          cursor: 'pointer',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
        }}
      >
        🚀 Start Assessment
      </button>
      
      <div style={{ 
        marginTop: '40px', 
        padding: '15px', 
        backgroundColor: '#fff3cd', 
        border: '1px solid #ffeaa7',
        borderRadius: '8px',
        maxWidth: '600px'
      }}>
        <strong>⚠️ Note:</strong> Make sure you have a working microphone and internet connection. 
        The assessment requires API access for scoring.
      </div>
    </div>
  );

  return (
    <div className="App">
      {currentStep === 'start' && renderStartScreen()}
      {currentStep === 'basicInfo' && (
        <BasicInfoForm onComplete={handleBasicInfoComplete} />
      )}
      {currentStep === 'mcq' && (
        <MCQTest basicInfo={basicInfo} onComplete={handleMCQComplete} />
      )}
      {currentStep === 'knowledge' && (
        <KnowledgeTest onComplete={handleKnowledgeComplete} />
      )}
      {currentStep === 'communication' && (
        <CommunicationTest onComplete={handleCommunicationComplete} />
      )}
      {currentStep === 'results' && (
        <Results 
          basicInfo={basicInfo}
          mcqResults={mcqResults}
          knowledgeResults={knowledgeResults}
          communicationResults={communicationResults}
          onRestart={restartAssessment}
        />
      )}
    </div>
  );
}

export default App;