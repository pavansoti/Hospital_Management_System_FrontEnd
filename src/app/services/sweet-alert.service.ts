import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {

  constructor() { }

  showSuccess(title: string, message: string) {
    return Swal.fire({
      title: title,
      text: message,
      icon: 'success',
    });
  }
  showFailed(title: string, message: string) {
    return Swal.fire({
      title: title,
      text: message,
      icon: 'error',
    });
  }
  showInfo(title: string, message: string) {
    return Swal.fire({
      title: title,
      text: message,
      icon: 'info',
    });
  }
  
  showConfirmation(title: string, message: string, confirmText: string, cancelText: string): Promise<boolean> {
    return Swal.fire({
      title: title,
      text: message,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: confirmText,
      cancelButtonText: cancelText
    }).then((result) => {
      return result.isConfirmed;
    });
  }

  
}
