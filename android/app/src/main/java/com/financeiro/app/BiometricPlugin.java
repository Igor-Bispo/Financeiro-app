package com.financeiro.app;

import android.os.Build;
import androidx.biometric.BiometricManager;
import androidx.biometric.BiometricPrompt;
import androidx.core.content.ContextCompat;
import androidx.fragment.app.FragmentActivity;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

import java.util.concurrent.Executor;

@CapacitorPlugin(name = "BiometricAuth")
public class BiometricPlugin extends Plugin {

    @PluginMethod
    public void isAvailable(PluginCall call) {
        BiometricManager biometricManager = BiometricManager.from(getContext());
        
        int canAuthenticate = biometricManager.canAuthenticate(
            BiometricManager.Authenticators.BIOMETRIC_STRONG | 
            BiometricManager.Authenticators.BIOMETRIC_WEAK
        );
        
        JSObject result = new JSObject();
        
        switch (canAuthenticate) {
            case BiometricManager.BIOMETRIC_SUCCESS:
                result.put("isAvailable", true);
                result.put("biometryType", getBiometryType());
                result.put("reason", "");
                break;
                
            case BiometricManager.BIOMETRIC_ERROR_NO_HARDWARE:
                result.put("isAvailable", false);
                result.put("biometryType", "none");
                result.put("reason", "Nenhum hardware biométrico disponível");
                break;
                
            case BiometricManager.BIOMETRIC_ERROR_HW_UNAVAILABLE:
                result.put("isAvailable", false);
                result.put("biometryType", getBiometryType());
                result.put("reason", "Hardware biométrico indisponível no momento");
                break;
                
            case BiometricManager.BIOMETRIC_ERROR_NONE_ENROLLED:
                result.put("isAvailable", false);
                result.put("biometryType", getBiometryType());
                result.put("reason", "Nenhuma biometria cadastrada no dispositivo");
                break;
                
            default:
                result.put("isAvailable", false);
                result.put("biometryType", "none");
                result.put("reason", "Biometria não suportada");
        }
        
        call.resolve(result);
    }
    
    @PluginMethod
    public void authenticate(PluginCall call) {
        String title = call.getString("title", "Autenticação Biométrica");
        String subtitle = call.getString("subtitle", "Use sua biometria para continuar");
        String description = call.getString("description", "");
        String negativeButtonText = call.getString("negativeButtonText", "Cancelar");
        
        FragmentActivity activity = getActivity();
        
        if (activity == null) {
            call.reject("Activity não disponível");
            return;
        }
        
        Executor executor = ContextCompat.getMainExecutor(getContext());
        
        BiometricPrompt biometricPrompt = new BiometricPrompt(
            activity,
            executor,
            new BiometricPrompt.AuthenticationCallback() {
                @Override
                public void onAuthenticationSucceeded(BiometricPrompt.AuthenticationResult result) {
                    super.onAuthenticationSucceeded(result);
                    
                    JSObject ret = new JSObject();
                    ret.put("success", true);
                    ret.put("message", "Autenticação bem-sucedida");
                    call.resolve(ret);
                }
                
                @Override
                public void onAuthenticationFailed() {
                    super.onAuthenticationFailed();
                    // Não rejeitar aqui - dar mais chances ao usuário
                }
                
                @Override
                public void onAuthenticationError(int errorCode, CharSequence errString) {
                    super.onAuthenticationError(errorCode, errString);
                    
                    JSObject ret = new JSObject();
                    ret.put("success", false);
                    ret.put("error", errString.toString());
                    ret.put("errorCode", errorCode);
                    
                    // Códigos de erro comuns:
                    // 10 = ERROR_USER_CANCELED
                    // 11 = ERROR_NEGATIVE_BUTTON
                    // 13 = ERROR_LOCKOUT
                    
                    if (errorCode == BiometricPrompt.ERROR_USER_CANCELED || 
                        errorCode == BiometricPrompt.ERROR_NEGATIVE_BUTTON) {
                        call.resolve(ret); // Cancelamento não é erro crítico
                    } else {
                        call.reject(errString.toString());
                    }
                }
            }
        );
        
        BiometricPrompt.PromptInfo.Builder promptBuilder = new BiometricPrompt.PromptInfo.Builder()
            .setTitle(title)
            .setSubtitle(subtitle)
            .setNegativeButtonText(negativeButtonText)
            .setAllowedAuthenticators(
                BiometricManager.Authenticators.BIOMETRIC_STRONG | 
                BiometricManager.Authenticators.BIOMETRIC_WEAK |
                BiometricManager.Authenticators.DEVICE_CREDENTIAL
            );
        
        if (!description.isEmpty()) {
            promptBuilder.setDescription(description);
        }
        
        BiometricPrompt.PromptInfo promptInfo = promptBuilder.build();
        
        biometricPrompt.authenticate(promptInfo);
    }
    
    private String getBiometryType() {
        // Detectar tipo de biometria disponível
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
            return "face-fingerprint"; // Pode ter ambos
        } else if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
            return "fingerprint"; // Apenas impressão digital antes do Android 10
        }
        return "none";
    }
}


