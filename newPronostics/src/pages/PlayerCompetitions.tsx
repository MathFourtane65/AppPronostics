import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonItemDivider, IonLabel, IonList, IonMenu, IonMenuButton, IonMenuToggle, IonModal, IonPage, IonRouterOutlet, IonRow, IonSelect, IonTabBar, IonTabButton, IonTabs, IonTitle, IonToolbar, useIonToast } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { createBrowserHistory } from 'history';
import { personCircle, trophy, football, analytics, logOut, library, playCircle, radio, search, listOutline, closeCircle } from 'ionicons/icons';
import { Redirect, Route, useHistory } from 'react-router-dom';
import { User } from '../hooks/users';
import { Competition, useCompetitions } from '../hooks/competitions';
import { useEffect, useState } from 'react';
import { useMatchs, Match } from '../hooks/matchs';

import './PlayerCompetitions.css';

const PlayerCompetitions: React.FC = () => {
    useEffect(() => {
        getAllCompetitions();
        getAllMatchs();
    }, []);

    //var filteredMatchs : any[] = [];
    const [filteredMatchs, setFilteredMatchs] = useState([] as Match[]);

    const user: User = JSON.parse(localStorage.getItem('user') || '{}');
    //console.log(user);

    const { competitions, getAllCompetitions, getOneCompetition } = useCompetitions();

    const { matchs, getAllMatchs } = useMatchs();


    function getMatchsByCompetition(id: string) {
        const competitionMatches = matchs.filter((match) => match.id_competition == id);
        return competitionMatches;
    }

    const [present] = useIonToast();
    const presentToast = (position: 'top' | 'middle' | 'bottom', message: string) => {
        present({
            message: message,
            duration: 1500,
            position: position
        });
    };

    const [showModal, setShowModal] = useState(false);

    const [showPronosticsModal, setShowPronosticsModal] = useState(false);
    const [matchSelected, setMatchSelected] = useState({} as Match);

    function openPronostic(match: Match) {
        setMatchSelected(match);
        setShowPronosticsModal(true);
    }


    function openModal(competitionId: string) {
        const competitionMatches = getMatchsByCompetition(competitionId);
        setFilteredMatchs(competitionMatches);
        setShowModal(true);
    }

    const history = createBrowserHistory({ forceRefresh: true });

    function logout() {
        localStorage.removeItem('user');
        presentToast('top', "Déconnexion réussie !");
        history.push('/login');
    }

    const [miTempsA, setMiTempsA] = useState(0);
    const [miTempsB, setMiTempsB] = useState(0);
    const [finMatchA, setFinMatchA] = useState(0);
    const [finMatchB, setFinMatchB] = useState(0);
    const [tirsAuButA, setTirsAuButA] = useState(0);
    const [tirsAuButB, setTirsAuButB] = useState(0);




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

                <IonModal isOpen={showModal}>
                    <IonHeader>
                        <IonToolbar>
                            <IonButtons slot="start">
                                <IonButton onClick={() => setShowModal(false)}>
                                    <IonIcon slot="icon-only" icon={closeCircle} />
                                </IonButton>
                            </IonButtons>
                            <IonTitle>Sélectionner un match</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent>

                        <IonList>
                            {filteredMatchs.map((match, index) => (
                                <IonItem key={index}>
                                    <IonLabel>
                                        <h2>{match.nameTeamA} - {match.nameTeamB}</h2>
                                        <p>{match.date}</p>
                                        <p className='statut-match'>{match.status}</p>
                                    </IonLabel>
                                    <IonButton slot="end" onClick={() => openPronostic(match)}>
                                        Pronostiquer</IonButton>
                                </IonItem>
                            ))}
                        </IonList>
                    </IonContent>
                </IonModal>

                <IonModal isOpen={showPronosticsModal}>
                    <IonHeader>
                        <IonToolbar>
                            <IonButtons slot="start">
                                <IonButton onClick={() => setShowPronosticsModal(false)}>
                                    <IonIcon slot="icon-only" icon={closeCircle} />
                                </IonButton>
                            </IonButtons>
                            <IonTitle>Pronostic sur {matchSelected.nameTeamA} - {matchSelected.nameTeamB}</IonTitle>
                        </IonToolbar>
                    </IonHeader>

                    <IonContent className='modal-pronostic'>
                        <IonGrid>
                            <IonRow>
                                <IonCol>
                                    <IonLabel></IonLabel>
                                </IonCol>
                                <IonCol>
                                    <IonLabel>{matchSelected.nameTeamA}</IonLabel>
                                </IonCol>
                                <IonCol>
                                    <IonLabel>{matchSelected.nameTeamB}</IonLabel>
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol>
                                    <IonLabel>Mi-temps</IonLabel>
                                </IonCol>
                                <IonCol>
                                    <IonInput type="number" value={miTempsA} />
                                </IonCol>
                                <IonCol>
                                    <IonInput className='input-score' type="number" value={miTempsB} />
                                </IonCol>
                            </IonRow>
                            <IonItemDivider></IonItemDivider>
                            <IonRow>
                                <IonCol>
                                    <IonLabel>Fin du match</IonLabel>
                                </IonCol>
                                <IonCol>
                                    <IonInput type="number" value={miTempsA} />
                                </IonCol>
                                <IonCol>
                                    <IonInput className='input-score' type="number" value={miTempsB} />
                                </IonCol>
                            </IonRow>
                            <IonItemDivider></IonItemDivider>
                            <IonRow>
                                <IonCol>
                                    <IonLabel>TAB</IonLabel>
                                </IonCol>
                                <IonCol>
                                    <IonInput type="number" value={miTempsA} />
                                </IonCol>
                                <IonCol>
                                    <IonInput className='input-score' type="number" value={miTempsB} />
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                        <IonButton className='btn-pronostic' expand="block" onClick={() => setShowPronosticsModal(false)}>Enregistrer</IonButton>


                    </IonContent>


                </IonModal>



                <h3 className='titre-page-compte'>LISTE DES COMPETITIONS</h3>

                <p className='consigne-joueur'>Pour réaliser un pronostic, choisir une compétition, sélectionner un match et enregistrer votre pronostic.</p>

                {competitions.map((comp, index) => (
                    <IonCard key={index} onClick={() => openModal(comp._id)}>
                        <IonCardHeader>
                            <IonCardTitle>{comp.name} </IonCardTitle>
                            <IonCardSubtitle>Du {comp.startDate} au {comp.endDate}</IonCardSubtitle>
                        </IonCardHeader>

                        <IonCardContent>
                            {comp.description}
                            <p>Nombre de matchs : {comp.numberMatches}</p>
                        </IonCardContent>
                    </IonCard>
                ))}






            </IonContent>

        </>
    );
};

export default PlayerCompetitions;