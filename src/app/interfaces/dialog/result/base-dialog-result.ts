export interface BaseDialogResult<T> {
    success: boolean;
    isEdit: boolean;
    delete?: boolean;
    resObject: T;
}
