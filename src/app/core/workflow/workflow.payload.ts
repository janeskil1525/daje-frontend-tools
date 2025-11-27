import { WorkflowPayloadInterface,  WorkflowInterface, WorkflowIdentificationData} from './workflow.interface';
import { WorkflowService } from './workflow.service';
import { ResponseService } from '../response/response.service'

export class WorkflowPayload {

     constructor(
        private workflowservice: WorkflowService,
        private responseservice: ResponseService 
      ) {}

    callWorkflow(
        workflow:string, 
        activity:string, 
        payload:any, 
        connector_data: WorkflowIdentificationData,
    ) {
        
        let workflowparams: WorkflowInterface = {
            workflow: workflow,
            activity: activity,
            connector_data: connector_data,
        }

        let workflowdata: WorkflowPayloadInterface = {
            workflow: workflowparams,
            payload: payload,

        };

        this.workflowservice.execute(workflowdata).subscribe(response => {
            this.responseservice.sendResponse(response)
            console.log(response);
        });

        return 1;
    }

};