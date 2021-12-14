import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Documento } from 'src/app/models/documento';
import { GeneralService } from 'src/app/Servicios/general.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

  element:Documento={
    
    nombre :'',
    codigo :'',
    titulo :'',
    firma :'',
    numero_revision :0,
    total_pagina :0,
    no_version :0,
    fecha_revision :new Date(),
    fecha_edicion :new Date(),
    vigencia :'',
    usuario :0,
    area_perteneciente : 0,
    tipo_documento : 0,
    usuarioname:'',
    tipname:'',
    areaP:'',
  }
  documentos:Documento[]=[];
  constructor(private service:GeneralService, private router:Router) { }

  ngOnInit(): void {
    this.getDocumento()
  }

  getDocumento(){
    this.service.getDoc().subscribe((res:any)=>{
      this.documentos=res;
      console.log(res)
    })
  }

}
