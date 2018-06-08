 import { Component, OnInit } from '@angular/core';
 import {ClientService} from '../../services/client.service';
 import {ActivatedRoute, Params, Router} from '@angular/router';
 import {Client} from '../../models/Client';
 import {SettingsService} from '../../services/settings.service';
@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  id:string;
  client: Client = {
    firstName : '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  };
  disableBalanceOnEdit: boolean = true;

  constructor(
    public clientService: ClientService,
    public router: Router,
    public route: ActivatedRoute,
    public settingsService: SettingsService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.disableBalanceOnEdit = this.settingsService.getSettings().disableBalanceOnEdit;
    this.clientService.getClient(this.id).snapshotChanges().subscribe((client: any) => {
      const data = client.payload.val();
      const key = client.key;
      client  = {key, ...data};

      this.client = client;
      console.log(this.client);
    });
  }
  onSubmit({value, valid}: {value: Client, valid: boolean}) {
    if (!valid) {
      console.log('not valid');
      this.router.navigate(['edit-client/' + this.id]);
    } else {
      // Add new service
      this.clientService.updateClient(value).then(() => {
        this.router.navigate(['edit-client/' + this.id]);
      });
    }
  }
}
