import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'TeamApp';
  newMemberName = '';
  members: string[] = [];
  errMessage = '';
  numberOfTeams: number | '' = ''; //Either this property is of the type number or string (for the initial value)
  teams: string[][] = [];

  onInput(member: string) {
    this.newMemberName = member;
  }

  onNumberOfTeams(value: string) {
    this.numberOfTeams = Number(value);
  }

  addMember() {
    if (!this.newMemberName) {
      this.errMessage = "Name can't be empty";
      return;
    }
    this.errMessage = '';
    this.members.push(this.newMemberName);
    this.newMemberName = '';
  }

  generateTeams() {
    this.teams = [];
    if (!this.numberOfTeams || this.numberOfTeams <= 0) {
      this.errMessage = 'Invalid number of teams';
      return;
    }
    if (this.members.length < this.numberOfTeams) {
      this.errMessage = 'Not enough members';
      return;
    }
    this.errMessage = '';

    let allMembers = [...this.members];

    while (allMembers.length) {
      for (let i = 0; i < this.numberOfTeams; i++) {
        const randomIndex = Math.floor(Math.random() * allMembers.length);
        const member = allMembers.splice(randomIndex, 1)[0];
        if (!member) break;
        if (this.teams[i]) {
          this.teams[i].push(member);
        } else {
          this.teams[i] = [member];
        }
      }
    }
    this.members = [];
    this.numberOfTeams = '';
    allMembers = [];
  }
}
