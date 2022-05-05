import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { UsuarioLogin } from '../model/UsuarioLogin';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.css']
})
export class EntrarComponent implements OnInit {

  usuarioLogin: UsuarioLogin = new UsuarioLogin()

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    window.scroll(0, 0);
  }

  entrar(){
    this.authService.entrar(this.usuarioLogin).subscribe({
      next: (resp: UsuarioLogin) => {
        this.usuarioLogin = resp;

        environment.id = this.usuarioLogin.id;
        environment.nome = this.usuarioLogin.nome;
        environment.foto = this.usuarioLogin.foto;
        environment.token = this.usuarioLogin.token;

        this.router.navigate(['/inicio']);
      },
      error: (erro) => {
        if (erro.status == 401) {
          alert('Usuário ou senha estão incorretos!');
        }
      },
    });
  }

}