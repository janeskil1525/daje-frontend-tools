import {Component, inject, input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParameterValuesLoadService } from './parameter.values.load.service';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ParameterValuesInterface } from './parameter.values.interface';
import { CheckboxModule } from 'primeng/checkbox';
import { TextareaModule } from 'primeng/textarea';
import { WorkflowService } from '../../../core/workflow/workflow.service';
import {ActivatedRoute} from '@angular/router';
import {DatabaseService} from "../../../core/database/database.service";

@Component({
  selector: 'app-parameter-values-component',
  imports: [
    CommonModule,
    InputTextModule,
    FormsModule,
    FloatLabel,
    ButtonModule,
    CardModule,
    CheckboxModule,
    TextareaModule
  ],
  templateUrl: './parameter.values.component.html',
  styleUrl: './parameter.values.component.css'
})

export class ParameterValuesComponent {
    private activatedRoute = inject(ActivatedRoute);
    private tools_projects_pkey: number = 0;
    private tools_parameters_pkey: number = 0;

    payload = {} as ParameterValuesInterface;
    constructor(
      private work_flow_service: WorkflowService,
      private database: DatabaseService
    ){
        this.activatedRoute.params.subscribe((params) => {
            this.tools_projects_pkey = parseInt(params['tools_projects_pkey']);
            this.tools_parameters_pkey = parseInt(params['tools_parameters_pkey']);
            this.database.setKey2( this.tools_parameters_pkey );
            this.database.load_record('ParameterValue', this.tools_projects_pkey).subscribe((response: ParameterValuesInterface)=> {
               this.payload = response
                if(this.payload.active) this.payload.active=true;
            });
        });
    }

  saveTableObject() {

    this.payload.tools_projects_fkey = this.tools_projects_pkey;
    this.payload.tools_parameters_fkey = this.tools_parameters_pkey;

    if(!this.payload.active) this.payload.active = false;
    this.work_flow_service.callWorkflow(
        'tools', 'save_parameter_value', this.payload
    );
  }
    cleanPayload() {
        this.payload = {} as ParameterValuesInterface;
    }
}
