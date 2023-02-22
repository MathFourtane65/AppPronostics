import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonFab, IonFabButton, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonMenu, IonMenuButton, IonModal, IonPage, IonRow, IonSelect, IonSelectOption, IonTextarea, IonTitle, IonToolbar, useIonToast } from '@ionic/react';
import { createBrowserHistory } from 'history';
import { personCircle, trophy, football, analytics, home, add, trash, calendarOutline, locationOutline, ellipse, pencil } from 'ionicons/icons';
import { useEffect, useRef, useState } from 'react';
import { Redirect, Route, useHistory } from 'react-router-dom';
import { useCompetitions } from '../hooks/competitions';
import { useMatchs, Match } from '../hooks/matchs';


import './Matchs.css';

const Matchs: React.FC = () => {
    useEffect(() => {
        getAllMatchs();
        getAllCompetitions();
    }, []);

    //const history = useHistory();
    const history = createBrowserHistory({ forceRefresh: true });
    const [colorTeamA, setColorTeamA] = useState('#FFFFFF');
    const [colorTeamB, setColorTeamB] = useState('#FFFFFF');

    const [newColorTeamA, setNewColorTeamA] = useState('#FFFFFF');
    const [newColorTeamB, setNewColorTeamB] = useState('#FFFFFF');




    const { matchs, getAllMatchs, createOneMatch, deleteOneMatch } = useMatchs();
    const { competitions, getAllCompetitions } = useCompetitions();


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
    const inputCompetitionMatch = useRef<HTMLIonSelectElement>(null);


    const modalUpdate = useRef<HTMLIonModalElement>(null);
    const newInputNameTeamA = useRef<HTMLIonInputElement>(null);
    const newInputNameTeamB = useRef<HTMLIonInputElement>(null);
    const newInputDateMatch = useRef<HTMLIonInputElement>(null);
    const newInputPlaceMatch = useRef<HTMLIonInputElement>(null);
    const newInputStatusMatch = useRef<HTMLIonSelectElement>(null);
    const newInputCompetitionMatch = useRef<HTMLIonSelectElement>(null);



    function backToAdminMenu() {
        history.push('/admin');
    }

    function handleColorTeamAChange(event: any) {
        setColorTeamA(event.target.value);
    }

    function handleColorTeamBChange(event: any) {
        setColorTeamB(event.target.value);
    }

    function confirmCreateMatch() {
        const newMatch: Match = {
            nameTeamA: inputNameTeamA.current?.value?.toString(),
            nameTeamB: inputNameTeamB.current?.value?.toString(),
            date: inputDateMatch.current?.value?.toString(),
            place: inputPlaceMatch.current?.value?.toString(),
            status: inputStatusMatch.current?.value?.toString(),
            halfTimeScore: "",
            endMatchScore: "",
            endPenaltiesScore: "",
            winnerTeam: "",
            colorTeamA: colorTeamA,
            colorTeamB: colorTeamB,
            id_competition: inputCompetitionMatch.current?.value?.toString()
        }
        console.log(newMatch);

        createOneMatch(newMatch).then(() => {
            presentToast('top', "Match crée avec succès !");
        }).catch((err) => {
            console.log(err);
        });
        modal.current?.dismiss();
        //window.location.reload();
    }

    function confirmDeleteMatch(id: string) {
        deleteOneMatch(id).then(() => {
            presentToast('top', "Match supprimé avec succès !");
        }).catch((err) => {
            console.log(err);
        });
    }

    function getCompetitionNameById(id: any) {
        let competitionName: any = "";
        competitions.forEach(competition => {
            if (competition._id === id) {
                competitionName = competition.name;
            }
        });
        return competitionName;
    }

    function confirmUpdateMatch(id: string) {
        // const newMatch: Match = {
        //     nameTeamA: newInputNameTeamA.current?.value?.toString(),
        //     nameTeamB: newInputNameTeamB.current?.value?.toString(),
        //     date: newInputDateMatch.current?.value?.toString(),
        //     place: newInputPlaceMatch.current?.value?.toString(),
        //     status: newInputStatusMatch.current?.value?.toString(),
        //     halfTimeScore: "",
        //     endMatchScore: "",
        //     endPenaltiesScore: "",
        //     winnerTeam: "",
        //     colorTeamA: colorTeamA,
        //     colorTeamB: colorTeamB,
        //     id_competition: newInputCompetitionMatch.current?.value?.toString()
        // }
        // console.log(newMatch);

        // createOneMatch(newMatch).then(() => {
        //     presentToast('top', "Match modifié avec succès !");
        // }).catch((err) => {
        //     console.log(err);
        // });
        modalUpdate.current?.dismiss();
        //window.location.reload();
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
                        <IonCard key={index} className='card-content'>
                            <IonCardHeader>
                                <IonCardTitle className='title-card-match'><IonIcon icon={ellipse} style={{ color: match.colorTeamA }}></IonIcon>{match.nameTeamA} VS {match.nameTeamB}<IonIcon icon={ellipse} style={{ color: match.colorTeamB }}></IonIcon></IonCardTitle>
                                <IonCardSubtitle className='date-card-match'><IonIcon icon={calendarOutline}></IonIcon>{match.date}</IonCardSubtitle>
                                <IonCardSubtitle className='place-card-match' ><IonIcon onClick={() => {
                                    const url = `https://www.google.com/maps/search/?api=1&query=${match.place}`;
                                    window.open(url, '_blank');
                                }} icon={locationOutline}></IonIcon>{match.place}</IonCardSubtitle>

                            </IonCardHeader>

                            <IonCardContent>
                                <div className='competition-card-match'><IonIcon icon={trophy}></IonIcon>{getCompetitionNameById(match.id_competition)}</div>
                                <div className='status-card-match'>{match.status}</div>
                                <ul className='scores-card-match'>
                                    <li>
                                        <IonLabel position="stacked">Mi-temps : {match.halfTimeScore}</IonLabel>
                                    </li>
                                    <li>
                                        <IonLabel position="stacked">Fin du match : {match.endMatchScore}</IonLabel>
                                    </li>
                                    <li>
                                        <IonLabel position="stacked">Fin TAB : {match.endPenaltiesScore}</IonLabel>
                                    </li>
                                </ul>
                            </IonCardContent>
                            <div className='icon-delete'><IonIcon icon={trash} onClick={() => confirmDeleteMatch(match._id)}></IonIcon></div>
                            <div className='icon-delete'><IonIcon icon={pencil} id="modal-update-match" onClick={() => confirmUpdateMatch(match._id)}></IonIcon></div>
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
                            <IonRow>
                                <IonCol>
                                    <IonLabel position="stacked">Équipe A (Domicile)</IonLabel>
                                    <IonInput ref={inputNameTeamA} type="text" placeholder="Entrer le nom de l'équipe A" />
                                </IonCol>
                                <IonCol>
                                    <IonLabel position="stacked">Couleur équipe A</IonLabel>
                                    <input type="color" value={colorTeamA} onChange={handleColorTeamAChange} />
                                </IonCol>
                            </IonRow>

                            <IonRow>
                                <IonCol>
                                    <IonLabel position="stacked">Équipe B (Extérieur)</IonLabel>
                                    <IonInput ref={inputNameTeamB} type="text" placeholder="Entrer le nom de l'équipe B" />
                                </IonCol>
                                <IonCol>
                                    <IonLabel position="stacked">Couleur équipe B</IonLabel>
                                    <input type="color" value={colorTeamB} onChange={handleColorTeamBChange} />
                                </IonCol>
                            </IonRow>





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

                            <IonList>
                                <IonItem>
                                    <IonSelect placeholder="Choisir la compétition" ref={inputCompetitionMatch}>
                                        {competitions.map((compet, index) => (
                                            <IonSelectOption key={index} value={compet._id}>{compet.name}</IonSelectOption>
                                        ))}
                                    </IonSelect>
                                </IonItem>
                            </IonList>


                        </IonItem>
                    </IonContent>
                </IonModal>




                {/* MODAL UPDATE MATCH */}
                <IonModal ref={modalUpdate} trigger="modal-update-match">
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
                            <IonRow>
                                <IonCol>
                                    <IonLabel position="stacked">Équipe A (Domicile)</IonLabel>
                                    <IonInput ref={inputNameTeamA} type="text" placeholder="Entrer le nom de l'équipe A" />
                                </IonCol>
                                <IonCol>
                                    <IonLabel position="stacked">Couleur équipe A</IonLabel>
                                    <input type="color" value={colorTeamA} onChange={handleColorTeamAChange} />
                                </IonCol>
                            </IonRow>

                            <IonRow>
                                <IonCol>
                                    <IonLabel position="stacked">Équipe B (Extérieur)</IonLabel>
                                    <IonInput ref={inputNameTeamB} type="text" placeholder="Entrer le nom de l'équipe B" />
                                </IonCol>
                                <IonCol>
                                    <IonLabel position="stacked">Couleur équipe B</IonLabel>
                                    <input type="color" value={colorTeamB} onChange={handleColorTeamBChange} />
                                </IonCol>
                            </IonRow>





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

                            <IonList>
                                <IonItem>
                                    <IonSelect placeholder="Choisir la compétition" ref={inputCompetitionMatch}>
                                        {competitions.map((compet, index) => (
                                            <IonSelectOption key={index} value={compet._id}>{compet.name}</IonSelectOption>
                                        ))}
                                    </IonSelect>
                                </IonItem>
                            </IonList>


                        </IonItem>
                    </IonContent>
                </IonModal>



            </IonPage>
        </>
    )

}

export default Matchs;

