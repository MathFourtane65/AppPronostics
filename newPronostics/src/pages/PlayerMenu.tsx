import { IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonMenu, IonMenuButton, IonMenuToggle, IonPage, IonRouterOutlet, IonRow, IonTabBar, IonTabButton, IonTabs, IonTitle, IonToolbar, useIonToast } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { personCircle, trophy, football, analytics, logOut, images, square, triangle, listOutline } from 'ionicons/icons';
import { Redirect, Route, useHistory } from 'react-router-dom';
import PlayerAccount from './PlayerAccount';

//import './PlayerMenu.css';

const PlayerMenu: React.FC = () => {


    return (
        <>
            <IonReactRouter>
                <IonTabs>
                    <IonRouterOutlet>
                        <Route exact path="/player/tab1">
                            {/* <Tab1 /> */}
                        </Route>
                        <Route exact path="player/tab2">
                            {/* <Tab2 /> */}
                        </Route>
                        <Route path="/player">
                            <PlayerAccount />
                        </Route>
                        {/* <Route exact path="/">
            <Redirect to="/tab1" />
          </Route> */}
                    </IonRouterOutlet>
                    <IonTabBar slot="bottom">
                        <IonTabButton tab="classement" href="/player/classement">
                            <IonIcon icon={listOutline} />
                            <IonLabel>Classement</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="pronostics" href="/player/pronostics">
                            <IonIcon icon={analytics} />
                            <IonLabel>PRONOSTICS</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="competitions" href="/player/competitions">
                            <IonIcon icon={trophy} />
                            <IonLabel>Compétitions</IonLabel>
                        </IonTabButton>

                        <IonTabButton tab="compte" href="/player">
                            <IonIcon icon={personCircle} />
                            <IonLabel>Mon compte</IonLabel>
                        </IonTabButton>
                    </IonTabBar>
                </IonTabs>
            </IonReactRouter>


        </>
    );
};

export default PlayerMenu;
