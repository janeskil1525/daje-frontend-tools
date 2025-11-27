import {Component, inject, model, input} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { ProjectsInterface } from './projects.interface';
import { Router } from '@angular/router';
import { DatabaseService } from "../../../core/database/database.service";
import {WorkflowService} from "../../../core/workflow/workflow.service";

@Component({
  selector: 'app-select-projects',
  imports: [SelectModule, FormsModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
  standalone: true,
})

export class ProjectsComponent {
    tools_projects_pkey: number = 0;
    nodes = model();
    private router = inject(Router);
    projects: ProjectsInterface[] = [];

    constructor(
        private database: DatabaseService,
        private workflow: WorkflowService
    ) {}  
  
    ngOnInit() {
        this.database.load_all_records('Projects').subscribe((response: ProjectsInterface[]) => {
            this.projects = response;
        });
    }
  
    loadTreeList(tools_projects_pkey: number) {
        this.workflow.setConnectorData('tools_projects', tools_projects_pkey)
        this.router.navigate(['main', {outlets: {left_split_object_tree: ['app-tabs-treelists-component', tools_projects_pkey]}}]);
    }

}

