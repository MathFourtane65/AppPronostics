import { IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonMenu, IonMenuButton, IonMenuToggle, IonPage, IonRow, IonTitle, IonToolbar, useIonToast } from '@ionic/react';
import { personCircle, trophy, football, analytics, logOut } from 'ionicons/icons';
import { Redirect, Route, useHistory } from 'react-router-dom';

import './AdminMenu.css';

const AdminMenu: React.FC = () => {
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
        history.push('/admin/competitions');
    }

    function toMatchs(){
        history.push('/admin/matchs');
    }

    function logout() {
        localStorage.removeItem('user');
        presentToast('top', "Déconnexion réussie !");
        history.push('/login');
    }

    return (
        <>
            <IonMenu contentId="main-content">
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Menu ADMIN</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent className="ion-padding">
                    <IonMenuToggle>
                        <IonItem onClick={() => toCompetitions()}>
                            <IonIcon icon={trophy} style={{ fontSize: "30px", color: "#008C9E" }} /> COMPETITIONS
                        </IonItem>
                    </IonMenuToggle>
                    <IonMenuToggle>
                        <IonItem onClick={() => toMatchs()}>
                            <IonIcon icon={football} style={{ fontSize: "30px", color: "#008C9E" }} /> MATCHS
                        </IonItem>
                    </IonMenuToggle>
                    <IonMenuToggle>
                        <IonItem>
                            <IonIcon icon={analytics} style={{ fontSize: "30px", color: "#008C9E" }} /> PRONOSTICS
                        </IonItem>
                    </IonMenuToggle>
                    <IonMenuToggle>
                        <IonItem>
                            <IonIcon icon={personCircle} style={{ fontSize: "30px", color: "#008C9E" }} /> UTILISATEURS
                        </IonItem>
                    </IonMenuToggle>



                </IonContent>
            </IonMenu>
            <IonPage id="main-content">
                <IonHeader>
                    <IonToolbar className='toolbar-admin'>
                        <IonButtons slot="start">
                            <IonMenuButton></IonMenuButton>
                        </IonButtons>
                        <IonRow>
                        <IonTitle>Accueil ADMIN</IonTitle>
                        <IonIcon 
                            icon={logOut}
                            style={{ fontSize: "40px", color: "#008C9E" }}
                            onClick={() => logout()}
                        >
                        </IonIcon>
</IonRow>
                    </IonToolbar>
                </IonHeader>
                <IonContent className="ion-padding">
                    <p className='consigne-menu-admin'>Cliquez sur le bouton ci-dessus pour ouvrir le menu Administrateur. <br /> Vous pouvez également cliquer sur les icones dans la liste pour gérer les éléments.</p>

                    <p className='consigne-menu-admin'>Les droits d'un administrateur sont les suivants :</p>
                    <ul className='consigne-menu-admin'>
                        <li className='li-liste-droits' onClick={() => toCompetitions()}>Gestion des compétitions
                            <IonIcon
                                className='icon-menu-admin'
                                style={{ fontSize: "30px", color: "#008C9E" }}
                                icon={trophy}
                                onClick={() => console.log('CLICK COMPETITIONS')}
                            />
                        </li>
                        <li className='li-liste-droits' onClick={() => toMatchs()}>Gestion des matchs
                            <IonIcon
                                className='icon-menu-admin'
                                style={{ fontSize: "30px", color: "#008C9E" }}
                                icon={football}
                                onClick={() => console.log('CLICK MATCHS')}
                            />
                        </li>
                        <li className='li-liste-droits'>Gestion des pronostics
                            <IonIcon
                                className='icon-menu-admin'
                                style={{ fontSize: "30px", color: "#008C9E" }}
                                icon={analytics}
                                onClick={() => console.log('CLICK PRONOSTICS')}
                            />
                        </li>
                        <li className='li-liste-droits'>Gestion des utilisateurs
                            <IonIcon
                                className='icon-menu-admin'
                                style={{ fontSize: "30px", color: "#008C9E" }}
                                icon={personCircle}
                                onClick={() => console.log('CLICK UTILISATEURS')}
                            />
                        </li>
                    </ul>
                </IonContent>
            </IonPage>
        </>
    );
};

export default AdminMenu;
