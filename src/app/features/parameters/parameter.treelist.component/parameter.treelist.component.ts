import { Component, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { DatabaseService } from '../../../core/database/database.service';
import { ParameterTreelistLoadService } from './parameter.treelist.load.service'
import { CommonModule } from '@angular/common';
import { TreeModule } from 'primeng/tree';
import { BadgeModule } from 'primeng/badge';
import { ParameterValuesLoadService } from '../parameter.values.component/parameter.values.load.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-parameter-treelist-component',
  imports: [
    TreeModule,  
    BadgeModule, 
    CommonModule,

  ],
  templateUrl: './parameter.treelist.component.html',
  styleUrl: './parameter.treelist.component.css',
  standalone: true,
})

export class ParameterTreelistComponent {
  private router = inject(Router);
  paramnodes:any;
  selected: string = "";
  paramTreelist!:Subscription;

  constructor(
      private dbservice: DatabaseService, 
      private ParamTreeListService: ParameterTreelistLoadService,
      private loadValueGUIService: ParameterValuesLoadService,
  ){}

  ngOnInit() {
    this.paramTreelist = this.ParamTreeListService.getClickEvent().subscribe(()=>{
        this.dbservice.load_all_records('ParamTreelist').subscribe(response => {
          this.paramnodes = ((this.dbservice.process_response(response,[]) as unknown) as any)
        });
    });
  }

  nodeSelect(event:any) {

    this.router.navigate(['main',{ outlets: { middle_split: ['parameter-value', event.node.data.tools_parameters_pkey,  this.ParamTreeListService.getTools_projects_pkey()] } } ]);
    /*let type = this.getType(event.node);
    if ( type.length < 17 && type.indexOf("tools_parameter") > -1 ) {        
        this.loadValueGUIService.sendClickEvent(
          this.ParamTreeListService.getTools_projects_pkey(), 
          event.node.data.tools_parameters_pkey, true
        );
    }*/
  }

  getType(node: any) {
    let type = node.id;
    type = type.split("-")[1];
    if ( type === "tools_objects") {
      type = type + node.data.tools_object_types_fkey
    }
    return type;
  }
}
