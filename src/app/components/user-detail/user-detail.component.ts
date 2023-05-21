import { Component , OnInit } from '@angular/core';
import { Token } from 'src/app/models/token';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';
import { faMapMarkerAlt, faPhoneAlt} from "@fortawesome/free-solid-svg-icons";
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit  {

  marker = faMapMarkerAlt;
    phoneIcon = faPhoneAlt

    user! : User;
    editMode : boolean = false;

    name! : string;
    username! : string;
    email! : string;
    address! : string;
    phone! : string;

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
        }, (error : ErrorEvent) => {
            console.log(error)
        })
    }

    logOut () {
        localStorage.removeItem('token')
        this.router.navigateByUrl('/auth/login').then(() => window.location.reload())
    }

    updateUser () {
        this.usersService.updateUser(this.user.id.toString(), this.username, this.user.password, this.email, this.name, this.address, this.phone).subscribe((user : User) => {
            this.usersService.createToken(user.username).subscribe((token : Token) => {
                localStorage.removeItem('token')
                console.log(localStorage.getItem('token'));
                localStorage.setItem('token', token.token)
                console.log(localStorage.getItem('token'));
                window.location.reload()
            })
        })
    }

    deleteUser () {
        if (window.confirm("Are you sure you want to delete?")) {
            this.usersService.deleteUser(this.user.id.toString()).subscribe(res => {
                this.logOut()
            })
        }
    }
  }