import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Servicios/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private service: AuthService, public router: Router) { }

  userInfo: any;

  ngOnInit(): void {
    this.getUserInfo();
  }

  async getUserInfo() {
    this.service.getUser().subscribe((res: any) => {
      this.userInfo = res[0]['username'];
    });
  }

  async logOut() {
    this.service.logout().subscribe((res: any) => { });
    localStorage.removeItem('usertoken');
    await this.router.navigate(['/logueate']);
    return await Swal.fire({
      icon: 'success',
      text: 'Sesión finalizada Correctamente',
      timer: 1500,
      allowEnterKey: false,
      allowEscapeKey: false,
      allowOutsideClick: false,
      showConfirmButton: false
    });
  }

  home() {
    this.router.navigateByUrl('/historial');
  }
}
