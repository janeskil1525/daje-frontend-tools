import { environment } from '../../../environments/environment';

export enum EndPoints {
    View = 'objects/view/',
    Projects = 'projects/',
    Treelist = 'treelist/',
    ParameterTreelist = 'parameters/treelist/',
    Object = 'object/',
    ObjectTypes = 'objects/types/',
    TableObjectDatatypes = 'table/obj/datatypes/',
    TableObjects = 'table/objects/',
    TableObject = 'table/object/',
    ObjectIndex = 'objects/index/',
    ObjectSQL = 'objects/sql/',
    ObjectView = 'objects/view/',
    Versions = 'versions/',
    ParamTreelist = 'parameters/treelist/',
    ParameterValue = 'parameters/value/',
    CurrentVersion = 'version/',
}

export enum BaseEndpoint {
    Base = 'tools/api/',
    V01 = 'v1/',
}

export class EndPoint {
    private url = environment.apiUrl;
    private key2:number = -1;

    load_record_endpoint(path:string, key:number| undefined, version:string = 'V01'){
        let call = this.url + BaseEndpoint['Base'] + BaseEndpoint[version as keyof typeof BaseEndpoint] + EndPoints[path as keyof typeof EndPoints] + key
        if (this.key2 > -1) {
            call = call + '/' + this.key2;
        }
        return call;
    }

    load_all_records_endpoint(path:string, version:string = 'V01'){
        return this.url + BaseEndpoint['Base'] + BaseEndpoint[version as keyof typeof BaseEndpoint] + EndPoints[path as keyof typeof EndPoints]
    }

    public setKey2(key2:number| undefined) {
        this.key2 = key2 ?? 0;
    }
}