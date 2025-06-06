import { Injectable } from '@angular/core';
import { Firestore, docData, collectionData } from '@angular/fire/firestore';
import { doc, collection } from 'firebase/firestore';  // native SDK functions
import { Observable } from 'rxjs';

interface VisitCount {
  count: number;
  type: string;
}

@Injectable({ providedIn: 'root' })
export class VisitCounterService {
  constructor(private firestore: Firestore) {}

  getAllCounters(): Observable<VisitCount[]> {
    const countersRef = collection(this.firestore, 'counters');
    return collectionData(countersRef, { idField: 'id' }) as Observable<VisitCount[]>;
  }

  getVisitCount(): Observable<VisitCount> {
    const docRef = doc(this.firestore, `counters/oOAMoAv6O3Sy7a6VrfGP`);
    return docData(docRef) as Observable<VisitCount>;
  }
}
