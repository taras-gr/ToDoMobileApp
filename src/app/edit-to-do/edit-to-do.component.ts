import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-to-do',
  templateUrl: './edit-to-do.component.html',
  styleUrls: ['./edit-to-do.component.css']
})
export class EditToDoComponent implements OnInit, OnDestroy {
  id: string;
  private sub:any;
  toDoItem;
  currentUser;

  constructor(private service: UserService, private route: ActivatedRoute, private toastr: ToastrService, private router: Router) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.service.getToDoItem(this.id).subscribe(
      res => {
        console.log(res);
        this.toDoItem = res;
      },
      err => {
        console.log(err);
      },
    );

    this.service.getUserProfile().subscribe(
      res => {
        console.log(res);
        this.currentUser = res;
      },
      err => {
        console.log(err);
      },
    );
  }

  onEditToDo(toDoItem) {
    this.service.putToDoItem(toDoItem.id, toDoItem).subscribe(
      res => {

      },
      err => {
        console.log(err);
      }
    ); 
    this.toastr.success('ToDoItem successfully edited!', null, {
      disableTimeOut: false,
      tapToDismiss: false,
      closeButton: true,
      positionClass:'myToast-top-right',
      timeOut: 20000,
      progressBar: false
    });
    this.router.navigate(['/todo']);
  }

  onDeleteToDo(toDoItem){
    this.service.deleteToDoItem(toDoItem.id).subscribe(
      res => {
        this.router.navigate(['/todo']);
      },
      err => {
        console.log(err);
      }
    ); 
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onUserInfo() {
    this.router.navigate(['/home']);
  }

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }


}
