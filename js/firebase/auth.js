// Módulo de autenticação usando instâncias globais do Firebase
const auth = window.FirebaseAuth;

// Funções de autenticação
async function loginWithGoogle() {
    try {
        await auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    } catch (error) {
        console.error('Erro ao fazer login com Google:', error);
        throw error;
    }
}

async function logout() {
    try {
        await auth.signOut();
    } catch (error) {
        console.error('Erro ao fazer logout:', error);
        throw error;
    }
}

function onAuthStateChanged(callback) {
    return auth.onAuthStateChanged(callback);
}

async function authenticateWithBiometrics() {
    if ('credentials' in navigator) {
        try {
            const cred = await navigator.credentials.get({
                mediation: 'required',
                publicKey: {
                    challenge: new Uint8Array(32),
                    rpId: window.location.hostname,
                    userVerification: 'preferred'
                }
            });
            return this.loginWithToken(cred.response.signature);
        } catch (error) {
            console.error('Biometria falhou:', error);
            return this.loginWithEmailPassword();
        }
    }
}

// Disponibiliza funções globalmente
window.AuthModule = {
    login: loginWithGoogle,
    logout: logout,
    onAuthStateChanged: onAuthStateChanged,
    auth: auth
};

window.authenticateWithBiometrics = authenticateWithBiometrics;

console.log('Módulo de autenticação carregado'); 