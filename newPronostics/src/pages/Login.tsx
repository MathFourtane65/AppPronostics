import { IonAlert, IonButton, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { personCircle } from 'ionicons/icons';
import { IonImg } from '@ionic/react';
import React, { useRef } from 'react';
import { useHistory } from 'react-router';
import { useUsers } from '../hooks/users';
import './Login.css';
import axios from 'axios';

const Login: React.FC = () => {
  const { users, getAllUsers, createOneUser, loginUser } = useUsers();
  const history = useHistory();

  const inputEmail = useRef<HTMLIonInputElement>(null);
  const inputPassword = useRef<HTMLIonInputElement>(null);



  function login() {
    const email = inputEmail.current?.value?.toString();
    const password = inputPassword.current?.value?.toString();
    console.log("email: " + email);
    console.log("password: " + password);
    loginUser(email, password);

  };


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Connexion</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding ion-text-center">
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonIcon
                style={{ fontSize: "100px", color: "#0040ff" }}
                icon={personCircle}
              />
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
                  type="password">
                </IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonButton expand="block" onClick={() => login()}>CONNEXION</IonButton>
              <p style={{ fontSize: "medium" }}>
                CRÉER UN COMPTE EN CLIQUANT <a href="/signup">ICI</a>
              </p>

            </IonCol>
          </IonRow>
        </IonGrid>

        <IonImg src="../public/assets/images/logoMyPronos.png" alt="LOGO APP"></IonImg>



      </IonContent>
    </IonPage>
  );
};

export default Login;
