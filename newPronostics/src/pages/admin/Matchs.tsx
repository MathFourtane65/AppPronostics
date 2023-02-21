import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonFab, IonFabButton, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonMenu, IonMenuButton, IonModal, IonPage, IonRow, IonSelect, IonSelectOption, IonTextarea, IonTitle, IonToolbar, useIonToast } from '@ionic/react';
import { personCircle, trophy, football, analytics, home, add, trash } from 'ionicons/icons';
import { useEffect, useRef, useState } from 'react';
import { Redirect, Route, useHistory } from 'react-router-dom';
import { useMatchs, Match } from '../../hooks/matchs';

//import './Competitions.css';

const Matchs: React.FC = () => {
    useEffect(() => {
        getAllMatchs();
    }, []);

    const [present] = useIonToast();

    const presentToast = (position: 'top' | 'middle' | 'bottom', message: string) => {
        present({
            message: message,
            duration: 1500,
            position: position
        });
    };




    const modal = useRef<HTMLIonModalElement>(null);
    const inputNameTeamA = useRef<HTMLIonInputElement>(null);
    const inputNameTeamB = useRef<HTMLIonInputElement>(null);
    const inputDateMatch = useRef<HTMLIonInputElement>(null);
    const inputPlaceMatch = useRef<HTMLIonInputElement>(null);
    const inputStatusMatch = useRef<HTMLIonSelectElement>(null);


    const history = useHistory();
    const { matchs, getAllMatchs, createOneMatch } = useMatchs();

    function backToAdminMenu() {
        history.push('/admin');
    }

    function confirmCreateMatch() {
        const newMatch: Match = {
            nameTeamA: inputNameTeamA.current?.value?.toString(),
            nameTeamB: inputNameTeamB.current?.value?.toString(),
            date: inputDateMatch.current?.value?.toString(),
            place: inputPlaceMatch.current?.value?.toString(),
            status: inputStatusMatch.current?.value?.toString(),
            halfTimeScore : "",
            endMatchScore : "",
            endPenaltiesScore : "",
            winnerTeam : "",

        }
        console.log(newMatch);
        createOneMatch(newMatch).then(() => {
            presentToast('top', "Match crée avec succès !");
        }).catch((err) => {
            console.log(err);
        });
        modal.current?.dismiss();
    }


    return (
        <>
            <IonPage id="main-content">
                <IonHeader>

                    <IonToolbar className='toolbar-admin'>
                        <IonRow>
                            <IonButton onClick={() => backToAdminMenu()}>
                                <IonIcon icon={home} style={{ fontSize: "30px" }} />
                            </IonButton>
                            <IonTitle>MATCHS</IonTitle>
                        </IonRow>
                    </IonToolbar>

                </IonHeader>
                <IonContent className="ion-padding">
                    <IonFab vertical="bottom" horizontal="center" slot="fixed">
                        <IonFabButton id="modal-create-match">
                            <IonIcon icon={add}></IonIcon>
                        </IonFabButton>
                    </IonFab>

                    {matchs.map((match, index) => (
                        <IonCard key={index}>
                            <IonCardHeader>
                                <IonCardTitle>{match.nameTeamA} || {match.nameTeamB} </IonCardTitle>
                                <IonCardSubtitle>Le {match.date} à {match.place} </IonCardSubtitle>
                            </IonCardHeader>

                            <IonCardContent>
                                Statut : {match.status}
                            </IonCardContent>
                            <div className='icon-delete'><IonIcon icon={trash} onClick={() => console.log("DELETE " + match._id)}></IonIcon></div>
                        </IonCard>
                    ))}

                </IonContent>

                {/* MODAL CREATION MATCH */}
                <IonModal ref={modal} trigger="modal-create-match">
                    <IonHeader>
                        <IonToolbar>
                            <IonButtons slot="start">
                                <IonButton onClick={() => modal.current?.dismiss()}>Annuler</IonButton>
                            </IonButtons>
                            <IonTitle>Nouveau Match</IonTitle>
                            <IonButtons slot="end">
                                <IonButton strong={true} onClick={() => confirmCreateMatch()}>
                                    Creer
                                </IonButton>
                            </IonButtons>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent className="ion-padding">
                        <IonItem>
                            <IonLabel position="stacked">Équipe A (Domicile)</IonLabel>
                            <IonInput ref={inputNameTeamA} type="text" placeholder="Entrer le nom de l'équipe A" />

                            <IonLabel position="stacked">Équipe B (Extérieur)</IonLabel>
                            <IonInput ref={inputNameTeamB} type="text" placeholder="Entrer le nom de l'équipe B" />

                            <IonLabel position="stacked">Date du match</IonLabel>
                            <IonInput ref={inputDateMatch} type="date" />

                            <IonLabel position="stacked">Lieu du match</IonLabel>
                            <IonInput ref={inputPlaceMatch} type="text" />

                            <IonList>
                                <IonItem>
                                    <IonSelect placeholder="Choisir le statut du match" ref={inputStatusMatch}>
                                        <IonSelectOption value="A VENIR">A VENIR</IonSelectOption>
                                        <IonSelectOption value="ANNULE">ANNULE</IonSelectOption>
                                        <IonSelectOption value="1ERE MI-TEMPS ...">1ERE MI-TEMPS ...</IonSelectOption>
                                        <IonSelectOption value="2EME MI-TEMPS ...">2EME MI-TEMPS ...</IonSelectOption>
                                        <IonSelectOption value="TAB ...">TAB  ...</IonSelectOption>
                                        <IonSelectOption value="TERMINÉ ...">TERMINÉ  ...</IonSelectOption>
                                    </IonSelect>
                                </IonItem>
                            </IonList>


                        </IonItem>
                    </IonContent>
                </IonModal>


            </IonPage>
        </>
    );
};

export default Matchs;
