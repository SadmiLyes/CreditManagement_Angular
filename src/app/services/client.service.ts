///<reference path="../../../node_modules/@angular/core/src/di/injectable.d.ts"/>
import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from 'angularfire2/database';
import {Observable} from 'rxjs';
import {Client} from '../models/Client';
import {log} from 'util';

@Injectable()
export class ClientService {
  clients: AngularFireList<any[]>;
  client: AngularFireObject<any>;

  constructor(
    public af: AngularFireDatabase
  ) {
     this.clients = this.af.list('/clients') as AngularFireList<Client[]>;
  }

  getClients() {
    return this.clients;
  }
  newClient(client: any) {
     this.clients.push(client);
  }
  getClient(id: string) {
    this.client = this.af.object('/clients/' + id) as AngularFireObject<Client>;
    return this.client;
  }
  updateClient(client: Client) {
    return this.client.update(client);
  }
  deleteClient(){
    return this.client.remove();
  }
}

