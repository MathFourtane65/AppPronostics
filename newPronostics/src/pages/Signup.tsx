import { IonAlert, IonButton, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonPage, IonRow, IonSelect, IonSelectOption, IonTitle, IonToolbar, useIonToast } from '@ionic/react';
import { personAdd } from 'ionicons/icons';
import { IonImg, useIonPopover  } from '@ionic/react';
import { useRef, useState } from 'react';
import { User, useUsers } from '../hooks/users';
import { Redirect, Route, useHistory } from 'react-router-dom';
import { createBrowserHistory } from 'history';

// import './Login.css';

// async function registerUser(event:any) {
//     event.preventDefault();
//     await axios({
//       method: "post",
//       url: "http://localhost:3000/api/users/register",
//       data: {
//         prenom,
//         nom,
//         birthdate,
//         adresse,
//         // cp,
//         // mobile,
//         email,
//         password,
//       },
//     });

//     navigate("/connexion");
//     <span>Inscription réussie veuillez vous connecter</span>;
//   }

const Signup: React.FC = () => {
    const [present] = useIonToast();

    const presentToast = (position: 'top' | 'middle' | 'bottom') => {
      present({
        message: 'Compte crée avec succès !',
        duration: 1500,
        position: position
      });
    };
 


    const { users, getAllUsers, createOneUser } = useUsers();
    //const history = useHistory();
    const history = createBrowserHistory({ forceRefresh: true });


    const inputEmail = useRef<HTMLIonInputElement>(null);
    const inputFirstName = useRef<HTMLIonInputElement>(null);
    const inputLastName = useRef<HTMLIonInputElement>(null);
    const inputPassword = useRef<HTMLIonInputElement>(null);
    const inputFavoriteTeam = useRef<HTMLIonSelectElement>(null);
    const inputRole = useRef<HTMLIonSelectElement>(null);


    function confirmCreateAccount() {
        const email = inputEmail.current?.value?.toString();
        const firstName = inputFirstName.current?.value?.toString();
        const lastName = inputLastName.current?.value?.toString();
        const password = inputPassword.current?.value?.toString();
        const favoriteTeam = inputFavoriteTeam.current?.value?.toString();
        const role = inputRole.current?.value?.toString();

        const newUser : User = {
            email: email,
            firstName: firstName,
            lastName: lastName,
            password: password,
            favoriteTeam: favoriteTeam, 
            role: role
        };
        console.log(newUser);
        createOneUser(newUser);
        history.push('/login');
        presentToast('top');     

    }
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Inscription</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen className="ion-padding ion-text-center">
                <IonGrid>
                    <IonRow>
                        <IonCol>
                            <IonIcon
                                style={{ fontSize: "100px", color: "#0040ff" }}
                                icon={personAdd}
                            />
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonItem>
                                <IonLabel position="floating">Prénom</IonLabel>
                                <IonInput
                                    ref={inputFirstName}
                                    type="text">
                                </IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol>
                            <IonItem>
                                <IonLabel position="floating">Nom</IonLabel>
                                <IonInput
                                    ref={inputLastName}
                                    type="text">
                                </IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol>
                            <IonItem>
                                <IonLabel position="floating">Email</IonLabel>
                                <IonInput
                                    ref={inputEmail}
                                    type="email">
                                </IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol>
                            <IonItem>
                                <IonLabel position="floating">Mot de passe</IonLabel>
                                <IonInput
                                    ref={inputPassword}
                                    type="password" 
                                    title="Entrer votre mot de passe">
                                </IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>


                    <IonRow>
                        <IonCol>
                            <IonList>
                                <IonItem>
                                    <IonSelect placeholder="Choisissez votre équipe favorite" ref={inputFavoriteTeam}>
                                        <IonSelectOption value="OL">OL</IonSelectOption>
                                        <IonSelectOption value="OM">OM</IonSelectOption>
                                        <IonSelectOption value="PSG">PSG</IonSelectOption>
                                    </IonSelect>
                                </IonItem>
                            </IonList>
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol>
                            <IonList>
                                <IonItem>
                                    <IonSelect placeholder="Choisissez votre rôle" ref={inputRole}>
                                        <IonSelectOption value="admin">Admin</IonSelectOption>
                                        <IonSelectOption value="joueur">Joueur</IonSelectOption>
                                    </IonSelect>
                                </IonItem>
                            </IonList>
                        </IonCol>
                    </IonRow>



                    <IonCol>
                        <IonButton expand="block" onClick={() => confirmCreateAccount()}>CRÉER UN COMPTE</IonButton>
                        <p style={{ fontSize: "medium" }}>
                            VOUS AVEZ DÉJÀ UN COMPTE CLIQUEZ <a href="/login">ICI</a>
                        </p>

                    </IonCol>
                </IonGrid>

                <IonImg src="../public/assets/images/logoMyPronos.png" alt="LOGO APP"></IonImg>



            </IonContent>
        </IonPage >
    );
};

export default Signup;
