import React, { useState, useRef } from 'react';
import geminiService from '../services/geminiService';

const CommunicationTest = ({ onComplete }) => {
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
        setAudioBlob(blob);
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
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Communication Test</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
          Select Language:
        </label>
        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          style={{
            padding: '8px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '14px'
          }}
          disabled={isRecording}
        >
          <option value="en-US">English</option>
          <option value="hi-IN">Hindi</option>
        </select>
      </div>

      <div style={{ 
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '20px',
        backgroundColor: '#f9f9f9'
      }}>
        <h3>Scenario:</h3>
        <p style={{ fontSize: '16px', lineHeight: '1.5' }}>{scenario}</p>
      </div>

      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        {!isRecording ? (
          <button
            onClick={startRecording}
            style={{
              backgroundColor: '#4caf50',
              color: 'white',
              padding: '15px 30px',
              border: 'none',
              borderRadius: '50px',
              fontSize: '16px',
              cursor: 'pointer',
              margin: '0 10px'
            }}
          >
            🎤 Start Recording
          </button>
        ) : (
          <button
            onClick={stopRecording}
            style={{
              backgroundColor: '#f44336',
              color: 'white',
              padding: '15px 30px',
              border: 'none',
              borderRadius: '50px',
              fontSize: '16px',
              cursor: 'pointer',
              margin: '0 10px'
            }}
          >
            ⏹️ Stop Recording
          </button>
        )}
      </div>

      {isRecording && (
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div style={{ 
            width: '20px',
            height: '20px',
            backgroundColor: '#f44336',
            borderRadius: '50%',
            display: 'inline-block',
            animation: 'pulse 1s infinite'
          }} />
          <p>Recording... Speak now</p>
        </div>
      )}

      {transcript && (
        <div style={{ marginBottom: '20px' }}>
          <h3>Live Transcript:</h3>
          <div style={{
            border: '1px solid #ddd',
            borderRadius: '4px',
            padding: '15px',
            backgroundColor: '#f5f5f5',
            minHeight: '100px',
            fontSize: '14px',
            lineHeight: '1.5'
          }}>
            {transcript}
          </div>
        </div>
      )}

      {audioBlob && (
        <div style={{ marginBottom: '20px' }}>
          <div style={{ marginBottom: '15px' }}>
            <h4>🎵 Recorded Audio:</h4>
            <audio controls style={{ width: '100%' }}>
              <source src={URL.createObjectURL(audioBlob)} type="audio/wav" />
              Your browser does not support the audio element.
            </audio>
            <p style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
              Audio size: {(audioBlob.size / 1024).toFixed(1)} KB
            </p>
          </div>
          
          {!transcript && (
            <div style={{ 
              marginBottom: '15px', 
              padding: '10px', 
              backgroundColor: '#fff3cd', 
              border: '1px solid #ffeaa7',
              borderRadius: '4px',
              fontSize: '14px'
            }}>
              <strong>No transcript detected.</strong> You can still submit the audio recording, 
              or manually enter what you said below:
              <textarea
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                placeholder="Enter your response manually..."
                style={{
                  width: '100%',
                  height: '80px',
                  padding: '8px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '14px',
                  marginTop: '10px'
                }}
              />
            </div>
          )}
          
          <div style={{ textAlign: 'center' }}>
            <button
              onClick={submitCommunicationTest}
              disabled={isProcessing}
              style={{
                backgroundColor: isProcessing ? '#ccc' : '#2196f3',
                color: 'white',
                padding: '12px 24px',
                border: 'none',
                borderRadius: '4px',
                fontSize: '16px',
                cursor: isProcessing ? 'not-allowed' : 'pointer'
              }}
            >
              {isProcessing ? 'Processing...' : 'Submit Communication Test'}
            </button>
            {!transcript.trim() && (
              <p style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
                Audio recorded successfully. You can submit without transcript or add text above.
              </p>
            )}
          </div>
        </div>
      )}

      <style>
        {`
          @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.5; }
            100% { opacity: 1; }
          }
        `}
      </style>
    </div>
  );
};

export default CommunicationTest;