import Vue from 'vue'
import { firestorePlugin } from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

Vue.use(firestorePlugin)

firebase.initializeApp({
	apiKey: 'AIzaSyBEP0eMeALsKe_46Gon7YF8AkANCfJNmCY',
	authDomain: 'markdownly-20797.firebaseapp.com',
	databaseURL: 'https://markdownly-20797.firebaseio.com',
	projectId: 'markdownly-20797',
	storageBucket: 'markdownly-20797.appspot.com',
	messagingSenderId: '496336223360'
})

export const db = firebase.firestore()
