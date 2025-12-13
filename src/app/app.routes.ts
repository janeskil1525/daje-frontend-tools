import { Routes } from '@angular/router';
import { MainComponent } from "./features/main/main.component/main.component";
import { ParameterValuesComponent } from "./features/parameters/parameter.values.component/parameter.values.component";
import {TabsTreelistsComponent} from "./features/menu/tabs.treelists.component/tabs.treelists.component";
import {TableObjectComponent} from "./features/objects/table-object/table-object.component";
import {ObjectComponent} from "./features/objects/object.component/object.component";
import {GenerateSqlComponent} from "./features/generators/generate.sql.component/generate.sql.component";
import {TableObjectSqlComponent} from "./features/objects/table-object-sql/table.object.sql.component";
import {TableObjectViewComponent} from "./features/objects/table-object-view/table.object.view.component";
import {TableObjectIndexComponent} from "./features/objects/table-object-index/table.object.index.component";



export const routes: Routes = [
    {
        path: 'main',
        component: MainComponent,
        title: 'Main',
        children:[
            {
                path: 'app-tabs-treelists-component/:tools_projects_pkey/:tools_version_pkey',
                component: TabsTreelistsComponent,
                outlet: 'left_split_object_tree',
            },
            {
                path:'parameter-value/:tools_parameters_pkey/:tools_projects_pkey',
                component: ParameterValuesComponent,
                outlet: 'middle_split',
            },
            {
                path:'object/:tools_projects_pkey/:tools_version_pkey/:tools_objects_pkey',
                component: ObjectComponent,
                outlet: 'middle_split',
            },
            {
                path:'tables/:tools_version_pkey/:tools_objects_pkey/:tools_object_tables_pkey',
                component:TableObjectComponent,
                outlet: 'middle_split',
            },
            {
                path:'sql/:tools_version_pkey/:tools_objects_pkey/:tools_object_sql_pkey',
                component: TableObjectSqlComponent,
                outlet: 'middle_split',
            },
            {
                path:'view/:tools_version_pkey/:tools_objects_pkey/:tools_object_view_pkey',
                component: TableObjectViewComponent,
                outlet: 'middle_split',
            },
            {
                path:'index/:tools_version_pkey/:tools_objects_pkey/:tools_object_view_pkey',
                component: TableObjectIndexComponent,
                outlet: 'middle_split',
            },
            {
                path: 'generators/:tools_projects_pkey',
                component:GenerateSqlComponent,
                outlet: 'right_split_top',
            }
        ]
    },
    {
        path:'',
        redirectTo:'/main',
        pathMatch: 'full'
    }
];