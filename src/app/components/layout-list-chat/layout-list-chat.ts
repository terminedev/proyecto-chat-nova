import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-layout-listchat',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './layout-list-chat.html',
  styleUrl: './layout-list-chat.css'
})
export class LayoutListChat {
  searchForm: FormGroup;

  private fb = inject(FormBuilder);
  private destroyRef = inject(DestroyRef);

  constructor() {
    // Inicializamos el formulario con sus validaciones
    this.searchForm = this.fb.group({
      searchQuery: ['', [
        Validators.minLength(2), // Al menos 2 caracteres para buscar
        Validators.maxLength(50), // Máximo 50 caracteres
        Validators.pattern('^[a-zA-Z0-9 ]*$') // Solo letras, números y espacios (opcional)
      ]]
    });
  }

  ngOnInit(): void {
    // Escuchamos los cambios en tiempo real, ideal para barras de búsqueda
    this.searchForm.get('searchQuery')?.valueChanges
      .pipe(
        debounceTime(300), // Espera 300ms después de que el usuario deja de escribir
        distinctUntilChanged(), // Solo emite si el valor realmente cambió
        takeUntilDestroyed(this.destroyRef) // Se desuscribe automáticamente al destruir el componente
      )
      .subscribe(value => {
        if (this.searchForm.valid) {
          this.realizarBusqueda(value);
        }
      });
  }

  realizarBusqueda(termino: string) {
    // Aquí iría tu lógica para filtrar los chats (ej. llamar a un servicio)
    console.log('Buscando chats con:', termino);
  }

  // Getter para facilitar el acceso en el HTML
  get searchQuery() {
    return this.searchForm.get('searchQuery');
  }
}