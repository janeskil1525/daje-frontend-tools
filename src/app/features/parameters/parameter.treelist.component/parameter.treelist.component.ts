import { Component, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { DatabaseService } from '../../../core/database/database.service';
import { CommonModule } from '@angular/common';
import { TreeModule } from 'primeng/tree';
import { BadgeModule } from 'primeng/badge';
import {ActivatedRoute, Router} from '@angular/router';
import { ObjectTreeListInterface } from "../../objects/object.tree.list.component/object.tree.list.interface";

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
    paramnodes: any;
    selected: string = "";
    paramTreelist!:Subscription;
    private activatedRoute = inject(ActivatedRoute);

    tools_projects_pkey: number = 0;
  constructor(
    private database: DatabaseService,
  ){
      this.activatedRoute.params.subscribe((params) => {
          this.tools_projects_pkey = params['tools_projects_pkey'];
      });
      this.database.load_all_records('ParamTreelist').subscribe((response: ObjectTreeListInterface[]) => {
          this.paramnodes = response;
      });
  }

  nodeSelect(event:any) {

      if (this.getType(event.node) === "tools_parameters") {
          let tools_parameters_pkey = event.node.data.tools_parameters_pkey
          let tools_projects_pkey = this.tools_projects_pkey;
          this.router.navigate(
              ['main',
                  {
                      outlets: {
                          middle_split:
                              ['parameter-value',
                                  tools_parameters_pkey,
                                  tools_projects_pkey
                              ]
                      }
                  }
              ]
          );
      }
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
