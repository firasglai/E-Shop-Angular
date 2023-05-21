import { Component , OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/models/cart-item';
import { User } from 'src/app/models/user';
import { CartItemsService } from 'src/app/services/cart-item.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.css']
})
export class UserNavbarComponent implements OnInit  {


  user: User = new User();
name: string = '';
username: string = '';
email: string = '';
address: string = '';
phone: string = '';
password: string = '';

  constructor(private usersService : UsersService, private router : Router) { }


  ngOnInit(): void {
    this.usersService.getUserByToken().subscribe((user : User) => {
      this.user = user
      this.name = user.name;
      this.username = user.username;
      this.email = user.email;
      this.address = user.address;
      this.phone = user.phone;
  }, (error : ErrorEvent) => {
      console.log(error)
  })
  }

  logOut () {
    localStorage.removeItem('token')
    this.router.navigateByUrl('/auth/login').then(() => window.location.reload())
}

}
