import { Component, OnInit } from '@angular/core';
import { OportunidadeService } from '../oportunidade.service';
import { MessageService } from 'primeng/primeng';

@Component({
  selector: 'app-painel-negociacao',
  templateUrl: './painel-negociacao.component.html',
  styleUrls: ['./painel-negociacao.component.css']
})
export class PainelNegociacaoComponent implements OnInit {
  
  oportunidade = {}
  oportunidades = []

  constructor(
    private oportunidadeService: OportunidadeService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.consultar();
  }

  consultar(){
    this.oportunidadeService.listar()
    .subscribe(resposta => this.oportunidades = <any>resposta)
  }

  adicionar(){
    this.oportunidadeService.adicionar(this.oportunidade)
    .subscribe(() => {
      this.oportunidade = {};
      this.consultar();

      this.messageService.add({
        severity: 'success',
        summary: 'Oportunidade cadastrada com sucesso'
      });
    },
    resposta => {
      let msg = "erro inesperado. tente novamente";

      if(resposta.error.message){
        msg = resposta.error.message;
      }

      this.messageService.add({
        severity: 'error',
        summary: msg
      });
    })
  }
}
