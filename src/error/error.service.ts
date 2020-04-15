import { Injectable } from '@nestjs/common';


@Injectable()
export class ErrorService {
    constructor(
       
    ){}
    async checkError(error){
        switch (error) {
            case 'Email_already_exists':
               return {
                   code: 100,
                   message: 'Email này đã tồn tại'
               }
        
            default:
                break;
        }
    }
}
