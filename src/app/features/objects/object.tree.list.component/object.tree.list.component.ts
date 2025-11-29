import { Component, ViewChild, input, inject, signal  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeModule } from 'primeng/tree';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { ContextMenu } from 'primeng/contextmenu';
import { TreelistLoadService } from '../../../core/treelist/treelist.load.service';
import {ActivatedRoute, Router} from '@angular/router';
import { BadgeModule } from 'primeng/badge';
import { VersionsGuiService } from '../../versions/versions.component/versions.gui.service';
import { DatabaseService } from '../../../core/database/database.service';
import {ObjectTreeListInterface} from "./object.tree.list.interface";

@Component({
  selector: 'app-object-treelist',
  imports: [TreeModule, ContextMenu,  BadgeModule, CommonModule],
  templateUrl: './object.tree.list.component.html',
  styleUrl: './object.tree.list.component.css',
  standalone: true,
})

export class ObjectTreelistComponent{
    selectedNode: string = "";
    items: MenuItem[] = [];
    @ViewChild('cm') cm!: ContextMenu;
    selectedId!: string;
    nodes:ObjectTreeListInterface[] = [];
    private activatedRoute = inject(ActivatedRoute);
    private router = inject(Router);

    constructor(
    private database: DatabaseService,
    ) {
       this.activatedRoute.params.subscribe((params) => {
           this.database.load_record('Treelist', params['tools_projects_pkey']).subscribe((response: ObjectTreeListInterface[]) => {
               this.nodes = response;
               if (!this.nodes || this.nodes.length === 0) {
                   this.addObject(0, 0)
               }
           });
       });
    };

  nodeSelect(event:any) {
    let type = this.getType(event.node);
    let data = event.node.data;
    if ( type.indexOf("tools_objects") > -1 ) {
      this.items = [
          {label:'Table', icon: PrimeIcons.PLUS, command: (event) => this.addObject(this.selectedNode, 1)}, 
          {label:'Index', icon: PrimeIcons.PLUS, command: (event) => this.addObject(this.selectedNode, 2)}, 
          {label:'SQL', icon: PrimeIcons.PLUS, command: (event) => this.addObject(this.selectedNode, 3)}
        ];
    }
    if (type === "tools_version") {

    } else if ( type === "tools_objects1") {
        this.router.navigate(
            ['main',
                {
                    outlets: {
                        middle_split:
                            ['object', data.tools_objects_pkey]
                    }
                }
            ]
        );
    } else if ( type === "tools_objects2") {

    } else if ( type === 'tools_object_tables') {
        this.router.navigate(
            ['main',
                {
                    outlets: {
                        middle_split:
                            ['tables', data.tools_object_tables_pkey]
                    }
                }
            ]
        );
    } else if ( type === 'tools_object_index') {

    }
  }

/*  addItem(node: any, object_type:number) {
    let type = this.getType(node);
    if ( type === "tools_objects1") {
      this.versionsGUI.sendClickEvent(0,false);
      this.objecteGUI.sendClickEvent(0,false);
      this.tableObjecteGUI.sendClickEvent(0, true, node);
    }
  }
*/
  addObject(node: any, object_type:number) {

      this.router.navigate(
          ['main',
              {
                  outlets: {
                      middle_split:
                          ['object', 0]
                  }
              }
          ]
      );
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

