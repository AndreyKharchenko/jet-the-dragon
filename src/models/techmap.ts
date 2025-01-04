export interface ITechMap {
    id?: string
    supplierId?: number | string,
    name: string
    techMapJobs: ITechMapJob[]
}

export interface ICreateOrUpdateTechMap {
    techMapId?: string
    supplierId?: number | string,
    name: string
    techMapJobs: ITechMapJob[]
}

export interface ITechMapJob {
    id: string,
    //id?: string,
    jobName: string;
    jobDescription: string;
    jobDuration: string
    // jobDependence: string
    jobDependence: string[]
    jobResources: string
    jobCompleteDate: string
}

export interface ITechMapJobForm {
    id: string,
    jobName: string;
    jobDescription: string;
    jobDuration: string
    jobDependence: IJobDependency[]
    jobResources: string
    jobCompleteDate: string
}

export interface IJobDependency {
    id: string,
    title: string
}

export interface IDeleteTechMap {
    techMapId: string
}

export interface ITechMapFilter {
    supplierId?: string
}

export interface ITechMapTableRow {
    id: string,
    jobName: string
    jobDescription: string
    jobDuration: string
    // jobDependence: string
    jobDependence: string[]
    jobResources: string
    jobCompleteDate: string
}

export interface ITechMapTableColumn {
    id: string;
    label: string;
    numeric: boolean;
    disablePadding: boolean;
}