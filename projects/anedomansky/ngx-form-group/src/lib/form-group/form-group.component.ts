import { NgFor } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { FormGroupFieldComponent } from '../form-group-field/form-group-field.component';
import { FieldConfig } from '../models/field.config';
import { Options } from '../models/options.model';

@Component({
  selector: 'ngx-form-group',
  standalone: true,
  imports: [FormGroupFieldComponent, NgFor, ReactiveFormsModule],
  templateUrl: './form-group.component.html',
  styleUrls: ['./form-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormGroupComponent implements OnInit {
  @Input({ required: true }) form: FormGroup;

  @Input() fields: FieldConfig[] = [];

  @Input()
  options?: Options;

  // TODO: ability to add custom validatorse
  ngOnInit(): void {
    this.fields.forEach((field) => {
      if (!field.control) {
        const control = new FormControl(
          {
            value: field.defaultValue,
            disabled: field.options?.disabled,
          },
          { nonNullable: true }
        );
        field.control = control;

        if (field.options?.required) {
          control.addValidators(Validators.required);
        }
      }
      this.form.setControl(field.name, field.control);
    });
    console.log(this.form);

    this.form.valueChanges.subscribe((change) => console.log(change));
    this.form.statusChanges.subscribe((status) => console.log(status));
  }
}
