import React from 'react';
import './App.css';
import { useAssessmentState } from './hooks/useAssessmentState';
import { getHeaderNextHandler, getHeaderBackHandler, getHeaderDisabledState } from './utils/headerHandlers';
import StartScreen from './components/StartScreen';
import AssessmentFlow from './components/AssessmentFlow';
import Header from './components/ui/Header';
import Loader from './components/ui/Loader';

function App() {
  const {
    currentStep,
    setCurrentStep,
    basicInfo,
    setBasicInfo,
    formData,
    setFormData,
    mcqState,
    setMcqState,
    mcqResults,
    setMcqResults,
    knowledgeResults,
    setKnowledgeResults,
    communicationResults,
    setCommunicationResults,
    communicationState,
    setCommunicationState,
    inputChangeTrigger,
    setInputChangeTrigger,
    isLoading,
    setIsLoading,
    loadingMessage,
    setLoadingMessage,
    resetAssessment
  } = useAssessmentState();

  // Event handlers
  const startAssessment = () => {
    setCurrentStep('basicInfo');
  };

  const handleBasicInfoComplete = (data) => {
    setBasicInfo(data);
    setCurrentStep('prerequisites');
  };

  const handlePrerequisitesNext = () => {
    setCurrentStep('mcq');
  };

  const handlePrerequisitesBack = () => {
    setCurrentStep('basicInfo');
  };

  const handleMCQComplete = (results) => {
    setMcqResults(results);
    setCurrentStep('knowledge');
  };

  const handleKnowledgeComplete = (results) => {
    setKnowledgeResults(results);
    setCurrentStep('communication');
  };

  const handleCommunicationComplete = (results) => {
    setCommunicationResults(results);
    setCurrentStep('thankyou');
  };

  // Header handlers
  const handleHeaderNext = () => {
    const handler = getHeaderNextHandler(currentStep, mcqState);
    const result = handler();
    
    // Handle special cases that need parent component logic
    if (result === 'prerequisites-next') {
      handlePrerequisitesNext();
    } else if (result === 'prerequisites-back') {
      handlePrerequisitesBack();
    }
  };

  const handleHeaderBack = () => {
    const handler = getHeaderBackHandler(currentStep);
    const result = handler();
    
    if (result === 'prerequisites-back') {
      handlePrerequisitesBack();
    }
  };

  const isHeaderDisabled = getHeaderDisabledState(
    currentStep, 
    formData, 
    mcqState, 
    communicationState
  );

  // Loading handlers
  const handleLoadingStart = (message) => {
    setIsLoading(true);
    setLoadingMessage(message);
  };

  const handleLoadingEnd = () => {
    setIsLoading(false);
  };

  return (
    <div className="App" style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f8fafc',
      width: '100%',
      margin: 0,
      padding: 0,
      boxSizing: 'border-box'
    }}>
      {/* Header - only show for non-start screens */}
      {currentStep !== 'start' && (
        <Header 
          currentStep={currentStep}
          onNext={handleHeaderNext}
          onBack={handleHeaderBack}
          isProcessing={false}
          isDisabled={isHeaderDisabled}
          mcqState={mcqState}
        />
      )}

      {/* Main Content */}
      {currentStep === 'start' ? (
        <StartScreen onStartAssessment={startAssessment} />
      ) : (
        <AssessmentFlow
          currentStep={currentStep}
          basicInfo={basicInfo}
          formData={formData}
          setFormData={setFormData}
          mcqState={mcqState}
          setMcqState={setMcqState}
          mcqResults={mcqResults}
          knowledgeResults={knowledgeResults}
          communicationResults={communicationResults}
          communicationState={communicationState}
          setCommunicationState={setCommunicationState}
          inputChangeTrigger={inputChangeTrigger}
          setInputChangeTrigger={setInputChangeTrigger}
          onBasicInfoComplete={handleBasicInfoComplete}
          onPrerequisitesNext={handlePrerequisitesNext}
          onPrerequisitesBack={handlePrerequisitesBack}
          onMCQComplete={handleMCQComplete}
          onKnowledgeComplete={handleKnowledgeComplete}
          onCommunicationComplete={handleCommunicationComplete}
          onResetAssessment={resetAssessment}
          onLoadingStart={handleLoadingStart}
          onLoadingEnd={handleLoadingEnd}
        />
      )}
      
      {/* Global Loader */}
      <Loader isVisible={isLoading} message={loadingMessage} />
    </div>
  );
}

export default App;