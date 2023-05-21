import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
import { Token } from 'src/app/models/token';



@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent  implements OnInit {

  showToast = false;
  toastMessage = "";


  user: User = new User();
  name: string = '';
  username: string = '';
  email: string = '';
  address: string = '';
  phone: string = '';
  password: string = '';
  constructor(private usersService : UsersService, private router : Router) { }

  ngOnInit(): void {
    if (!localStorage.getItem('token')) {
      this.router.navigateByUrl('/auth/login')
      return
      }
      this.usersService.getUserByToken().subscribe((user : User) => {
        this.user = user
        this.name = user.name;
        this.username = user.username;
        this.email = user.email;
        this.address = user.address;
        this.phone = user.phone;
        this.password=user.password;
    }, (error : ErrorEvent) => {
        console.log(error)
    })
   }
   logOut () {
    localStorage.removeItem('token')
    this.router.navigateByUrl('/auth/login').then(() => window.location.reload())
}



updateUser() {
  this.usersService.updateUser(this.user.id.toString(), this.username, this.user.password, this.email, this.name, this.address, this.phone).subscribe((user: User) => {
    this.usersService.createToken(user.username).subscribe((token: Token) => {
      this.showToast = true;
      localStorage.removeItem('token');
      localStorage.setItem('token', token.token);
      window.location.reload();
      this.toastMessage = "User updated successfully.";
      this.hideToast();
    });
  });
}

hideToast() {
  setTimeout(() => {
    this.showToast = false;
    this.toastMessage = "";
  }, 3000000); // 30 seconds (in milliseconds)
}

    deleteUser () {
      if (window.confirm("Are you sure you want to delete?")) {
          this.usersService.deleteUser(this.user.id.toString()).subscribe(res => {
              this.logOut()
          })
      }
  }


}


  




