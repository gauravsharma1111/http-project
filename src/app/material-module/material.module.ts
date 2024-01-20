import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions, MatFormFieldModule } from '@angular/material/form-field';
const matFormFieldDefaultOptions: MatFormFieldDefaultOptions = {
  hideRequiredMarker: true,
  appearance: 'standard',
  floatLabel: 'never'
};

const moduleList = [MatSnackBarModule, MatToolbarModule, MatButtonModule, MatIconModule, MatInputModule, MatFormFieldModule];
@NgModule({
  imports: [...moduleList],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: matFormFieldDefaultOptions
    }
  ],
  exports: [...moduleList]
})
export class MaterialModule {

}
