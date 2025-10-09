import { useState } from 'react';

export const useAssessmentState = () => {
  const [currentStep, setCurrentStep] = useState('start');
  const [basicInfo, setBasicInfo] = useState(null);
  const [mcqResults, setMcqResults] = useState(null);
  const [knowledgeResults, setKnowledgeResults] = useState(null);
  const [communicationResults, setCommunicationResults] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    mobileNumber: '',
    dob: '',
    experienceType: '',
    yearOfExperience: -1
  });
  const [mcqState, setMcqState] = useState({
    currentQuestion: 0,
    totalQuestions: 0,
    isLastQuestion: false,
    isSubmitting: false,
    isCurrentQuestionAnswered: false
  });
  const [inputChangeTrigger, setInputChangeTrigger] = useState(0);
  const [communicationState, setCommunicationState] = useState({
    hasAudio: false,
    hasTranscript: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');

  const resetAssessment = () => {
    setCurrentStep('start');
    setBasicInfo(null);
    setMcqResults(null);
    setKnowledgeResults(null);
    setCommunicationResults(null);
  };

  return {
    // State
    currentStep,
    setCurrentStep,
    basicInfo,
    setBasicInfo,
    mcqResults,
    setMcqResults,
    knowledgeResults,
    setKnowledgeResults,
    communicationResults,
    setCommunicationResults,
    isProcessing,
    setIsProcessing,
    isDisabled,
    setIsDisabled,
    formData,
    setFormData,
    mcqState,
    setMcqState,
    inputChangeTrigger,
    setInputChangeTrigger,
    communicationState,
    setCommunicationState,
    isLoading,
    setIsLoading,
    loadingMessage,
    setLoadingMessage,
    // Actions
    resetAssessment
  };
};
