export interface ITechMap {
    id?: string
    supplierId?: number | string,
    name: string
    techMapJobs: ITechMapJob[]
    criticalPath: ICriticalPath
}

export interface ICreateOrUpdateTechMap {
    techMapId?: string
    supplierId?: number | string,
    name: string
    techMapJobs: ITechMapJob[]
}

export interface ITechMapJob {
    id: string,
    jobName: string;
    jobDescription: string;
    jobDuration: string
    jobDependence: string[]
    jobResources: string
    jobCompleteDate: string | Date
}

export interface ITechMapJobForm {
    id: string,
    jobName: string;
    jobDescription: string;
    jobDuration: string
    jobDependence: IJobDependency[]
    jobResources: string
    jobCompleteDate: string | Date
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
    jobDependence: string[]
    jobResources: string
    jobCompleteDate: string | Date
}

export interface ITechMapTableColumn {
    id: string;
    label: string;
    numeric: boolean;
    disablePadding: boolean;
}

export interface ICriticalPath {
    id: string
    techMapId: string
    totalDuration: number
    techMapJobs: ITechMapJob[]
}