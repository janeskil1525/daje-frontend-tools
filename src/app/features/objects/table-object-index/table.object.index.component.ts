import {Component, inject} from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { WorkflowService } from '../../../core/workflow/workflow.service';
import { TableObjectIndexInterface } from './table.object.index.interface';
import { DatabaseService } from '../../../core/database/database.service';
import {TableObjectSqlInterface} from "../table-object-sql/table.object.sql.interface";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'p-table-object-index-component',
  imports: [
    InputTextModule,
    FormsModule,
    FloatLabel,
    ButtonModule,
    CardModule,
    CheckboxModule
  ],
  templateUrl: './table.object.index.component.html',
  styleUrl: './table.object.index.component.css',
  standalone: true,
})
export class TableObjectIndexComponent {
  payload:TableObjectIndexInterface = {} as TableObjectIndexInterface;
  private activatedRoute = inject(ActivatedRoute);
  private tools_version_pkey: number = 0;
  private tools_objects_pkey: number = 0;

  constructor(      
        private workflow: WorkflowService,
        private database: DatabaseService,
  ) {
    this.activatedRoute.params.subscribe((params) => {
      let tools_object_index_pkey: number = parseInt(params['tools_object_index_pkey']);
      this.tools_version_pkey = parseInt(params['tools_version_pkey']);
      this.tools_objects_pkey = parseInt(params['tools_objects_pkey']);
      this.database.load_record('ObjectIndex', tools_object_index_pkey).subscribe((response: TableObjectIndexInterface)=> {
        this.payload = response
        if(!this.payload.tools_version_fkey || this.payload.tools_version_fkey === 0 ) {
          this.payload.tools_version_fkey = this.tools_version_pkey;
          this.payload.tools_objects_fkey = this.tools_objects_pkey;
        }
      });
    });
  }


  saveTableObjectIndex() {

    this.workflow.callWorkflow(
        'tools', 'save_object_index', this.payload
    );

  }

  winVisible(isVisible:boolean = false) {
    this.payload = {} as TableObjectIndexInterface;
  }

}


