import { IonAlert, IonButton, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { personCircle } from 'ionicons/icons';
import { IonImg } from '@ionic/react';
import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router';
import { User, useUsers } from '../hooks/users';
import './Login.css';
import axios from 'axios';
import { IonToast } from '@ionic/react';

const Login: React.FC = () => {
  const { users, getAllUsers, createOneUser, loginUser } = useUsers();
  const history = useHistory();

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState('');

  const inputEmail = useRef<HTMLIonInputElement>(null);
  const inputPassword = useRef<HTMLIonInputElement>(null);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');



  // function login() {
  //   const email = inputEmail.current?.value?.toString();
  //   const password = inputPassword.current?.value?.toString();
  //   console.log("email: " + email);
  //   console.log("password: " + password);
  //   let log : any = loginUser(email, password);
  //   console.log(log);
  // };


  async function login(event: any) {
    const email = inputEmail.current?.value?.toString();
    const password = inputPassword.current?.value?.toString();

    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/users/login',
        { email: email, password: password });
      const user: User = response.data.user;     
      
      localStorage.setItem('user', JSON.stringify(user));
      
      if (user.role == "admin") {
        history.push('/admin');
        //console.log("admin");
      } else {
        history.push('/player');
      }
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.msg) {
        setToastMessage(error.response.data.msg);
      } else {
        setToastMessage('An error occurred while logging in.');
      }
      setShowToast(true);
    }

  }


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
          <form onSubmit={login}>
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
                <IonButton expand="block" type='submit'>CONNEXION</IonButton>
                <p style={{ fontSize: "medium" }}>
                  CRÉER UN COMPTE EN CLIQUANT <a href="/signup">ICI</a>
                </p>

              </IonCol>
            </IonRow>
          </form>
        </IonGrid>

        <IonToast position='top' cssClass='toast' isOpen={showToast} onDidDismiss={() => setShowToast(false)} message={toastMessage} duration={2500} />

        <IonImg src="../public/assets/images/logoMyPronos.png" alt="LOGO APP"></IonImg>



      </IonContent>
    </IonPage>
  );
};

export default Login;
