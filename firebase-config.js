// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyA6gpdS3ERSMOR35AZFLQJmVOuWmU8W7t0",
    authDomain: "my-green-diary.firebaseapp.com",
    projectId: "my-green-diary",
    storageBucket: "my-green-diary.firebasestorage.app",
    messagingSenderId: "96731873478",
    appId: "1:96731873478:web:4af75cc540b1662d9c57c7"
};

// Inicializar Firebase
let firebaseInitialized = false;
if (typeof firebase !== 'undefined') {
    firebase.initializeApp(firebaseConfig);
    firebaseInitialized = true;
    console.log('🔥 Firebase inicializado');
}
