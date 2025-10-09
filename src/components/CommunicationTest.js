import React, { useState, useRef } from 'react';
import geminiService from '../services/geminiService';

const CommunicationTest = ({ onComplete, onInputChange, onStateChange, onLoadingStart, onLoadingEnd }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [transcript, setTranscript] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en-US');
  const mediaRecorderRef = useRef(null);
  const recognitionRef = useRef(null);
  const audioChunksRef = useRef([]);

  const scenario = "A client asks: 'I've been feeling very anxious about my future. Can you help me understand what the stars say about overcoming my fears and finding peace?' Please respond with empathy and provide astrological guidance.";

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Reset audio chunks
      audioChunksRef.current = [];
      
      // Start audio recording
      mediaRecorderRef.current = new MediaRecorder(stream);
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorderRef.current.onstop = () => {
        console.log('MediaRecorder stopped, audio chunks:', audioChunksRef.current.length);
        const blob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        console.log('Audio blob created, size:', blob.size);
        // Only set audio blob and trigger input change if we actually have audio data
        if (blob.size > 0) {
          setAudioBlob(blob);
          if (onInputChange) onInputChange();
          if (onStateChange) onStateChange({ hasAudio: true, hasTranscript: !!transcript.trim() });
        }
        stream.getTracks().forEach(track => track.stop());
      };
      
      // Start speech recognition
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.lang = selectedLanguage;
        
        let finalTranscript = '';
        
        recognitionRef.current.onstart = () => {
          console.log('Speech recognition started');
        };
        
        recognitionRef.current.onresult = (event) => {
          console.log('Speech recognition result:', event);
          let interimTranscript = '';
          
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcriptText = event.results[i][0].transcript;
            console.log('Transcript piece:', transcriptText, 'isFinal:', event.results[i].isFinal);
            if (event.results[i].isFinal) {
              finalTranscript += transcriptText + ' ';
            } else {
              interimTranscript += transcriptText;
            }
          }
          
          const fullTranscript = finalTranscript + interimTranscript;
          console.log('Full transcript:', fullTranscript);
          setTranscript(fullTranscript);
        };
        
        recognitionRef.current.onerror = (event) => {
          console.error('Speech recognition error:', event.error);
          if (event.error === 'no-speech') {
            console.log('No speech detected');
          }
        };
        
        recognitionRef.current.onend = () => {
          console.log('Speech recognition ended');
        };
        
        try {
          recognitionRef.current.start();
          console.log('Speech recognition start requested');
        } catch (error) {
          console.error('Failed to start speech recognition:', error);
        }
      } else {
        console.log('Speech recognition not supported');
        alert('Speech recognition not supported in this browser. You can still record audio, but live transcription won\'t be available.');
      }
      
      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      alert('Error accessing microphone. Please ensure microphone permissions are granted.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
    }
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsRecording(false);
  };

  const submitCommunicationTest = async () => {
    if (!transcript.trim() && !audioBlob) {
      alert('Please record audio or provide a transcript of your response.');
      return;
    }

    setIsProcessing(true);
    if (onLoadingStart) onLoadingStart('Evaluating your communication skills...');
    
    try {
      const language = selectedLanguage.startsWith('hi') ? 'hindi' : 'english';
      
      // If no transcript, use a placeholder that indicates audio-only submission
      const finalTranscript = transcript.trim() || '[Audio recorded - no transcript available]';
      
      const result = await geminiService.scoreCommunicationText(
        finalTranscript,
        language,
        scenario
      );

      onComplete({
        transcript: finalTranscript,
        audioBlob,
        result,
        scenario
      });
    } catch (error) {
      console.error('Communication test error:', error);
      alert('Error processing communication test. Please try again.');
    } finally {
      setIsProcessing(false);
      if (onLoadingEnd) onLoadingEnd();
    }
  };

  return (
    <div style={{
      minHeight: 'calc(100vh - 100px)',
      background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%)',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header */}
      <div style={{ 
        textAlign: 'center', 
        marginBottom: '40px',
        maxWidth: '1200px',
        width: '100%',
        margin: '0 auto 40px auto'
      }}>
        <h1 style={{ 
          margin: 0,
          fontSize: '2.2rem',
          background: 'linear-gradient(135deg, #ea580c, #f97316, #fb923c)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          fontWeight: 'bold',
          marginBottom: '20px'
        }}>
          Communication Test
        </h1>
        
        <p style={{ 
          fontSize: '16px', 
          color: '#475569',
          lineHeight: '1.6',
          margin: 0
        }}>
          Demonstrate your communication skills by responding to a client scenario with empathy and astrological guidance.
        </p>
      </div>

      {/* Main Content - Two Column Layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '30px',
        maxWidth: '1200px',
        width: '100%',
        margin: '0 auto',
        flex: 1,
        alignItems: 'stretch',
        height: 'calc(100vh - 200px)',
        minHeight: '500px'
      }}>
        {/* Scenario Card */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '20px',
          padding: '20px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
          border: '2px solid transparent',
          background: 'linear-gradient(white, white) padding-box, linear-gradient(135deg, #ea580c, #f97316) border-box',
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
            marginBottom: '20px'
          }}>
            <div style={{
              fontSize: '2rem'
            }}>🎭</div>
            <h2 style={{ 
              color: '#ea580c', 
              margin: 0,
              fontSize: '1.5rem',
              fontWeight: 'bold'
            }}>
              Client Scenario
            </h2>
          </div>
          
          <div style={{ 
            flex: 1, 
            marginBottom: '20px'
          }}>
            <div style={{
              maxHeight: '173px', // 6 lines * 18px font * 1.6 line height
              overflowY: 'auto',
              marginBottom: '15px',
              paddingRight: '10px'
            }}>
              <p style={{ 
                fontSize: '18px', 
                lineHeight: '1.6', 
                color: '#374151',
                margin: 0
              }}>
                {scenario}
              </p>
            </div>
          </div>

          {/* Language Selection */}
          <div style={{
            borderTop: '1px solid #e2e8f0',
            paddingTop: '20px',
            marginBottom: '20px'
          }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '10px', 
              fontWeight: '600',
              color: '#374151',
              fontSize: '14px'
            }}>
              Select Language:
            </label>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '2px solid #e2e8f0',
                borderRadius: '10px',
                fontSize: '14px',
                backgroundColor: '#f8fafc',
                color: '#374151',
                outline: 'none',
                transition: 'all 0.3s ease'
              }}
              disabled={isRecording}
              onFocus={(e) => {
                e.target.style.borderColor = '#ea580c';
                e.target.style.backgroundColor = 'white';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e2e8f0';
                e.target.style.backgroundColor = '#f8fafc';
              }}
            >
              <option value="en-US">English</option>
              <option value="hi-IN">Hindi</option>
            </select>
          </div>

          {/* Additional Components */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '15px'
          }}>
            {/* Recording Tips */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 16px',
              backgroundColor: '#f0f9ff',
              borderRadius: '10px',
              border: '1px solid #bae6fd'
            }}>
              <span style={{ fontSize: '1.2rem' }}>🎤</span>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '14px', fontWeight: '600', color: '#0369a1', marginBottom: '2px' }}>
                  Recording Tips
                </div>
                <div style={{ fontSize: '12px', color: '#0c4a6e' }}>
                  Speak clearly and show empathy in your response
                </div>
              </div>
            </div>

            {/* Step-by-Step Instructions */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 16px',
              backgroundColor: '#f0fdf4',
              borderRadius: '10px',
              border: '1px solid #bbf7d0'
            }}>
              <span style={{ fontSize: '1.2rem' }}>📋</span>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '14px', fontWeight: '600', color: '#166534', marginBottom: '2px' }}>
                  How to Record
                </div>
                <div style={{ fontSize: '12px', color: '#14532d' }}>
                  1. Click "Start Recording" → 2. Speak your response → 3. Click "Stop Recording" → 4. Submit
                </div>
              </div>
            </div>

            {/* Retake Instructions */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 16px',
              backgroundColor: '#fefce8',
              borderRadius: '10px',
              border: '1px solid #fde047'
            }}>
              <span style={{ fontSize: '1.2rem' }}>🔄</span>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '14px', fontWeight: '600', color: '#a16207', marginBottom: '2px' }}>
                  Want to Retake?
                </div>
                <div style={{ fontSize: '12px', color: '#713f12' }}>
                  Click "Retake Recording" to delete current recording and start fresh
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recording Section */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '20px',
          padding: '20px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
            marginBottom: '15px'
          }}>
            <div style={{
              fontSize: '2rem'
            }}>🎙️</div>
            <h3 style={{ 
              color: '#ea580c', 
              margin: 0,
              fontSize: '1.5rem',
              fontWeight: 'bold'
            }}>
              Record Your Response
            </h3>
          </div>

          {/* Recording Controls */}
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            {!isRecording ? (
              <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
                {!audioBlob ? (
                  <button
                    onClick={startRecording}
                    style={{
                      background: 'linear-gradient(135deg, #ea580c, #f97316, #fb923c)',
                      color: 'white',
                      padding: '12px 24px',
                      border: 'none',
                      borderRadius: '25px',
                      fontSize: '16px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      boxShadow: '0 4px 15px rgba(249, 115, 22, 0.3)',
                      transition: 'all 0.3s ease',
                      minWidth: '160px'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 6px 20px rgba(249, 115, 22, 0.4)';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 4px 15px rgba(249, 115, 22, 0.3)';
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                      <span>🎤</span>
                      <span>Start Recording</span>
                    </span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setAudioBlob(null);
                      setTranscript('');
                      if (onInputChange) onInputChange();
                      if (onStateChange) onStateChange({ hasAudio: false, hasTranscript: false });
                      startRecording();
                    }}
                    style={{
                      background: 'linear-gradient(135deg, #ea580c, #f97316, #fb923c)',
                      color: 'white',
                      padding: '12px 24px',
                      border: 'none',
                      borderRadius: '25px',
                      fontSize: '16px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      boxShadow: '0 4px 15px rgba(249, 115, 22, 0.3)',
                      transition: 'all 0.3s ease',
                      minWidth: '160px'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 6px 20px rgba(249, 115, 22, 0.4)';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 4px 15px rgba(249, 115, 22, 0.3)';
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                      <span>🎙️</span>
                      <span>Retake Recording</span>
                    </span>
                  </button>
                )}
              </div>
            ) : (
              <button
                onClick={stopRecording}
                style={{
                  background: 'linear-gradient(135deg, #dc2626, #ef4444, #f87171)',
                  color: 'white',
                  padding: '12px 24px',
                  border: 'none',
                  borderRadius: '25px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  boxShadow: '0 4px 15px rgba(220, 38, 38, 0.3)',
                  transition: 'all 0.3s ease',
                  minWidth: '160px'
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 20px rgba(220, 38, 38, 0.4)';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 15px rgba(220, 38, 38, 0.3)';
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                  <span>⏹️</span>
                  <span>Stop Recording</span>
                </span>
              </button>
            )}
          </div>

          {/* Recording Status */}
          {isRecording && (
            <div style={{ 
              textAlign: 'center', 
              marginBottom: '30px',
              padding: '20px',
              backgroundColor: '#fef2f2',
              borderRadius: '15px',
              border: '2px solid #fecaca'
            }}>
              <div style={{ 
                width: '24px',
                height: '24px',
                backgroundColor: '#dc2626',
                borderRadius: '50%',
                display: 'inline-block',
                marginBottom: '10px',
                animation: 'pulse 1.5s infinite'
              }} />
              <p style={{ 
                margin: 0, 
                color: '#dc2626', 
                fontWeight: '600',
                fontSize: '16px'
              }}>
                Recording... Speak now
              </p>
            </div>
          )}

          {/* Transcript Display */}
          {transcript && (
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ 
                color: '#ea580c', 
                marginBottom: '10px',
                fontSize: '1.1rem',
                fontWeight: '600'
              }}>
                Live Transcript:
              </h4>
              <div style={{
                border: '2px solid #e2e8f0',
                borderRadius: '12px',
                padding: '15px',
                backgroundColor: '#f8fafc',
                minHeight: '120px',
                fontSize: '14px',
                lineHeight: '1.6',
                color: '#374151'
              }}>
                {transcript}
              </div>
            </div>
          )}

          {/* Audio Player */}
          {audioBlob && (
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ 
                color: '#ea580c', 
                marginBottom: '10px',
                fontSize: '1.1rem',
                fontWeight: '600'
              }}>
                🎵 Recorded Audio:
              </h4>
              <audio controls style={{ 
                width: '100%',
                borderRadius: '10px'
              }}>
                <source src={URL.createObjectURL(audioBlob)} type="audio/wav" />
                Your browser does not support the audio element.
              </audio>
              <p style={{ 
                fontSize: '12px', 
                color: '#64748b', 
                marginTop: '8px',
                textAlign: 'center'
              }}>
                Audio size: {(audioBlob.size / 1024).toFixed(1)} KB
              </p>
            </div>
          )}

          {/* Manual Transcript Input */}
          {audioBlob && !transcript && (
            <div style={{ 
              marginBottom: '20px', 
              padding: '15px', 
              backgroundColor: '#fef3c7', 
              border: '1px solid #fde047',
              borderRadius: '12px',
              fontSize: '14px'
            }}>
              <div style={{ fontWeight: '600', color: '#92400e', marginBottom: '8px' }}>
                No transcript detected
              </div>
              <div style={{ color: '#a16207', marginBottom: '10px' }}>
                You can still submit the audio recording, or manually enter what you said:
              </div>
              <textarea
                value={transcript}
                onChange={(e) => {
                  setTranscript(e.target.value);
                  if (onInputChange) onInputChange();
                  if (onStateChange) onStateChange({ hasAudio: !!audioBlob, hasTranscript: !!e.target.value.trim() });
                }}
                placeholder="Enter your response manually..."
                style={{
                  width: '100%',
                  height: '120px',
                  maxHeight: '200px',
                  padding: '12px',
                  border: '2px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '14px',
                  backgroundColor: 'white',
                  outline: 'none',
                  resize: 'vertical',
                  overflowY: 'auto'
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Submit Button - Hidden, handled by header */}
      <div style={{ display: 'none' }}>
        <button
          onClick={submitCommunicationTest}
          disabled={isProcessing || !audioBlob}
          data-testid="communication-submit"
          style={{
            background: isProcessing ? 'linear-gradient(135deg, #6b7280, #9ca3af, #d1d5db)' : 
                       !audioBlob ? 'linear-gradient(135deg, #9ca3af, #d1d5db, #e5e7eb)' : 
                       'linear-gradient(135deg, #ea580c, #f97316, #fb923c)',
            color: 'white',
            padding: '14px 28px',
            border: 'none',
            borderRadius: '50px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: isProcessing || !audioBlob ? 'not-allowed' : 'pointer',
            boxShadow: isProcessing ? '0 4px 15px rgba(107, 114, 128, 0.3)' : 
                      !audioBlob ? '0 4px 15px rgba(156, 163, 175, 0.3)' :
                      '0 4px 15px rgba(249, 115, 22, 0.3)',
            transition: 'all 0.3s ease',
            opacity: isProcessing || !audioBlob ? 0.6 : 1,
            minWidth: '180px',
            outline: 'none'
          }}
        >
          {isProcessing ? (
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
              <span>⏳</span>
              <span>Processing...</span>
            </span>
          ) : !audioBlob ? (
            <span>Record Audio to Submit</span>
          ) : (
            <span>Submit Response</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default CommunicationTest;