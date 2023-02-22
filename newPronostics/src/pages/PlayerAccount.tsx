import { IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonMenu, IonMenuButton, IonMenuToggle, IonPage, IonRouterOutlet, IonRow, IonTabBar, IonTabButton, IonTabs, IonTitle, IonToolbar, useIonToast } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { createBrowserHistory } from 'history';
import { personCircle, trophy, football, analytics, logOut, library, playCircle, radio, search, listOutline } from 'ionicons/icons';
import { Redirect, Route, useHistory } from 'react-router-dom';
import { User } from '../hooks/users';

import './PlayerAccount.css';

const PlayerAccount: React.FC = () => {
    const user: User = JSON.parse(localStorage.getItem('user') || '{}');
    //console.log(user);


    const [present] = useIonToast();

    const presentToast = (position: 'top' | 'middle' | 'bottom', message: string) => {
        present({
            message: message,
            duration: 1500,
            position: position
        });
    };

    //const history = useHistory();
    const history = createBrowserHistory({ forceRefresh: true });


    function toCompetitions() {
        history.push('/joueur/competitions');
    }


    function logout() {
        localStorage.removeItem('user');
        presentToast('top', "Déconnexion réussie !");
        history.push('/login');
    }

    return (
        <>

            <IonHeader>
                <IonToolbar>
                    <IonRow className='title-menu-player'>
                        <h3 className=''>Salut {user.firstName} !!!</h3>
                        <IonIcon style={{ fontSize: "40px", color: "#201cd2" }} icon={logOut} size="large" onClick={() => logout()} />
                    </IonRow>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <h3 className='titre-page-compte'>MON COMPTE</h3>

                <IonRow className='ion-justify-content-center'>
                    <IonCol size="12" size-md="6" size-lg="4" className='ion-align-self-center'>
                        <IonCard className='card-compte'>

                            <IonCardHeader>
                                <IonCardTitle className='ion-text-center'>Mes informations</IonCardTitle>
                            </IonCardHeader>

                            <IonCardContent>
                                <IonItem>
                                    <IonLabel className='label-player-account'>Nom</IonLabel>
                                    <IonLabel>{user.lastName}</IonLabel>
                                </IonItem>
                                <IonItem>
                                    <IonLabel className='label-player-account'>Prénom</IonLabel>
                                    <IonLabel>{user.firstName}</IonLabel>
                                </IonItem>
                                <IonItem>
                                    <IonLabel className='label-player-account'>Email</IonLabel>
                                    <IonLabel>{user.email}</IonLabel>
                                </IonItem>
                                <IonItem>
                                    <IonLabel className='label-player-account'>Équipe favorite</IonLabel>
                                    <IonLabel>{user.favoriteTeam}</IonLabel>
                                </IonItem>
                                <IonItem>
                                    <IonLabel className='label-player-account'>Rôle</IonLabel>
                                    <IonLabel>{user.role}</IonLabel>
                                </IonItem>

                            </IonCardContent>
                        </IonCard>
                    </IonCol>
                </IonRow>
            </IonContent>

        </>
    );
};

export default PlayerAccount;