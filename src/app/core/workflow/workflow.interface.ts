export interface WorkflowIdentificationData {
    workflow_pkey: number,
    connector: string,
    connector_pkey:number
}

export interface WorkflowInterface {
    workflow: string,
    activity: string,
    connector_data: WorkflowIdentificationData,
}

export interface WorkflowPayloadInterface {
    workflow: WorkflowInterface,
    payload: any
}

