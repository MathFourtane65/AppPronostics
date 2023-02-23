import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router';
import { useCompetitions, Competition } from '../hooks/competitions';
import { useEffect, useState } from 'react';

const CompetitionDetails: React.FC = () => {
    
    //   const { competitionId } = useParams<{ competitionId: string }>();
    //   const { getOneCompetition } = useCompetitions();
    //   const [competition, setCompetition] = useState<Competition | null>(null);

    //   useEffect(() => {
    //     getOneCompetition(competitionId).then(comp => {
    //       setCompetition(comp);
    //       console.log(competition);

    //     }).catch(err => {
    //       console.log(err);
    //     });
    //   }, [competitionId]);

    return (
        <>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Détails de la compétition</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                bla bla bla
            </IonContent>
        </>
    );
};

export default CompetitionDetails;
