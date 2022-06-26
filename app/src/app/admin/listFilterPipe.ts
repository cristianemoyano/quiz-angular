import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'listFilter'})
export class ListFilterPipe implements PipeTransform {

    transform(list: any[], filterText: string): any {
        if (filterText) {
            return list ? list.filter(item => item.questionText.search(new RegExp(filterText, 'i')) > -1) : [];
        } else {
            return list;
        }
        
    }
}