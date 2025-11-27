import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseService } from '../response/response.service';
import { WorkflowPayloadInterface,  WorkflowInterface, WorkflowIdentificationData} from './workflow.interface';
import { environment } from '../../../environments/environment';
import {UserLoginService} from "../../features/user/login/user.login.service";

@Injectable({
  providedIn: 'root'
})

export class WorkflowService {

    private localkey: string = '';
    private connector_data: WorkflowIdentificationData = {connector:"", connector_pkey:0, workflow_pkey:0};

    constructor(
      private login_service: UserLoginService,
      private responseservice: ResponseService 
    ) {}  

    private http = inject(HttpClient);
    
     execute(data: any) {
        let url = environment.apiUrl;
        this.localkey = this.login_service.getXTokenCheck();
        return this.http.put(url + `workflow/api/execute`, 
           data, { headers:{
          'X-Token-Check': this.localkey
        }});
      }

      setConnectorData(connector: string, connector_pkey:number, workflow_fkey:number = 0) {
        this.connector_data.connector = connector;
        this.connector_data.connector_pkey = connector_pkey;
        this.connector_data.workflow_pkey = workflow_fkey;
      }

      getConnectorData() {
        return this.connector_data;
      }

       callWorkflow(
              workflow:string, 
              activity:string, 
              payload:any
          ) 
        {
            
            let workflowparams: WorkflowInterface = {
                workflow: workflow,
                activity: activity,
                connector_data: this.connector_data,
            }
    
            let workflowdata: WorkflowPayloadInterface = {
                workflow: workflowparams,
                payload: payload,
    
            };
    
            this.execute(workflowdata).subscribe(response => {
                this.responseservice.sendResponse(response)
                console.log(response);
            });
    
            return 1;
        }
}

