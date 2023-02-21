import { IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonMenu, IonMenuButton, IonMenuToggle, IonPage, IonRouterOutlet, IonRow, IonTabBar, IonTabButton, IonTabs, IonTitle, IonToolbar, useIonToast } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { personCircle, trophy, football, analytics, logOut, library, playCircle, radio, search, listOutline } from 'ionicons/icons';
import { Redirect, Route, useHistory } from 'react-router-dom';
import { User } from '../../hooks/users';

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

    const history = useHistory();

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
                        <IonIcon style={{ fontSize: "40px", color: "#008C9E" }} icon={logOut} size="large" onClick={() => logout()} />
                    </IonRow>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <h3 className='titre-page-compte'>MENU JOUEUR</h3>

                <div className='consigne-page-joueur'>
                    Pour réaliser un pronostic, RDV dans la liste des compétitions, choisis un match, valide ton pronostic et affrontes tes amis pour grimper dans le classement !!!
                </div>

                <div className='card-player-page'>
                    <IonCard onClick={() => toCompetitions()}>
                        <IonCardHeader>
                            <IonCardTitle>COMPETITIONS</IonCardTitle>
                            <IonCardSubtitle>Clique ici pour accéder à la liste des compétions et commencer à jouer</IonCardSubtitle>
                        </IonCardHeader>
                        <IonCardContent>
                            <IonIcon icon={trophy} style={{ fontSize: "30px", color: "#008C9E" }} />
                        </IonCardContent>
                    </IonCard>

                    <IonCard>
                        <IonCardHeader>
                            <IonCardTitle>MES PRONOSTICS</IonCardTitle>
                            <IonCardSubtitle>Clique ici pour voir les pronostics que tu as réalisés</IonCardSubtitle>
                        </IonCardHeader>
                        <IonCardContent>
                            <IonIcon icon={analytics} style={{ fontSize: "30px", color: "#008C9E" }} />
                        </IonCardContent>
                    </IonCard>

                    <IonCard>
                        <IonCardHeader>
                            <IonCardTitle>CLASSEMENT</IonCardTitle>
                            <IonCardSubtitle>Clique ici pour consulter le classement et compares toi aux autres joueurs</IonCardSubtitle>
                        </IonCardHeader>
                        <IonCardContent>
                            <IonIcon icon={listOutline} style={{ fontSize: "30px", color: "#008C9E" }} />
                        </IonCardContent>
                    </IonCard>
                </div>
            </IonContent>

        </>
    );
};

export default PlayerAccount;
