import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class NotifierService {

    constructor(private toastr: ToastrService) {}

    private appendMessages(messages, title, type) {
        if (messages instanceof Array) {
            messages.forEach(msg => this.toastr[type](msg, title))
        } else {
            this.toastr[type](messages, title)
        }
    }

    successMessage(messages) {
        this.appendMessages(messages, 'Sucesso', 'success')
    }

    errorMessage(messages) {
        this.appendMessages(messages, 'Erro', 'error')
    }
}