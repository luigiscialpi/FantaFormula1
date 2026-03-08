import { useState } from 'react';
import { IonItem, IonInput, IonButton, IonList, IonListHeader, IonLabel, IonToggle, IonIcon } from '@ionic/react';
import { useAuth } from '@/app/contexts/AuthContext';
import { useTheme } from '@/app/contexts/ThemeContext';
import { useNavigate } from 'react-router';
import { personCircle, settings, statsChart, informationCircle, logOut, trash, moon, sunny } from 'ionicons/icons';
import { Header } from '@/app/components/Header';

export default function Settings() {
  const { user, profile, signOut, updateProfile } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [isEditingTeamName, setIsEditingTeamName] = useState(false);
  const [newTeamName, setNewTeamName] = useState(profile?.team_name || '');
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(profile?.avatar_emoji || '🏎️');
  const [notifications, setNotifications] = useState(true);

  const avatarOptions = ['🏎️', '🏁', '🎯', '🔥', '⚡', '💎', '🌟', '🦄', '🐉', '🎪'];

  const handleSaveTeamName = async () => {
    if (newTeamName.trim()) {
      await updateProfile({ team_name: newTeamName.trim() });
      setIsEditingTeamName(false);
    }
  };

  const handleSaveAvatar = async () => {
    await updateProfile({ avatar_emoji: selectedAvatar });
    setIsEditingAvatar(false);
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/auth');
  };

  return (
    <div className="flex justify-center min-h-screen" style={{ background: "var(--ff-bg-outer)" }}>
      <div
        className="w-full max-w-md relative flex flex-col min-h-screen"
        style={{
          background: "var(--ff-bg)",
          color: "var(--ff-text-primary)",
          '--ion-text-color': 'var(--ff-text-primary)',
          '--ion-item-background': 'var(--ff-surface)'
        } as any}
      >
        <Header title="Impostazioni" showBack={true} onBack={() => navigate(-1)} />
        <main className="flex-1 overflow-y-auto p-4 pb-12">
          {/* Profilo Utente */}
          <IonList inset={true} style={{ background: 'transparent', margin: '0 0 20px 0' }}>
            <IonListHeader style={{ background: 'var(--ff-surface)', color: 'var(--ff-text-secondary)', paddingLeft: '16px' }}>
              <IonLabel>
                <IonIcon icon={personCircle} slot="start" />
                Profilo
              </IonLabel>
            </IonListHeader>

            <IonItem>
              <div slot="start" style={{
                fontSize: '48px',
                width: '60px',
                height: '60px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--ff-bg)',
                borderRadius: '50%'
              }}>
                {profile?.avatar_emoji || '🏎️'}
              </div>
              <IonLabel>
                {isEditingTeamName ? (
                  <div>
                    <IonInput
                      value={newTeamName}
                      onIonChange={(e) => setNewTeamName(e.detail.value!)}
                      placeholder="Nome Squadra"
                    />
                    <IonButton size="small" onClick={handleSaveTeamName}>Salva</IonButton>
                    <IonButton size="small" fill="clear" onClick={() => setIsEditingTeamName(false)}>Annulla</IonButton>
                  </div>
                ) : (
                  <>
                    <h2>{profile?.team_name || 'Nuova Squadra'}</h2>
                    <p>{user?.email}</p>
                  </>
                )}
              </IonLabel>
              {!isEditingTeamName && (
                <IonButton fill="clear" onClick={() => {
                  setNewTeamName(profile?.team_name || '');
                  setIsEditingTeamName(true);
                }}>
                  Modifica
                </IonButton>
              )}
            </IonItem>

            {isEditingAvatar && (
              <IonItem>
                <IonLabel>Seleziona Avatar:</IonLabel>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', padding: '10px 0' }}>
                  {avatarOptions.map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => setSelectedAvatar(emoji)}
                      style={{
                        fontSize: '32px',
                        padding: '10px',
                        background: selectedAvatar === emoji ? 'var(--ff-tab-active-bg)' : 'var(--ff-bg)',
                        border: selectedAvatar === emoji ? '2px solid #E10600' : '2px solid transparent',
                        borderRadius: '50%',
                        cursor: 'pointer',
                      }}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
                <IonButton size="small" onClick={handleSaveAvatar}>Salva</IonButton>
                <IonButton size="small" fill="clear" onClick={() => setIsEditingAvatar(false)}>Annulla</IonButton>
              </IonItem>
            )}

            {!isEditingAvatar && (
              <IonItem>
                <IonButton expand="block" fill="outline" onClick={() => setIsEditingAvatar(true)}>
                  Modifica Avatar
                </IonButton>
              </IonItem>
            )}
          </IonList>

          {/* Impostazioni */}
          <IonList inset={true} style={{ background: 'transparent', margin: '0 0 20px 0' }}>
            <IonListHeader style={{ background: 'var(--ff-surface)', color: 'var(--ff-text-secondary)', paddingLeft: '16px' }}>
              <IonLabel>
                <IonIcon icon={settings} slot="start" />
                Impostazioni
              </IonLabel>
            </IonListHeader>

            <IonItem>
              <IonIcon icon={theme === 'dark' ? moon : sunny} slot="start" />
              <IonLabel>
                Tema {theme === 'dark' ? 'Scuro' : 'Chiaro'}
              </IonLabel>
              <IonToggle
                checked={theme === 'dark'}
                onIonChange={() => toggleTheme()}
                slot="end"
              />
            </IonItem>

            <IonItem>
              <IonIcon icon={notifications ? 'notifications' : 'notificationsOff'} slot="start" />
              <IonLabel>
                Notifiche
              </IonLabel>
              <IonToggle
                checked={notifications}
                onIonChange={(e) => setNotifications(e.detail.checked)}
                slot="end"
              />
            </IonItem>
          </IonList>

          {/* Statistiche Account */}
          <IonList inset={true} style={{ background: 'transparent', margin: '0 0 20px 0' }}>
            <IonListHeader style={{ background: 'var(--ff-surface)', color: 'var(--ff-text-secondary)', paddingLeft: '16px' }}>
              <IonLabel>
                <IonIcon icon={statsChart} slot="start" />
                Statistiche
              </IonLabel>
            </IonListHeader>

            <IonItem>
              <IonLabel>
                <p>Membro dal</p>
                <h3>{profile?.created_at ? new Date(profile.created_at).toLocaleDateString('it-IT') : '...'}</h3>
              </IonLabel>
            </IonItem>

            <IonItem>
              <IonLabel>
                <p>Budget rimanente</p>
                <h3>€ {profile?.budget_remaining?.toFixed(2) || '100.00'}M</h3>
              </IonLabel>
            </IonItem>
          </IonList>

          {/* Info App */}
          <IonList inset={true} style={{ background: 'transparent', margin: '0 0 20px 0' }}>
            <IonListHeader style={{ background: 'var(--ff-surface)', color: 'var(--ff-text-secondary)', paddingLeft: '16px' }}>
              <IonLabel>
                <IonIcon icon={informationCircle} slot="start" />
                Info
              </IonLabel>
            </IonListHeader>

            <IonItem>
              <IonLabel>
                <p>Versione</p>
                <h3>1.0.0</h3>
              </IonLabel>
            </IonItem>

            <IonItem button>
              <IonLabel color="primary">
                Regolamento Punti
              </IonLabel>
            </IonItem>
          </IonList>

          {/* Logout */}
          <div style={{ padding: '20px' }}>
            <IonButton
              expand="block"
              color="medium"
              onClick={handleLogout}
              style={{ marginBottom: '10px' }}
            >
              <IonIcon icon={logOut} slot="start" />
              Logout
            </IonButton>

            <IonButton
              expand="block"
              color="danger"
              fill="outline"
            >
              <IonIcon icon={trash} slot="start" />
              Elimina Account
            </IonButton>
          </div>
        </main>
      </div>
    </div >
  );
}
