import { Component, Input } from '@angular/core';
import { DataWithStatus, Status } from './app.interfaces';
import { Observable, of } from 'rxjs';

interface Foo {
  some_string: string;
  some_number: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  dataWithStatus$: Observable<DataWithStatus<Foo>> = of({
    status: Status.Ok,
    some_string: 'lorem ipsum',
    some_number: 123,
  });

  wrongType = 456;
}
