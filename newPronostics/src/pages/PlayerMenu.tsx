import { IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonMenu, IonMenuButton, IonMenuToggle, IonPage, IonRouterOutlet, IonRow, IonTabBar, IonTabButton, IonTabs, IonTitle, IonToolbar, useIonToast } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { personCircle, trophy, football, analytics, logOut, images, square, triangle, listOutline } from 'ionicons/icons';
import { Redirect, Route, useHistory } from 'react-router-dom';

import PlayerAccount from './PlayerAccount';
import PlayerCompetitions from './PlayerCompetitions';
import PlayerClassement from './PlayerClassement';
import CompetitionDetails from './CompetitionDetail';

//import './PlayerMenu.css';

const PlayerMenu: React.FC = () => {


    return (
        <>
            <IonContent>
                <IonReactRouter>
                    <IonTabs>
                        <IonRouterOutlet>
                            <Route exact path="/detailcompetition">
                                <CompetitionDetails />
                            </Route>
                            <Route exact path="/classement">
                                <PlayerClassement />
                            </Route>
                            <Route exact path="/pronostics">
                                <h3>PRONOSTICS</h3>
                            </Route>
                            <Route exact path="/competitions">
                                <PlayerCompetitions />
                            </Route>
                            <Route path="/player">
                                <PlayerAccount />
                            </Route>
                            {/* <Route exact path="/">
                            <Redirect to="/tab1" />
                        </Route> */}
                        </IonRouterOutlet>
                        <IonTabBar slot="bottom">
                            <IonTabButton tab="classement" href="/classement">
                                <IonIcon icon={listOutline} />
                                <IonLabel>Classement</IonLabel>
                            </IonTabButton>
                            <IonTabButton tab="pronostics" href="/pronostics">
                                <IonIcon icon={analytics} />
                                <IonLabel>PRONOSTICS</IonLabel>
                            </IonTabButton>
                            <IonTabButton tab="competitions" href="/competitions">
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
            </IonContent>




        </>
    );
};

export default PlayerMenu;
