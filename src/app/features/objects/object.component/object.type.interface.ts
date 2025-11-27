import{ ResponseBase } from '../../../core/response/response.interface';

export interface ObjectTypeInterface extends ResponseBase {
    tools_object_types_pkey:number,
    type_name:string,
    type:number,
}
