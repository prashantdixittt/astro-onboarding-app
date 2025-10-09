import React from 'react';

const Results = ({ basicInfo, mcqResults, knowledgeResults, communicationResults, onRestart }) => {
  const calculateOverallScore = () => {
    const mcqWeight = 0.3; // 30% weight for MCQ
    const knowledgeWeight = 0.4; // 40% weight for knowledge  
    const communicationWeight = 0.3; // 30% weight for communication
    
    const mcqScore = mcqResults?.score || 0;
    const knowledgeScore = knowledgeResults?.averageScore || 0;
    const communicationScore = communicationResults?.result?.score || 0;
    
    return Math.round((mcqScore * mcqWeight) + (knowledgeScore * knowledgeWeight) + (communicationScore * communicationWeight));
  };

  const getGradeColor = (score) => {
    if (score >= 80) return '#ea580c'; // Orange
    if (score >= 60) return '#ff9800'; // Orange
    return '#f44336'; // Red
  };

  const getGrade = (score) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    return 'Needs Improvement';
  };

  const overallScore = calculateOverallScore();

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Astrologer Assessment Results</h1>
      
      {/* Candidate Info */}
      {basicInfo && (
        <div style={{
          border: '1px solid #ddd',
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '20px',
          backgroundColor: '#f8f9fa'
        }}>
          <h3 style={{ color: '#ea580c', marginBottom: '15px' }}>👤 Candidate Information</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px', fontSize: '14px' }}>
            <div><strong>Name:</strong> {basicInfo.name}</div>
            <div><strong>Mobile:</strong> {basicInfo.mobileNumber}</div>
            <div><strong>Experience:</strong> {basicInfo.experienceType}</div>
            <div><strong>Years:</strong> {basicInfo.yearOfExperience} years</div>
            <div><strong>Self Rating:</strong> {basicInfo.selfRate}/10</div>
            <div><strong>DOB:</strong> {basicInfo.dob}</div>
          </div>
        </div>
      )}
      
      {/* Overall Score Card */}
      <div style={{
        border: '2px solid ' + getGradeColor(overallScore),
        borderRadius: '12px',
        padding: '30px',
        marginBottom: '30px',
        textAlign: 'center',
        backgroundColor: '#f9f9f9'
      }}>
        <h2 style={{ margin: '0 0 10px 0' }}>Overall Score</h2>
        <div style={{ 
          fontSize: '48px', 
          fontWeight: 'bold', 
          color: getGradeColor(overallScore),
          margin: '10px 0'
        }}>
          {overallScore}/100
        </div>
        <div style={{ 
          fontSize: '24px', 
          color: getGradeColor(overallScore),
          fontWeight: 'bold'
        }}>
          {getGrade(overallScore)}
        </div>
        <div style={{ fontSize: '14px', color: '#666', marginTop: '10px' }}>
          MCQ (30%) + Knowledge (40%) + Communication (30%)
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        {/* MCQ Test Results */}
        {mcqResults && (
          <div style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '20px',
            backgroundColor: 'white'
          }}>
            <h3 style={{ color: '#ff9800', marginBottom: '15px' }}>📝 MCQ Test</h3>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: getGradeColor(mcqResults.score) }}>
              {mcqResults.score}/100
            </div>
            <p style={{ margin: '10px 0', color: '#666' }}>
              {mcqResults.correctAnswers} out of {mcqResults.totalQuestions} correct
            </p>
            <div style={{ fontSize: '14px', color: '#666' }}>
              <strong>Subject:</strong> {basicInfo?.experience?.type}<br/>
              <strong>Difficulty:</strong> {basicInfo?.yearOfExperience <= 2 ? 'Beginner' : 
                                            basicInfo?.yearOfExperience <= 5 ? 'Intermediate' : 'Expert'}
            </div>
          </div>
        )}
        {/* Knowledge Test Results */}
        {knowledgeResults && (
          <div style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '20px',
            backgroundColor: 'white'
          }}>
            <h3 style={{ color: '#ea580c', marginBottom: '15px' }}>📚 Knowledge Test</h3>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: getGradeColor(knowledgeResults.averageScore) }}>
              {Math.round(knowledgeResults.averageScore)}/100
            </div>
            <p style={{ margin: '10px 0', color: '#666' }}>
              Average score across {knowledgeResults.detailedResults.length} questions
            </p>
            
            <h4 style={{ marginTop: '20px', marginBottom: '10px' }}>Question Breakdown:</h4>
            {knowledgeResults.detailedResults.map((result, index) => (
              <div key={index} style={{
                border: '1px solid #eee',
                borderRadius: '4px',
                padding: '10px',
                marginBottom: '8px',
                fontSize: '14px'
              }}>
                <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                  Q{index + 1}: {result.result.score}/100
                </div>
                <div style={{ fontSize: '12px', color: '#666' }}>
                  {result.result.feedback.substring(0, 100)}...
                </div>
                <div style={{ marginTop: '5px', fontSize: '12px' }}>
                  <span style={{ marginRight: '10px' }}>Accuracy: {result.result.breakdown.accuracy}/40</span>
                  <span style={{ marginRight: '10px' }}>Relevance: {result.result.breakdown.relevance}/30</span>
                  <span>Terminology: {result.result.breakdown.terminology}/20</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Communication Test Results */}
        {communicationResults && (
          <div style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '20px',
            backgroundColor: 'white'
          }}>
            <h3 style={{ color: '#ff5722', marginBottom: '15px' }}>🎤 Communication Test</h3>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: getGradeColor(communicationResults.result.score) }}>
              {communicationResults.result.score}/100
            </div>
            <div style={{ fontSize: '20px', fontWeight: 'bold', color: getGradeColor(communicationResults.result.confidence), marginTop: '10px' }}>
              Confidence: {communicationResults.result.confidence}/100
            </div>
            
            <h4 style={{ marginTop: '20px', marginBottom: '10px' }}>Communication Breakdown:</h4>
            <div style={{ fontSize: '14px' }}>
              <div style={{ marginBottom: '5px' }}>
                <strong>Clarity:</strong> {communicationResults.result.breakdown.clarity}/25
              </div>
              <div style={{ marginBottom: '5px' }}>
                <strong>Vocabulary:</strong> {communicationResults.result.breakdown.vocabulary}/25
              </div>
              <div style={{ marginBottom: '5px' }}>
                <strong>Empathy:</strong> {communicationResults.result.breakdown.empathy}/25
              </div>
              <div style={{ marginBottom: '15px' }}>
                <strong>Structure:</strong> {communicationResults.result.breakdown.structure}/25
              </div>
            </div>

            <h4 style={{ marginBottom: '10px' }}>Feedback:</h4>
            <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.4' }}>
              {communicationResults.result.feedback}
            </p>

            {communicationResults.result.issues && communicationResults.result.issues.length > 0 && (
              <>
                <h4 style={{ marginTop: '15px', marginBottom: '10px' }}>Areas for Improvement:</h4>
                <ul style={{ fontSize: '14px', color: '#666', paddingLeft: '20px' }}>
                  {communicationResults.result.issues.map((issue, index) => (
                    <li key={index} style={{ marginBottom: '5px' }}>{issue}</li>
                  ))}
                </ul>
              </>
            )}

            <h4 style={{ marginTop: '15px', marginBottom: '10px' }}>Transcript:</h4>
            <div style={{
              border: '1px solid #eee',
              borderRadius: '4px',
              padding: '10px',
              backgroundColor: '#f9f9f9',
              fontSize: '12px',
              maxHeight: '100px',
              overflow: 'auto'
            }}>
              {communicationResults.transcript}
            </div>
          </div>
        )}
      </div>

      {/* Recommendation */}
      <div style={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '20px',
        backgroundColor: '#f0f8ff',
        marginBottom: '20px'
      }}>
        <h3 style={{ color: '#ea580c', marginBottom: '15px' }}>💡 Recommendation</h3>
        <p style={{ fontSize: '16px', lineHeight: '1.5', margin: 0 }}>
          {overallScore >= 80 && "Excellent! This candidate demonstrates strong astrological knowledge and communication skills. Recommended for onboarding."}
          {overallScore >= 60 && overallScore < 80 && "Good performance with room for improvement. Consider additional training in weaker areas before full onboarding."}
          {overallScore < 60 && "Significant improvement needed. Recommend comprehensive training program before considering for client-facing roles."}
        </p>
      </div>

      <div style={{ textAlign: 'center' }}>
        <button
          onClick={onRestart}
          style={{
            backgroundColor: '#ea580c',
            color: 'white',
            padding: '12px 24px',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            cursor: 'pointer'
          }}
        >
          Start New Assessment
        </button>
      </div>
    </div>
  );
};

export default Results;