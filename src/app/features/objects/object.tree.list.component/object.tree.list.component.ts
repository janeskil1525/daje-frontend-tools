import { Component, ViewChild, input, inject, signal  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeModule } from 'primeng/tree';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { ContextMenu } from 'primeng/contextmenu';
import {ActivatedRoute, Router} from '@angular/router';
import { BadgeModule } from 'primeng/badge';
import { DatabaseService } from '../../../core/database/database.service';
import {ObjectTreeListInterface} from "./object.tree.list.interface";
import {TreelistLoadService} from "../../../core/treelist/treelist.load.service";
import {Subscription} from "rxjs";

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
    private tools_version_pkey: number = 0;
    private tools_projects_pkey: number = 0;
    private tools_objects_pkey: number = 0;
    load_list!: Subscription;

    constructor(
        private database: DatabaseService,
        private load_tree_list: TreelistLoadService,
    ) {
       this.activatedRoute.params.subscribe((params) => {
           this.tools_version_pkey = parseInt(params['tools_version_pkey'])
           this.tools_projects_pkey = parseInt(params['tools_projects_pkey'])
           this.loadTreeList();
       });
        this.setupContextMenu();
        this.load_list = this.load_tree_list.getClickEvent().subscribe((tools_projects_pkey) => {
            this.loadTreeList();
        });
    };

    loadTreeList(): void {
        this.database.load_record('Treelist', this.tools_projects_pkey).subscribe((response: ObjectTreeListInterface[]) => {
            this.nodes = response;
            if (!this.nodes || this.nodes.length === 0) {
                this.addObject(0, 0)
            } else {
                this.router.navigate(
                    ['main',
                        {
                            outlets: {
                                right_split_top:
                                    ['generators',
                                        this.tools_projects_pkey,
                                    ]
                            }
                        }
                    ]
                );
            }
        });
    }

  nodeSelect(event:any) {
    let type = this.getType(event.node);
    let data = event.node.data;
    if ( type.indexOf("tools_objects") > -1 ) {
        this.setupContextMenu();

    }
    if (type === "tools_version") {

    } else if ( type === "tools_objects1" || type === "tools_objects2" || type === "tools_objects3" || type === "tools_objects4") {
        this.tools_objects_pkey = data.tools_objects_pkey;
        this.router.navigate(
            ['main',
                {
                    outlets: {
                        middle_split:
                            ['object',
                                this.tools_projects_pkey,
                                this.tools_version_pkey,
                                data.tools_objects_pkey
                            ]
                    }
                }
            ]
        );
    } else if ( type === 'tools_object_tables') {
        this.router.navigate(
            ['main',
                {
                    outlets: {
                        middle_split:
                            ['tables',
                                this.tools_version_pkey,
                                this.tools_objects_pkey,
                                data.tools_object_tables_pkey
                            ]
                    }
                }
            ]
        );
    } else if ( type === "tools_object_sql" ) {
        this.router.navigate(
            ['main',
                {
                    outlets: {
                        middle_split:
                            ['sql',
                                this.tools_version_pkey,
                                this.tools_objects_pkey,
                                data.tools_object_sql_pkey
                            ]
                    }
                }
            ]
        );

    } else if ( type === 'tools_object_index') {
        this.router.navigate(
            ['main',
                {
                    outlets: {
                        middle_split:
                            ['index',
                                this.tools_version_pkey,
                                this.tools_objects_pkey,
                                data.tools_object_index_pkey
                            ]
                    }
                }
            ]
        );
    } else if ( type === 'tools_object_view') {
        this.router.navigate(
            ['main',
                {
                    outlets: {
                        middle_split:
                            ['view',
                                this.tools_version_pkey,
                                this.tools_objects_pkey,
                                data.tools_object_views_pkey
                            ]
                    }
                }
            ]
        );
    }
  }

  addItem(node: any, object_type:number) {
    let type = this.getType(node);
    if ( type === "tools_objects1") {
        this.router.navigate(
            ['main',
                {
                    outlets: {
                        middle_split:
                            ['tables',
                                this.tools_version_pkey,
                                node.data.tools_objects_pkey,
                                0
                            ]
                    }
                }
            ]
        );
    } else if ( type === "tools_objects2" ) {
          this.router.navigate(
              ['main',
                  {
                      outlets: {
                          middle_split:
                              ['index',
                                  this.tools_version_pkey,
                                  node.data.tools_objects_pkey,
                                  0
                              ]
                      }
                  }
              ]
          );
      }  else if ( type === "tools_objects3" ) {
        this.router.navigate(
            ['main',
                {
                    outlets: {
                        middle_split:
                            ['sql',
                                this.tools_version_pkey,
                                node.data.tools_objects_pkey,
                                0
                            ]
                    }
                }
            ]
        );
    }else if ( type === "tools_objects4" ) {
        this.router.navigate(
            ['main',
                {
                    outlets: {
                        middle_split:
                            ['view',
                                this.tools_version_pkey,
                                node.data.tools_objects_pkey,
                                0
                            ]
                    }
                }
            ]
        );
    }
  }

  addObject(node: any, object_type:number) {

      this.router.navigate(
          ['main',
              {
                  outlets: {
                      middle_split:
                          ['object', this.tools_projects_pkey,this.tools_version_pkey, 0]
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

    setupContextMenu() {
        this.items = [
            {
                label:'Table',
                icon: PrimeIcons.PLUS,
                command: (event) => this.addObject(this.selectedNode, 1),
                items:[
                    {
                        label: 'Field',
                        icon: PrimeIcons.PLUS,
                        command: (event) => this.addItem(this.selectedNode, 1)
                    }
                ],
            },
            {
                label:'Index',
                icon: PrimeIcons.PLUS,
                command: (event) => this.addObject(this.selectedNode, 2),
                items:[
                    {
                        label: 'New index',
                        icon: PrimeIcons.PLUS,
                        command: (event) => this.addItem(this.selectedNode, 2)
                    }
                ]

            },
            {
                label:'SQL',
                icon: PrimeIcons.PLUS,
                command: (event) => this.addObject(this.selectedNode, 3),
                items:[
                    {
                        label: 'SQL',
                        icon: PrimeIcons.PLUS,
                        command: (event) => this.addItem(this.selectedNode, 3)
                    }
                ]
            },
            {
                label:'View',
                icon: PrimeIcons.PLUS,
                command: (event) => this.addObject(this.selectedNode, 4),
                items:[
                    {
                        label: 'View',
                        icon: PrimeIcons.PLUS,
                        command: (event) => this.addItem(this.selectedNode, 4)
                    }
                ]
            }
        ];
    }
}

