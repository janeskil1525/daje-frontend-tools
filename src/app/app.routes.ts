import { Routes } from '@angular/router';
import { MainComponent } from "./features/main/main.component/main.component";
import { ParameterValuesComponent } from "./features/parameters/parameter.values.component/parameter.values.component";

export const routes: Routes = [


    {
        path: 'main',
        component: MainComponent,
        title: 'Main',
        children:[
            {
                path:'parameter-value/:tools_parameters_pkey/:tools_projects_pkey',
                component: ParameterValuesComponent,
                outlet: 'middle_split',
            },
            {
                path:'parameter-value',
                component: ParameterValuesComponent,
                outlet: 'middle_split',
            },

        ]
    },
    {
        path:'',
        redirectTo:'/main',
        pathMatch: 'full'
    }
];