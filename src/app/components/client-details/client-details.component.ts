import { Component, OnInit } from '@angular/core';
import {ClientService} from '../../services/client.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Client} from '../../models/Client';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  id: string;
  client: Client;
  hasBalance = false;
  showBalanceUpdateInput = false;

  constructor(
    public clientService: ClientService,
    public router: Router,
    public route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id);
    this.clientService.getClient(this.id).snapshotChanges().subscribe((client: any) => {
      const data = client.payload.val();
      const key = client.key;
      client  = {key, ...data};
      if (client.balance > 0) {
        this.hasBalance = true;
      }
      this.client = client;
      console.log(this.client);
    });
  }
  updateBalance(id: string) {
    // Update Client
    this.clientService.updateClient(this.client);
    this.router.navigate(['/client/' + this.id]);
  }
  onDeleteClick() {
    if (confirm('Are you sure to delete?')) {
      this.clientService.deleteClient();
      this.router.navigate(['/']);
    }
  }
}
