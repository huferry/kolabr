import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Person } from '../person';
import 'rxjs/add/operator/map';

@Injectable()
export class PersonService {
    
    constructor(private http: HttpClient) {
        console.log('PersonService started...');
    }

    getPersons() {
        return this.http.get('/api/persons'); 
    } 

    addPerson(person: Person) {
        return this.http.post(
            '/api/person', 
            JSON.stringify(person),
            {headers: {"content-type": "application/json"}});
    }

    deletePerson(id: string) {
        return this.http.delete(`/api/person/${id}`);
    }
} 