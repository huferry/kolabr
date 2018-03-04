import { Component, OnInit, Injectable } from '@angular/core';
import { PersonService } from '../services/person.service';
import { Person } from '../person';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css'],
  providers: [ PersonService ]
})

@Injectable()
export class PersonListComponent implements OnInit {

  persons: Person[];
  name: string;
  phone: string;
  email: string;

  constructor(private personService: PersonService) {
    this.personService.getPersons().subscribe(persons => {
      this.persons = <Person[]> persons;
    }); 
  }

  addPerson(event) {
    event.preventDefault();
    var person = {
      name: this.name,
      phone: this.phone,
      email: this.email
    };

    this
    .personService
    .addPerson(<Person>person)
    .subscribe(prs => {
      this.persons.push(<Person>prs);
      this.clear();
    });
  }

  deletePerson(id) {
    event.preventDefault();
    this.personService
    .deletePerson(id)
    .subscribe(data => {
      if ((data as any).n == 1) {
        this.remove(this.persons, id);
      }
    });
    console.log(`deleting ${id}`);
  }

  remove(array, id) {
    for(var i=0; i<array.length; i++) {
      if (array[i]._id == id) {
        array.splice(i, 1);
        break;
      }
    }
  }

  clear() {
    this.name = "";
    this.phone = "";
    this.email = "";
  }
  ngOnInit() {
  }

}
