import {Component, inject} from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { TableObjectInterface } from './table-object.interface';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { SelectModule } from 'primeng/select';
import { TableObjectDatatypeInterface } from './table-object-datatype.interface';
import { ResponseService } from '../../../core/response/response.service';
import { WorkflowService } from '../../../core/workflow/workflow.service';
import { DatabaseService } from '../../../core/database/database.service';
import {ActivatedRoute} from "@angular/router";
import {ObjectTypeInterface} from "../object.component/object.type.interface";
import {ObjectInterface} from "../object.component/object.interface";

@Component({
  selector: 'p-table-object-component',
  imports: [
    FormsModule, 
    InputTextModule, 
    FloatLabel, 
    CheckboxModule, 
    ButtonModule,
    CardModule,
    SelectModule
  ],
  templateUrl: './table-object.component.html',
  styleUrl: './table-object.component.css',
  standalone: true,
})

export class TableObjectComponent {
    payload = {} as TableObjectInterface;
    private activatedRoute = inject(ActivatedRoute);
    isLengthVisible: boolean = true;
    isScaleVisible: boolean = true;
    tools_objects_tables_datatypes_pkey: number = 0;
    datatypes = [] as TableObjectDatatypeInterface[];

  constructor(
    private workflowservice: WorkflowService,
    private database: DatabaseService,
  ){
      this.database.load_all_records('TableObjectDatatypes').subscribe((response: TableObjectDatatypeInterface[]) => {
          this.datatypes = response
          this.activatedRoute.params.subscribe((params) => {
              let tools_object_tables_pkey = parseInt(params['tools_object_tables_pkey']);
              this.database.load_record('TableObject', tools_object_tables_pkey).subscribe((response: TableObjectInterface)=> {
                  this.payload = response
                  if(this.payload.active) this.payload.active=true;
                  if(this.payload.visible) this.payload.visible=true;
                  this.tools_objects_tables_datatypes_pkey = this.payload.tools_objects_tables_datatypes_fkey
                  this.setupGUI(this.tools_objects_tables_datatypes_pkey);
              });
          });
      });
  }


  
  saveTableObject(tools_objects_tables_datatypes_pkey:number) {
    this.payload.tools_objects_tables_datatypes_fkey = tools_objects_tables_datatypes_pkey;

    this.workflowservice.callWorkflow(
        'tools', 'save_object_table', this.payload
    );

  }

    setupGUI(tools_objects_tables_datatypes_pkey: number) {
        let result = this.datatypes.find(
            datatype => datatype.tools_objects_tables_datatypes_pkey === tools_objects_tables_datatypes_pkey
        );
        if (result !== undefined){
            if(result.length === 1){
                this.isLengthVisible = true;
            } else {
                this.isLengthVisible = false;
                this.payload.length = 0;
            }
            if(result.scale === 1){
                this.isScaleVisible = true;
            } else {
                this.isScaleVisible = false;
                this.payload.scale = 0;
            }
        }
    }
    winVisible(isVisible:boolean) {
        this.payload = {} as TableObjectInterface;
        this.datatypes = [] as TableObjectDatatypeInterface[];
    }
}

