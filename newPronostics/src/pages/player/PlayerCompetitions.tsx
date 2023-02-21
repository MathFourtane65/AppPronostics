import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonFab, IonFabButton, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonMenu, IonMenuButton, IonModal, IonPage, IonRow, IonTextarea, IonTitle, IonToolbar, useIonToast } from '@ionic/react';
import { personCircle, trophy, football, analytics, home, add, trash } from 'ionicons/icons';
import { useEffect, useRef, useState } from 'react';
import { Redirect, Route, useHistory } from 'react-router-dom';
import { useCompetitions, Competition } from '../../hooks/competitions';

//import './Competitions.css';

const Competitions: React.FC = () => {
  useEffect(() => {
    getAllCompetitions();
  }, []);

  const [present] = useIonToast();

  const presentToast = (position: 'top' | 'middle' | 'bottom', message: string) => {
    present({
      message: message,
      duration: 1500,
      position: position
    });
  };





  const history = useHistory();
  const { competitions, getAllCompetitions } = useCompetitions();

  function backToPlayerMenu() {
    history.push('/joueur');
    window.location.reload();
  }


  return (
    <>
      <IonPage id="main-content">
        <IonHeader>

          <IonToolbar className='toolbar-admin'>
            <IonRow>
              <IonButton onClick={() => backToPlayerMenu()}>
                <IonIcon icon={home} style={{ fontSize: "30px" }} />
              </IonButton>
              <IonTitle>COMPETITIONS</IonTitle>
            </IonRow>
          </IonToolbar>

        </IonHeader>
        <IonContent className="ion-padding">

          {competitions.map((comp, index) => (
          <IonCard key={index}>
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


          {/* TO DO : liste des compétitions dans des cards : 
                    nom, nb matchs, image?, date début , date de fin
                    QUnad on clique sur la card du match, page detail de la compétition
                    avec nom, dates début et fin, nb matchs, liste des matchs et la description */}

        </IonContent>

      </IonPage>
    </>
  );
};

export default Competitions;
