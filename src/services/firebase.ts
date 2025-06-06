import { 
  initializeApp, FirebaseApp 
} from "firebase/app";

import { 
  getFirestore, Firestore, doc, onSnapshot, collection, query, orderBy, Timestamp, addDoc, serverTimestamp 
} from "firebase/firestore";

import { environment } from '../environments/environment';

const app: FirebaseApp = initializeApp(environment.firebase);
const db: Firestore = getFirestore(app);

export function listenToCounter(id: string, cb: (count: number) => void) {
  const counterDoc = doc(db, "counters", id);
  return onSnapshot(counterDoc, (snap) => {
    const data = snap.data() as { count?: number } | undefined;
    cb(data?.count ?? 0);
  });
}

export interface IComment {
  id?: string;
  text: string;
  likes: number;
  dislikes: number;
  timestamp: Date;
}

export function listenToComments(cb: (comments: IComment[]) => void) {
  const commentsCol = collection(db, 'comments');
  const q = query(commentsCol, orderBy('timestamp', 'desc'));

  return onSnapshot(q, (snapshot) => {
    const comments: IComment[] = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        text: data['text'],
        likes: data['likes'],
        dislikes: data['dislikes'],
        timestamp: (data['timestamp'] as Timestamp).toDate(),
      };
    });
    cb(comments);
  });
}

// New: Add a comment to Firestore
export async function addComment(text: string) {
  const commentsCol = collection(db, 'comments');
  return await addDoc(commentsCol, {
    text,
    likes: 0,
    dislikes: 0,
    timestamp: serverTimestamp()
  });
}

export default db;
