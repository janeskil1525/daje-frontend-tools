import { Routes } from '@angular/router';
import { MainComponent } from "./features/main/main.component/main.component";
import { ParameterValuesComponent } from "./features/parameters/parameter.values.component/parameter.values.component";
import {TabsTreelistsComponent} from "./features/menu/tabs.treelists.component/tabs.treelists.component";
import {TableObjectComponent} from "./features/objects/table-object/table-object.component";
import {ObjectComponent} from "./features/objects/object.component/object.component";



export const routes: Routes = [


    {
        path: 'main',
        component: MainComponent,
        title: 'Main',
        children:[
            {
                path: 'app-tabs-treelists-component/:tools_projects_pkey',
                component: TabsTreelistsComponent,
                outlet: 'left_split_object_tree',
            },
            {
                path:'parameter-value/:tools_parameters_pkey/:tools_projects_pkey',
                component: ParameterValuesComponent,
                outlet: 'middle_split',
            },
            {
                path:'object/:tools_objects_pkey',
                component: ObjectComponent,
                outlet: 'middle_split',
            }
        ]
    },
    {
        path:'',
        redirectTo:'/main',
        pathMatch: 'full'
    }
];