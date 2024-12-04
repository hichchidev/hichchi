export interface IViewDto<T = unknown, R = unknown> {
    formatDataSet(data?: T): R | null;
}
