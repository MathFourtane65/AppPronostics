import { IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonMenu, IonMenuButton, IonMenuToggle, IonPage, IonRouterOutlet, IonRow, IonTabBar, IonTabButton, IonTabs, IonTitle, IonToolbar, useIonToast } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { createBrowserHistory } from 'history';
import { personCircle, trophy, football, analytics, logOut, library, playCircle, radio, search, listOutline } from 'ionicons/icons';
import { useEffect } from 'react';
import { Redirect, Route, useHistory } from 'react-router-dom';
import { User, useUsers } from '../hooks/users';

import './PlayerClassement.css';

const PlayerClassement: React.FC = () => {
    useEffect(() => {
        getAllUsers();
    }, []);

    const { users, getAllUsers } = useUsers();


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
                <h3 className='titre-page-compte'>CLASSEMENT</h3>
                <IonGrid>
                    <IonRow>
                        <IonCol className='header-classement' size='8'>
                            Joueur
                        </IonCol>
                        <IonCol className='header-classement' size='4'>
                            Points
                        </IonCol>
                    </IonRow>               
                    {users.map((user, index) => (
                        <IonRow className='ligne-classement' key={index}>
                            <IonCol size='8'>
                            {user.firstName + " " + user.lastName}
                            </IonCol>
                            <IonCol size='4'>
                            {user.numberPoints} pts
                            </IonCol>
                        </IonRow>
                    ))}
                    </IonGrid>

            </IonContent>

        </>
    );
};

export default PlayerClassement;