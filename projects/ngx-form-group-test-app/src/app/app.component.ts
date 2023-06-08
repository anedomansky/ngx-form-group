import { FieldConfig, FormGroupComponent } from '@anedomansky/ngx-form-group';
import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormGroupComponent, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  form = new FormGroup({});

  fields: FieldConfig[] = [
    {
      name: 'first',
      type: 'text',
      label: 'First',
      placeholder: 'test',
      options: {
        disabled: false,
      },
    },
    {
      name: 'second',
      type: 'number',
      label: 'Second',
    },
    {
      name: 'third',
      type: 'checkbox',
      label: 'Third',
    },
  ];

  ngOnInit(): void {
    this.form.valueChanges.subscribe((change) => console.log(change));
    this.form.statusChanges.subscribe((status) => console.log(status));
  }

  toggleInputActivation(name: string, enable: boolean): void {
    if (enable) {
      this.form.get(name)?.enable();
    } else {
      this.form.get(name)?.disable();
    }
  }

  onSubmit(event: FormDataEvent): void {
    console.log(event);
    console.log(this.form.value);
  }
}
