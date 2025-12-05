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
import { WorkflowService } from '../../../core/workflow/workflow.service';
import { DatabaseService } from '../../../core/database/database.service';
import {ActivatedRoute} from "@angular/router";
import {TreelistLoadService} from "../../../core/treelist/treelist.load.service";

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
    private tools_version_pkey: number = 0;
    private tools_objects_pkey: number = 0;

  constructor(
    private workflow: WorkflowService,
    private database: DatabaseService,
    private load_tree_list: TreelistLoadService,
  ){
      this.database.load_all_records('TableObjectDatatypes').subscribe((response: TableObjectDatatypeInterface[]) => {
          this.datatypes = response
          this.activatedRoute.params.subscribe((params) => {
              let tools_object_tables_pkey: number = parseInt(params['tools_object_tables_pkey']);
              this.tools_version_pkey = parseInt(params['tools_version_pkey']);
              this.tools_objects_pkey = parseInt(params['tools_objects_pkey']);
              this.database.load_record('TableObject', tools_object_tables_pkey).subscribe((response: TableObjectInterface)=> {
                  this.payload = response
                  if(this.payload.active) this.payload.active=true;
                  if(this.payload.visible) this.payload.visible=true;
                  if(this.payload.notnull) this.payload.notnull=true
                  if(this.payload.foreign_key) this.payload.foreign_key=true
                  this.tools_objects_tables_datatypes_pkey = this.payload.tools_objects_tables_datatypes_fkey
                  this.setupGUI(this.tools_objects_tables_datatypes_pkey);
                  if(!this.payload.tools_version_fkey || this.payload.tools_version_fkey ===0) {
                      this.payload.tools_version_fkey = this.tools_version_pkey;
                      this.payload.tools_objects_fkey = this.tools_objects_pkey;
                  }
              });
          });
      });
  }

  saveTableObject(tools_objects_tables_datatypes_pkey:number) {
      this.payload.tools_version_fkey = this.tools_version_pkey;
      this.payload.tools_objects_fkey = this.tools_objects_pkey;
      if(!this.payload.length) this.payload.length = 0;
      if(!this.payload.active) this.payload.active = false;
      if(!this.payload.visible) this.payload.visible = false;
      if(!this.payload.notnull) this.payload.notnull = false;
      if(!this.payload.foreign_key) this.payload.foreign_key = false;
      this.payload.tools_objects_tables_datatypes_fkey = tools_objects_tables_datatypes_pkey;
      this.workflow.callWorkflow(
        'tools', 'save_object_table', this.payload
      );
      this.load_tree_list.sendClickEvent();
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

