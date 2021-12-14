import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Documento } from 'src/app/models/documento';
import { AuthService } from 'src/app/Servicios/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formularios',
  templateUrl: './formularios.component.html',
  styleUrls: ['./formularios.component.css']
})
export class FormulariosComponent implements OnInit {

  documento: Documento = {
    nombre: '',
    tipo_documento: 0,
    codigo: '',
    titulo: '',
    firma: 'SI',
    numero_revision: 0,
    fecha_revision: '',
    total_pagina: 0,
    fecha_edicion: '',
    no_version: 0,
    vigencia: '',
    area_perteneciente: 0,
    usuario: 0,
    usuarioname: '',
    tipname: '',
    areaP: ''
  }

  typeOfDoc = new Array();

  constructor(private service: AuthService, public router: Router) { }

  ngOnInit(): void {
    this.getDocuments();
  }

  getDocuments() {
    return this.service.getTypeOfDocuments().subscribe((res: any) => { this.typeOfDoc = res });
  }

  async newDocument() {
    console.log(this.documento);
    this.service.createNewDoc(this.documento).subscribe((res: any) => {
      //window.location.reload();
      Swal.fire('Operación exitosa','success');
    });
    return;
  }

}
