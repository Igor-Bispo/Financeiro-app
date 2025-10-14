package com.financeiro.app;

import android.Manifest;
import android.content.Intent;
import android.speech.RecognitionListener;
import android.speech.RecognizerIntent;
import android.speech.SpeechRecognizer;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.getcapacitor.annotation.Permission;
import java.util.ArrayList;
import java.util.Locale;

@CapacitorPlugin(
    name = "SpeechRecognitionPlugin",
    permissions = {
        @Permission(
            strings = { Manifest.permission.RECORD_AUDIO },
            alias = "microphone"
        )
    }
)
public class SpeechRecognitionPlugin extends Plugin {
    
    private SpeechRecognizer speechRecognizer;
    private boolean isListening = false;
    
    @PluginMethod
    public void isAvailable(PluginCall call) {
        JSObject result = new JSObject();
        result.put("available", SpeechRecognizer.isRecognitionAvailable(getContext()));
        call.resolve(result);
    }
    
    @PluginMethod
    public void startListening(PluginCall call) {
        if (!getPermissionState("microphone").equals("granted")) {
            requestPermissionForAlias("microphone", call, "permissionCallback");
            return;
        }
        
        startSpeechRecognition(call);
    }
    
    private void startSpeechRecognition(PluginCall call) {
        if (isListening) {
            JSObject error = new JSObject();
            error.put("error", "Already listening");
            call.reject("Already listening", error);
            return;
        }
        
        try {
            if (speechRecognizer != null) {
                speechRecognizer.destroy();
            }
            
            speechRecognizer = SpeechRecognizer.createSpeechRecognizer(getContext());
            
            Intent intent = new Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH);
            intent.putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_FREE_FORM);
            intent.putExtra(RecognizerIntent.EXTRA_LANGUAGE, Locale.getDefault());
            intent.putExtra(RecognizerIntent.EXTRA_PARTIAL_RESULTS, true);
            intent.putExtra(RecognizerIntent.EXTRA_MAX_RESULTS, 1);
            
            speechRecognizer.setRecognitionListener(new RecognitionListener() {
                @Override
                public void onReadyForSpeech(android.os.Bundle params) {
                    isListening = true;
                    JSObject result = new JSObject();
                    result.put("event", "ready");
                    notifyListeners("speechRecognitionEvent", result);
                }
                
                @Override
                public void onEvent(int eventType, android.os.Bundle params) {
                    // Método necessário para RecognitionListener
                }
                
                @Override
                public void onResults(android.os.Bundle results) {
                    isListening = false;
                    ArrayList<String> matches = results.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION);
                    if (matches != null && !matches.isEmpty()) {
                        JSObject result = new JSObject();
                        result.put("event", "result");
                        result.put("text", matches.get(0));
                        notifyListeners("speechRecognitionEvent", result);
                        call.resolve(result);
                    }
                }
                
                @Override
                public void onError(int error) {
                    isListening = false;
                    String errorMessage = getErrorMessage(error);
                    JSObject result = new JSObject();
                    result.put("event", "error");
                    result.put("error", errorMessage);
                    notifyListeners("speechRecognitionEvent", result);
                    call.reject(errorMessage, result);
                }
                
                @Override
                public void onPartialResults(android.os.Bundle partialResults) {
                    ArrayList<String> matches = partialResults.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION);
                    if (matches != null && !matches.isEmpty()) {
                        JSObject result = new JSObject();
                        result.put("event", "partial");
                        result.put("text", matches.get(0));
                        notifyListeners("speechRecognitionEvent", result);
                    }
                }
                
                @Override
                public void onBeginningOfSpeech() {
                    JSObject result = new JSObject();
                    result.put("event", "start");
                    notifyListeners("speechRecognitionEvent", result);
                }
                
                @Override
                public void onEndOfSpeech() {
                    JSObject result = new JSObject();
                    result.put("event", "end");
                    notifyListeners("speechRecognitionEvent", result);
                }
                
                @Override
                public void onBufferReceived(byte[] buffer) {}
                
                @Override
                public void onRmsChanged(float rmsdB) {}
            });
            
            speechRecognizer.startListening(intent);
            
        } catch (Exception e) {
            JSObject error = new JSObject();
            error.put("error", e.getMessage());
            call.reject("Speech recognition failed", error);
        }
    }
    
    @PluginMethod
    public void stopListening(PluginCall call) {
        if (speechRecognizer != null && isListening) {
            speechRecognizer.stopListening();
            isListening = false;
        }
        JSObject result = new JSObject();
        result.put("stopped", true);
        call.resolve(result);
    }
    
    private String getErrorMessage(int error) {
        switch (error) {
            case SpeechRecognizer.ERROR_AUDIO:
                return "Audio recording error";
            case SpeechRecognizer.ERROR_CLIENT:
                return "Client side error";
            case SpeechRecognizer.ERROR_INSUFFICIENT_PERMISSIONS:
                return "Insufficient permissions";
            case SpeechRecognizer.ERROR_NETWORK:
                return "Network error";
            case SpeechRecognizer.ERROR_NETWORK_TIMEOUT:
                return "Network timeout";
            case SpeechRecognizer.ERROR_NO_MATCH:
                return "No speech input";
            case SpeechRecognizer.ERROR_RECOGNIZER_BUSY:
                return "Recognition service busy";
            case SpeechRecognizer.ERROR_SERVER:
                return "Server error";
            case SpeechRecognizer.ERROR_SPEECH_TIMEOUT:
                return "No speech input timeout";
            default:
                return "Recognition error";
        }
    }
    
    private void permissionCallback(PluginCall call) {
        if (getPermissionState("microphone").equals("granted")) {
            startSpeechRecognition(call);
        } else {
            JSObject error = new JSObject();
            error.put("error", "Microphone permission denied");
            call.reject("Permission denied", error);
        }
    }
    
    @Override
    protected void handleOnDestroy() {
        if (speechRecognizer != null) {
            speechRecognizer.destroy();
            speechRecognizer = null;
        }
        isListening = false;
        super.handleOnDestroy();
    }
}