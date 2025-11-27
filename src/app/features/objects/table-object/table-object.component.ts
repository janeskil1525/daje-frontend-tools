import {Component, inject} from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { TableObjectInterface } from './table-object.interface';
import { CheckboxModule } from 'primeng/checkbox';
import { Subscription } from 'rxjs';
import { TableObjectGUIService } from './table-object.gui.service';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { SelectModule } from 'primeng/select';
import { TableObjectDatatypeInterface } from './table-object-datatype.interface';
import { ResponseService } from '../../../core/response/response.service';
import { WorkflowService } from '../../../core/workflow/workflow.service';
import { DatabaseService } from '../../../core/database/database.service';
import {ActivatedRoute} from "@angular/router";

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
    isVisible: boolean = false;
    isLengthVisible: boolean = true;
    isScaleVisible: boolean = true;
    tools_objects_tables_datatypes_pkey: number = 0;
    datatypes: TableObjectDatatypeInterface[] = [];

  constructor(
    private tableObjecteGUI:TableObjectGUIService,
    private responseservice: ResponseService,
    private workflowservice: WorkflowService,
    private dbservice: DatabaseService,
  ){ }
    
   ngOnInit() {
 /*   this.dbservice.load_all_records('TableObjectDatatypes').subscribe((response) => {
      this.datatypes = (this.dbservice.process_response(response, this.initialInterface()) as unknown) as TableObjectDatatypeInterface[];        
    });*/

   /* this.clickEventsubscription = this.tableObjecteGUI.getClickEvent().subscribe((tools_object_tables_pkey) => {
        this.showWin(tools_object_tables_pkey);
      })*/
    };
    
   showWin(tools_object_tables_pkey:any) {

    if(tools_object_tables_pkey === 0 && this.isVisible) {

    } else if (tools_object_tables_pkey > 0 && this.isVisible) {
      // Load table object
      /*this.dbservice.load_record('TableObject', tools_object_tables_pkey).subscribe((response) => {
        this.payload = (
          this.dbservice.process_response(
            response,
            this.initialInterface(),
            {}
          ) as unknown) as TableObjectInterface;
        if(this.payload.active) this.payload.active = true;
        if(this.payload.visible) this.payload.visible = true;
        this.tools_objects_tables_datatypes_pkey = this.payload.tools_objects_tables_datatypes_fkey        
        this.setupGUI(this.tools_objects_tables_datatypes_pkey);
      });*/
    }

  }

  winVisible(isVisible:boolean) {

  }
  
  saveTableObject(tools_objects_tables_datatypes_pkey:number) {
    this.payload.tools_objects_tables_datatypes_fkey = tools_objects_tables_datatypes_pkey;

    this.workflowservice.callWorkflow(
        'tools', 'save_object_table', this.payload
    );

    this.isVisible = false;
  }

  setupGUI(tools_objects_tables_datatypes_pkey: number) {
   /* let result = this.datatypes.find(
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
    }*/
  }
}
