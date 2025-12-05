import { Component } from '@angular/core';
import {ParameterTreelistComponent} from "../../parameters/parameter.treelist.component/parameter.treelist.component";
import {Tab, TabList, TabPanel, TabPanels, Tabs} from "primeng/tabs";
import {ObjectTreelistComponent} from "../../objects/object.tree.list.component/object.tree.list.component";
import { ScrollPanelModule } from 'primeng/scrollpanel';

@Component({
  selector: 'app-tabs-treelists-component',
    imports: [
        ParameterTreelistComponent,
        Tab,
        TabList,
        TabPanel,
        TabPanels,
        Tabs,
        ObjectTreelistComponent,
        ParameterTreelistComponent,
        ScrollPanelModule
    ],
  templateUrl: './tabs.treelists.component.html',
  styleUrl: './tabs.treelists.component.scss',
})
export class TabsTreelistsComponent {

}
