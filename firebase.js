// Sincronização com o Firebase (login por e-mail e senha + Firestore).
// Preencha com os dados do seu projeto: Firebase Console > Configurações do projeto > Seus apps > App da Web.
// Estas chaves não são secretas. Quem protege os dados são as regras do Firestore (veja o LEIAME).
const cfg = {
  apiKey: 'AIzaSyCs_CaBOQGsQQrT-D0UmvMmKnTdiz2_oXA',
  authDomain: 'app-ritmo-cb875.firebaseapp.com',
  projectId: 'app-ritmo-cb875',
  appId: '1:377974587727:web:d12d5ae410a329697d853a'
};

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import { initializeFirestore, persistentLocalCache, doc, setDoc, deleteDoc, getDoc, getDocs, collection } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

const FB = { configured: !!cfg.apiKey, user: null, ready: false };
window.FB = FB;

if (FB.configured) {
  const app = initializeApp(cfg);
  const auth = getAuth(app);
  const db = initializeFirestore(app, { localCache: persistentLocalCache() });
  const uid = () => auth.currentUser.uid;
  const clean = (o) => JSON.parse(JSON.stringify(o));

  FB.signIn = (e, p) => signInWithEmailAndPassword(auth, e, p);
  FB.signUp = (e, p) => createUserWithEmailAndPassword(auth, e, p);
  FB.signOut = () => signOut(auth);

  // O Firestore não aceita lista dentro de lista: o trajeto vai como lista simples [lat, lng, lat, lng...]
  FB.saveRun = (r) => setDoc(doc(db, 'users', uid(), 'runs', String(r.id)), clean({ ...r, route: r.route ? r.route.flat() : null }));
  FB.delRun = (id) => deleteDoc(doc(db, 'users', uid(), 'runs', String(id)));
  FB.saveMeta = (m) => setDoc(doc(db, 'users', uid(), 'meta', 'state'), clean(m));
  FB.load = async () => {
    const [m, rs] = await Promise.all([getDoc(doc(db, 'users', uid(), 'meta', 'state')), getDocs(collection(db, 'users', uid(), 'runs'))]);
    const runs = rs.docs.map((d) => {
      const r = d.data();
      if (r.route) { const p = []; for (let i = 0; i + 1 < r.route.length; i += 2) p.push([r.route[i], r.route[i + 1]]); r.route = p; }
      return r;
    });
    return { meta: m.exists() ? m.data() : null, runs };
  };
  onAuthStateChanged(auth, (u) => { FB.user = u; FB.ready = true; window.dispatchEvent(new Event('fb-auth')); });
}
window.dispatchEvent(new Event('fb-ready'));
