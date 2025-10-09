import React from 'react';
import BasicInfoForm from './BasicInfoForm';
import Prerequisites from './Prerequisites';
import MCQTest from './MCQTest';
import KnowledgeTest from './KnowledgeTest';
import CommunicationTest from './CommunicationTest';
import ThankYou from './ThankYou';

const AssessmentFlow = ({
  currentStep,
  basicInfo,
  formData,
  setFormData,
  mcqState,
  setMcqState,
  mcqResults,
  knowledgeResults,
  communicationResults,
  communicationState,
  setCommunicationState,
  inputChangeTrigger,
  setInputChangeTrigger,
  onBasicInfoComplete,
  onPrerequisitesNext,
  onPrerequisitesBack,
  onMCQComplete,
  onKnowledgeComplete,
  onCommunicationComplete,
  onResetAssessment,
  onLoadingStart,
  onLoadingEnd
}) => {
  const renderStep = () => {
    switch (currentStep) {
      case 'basicInfo':
        return (
          <BasicInfoForm 
            onComplete={onBasicInfoComplete} 
            onFormDataChange={setFormData} 
          />
        );
      
      case 'prerequisites':
        return (
          <Prerequisites 
            basicInfo={basicInfo} 
            onNext={onPrerequisitesNext}
            onBack={onPrerequisitesBack}
          />
        );
      
      case 'mcq':
        return (
          <MCQTest 
            basicInfo={basicInfo} 
            onComplete={onMCQComplete} 
            onQuestionChange={setMcqState}
            onLoadingStart={onLoadingStart}
            onLoadingEnd={onLoadingEnd}
          />
        );
      
      case 'knowledge':
        return (
          <KnowledgeTest 
            basicInfo={basicInfo} 
            onComplete={onKnowledgeComplete} 
            onInputChange={() => setInputChangeTrigger(prev => prev + 1)}
            onLoadingStart={onLoadingStart}
            onLoadingEnd={onLoadingEnd}
          />
        );
      
      case 'communication':
        return (
          <CommunicationTest 
            basicInfo={basicInfo} 
            onComplete={onCommunicationComplete} 
            onInputChange={() => setInputChangeTrigger(prev => prev + 1)} 
            onStateChange={setCommunicationState}
            onLoadingStart={onLoadingStart}
            onLoadingEnd={onLoadingEnd}
          />
        );
      
      case 'thankyou':
        return (
          <ThankYou
            onRestart={onResetAssessment}
            basicInfo={basicInfo}
            mcqResults={mcqResults}
            knowledgeResults={knowledgeResults}
            communicationResults={communicationResults}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div style={{
      paddingTop: currentStep === 'start' ? '0' : '100px',
      minHeight: currentStep === 'start' ? '100vh' : 'calc(100vh - 100px)'
    }}>
      {renderStep()}
    </div>
  );
};

export default AssessmentFlow;
