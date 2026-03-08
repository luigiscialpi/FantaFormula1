import { useState } from 'react';
import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonItem, IonInput, IonButton, IonLoading, IonText, IonCard, IonCardContent, IonRouterLink } from '@ionic/react';
import { useAuth } from '@/app/contexts/AuthContext';
import { useNavigate } from 'react-router';

export default function Auth() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [teamName, setTeamName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { signIn, signUp } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (isLogin) {
                const { error } = await signIn(email, password);
                if (error) {
                    setError(error.message);
                } else {
                    navigate('/');
                }
            } else {
                if (!teamName.trim()) {
                    setError('Inserisci il nome della tua squadra');
                    setLoading(false);
                    return;
                }
                const { error } = await signUp(email, password, teamName);
                if (error) {
                    setError(error.message);
                } else {
                    navigate('/');
                }
            }
        } catch (err) {
            setError('Si è verificato un errore. Riprova.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="primary">
                    <IonTitle>FantaFormula 1</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    padding: '20px'
                }}>
                    <div style={{ marginBottom: '30px', textAlign: 'center' }}>
                        <h1 style={{ fontSize: '48px', margin: '0' }}>🏎️</h1>
                        <h2 style={{ marginTop: '10px', color: '#e10600' }}>
                            {isLogin ? 'Accedi' : 'Registrati'}
                        </h2>
                    </div>

                    <IonCard style={{ width: '100%', maxWidth: '400px' }}>
                        <IonCardContent>
                            <form onSubmit={handleSubmit}>
                                {!isLogin && (
                                    <IonItem>
                                        <IonInput
                                            label="Nome Squadra"
                                            labelPlacement="floating"
                                            value={teamName}
                                            onIonChange={(e) => setTeamName(e.detail.value!)}
                                            placeholder="es. Ferrari Fan Club"
                                            required
                                        />
                                    </IonItem>
                                )}

                                <IonItem style={{ marginTop: '10px' }}>
                                    <IonInput
                                        label="Email"
                                        labelPlacement="floating"
                                        type="email"
                                        value={email}
                                        onIonChange={(e) => setEmail(e.detail.value!)}
                                        placeholder="tua@email.com"
                                        required
                                    />
                                </IonItem>

                                <IonItem style={{ marginTop: '10px' }}>
                                    <IonInput
                                        label="Password"
                                        labelPlacement="floating"
                                        type="password"
                                        value={password}
                                        onIonChange={(e) => setPassword(e.detail.value!)}
                                        placeholder="••••••••"
                                        required
                                    />
                                </IonItem>

                                {error && (
                                    <IonText color="danger" style={{ display: 'block', marginTop: '15px', textAlign: 'center' }}>
                                        {error}
                                    </IonText>
                                )}

                                <IonButton
                                    type="submit"
                                    expand="block"
                                    color="primary"
                                    style={{ marginTop: '20px' }}
                                    disabled={loading}
                                >
                                    <IonLoading isOpen={loading} />
                                    {isLogin ? 'Accedi' : 'Registrati'}
                                </IonButton>
                            </form>

                            <IonButton
                                fill="clear"
                                expand="block"
                                onClick={() => {
                                    setIsLogin(!isLogin);
                                    setError(null);
                                }}
                                style={{ marginTop: '10px' }}
                            >
                                {isLogin
                                    ? 'Non hai un account? Registrati'
                                    : 'Hai già un account? Accedi'}
                            </IonButton>
                        </IonCardContent>
                    </IonCard>
                </div>
            </IonContent>
        </IonPage>
    );
}
