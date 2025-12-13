import {Component, inject} from '@angular/core';
import { WorkflowService } from '../../../core/workflow/workflow.service';
import { FormsModule } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TableObjectViewInterface } from './table.object.view.interface';
import { DatabaseService } from '../../../core/database/database.service';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-table.object.view.component',
  imports: [
    FormsModule,
    CardModule,
    FloatLabel,
    CommonModule,
    ButtonModule
  ],
  templateUrl: './table.object.view.component.html',
  styleUrl: './table.object.view.component.css',
  standalone: true,
})
export class TableObjectViewComponent {
  payload: TableObjectViewInterface = {} as TableObjectViewInterface;
  private activatedRoute = inject(ActivatedRoute);
  private tools_version_pkey: number = 0;
  private tools_objects_pkey: number = 0;

  constructor(    
    private workflow: WorkflowService,
    private database: DatabaseService,
  ){
    this.activatedRoute.params.subscribe((params) => {
      let tools_object_view_pkey: number = parseInt(params['tools_object_view_pkey']);
      this.tools_version_pkey = parseInt(params['tools_version_pkey']);
      this.tools_objects_pkey = parseInt(params['tools_objects_pkey']);
      this.database.load_record('ObjectView', tools_object_view_pkey).subscribe((response: TableObjectViewInterface)=> {
        this.payload = response
        if(!this.payload.tools_version_fkey || this.payload.tools_version_fkey ===0) {
          this.payload.tools_version_fkey = this.tools_version_pkey;
          this.payload.tools_objects_fkey = this.tools_objects_pkey;
        }
      });
    });
  }


  saveView() {

    this.workflow.callWorkflow(
        'tools', 'save_object_view', this.payload
    );

  }

  winVisible() {
    this.payload = {} as TableObjectViewInterface;
  }
}
