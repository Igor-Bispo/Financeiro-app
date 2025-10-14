package com.financeiro.app;

import android.Manifest;
import android.os.Bundle;
import android.webkit.PermissionRequest;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        // Registrar plugins ANTES de super.onCreate
        registerPlugin(BiometricPlugin.class);
        registerPlugin(SpeechRecognitionPlugin.class);
        
        super.onCreate(savedInstanceState);
        
        // Otimizações mínimas e seguras para WebView
        WebView webView = getBridge().getWebView();
        if (webView != null) {
            WebSettings settings = webView.getSettings();
            
            // Apenas otimizações essenciais e seguras
            settings.setDomStorageEnabled(true); // Habilitar localStorage
            settings.setDatabaseEnabled(true); // Habilitar IndexedDB
            settings.setMixedContentMode(WebSettings.MIXED_CONTENT_ALWAYS_ALLOW);
            
            // Configurações para permitir acesso ao microfone
            settings.setMediaPlaybackRequiresUserGesture(false);
            
            // Configurar WebChromeClient para permitir permissões de microfone
            webView.setWebChromeClient(new WebChromeClient() {
                @Override
                public void onPermissionRequest(PermissionRequest request) {
                    // Conceder automaticamente permissões de microfone
                    String[] resources = request.getResources();
                    for (String resource : resources) {
                        if (PermissionRequest.RESOURCE_AUDIO_CAPTURE.equals(resource)) {
                            request.grant(resources);
                            return;
                        }
                    }
                    request.deny();
                }
            });
            
            // Limpar cache apenas uma vez ao iniciar
            webView.clearCache(true);
        }
    }
    
    @Override
    public void onDestroy() {
        // Limpar WebView ao destruir activity
        WebView webView = getBridge().getWebView();
        if (webView != null) {
            webView.clearCache(true);
            webView.clearHistory();
        }
        super.onDestroy();
    }
}
