import { Component, computed, effect, inject, signal } from '@angular/core';
import { SearchBoxComponent } from '../../../components/admin/search-box/search-box.component';
import { UserService } from '../../../shared/services/UserService/user.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { UserFormDialogComponent } from '../../../components/admin/user-form-dialog/user-form-dialog.component';
import { UserFormDialogData } from '../../../shared/interfaces/user-form-dialog-data.interface';
import { UserInterface } from '../../../shared/interfaces/user-interface';
import { ConfirmDialogComponent } from '../../../components/admin/confirm-dialog/confirm-dialog.component';
import { UserPayloadCreateInterface, UserPayloadUpdateInterface } from '../../../shared/interfaces/user-payload.interface';

@Component({
  selector: 'app-admin-users.component',
  imports: [SearchBoxComponent],
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.css',
})
export class AdminUsersComponent {
  readonly #userService = inject(UserService);

  readonly usersResource = this.#userService.load();

  readonly users = this.#userService.filteredUsers;
  readonly isLoading = computed(() => this.usersResource.isLoading());
  readonly hasError = computed(() => this.usersResource.status() === 'error');

  readonly #dialog = inject(MatDialog);
  readonly #matSnackBar = inject(MatSnackBar);

  readonly userCreateSignal = signal<UserPayloadCreateInterface | undefined>(undefined);
  readonly userCreateResource = this.#userService.add(this.userCreateSignal);

  readonly userUpdateSignal = signal<UserPayloadUpdateInterface | undefined>(undefined);
  readonly userUpdateResource = this.#userService.update(this.userUpdateSignal);

  readonly userDeleteSignal = signal<UserInterface | undefined>(undefined);
  readonly userDeleteResource = this.#userService.remove(this.userDeleteSignal);

  constructor() {
    effect(() => {
      if (this.userDeleteResource.status() === 'error') {
        const error = this.userDeleteResource.error() as HttpErrorResponse | undefined;

        const message =
          error?.error?.message ?? 'Error al eliminar usuario';

        this.#matSnackBar.open(message, 'Cerrar', {
          duration: 3000,
        });
      }
    });
  }

  addUser(): void {
    const dialogRef = this.#dialog.open<UserFormDialogComponent, UserFormDialogData>(
      UserFormDialogComponent,
      {
        width: '640px',
        maxWidth: '100vw',
        data: {
          user: null,
        },
      },
    );

    dialogRef.afterClosed().subscribe((result: UserPayloadCreateInterface) => {
      if (!result) {
        return;
      }

      this.userCreateSignal.set(result);
    });
  }

  editUser(user: UserInterface): void {
    const dialogRef = this.#dialog.open<UserFormDialogComponent, UserFormDialogData>(
      UserFormDialogComponent,
      {
        width: '640px',
        maxWidth: '100vw',
        data: {
          user,
        },
      },
    );

    dialogRef.afterClosed().subscribe((result: UserPayloadCreateInterface) => {
      if (!result) {
        return;
      }

      this.userUpdateSignal.set({
        id: user.id,
        ...result,
      });
    });
  }

  deleteUser(user: UserInterface): void {
    const dialogRef = this.#dialog.open(ConfirmDialogComponent, {
      data: { message: `¿Eliminar ${user.name}?` },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (!confirmed) return;

      this.userDeleteSignal.set(user);
    });
  }

  searchUsers(term: string): void {
    this.#userService.setSearchTerm(term);
  }

  formatRole(role: string): string {
    return role === 'admin' ? 'Administrador' : 'Usuario';
  }

  formatStatus(status: string): string {
    return status === 'active' ? 'Activo' : 'Inactivo';
  }
}
