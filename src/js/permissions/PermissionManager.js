/**
 * Sistema de Gerenciamento de Permissões para APK Android
 * Solicita permissões necessárias para microfone e notificações
 */

class PermissionManager {
    constructor() {
        this.isCapacitor = window.Capacitor && window.Capacitor.isNativePlatform();
        this.permissions = {
            microphone: false,
            notifications: false,
            camera: false
        };
    }

    /**
     * Inicializa o sistema de permissões
     */
    async init() {
        if (!this.isCapacitor) {
            console.log('📱 Não é um ambiente nativo - permissões web apenas');
            return;
        }

        console.log('🔐 Inicializando sistema de permissões...');
        
        // Verificar permissões existentes
        await this.checkPermissions();
        
        // Solicitar permissões necessárias
        await this.requestRequiredPermissions();
    }

    /**
     * Verifica status atual das permissões
     */
    async checkPermissions() {
        if (!this.isCapacitor) return;

        try {
            // Verificar permissão de microfone
            if (navigator.permissions) {
                const micPermission = await navigator.permissions.query({ name: 'microphone' });
                this.permissions.microphone = micPermission.state === 'granted';
                console.log('🎤 Permissão microfone:', micPermission.state);
            }

            // Verificar permissão de notificações
            if (Notification) {
                this.permissions.notifications = Notification.permission === 'granted';
                console.log('🔔 Permissão notificações:', Notification.permission);
            }
        } catch (error) {
            console.warn('⚠️ Erro verificando permissões:', error);
        }
    }

    /**
     * Solicita todas as permissões necessárias
     */
    async requestRequiredPermissions() {
        if (!this.isCapacitor) {
            return await this.requestWebPermissions();
        }

        try {
            // Solicitar permissão de microfone
            await this.requestMicrophonePermission();
            
            // Solicitar permissão de notificações  
            await this.requestNotificationPermission();
            
            console.log('✅ Permissões configuradas:', this.permissions);
        } catch (error) {
            console.error('❌ Erro solicitando permissões:', error);
        }
    }

    /**
     * Solicita permissão específica do microfone
     */
    async requestMicrophonePermission() {
    try {
      console.log('🎤 [PermissionManager] Solicitando permissão do microfone...');
      
      if (window.Capacitor && window.Capacitor.Plugins.Device) {
        console.log('📱 [PermissionManager] Ambiente Capacitor detectado');
        // Tentar solicitar via navigator primeiro
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        if (stream) {
          this.permissions.microphone = true;
          console.log('✅ [PermissionManager] Permissão de microfone concedida');
          // Parar o stream imediatamente
          stream.getTracks().forEach(track => track.stop());
          return true;
        }
      } else {
        console.log('🌐 [PermissionManager] Ambiente web detectado');
        // Fallback para web
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        if (stream) {
          this.permissions.microphone = true;
          console.log('✅ [PermissionManager] Permissão de microfone concedida (web)');
          stream.getTracks().forEach(track => track.stop());
          return true;
        }
      }
      
      this.permissions.microphone = false;
      return false;
    } catch (error) {
      console.warn('⚠️ [PermissionManager] Erro solicitando permissão de microfone:', error);
      this.permissions.microphone = false;
      return false;
    }
  }

    /**
     * Solicita permissão de notificações
     */
    async requestNotificationPermission() {
        try {
            if (Notification) {
                const permission = await Notification.requestPermission();
                this.permissions.notifications = permission === 'granted';
                console.log('🔔 Permissão notificações:', permission);
            }
        } catch (error) {
            console.warn('⚠️ Erro solicitando permissão de notificações:', error);
            this.permissions.notifications = false;
        }
    }

    /**
     * Solicita permissões em ambiente web
     */
    async requestWebPermissions() {
        try {
            // Solicitar microfone
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            if (stream) {
                this.permissions.microphone = true;
                stream.getTracks().forEach(track => track.stop());
            }

            // Solicitar notificações
            if (Notification) {
                const permission = await Notification.requestPermission();
                this.permissions.notifications = permission === 'granted';
            }
        } catch (error) {
            console.warn('⚠️ Erro em permissões web:', error);
        }
    }

    /**
     * Verifica se todas as permissões necessárias estão concedidas
     */
    hasAllPermissions() {
        return this.permissions.microphone && this.permissions.notifications;
    }

    /**
     * Mostra dialog explicativo sobre permissões
     */
    showPermissionDialog() {
        const dialog = `
            <div id="permission-dialog" style="
                position: fixed; top: 0; left: 0; right: 0; bottom: 0; 
                background: rgba(0,0,0,0.8); z-index: 10000; 
                display: flex; align-items: center; justify-content: center;
            ">
                <div style="
                    background: white; padding: 20px; border-radius: 8px; 
                    max-width: 400px; text-align: center; margin: 20px;
                ">
                    <h3 style="color: #1f2937; margin-bottom: 15px;">🔐 Permissões Necessárias</h3>
                    <p style="color: #6b7280; margin-bottom: 20px;">
                        Para usar o reconhecimento de voz e receber notificações, 
                        precisamos das seguintes permissões:
                    </p>
                    <div style="text-align: left; margin-bottom: 20px;">
                        <p style="margin: 5px 0;"><strong>🎤 Microfone:</strong> Para reconhecimento de voz</p>
                        <p style="margin: 5px 0;"><strong>🔔 Notificações:</strong> Para alertas e lembretes</p>
                    </div>
                    <button onclick="window.permissionManager.requestRequiredPermissions().then(() => document.getElementById('permission-dialog').remove())" 
                            style="
                                background: #3b82f6; color: white; border: none; 
                                padding: 10px 20px; border-radius: 5px; cursor: pointer;
                            ">
                        Conceder Permissões
                    </button>
                    <button onclick="document.getElementById('permission-dialog').remove()" 
                            style="
                                background: #6b7280; color: white; border: none; 
                                padding: 10px 20px; border-radius: 5px; cursor: pointer; margin-left: 10px;
                            ">
                        Cancelar
                    </button>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', dialog);
    }
}

// Instância global
window.permissionManager = new PermissionManager();

// Inicializar quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.permissionManager.init();
    });
} else {
    window.permissionManager.init();
}

export default PermissionManager;