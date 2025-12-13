import {Component, inject} from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { WorkflowService } from '../../../core/workflow/workflow.service';
import { TableObjectSqlInterface } from './table.object.sql.interface';
import { DatabaseService } from '../../../core/database/database.service';
import {ActivatedRoute} from "@angular/router";
import {TableObjectInterface} from "../table-object/table-object.interface";

@Component({
  selector: 'app-table-object-sql-component',
  imports: [
    InputTextModule,
    FormsModule,
    FloatLabel,
    ButtonModule,
    CardModule,
  ],
  templateUrl: './table.object.sql.component.html',
  styleUrl: './table.object.sql.component.css'
})

export class TableObjectSqlComponent {
  payload:TableObjectSqlInterface = {} as TableObjectSqlInterface;
  private activatedRoute = inject(ActivatedRoute);
  private tools_version_pkey: number = 0;
  private tools_objects_pkey: number = 0;
  constructor(
      private workflow: WorkflowService,
      private database: DatabaseService,
  ) {
    this.activatedRoute.params.subscribe((params) => {
      let tools_object_sql_pkey: number = parseInt(params['tools_object_sql_pkey']);
      this.tools_version_pkey = parseInt(params['tools_version_pkey']);
      this.tools_objects_pkey = parseInt(params['tools_objects_pkey']);
      this.database.load_record('ObjectSQL', tools_object_sql_pkey).subscribe((response: TableObjectSqlInterface)=> {
        this.payload = response
        if(!this.payload.tools_version_fkey || this.payload.tools_version_fkey ===0) {
          this.payload.tools_version_fkey = this.tools_version_pkey;
          this.payload.tools_objects_fkey = this.tools_objects_pkey;
        }
      });
    });
  }

  cleanPayload() {
    this.payload = {} as TableObjectSqlInterface;
  }
  saveTableObjectSql() {

    this.workflow.callWorkflow(
        'tools', 'save_object_sql', this.payload
    );


  }
}
