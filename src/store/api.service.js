import axios from 'axios'
import firebase from 'firebase/app'

import { firestore } from '@/initFirebase'

export const UserService = {
    login() {
        const provider = new firebase.auth.GoogleAuthProvider()
        provider.setCustomParameters({
            prompt: 'select_account'
        })

        return firebase.auth().signInWithRedirect(provider)
    },
    logout() {
        return firebase.auth().signOut()
    }
}
